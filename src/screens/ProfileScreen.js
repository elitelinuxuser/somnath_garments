import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import auth from "@react-native-firebase/auth";
import { StackActions, NavigationActions } from "react-navigation";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

export default class ProfileScreen extends React.Component {
  handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        // this.props.navigation.navigate("Login");
        this.props.navigation.dispatch(resetAction);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <Button onPress={this.handleLogout}>
          <Text>Logout</Text>
        </Button>
      </View>
    );
  }
}
