import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'antd-mobile';
import { ROUTES_CONFIG } from '../constants/routes';

const Item = List.Item;
const Brief = Item.Brief;

export default class Cookbook extends React.Component {
  static navigationOptions = {
    title: ROUTES_CONFIG.COOKBOOK.title
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List renderHeader={() => 'my cookbook list'}>
          <Item arrow="horizontal"
                onClick={() => {navigate(ROUTES_CONFIG.COOKBOOK_DETAIL.name, { name: '红烧狮子头' })}}>红烧狮子头</Item>
          <Item arrow="horizontal"
                onClick={() => {navigate(ROUTES_CONFIG.COOKBOOK_DETAIL.name, { name: '红烧兔子🐰' })}}>红烧兔子🐰</Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
