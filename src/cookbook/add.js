import React, { Component } from 'react'
import {InputItem} from 'antd-mobile'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class CookbookAdd extends Component {
  static navigationOptions = {
    title: '新增佳肴',
    tabBarLabel: '新增佳肴',
  };

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

  }


  render() {
    return (
      <ScrollView>
        <InputItem
          clear
          error
          onErrorPress={() => Alert('clicked me')}
          value={this.state.value}
          onChange={(value) => {
            this.setState({
              value,
            });
          }}
          extra="元"
          placeholder="有标签"
        >
          输入框
        </InputItem>
      </ScrollView>
    )
  }
}
