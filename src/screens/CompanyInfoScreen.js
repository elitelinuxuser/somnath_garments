import React from "react";
import { View, StyleSheet, PermissionsAndroid } from "react-native";
// import Geolocation from "react-native-geolocation-service";
import { Button, Text } from "native-base";

export default class CompanyInfoScreen extends React.Component {
  // async componentDidMount() {
  //   var hasLocationPermission;

  //   async function requestLocationPermission() {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: "Cool Photo App Camera Permission",
  //           message: "Shri Somnath needs to access your location"
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         hasLocationPermission = true;
  //       } else {
  //         hasLocationPermission = false;
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }

  //   await requestLocationPermission();
  //   // Instead of navigator.geolocation, just use Geolocation.
  //   if (hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         console.log(position);
  //       },
  //       error => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   }
  // }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Info Screen</Text>
      </View>
    );
  }
}
