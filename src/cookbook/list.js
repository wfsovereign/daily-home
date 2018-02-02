import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'antd-mobile';

export default class Cookbook extends React.Component {
  static navigationOptions = {
    title: 'Cookbook'
  };

  constructor(props) {
    super(props);
    console.debug('cook book constructor');
  }

  render() {
    console.debug('cook boox-----');
    return (
      <View style={styles.container}>
        <Text>Cookbook list</Text>
        <Button type="primary" onClick={() => this.props.navigation.navigate('main')}>antd-mobile button</Button>
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
});
