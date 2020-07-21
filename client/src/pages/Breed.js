import React, { useEffect, useCallback, useState } from "react";
import Layout from "../layouts/Layout";
import { fetchBreedById, fetchImages } from "../api";
import LoadingPage from "./LoadingPage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Skill from "../components/Skill";
import Placeholder from "../components/Placeholder";
import { SRLWrapper } from "simple-react-lightbox";
import axios from "../api/index";

function Breed(props) {
  const [breed, setBreed] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(null);
  const attributes = [
    "adaptability",
    "affection_level",
    "child_friendly",
    "grooming",
    "intelligence",
    "health_issues",
    "social_needs",
    "stranger_friendly",
  ];

  const fetchBreed = useCallback(async () => {
    console.log(`Request called ?`);
    let source = axios.CancelToken.source();
    setSource(source);
    try {
      const response = await axios.get(`/breeds/${props.id}`, {
        cancelToken: source.token,
      });
      console.log(`Response.data`, response.data);

      // Change the breed model to fit my needs
      let breed = {
        img: response.data.url,
        width: response.data.width,
        height: response.data.height,
        data: response.data.breeds[0],
      };
      setBreed(breed);

      // Fetch images
      const imageResponse = await fetchImages(props.id);
      console.log(`ImageResponse`, imageResponse.data);
      setImages(imageResponse.data);
    } catch (e) {
      console.log(`Error`, e);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSkills = () => {
    const breedObj = breed.data;
    let listSkills = [];
    for (let prop in breedObj) {
      if (breedObj.hasOwnProperty(prop)) {
        if (attributes.includes(prop)) {
          let name = prop.replace("_", " ");
          listSkills.push({
            name: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
            value: breedObj[prop],
          });
        }
      }
    }
    return listSkills;
  };

  useEffect(() => {
    fetchBreed();
    return () => {
      if (source) source.cancel("Cleanup the request ?");
    };
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <Layout>
      {breed && (
        <>
          {/* Section Top */}
          <section className="flex flex-col md:flex-row mt-8">
            <div className="md:w-2/5 md:h-64 mx-auto">
              <LazyLoadImage
                style={{ minHeight: "200px" }}
                className="rounded-base max-h-screen w-fullmd:object-cover z-10 "
                placeholder={<Placeholder />}
                src={breed.img}
                alt="Cat"
                effect="opacity"
                wrapperClassName="image--special"
              />
            </div>
            <div className="md:w-3/5 md:px-4 md:ml-12">
              <h1 className="text-2xl font-bold mb-6 mt-8 md:mt-0">
                {breed.data.name}
              </h1>
              <p className="text-md mb-6">{breed.data.description}</p>
              <ul>
                <li className="mb-6">
                  <span className="font-bold">Temperament: </span>
                  {breed.data.temperament}
                </li>
                <li className="mb-6">
                  <span className="font-bold">Origin: </span>
                  {breed.data.origin}
                </li>
                <li className="mb-6">
                  <span className="font-bold">Life span: </span>
                  {breed.data.life_span} years
                </li>
                {getSkills().map((skill) => {
                  return (
                    <Skill
                      key={skill.name}
                      name={skill.name}
                      value={skill.value}
                    />
                  );
                })}
              </ul>
            </div>
          </section>

          {/* Gallery Section */}
          {images.length > 0 && (
            <section className="mb-40">
              <h2 className="text-2xl font-bold mb-6">Other Photos</h2>
              {/* <div > */}
              <SRLWrapper>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {images.map((image) => {
                    return (
                      <LazyLoadImage
                        key={image.id}
                        className="w-full h-64 md:h-48 rounded-base object-cover cursor-pointer
                        hover:opacity-75 transition-opacity duration-200"
                        src={image.url}
                        alt="cat"
                        effect="opacity"
                      />
                    );
                  })}
                </div>
              </SRLWrapper>
              {/* </div> */}
            </section>
          )}
        </>
      )}
    </Layout>
  );
}

export default Breed;
