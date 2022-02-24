import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import "mapbox-gl/dist/mapbox-gl.css";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";

const Maps = ({ viewport, setViewport, places }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <Map
        {...viewport}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => setViewport({ viewport })}
        mapboxAccessToken="pk.eyJ1IjoicmFlbiIsImEiOiJja3p3dHptc2EwMmVpMnZzNGZzcnA1ZWJ2In0.DnjkzTcJY1MnDTSgUqasZw"
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          anchor="center"
        >
          <div>
            <LocationOnOutlinedIcon color="primary" fontSize="large" />{" "}
          </div>
        </Marker>
      </Map>
    </div>
  );
};

export default Maps;
