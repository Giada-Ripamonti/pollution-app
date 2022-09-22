import React from "react";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

const CurrentPosition = () => {
  const [location, setLocation] = useState(0);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 8000,
    });

  useEffect(() => {
    if(coords) {
      getCity();
    }
  }, [coords]);

  const getCity = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/geo/1.0/reverse?lat=" +
          coords.latitude +
          "&lon=" +
          coords.longitude +
          "&limit=1&appid=3ddd1d58f975dadc250ecff74638af9a"
      );
      if (response.ok) {
        const city = await response.json();
        setLocation(city[0].name);
        console.log(city[0].name);
      } else {
        console.log("fetch error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return !isGeolocationAvailable ? (
    <h6>Your browser does not support Geolocation.</h6>
  ) : !isGeolocationEnabled ? (
    <h6>Enable Geolocation to see your position.</h6>
  ) : coords ? (
    <h6>Current position: {location} </h6>
  ) : (
    <h6>Getting the location data&hellip; </h6>
  );
};

export default CurrentPosition;
