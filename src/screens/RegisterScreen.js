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
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(1);
  }

  state = {
    email: "",
    password: "",
    verifyPassword: "",
    errorMessage: null
  };

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.5
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("success");
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        var errorCode = error.code;
        console.log(error.message);
        Toast.show({
          text: error.message,
          buttonText: "Okay",
          duration: 3000
        });
        this.setState({ errorMessage: error.message });
      });
  };

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };
    const { email, password, verifyPassword } = this.state;
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
              <Item
                rounded
                style={[styles.itemMargin, styles.borderBlue]}
                success={email.match(/\S+@\S+\.\S+/) !== null}
              >
                <Icon active name="person" style={{ color: "#21409A" }} />
                <Input
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  value={email}
                />
                {email.match(/\S+@\S+\.\S+/) === null ? (
                  email.length > 1 && (
                    <Icon
                      name="close-circle"
                      onPress={() => this.setState({ email: "" })}
                    />
                  )
                ) : (
                  <Icon name="checkmark-circle" />
                )}
              </Item>
              <Item
                rounded
                style={[styles.itemMargin, styles.borderBlue]}
                success={password === verifyPassword}
              >
                <Icon active name="lock" style={{ color: "#21409A" }} />
                <Input
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                />
                {password === verifyPassword
                  ? password.length > 1 && <Icon name="checkmark-circle" />
                  : password.length > 1 && (
                      <Icon
                        name="close-circle"
                        onPress={() => this.setState({ password: "" })}
                      />
                    )}
              </Item>
              <Item
                rounded
                style={[styles.itemMargin, styles.borderBlue]}
                success={password === verifyPassword}
              >
                <Icon active name="lock" style={{ color: "#21409A" }} />
                <Input
                  placeholder="Verify Password"
                  secureTextEntry={true}
                  onChangeText={verifyPassword =>
                    this.setState({ verifyPassword })
                  }
                  value={verifyPassword}
                />
                {password === verifyPassword
                  ? verifyPassword.length > 1 && (
                      <Icon name="checkmark-circle" />
                    )
                  : verifyPassword.length > 1 && (
                      <Icon
                        name="close-circle"
                        onPress={() => this.setState({ verifyPassword: "" })}
                      />
                    )}
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
                  disabled={
                    !(
                      email.match(/\S+@\S+\.\S+/) !== null &&
                      password === verifyPassword &&
                      password.length > 1
                    )
                  }
                  onPress={this.handleSubmit}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    REGISTER
                  </Text>
                </Button>
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text
              style={[styles.itemMargin, { textAlign: "center", fontSize: 16 }]}
            >
              <Text>Already have an account? </Text>
              <Text
                onPress={() => this.props.navigation.navigate("Login")}
                style={{ fontWeight: "bold", color: "#21409A" }}
              >
                LOG IN
              </Text>
            </Text>
          </Content>
        </Container>
      </Root>
    );
  }
}
