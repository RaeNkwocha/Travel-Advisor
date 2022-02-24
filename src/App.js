import { CssBaseline, Grid } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Maps from "./components/Map/Maps";
import { getPlacesData } from "./api/index";
import { useEffect, useState } from "react";

function App() {
  const [places, setPlaces] = useState([]);
  const [filterdPlaces, setfilterdPlaces] = useState([]);
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: "100vh",
    latitude: "",
    longitude: "",
    zoom: 4,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let newLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      let newViewport = {
        height: "100vh",
        width: window.innerWidth,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10,
      };
      setViewport(newViewport);
    });

    // console.log(viewport);
  }, []);
  useEffect(() => {
    setIsLoading(true);

    getPlacesData(viewport.latitude, viewport.longitude, type).then((data) => {
      setPlaces(data);
      setfilterdPlaces([]);
      setIsLoading(false);

      console.log(data);
    });
  }, [viewport, type]);
  useEffect(() => {
    const filterdPlaces = places.filter((place) => place.rating > rating);
    setfilterdPlaces(filterdPlaces);
  }, [rating]);
  return (
    <>
      <CssBaseline />
      <Header setViewport={setViewport} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filterdPlaces.length ? filterdPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Maps
            places={filterdPlaces.length ? filterdPlaces : places}
            viewport={viewport}
            setViewport={setViewport}
          />{" "}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
