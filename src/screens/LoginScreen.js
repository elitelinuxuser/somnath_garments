import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import {
  Container,
  H1,
  Icon,
  Content,
  Form,
  Item,
  Input,
  View,
  Button,
  Toast,
  Root
} from "native-base";
import facebook from "../assets/images/facebook.png";
import auth from "@react-native-firebase/auth";

const styles = StyleSheet.create({
  itemMargin: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 1
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  borderBlue: {
    borderWidth: 1,
    borderColor: "#21409A"
  }
});

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    showToast: false
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.5
    }).start();
  };
  handlePressOut = () => {
    const { email, password } = this.state;
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("success");
        this.props.navigation.navigate("Home");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code);
        if (errorCode === "auth/invalid-email") {
          Toast.show({
            text: "Invalid Email!",
            buttonText: "Okay",
            duration: 3000
          });
        } else if (errorCode === "auth/wrong-password") {
          Toast.show({
            text: "Wrong Password, try again",
            buttonText: "Okay",
            duration: 3000
          });
        }
        // ...
      });
  };

  render() {
    const { email, password } = this.state;
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };
    return (
      <Root>
        <Container
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Content>
            <View style={{ alignItems: "center", marginBottom: 50 }}>
              <Image
                source={facebook}
                style={{ width: 50, height: 50, marginBottom: 8 }}
              />
              <H1>Somnath</H1>
            </View>
            <Form>
              <Item rounded style={[styles.itemMargin, styles.borderBlue]}>
                <Icon active name="person" style={{ color: "#21409A" }} />
                <Input
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  value={email}
                />
              </Item>
              <Item rounded style={[styles.itemMargin, styles.borderBlue]}>
                <Icon active name="lock" style={{ color: "#21409A" }} />
                <Input
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                />
              </Item>
            </Form>
            <TouchableWithoutFeedback
              onPressIn={this.handlePressIn}
              onPressOut={this.handlePressOut}
            >
              <Animated.View style={animatedStyle}>
                <Button
                  rounded
                  style={[
                    styles.itemMargin,
                    {
                      alignSelf: "center",
                      justifyContent: "center",
                      width: "80%"
                    }
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    LOGIN
                  </Text>
                </Button>
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text
              style={[styles.itemMargin, { textAlign: "center", fontSize: 16 }]}
            >
              <Text
                onPress={() =>
                  Toast.show({
                    text: "Wrong password!",
                    buttonText: "Okay"
                  })
                }
              >
                Don't have an account?{" "}
              </Text>
              <Text
                onPress={() => this.props.navigation.navigate("Register")}
                style={{ fontWeight: "bold", color: "#21409A" }}
              >
                SIGN UP
              </Text>
            </Text>
          </Content>
        </Container>
      </Root>
    );
  }
}
