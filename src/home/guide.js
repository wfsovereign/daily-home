import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ROUTES_CONFIG } from '../constants/routes';
import { Button } from 'antd-mobile';

export default class GuidePage extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome Home, My Princess</Text>
        <Button type="primary" onClick={() => this.props.navigation.navigate(ROUTES_CONFIG.HOME.name)}>
          Home，go!
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
