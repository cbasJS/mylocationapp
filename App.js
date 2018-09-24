import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import axios from "axios";

export default class App extends React.Component {
  constructor(args) {
    super(args);
    this.state = {
      ipInfo: [],
      isClick: false
    };
  }
  componentDidMount() {
    axios.get("http://ip-api.com/json").then(res =>
      this.setState({
        ipInfo: Object.keys(res.data).map(r => res.data[r])
      })
    );
  }
  _listIpInfo = () =>
    this.state.ipInfo.map((result, index) => <Text key={index}>{result}</Text>);
  _setClick = () =>
    this.setState(previousState => {
      return { isClick: !previousState.isClick };
    });
  render() {
    const { isClick } = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={this._setClick} title="Click me!" />
        {!isClick || this._listIpInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
