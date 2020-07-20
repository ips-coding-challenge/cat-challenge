const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { API_KEY } = require("./config");
const API_URL = "https://api.thecatapi.com/v1";
const incrementViews = require("./firestore/index");

admin.initializeApp();

const db = admin.firestore();

axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = API_URL;

const app = express();
app.use(cors({ origin: true }));

app.get("/breeds", async (req, res) => {
  try {
    const response = await axios.get(`/breeds`);
    return res.status(200).send(response.data);
  } catch (e) {
    console.log(`Error`, e.message);
    if (e.response) {
      return res.status(e.response.status).send(e.response.message);
    }
    return res.status(500).send("Can't fetch the server");
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
    return res.status(200).send(response.data);
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
    console.log(`Errror`, e);
  }
});

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
