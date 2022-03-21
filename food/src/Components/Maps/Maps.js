import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const center = {
  lat: 17.38714,
  lng: 78.491684,
};

export default function Maps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDev1FHm0n2nU3d_V0muyxq0KoaW7i9LxI",
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={(e) => {
          setMarkers((current) => [
            ...current,
            {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      >
        {markers.map((marker) => (
          <Marker key={``} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
}
