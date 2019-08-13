import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";
import OrderScreen from "./OrderScreen";
import CompanyInfoScreen from "./CompanyInfoScreen";
import ProfileScreen from "./ProfileScreen";

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#21409A"
  },
  notActive: {
    backgroundColor: "#21409A",
    opacity: 0.4
  },
  activeText: {
    fontSize: 28
  }
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 1,
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center"
    },
    headerStyle: {
      backgroundColor: "#21409A"
    },
    headerRight: <View />,
    headerLeft: <View />
  };

  state = {
    activeTab: "Orders"
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Container>
        <Content>
          {activeTab === "Orders" && <OrderScreen />}
          {activeTab === "Info" && <CompanyInfoScreen />}
          {activeTab === "Profile" && <ProfileScreen {...this.props} />}
        </Content>
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={activeTab === "Orders"}
              style={activeTab === "Orders" ? styles.active : styles.notActive}
              onPress={() => this.setState({ activeTab: "Orders" })}
            >
              <Icon
                name="apps"
                style={{ color: "white" }}
                fontSize={activeTab === "Orders" && 28}
              />
              <Text style={{ color: "white" }}>Orders</Text>
            </Button>
            <Button
              vertical
              active={activeTab === "Info"}
              style={activeTab === "Info" ? styles.active : styles.notActive}
              onPress={() => this.setState({ activeTab: "Info" })}
            >
              <Icon
                name="information-circle"
                style={{ color: "white" }}
                fontSize={activeTab === "Info" && 28}
              />
              <Text style={{ color: "white" }}>Company Info</Text>
            </Button>
            <Button
              vertical
              active={activeTab === "Profile"}
              style={activeTab === "Profile" ? styles.active : styles.notActive}
              onPress={() => this.setState({ activeTab: "Profile" })}
            >
              <Icon
                name="person"
                style={{ color: "white" }}
                fontSize={activeTab === "Profile" && 28}
              />
              <Text style={{ color: "white" }}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default HomeScreen;
