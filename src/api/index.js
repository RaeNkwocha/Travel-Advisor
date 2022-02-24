import { useContext } from "react";
import axios from "axios";

export const getPlacesData = async (lat, long, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
      {
        params: {
          latitude: lat,
          longitude: long,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "217f437553mshfc198700cee2d28p1e1f2bjsn5a2651a07bf4",
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
