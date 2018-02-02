import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'antd-mobile';

export default class Home extends React.Component {
  render() {
    console.log('home page -----');
    return (
      <View style={styles.container}>
        <Text>Home page</Text>
        <Text>hello world</Text>
        <Button type="primary" onClick={() => this.props.navigation.navigate('cookbook')}>antd-mobile button</Button>
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
