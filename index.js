const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
// const serviceAccount = require("./myunsplash-firebase-adminsdk-xxfok-ddbedf2dff.json");
const axios = require("axios");
require("dotenv").config();

const API_URL = "https://api.thecatapi.com/v1";

axios.defaults.headers.common["x-api-key"] = process.env.API_KEY;
axios.defaults.baseURL = API_URL;

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
admin.initializeApp({
  credential: admin.credential.cert({
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
  databaseURL: "https://myunsplash.firebaseio.com",
});

const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.get("/breeds", async (req, res) => {
  try {
    const response = await axios.get(`/breeds`);
    return res.status(200).send(response.data);
  } catch (e) {
    console.log(`Error`, e.message);
    if (e.response) {
      return res.status(e.response.status).send(e.response.message);
    }
    return res.status(500).send(`An Error occured: ${e.message}`);
  }
});

app.get("/breeds/popular", async (req, res) => {
  try {
    const result = await db
      .collection("breeds")
      .orderBy("views", "desc")
      .limit(10)
      .get();
    let popularBreeds = [];
    result.forEach((snap) => {
      popularBreeds.push(snap.data());
    });
    return res.status(200).send(popularBreeds);
  } catch (e) {
    console.log(`Error`, e);
  }
});

app.get("/breeds/:id", async (req, res) => {
  const breedId = req.params.id;
  const params = {
    breed_id: breedId,
  };
  console.log(`BreedId`, breedId);
  console.log(`Params`, params);
  try {
    const response = await axios.get("/images/search", { params });
    console.log(`Response`, response.data);
    return res.status(200).send(response.data[0]);
  } catch (e) {
    console.log(`Error`, e.message);
    if (e.response) {
      return res.status(e.response.status).send(e.response.message);
    }
    return res.status(500).send(`An Error occured: ${e.message}`);
  }
});

app.get("/images/search", async (req, res) => {
  const params = {
    limit: 8,
    order: "ASC",
    ...req.query,
    mime_types: ["jpg", "png"],
  };
  try {
    const response = await axios.get(`/images/search`, { params });

    let images = [];
    console.log(`params`, params);
    console.log("image response", response.data);
    response.data.forEach((item) => {
      images.push({
        id: item.id,
        url: item.url,
        width: item.width,
        height: item.height,
      });
    });
    // return res.send(response.data);
    return res.status(200).send(images);
  } catch (e) {
    console.log(`Error`, e);
    if (e.response) {
      return res.status(e.response.status).send(e.response.message);
    }
    return res.send(e.message);
  }
});

app.post("/breeds", async (req, res) => {
  const { id, name, description } = req.body;

  if (!id || !name || !description) {
    return res.status(400).send("Missing informations");
  }

  const breedEntry = {
    id,
    name,
    description,
    views: admin.firestore.FieldValue.increment(1),
  };

  try {
    await db
      .collection("breeds")
      .doc(id)
      .set(
        {
          ...breedEntry,
        },
        { merge: true }
      );
    return res.status(201).send(breedEntry);
  } catch (e) {
    console.log(`Error`, e.message);
    return res.status(400).send("An error occured");
  }
});

app.listen(5000, () => {
  console.log(`Listening on port 5000`);
});
