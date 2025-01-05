import React from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { AnimatedMapView } from "react-native-maps/lib/MapView";

const Map = () => {
  //const region = {}   will be set dynamically later

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{
        width: "100%", // Full width of the parent container
        height: "100%", // Full height of the parent container
        borderRadius: 15, // Optional: rounded corners
      }}
      mapType="mutedStandard"
      tintColor="black"
      showsPointsOfInterest={false}
      //initialRegion={}
      showsUserLocation={true}
      userInterfaceStyle="light"
    ></MapView>
  );
};

export default Map;
