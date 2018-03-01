import React, { Component } from 'react'
import { InputItem, List, Picker, TextareaItem } from 'antd-mobile'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { cloneDeep, find, get, isEmpty, map } from 'lodash'
import { COOKBOOK_TYPES } from '../constants/cookbook'
import { connect } from 'react-redux';
import { addStep, updateCookbookDetail, updateCurrentStep } from '../store/cookbookDetail/action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsArea: {
    flex: 1,
    flexDirection: 'row',
  },
  stepsContent: {
    paddingHorizontal: 10,
  },
  buttonArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#108EE9',
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 0,
  },
  decreaseButton: {
    backgroundColor: '#E94F4F',
  },
  increaseButton: {},
  buttonText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 30,
  },
})

export const cookbookTypes = [
  {
    value: 'BREAKFAST',
    label: '早餐'
  },
  {
    value: 'LUNCH',
    label: '午餐'
  },
  {
    value: 'DINER',
    label: '晚餐'
  },
]

const mapStateToProps = (state) => ({
  cookbook: state.cookbookDetail.cookbook,
  currentStepContent: state.cookbookDetail.currentStepContent,
})

const mapDispatchToProps = {
  updateCurrentStep,
  addStep,
  updateCookbookDetail,
}

class CookbookAdd extends Component {
  static navigationOptions = {
    title: '新增佳肴',
    tabBarLabel: '新增佳肴',
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: COOKBOOK_TYPES.BREAKFAST,
      steps: [],
      notes: '',
    }
  }

  handleTypeChange = (type) => {
    console.log('type :', type);
    this.props.updateCookbookDetail({type: type[0]})
  }

  getTypeValue = (type) => {
    return get(find(cookbookTypes, { value: type || this.state.type }), 'value')
  }

  getRandomKey = () => Math.random()

  handleAddStep = () => {
    this.props.addStep()
  }

  handleCurrentStepChange = (text) => {
    this.props.updateCurrentStep(text)
  }

  renderSteps = () => {
    const {cookbook, currentStepContent} = this.props
    if (isEmpty(cookbook.steps)) {
      return (
        <List renderHeader={() => '第1步'}>
          <TextareaItem
            placeholder={'这里写步骤哦...'}
            autoHeight
            disabled
            onChange={this.handleCurrentStepChange}
          />
        </List>
      )
    }
    let i = 1

    return (
      <View>
        {cookbook.steps.map((step, index) => {
          return (
            <List renderHeader={() => `第${i++}步`} key={this.getRandomKey()}>
              <TextareaItem
                value={step.content}
                autoHeight
                disabled
              />
            </List>
          )
        })}
        <List renderHeader={() => `第${i}步`} key={this.getRandomKey()}>
          <TextareaItem
            placeholder={'这里写步骤哦...'}
            value={currentStepContent}
            autoHeight
            onChange={this.handleCurrentStepChange}
          />
        </List>
      </View>
    )
  }


  render() {
    console.log('render ...');
    const {cookbook} = this.props
    console.log('cookbook ', cookbook);
    return (
      <ScrollView>
        <InputItem
          clear
          error
          onErrorPress={() => Alert('clicked me')}
          value={cookbook.name}
          onChange={(name) => this.props.updateCookbookDetail({name})}
          placeholder="菜名"
        >
          名字
        </InputItem>
        <Picker
          data={cookbookTypes}
          value={[cookbook.type]}
          cols={1}
          title={'类型'}
          onOk={this.handleTypeChange}>
          <List.Item arrow="horizontal">类型</List.Item>
        </Picker>
        <List renderHeader={() => '备注'}>
          <TextareaItem
            title={'备注'}
            value={cookbook.notes}
            placeholder={'这里写备注哦...'}
            autoHeight
            onChange={(notes) => this.props.updateCookbookDetail({notes})}
          />
        </List>
        <List renderHeader={() => '步骤'}>
          <View style={styles.stepsContent}>

            {this.renderSteps()}

            <View style={styles.stepsArea}>
              <TouchableOpacity
                style={[styles.buttonArea, styles.decreaseButton]}
                onPress={() => {
                  const newSteps = cloneDeep(this.state.steps)
                  newSteps.push({})
                  this.setState({ steps: newSteps })
                }}
              >
                <Text style={styles.buttonText}>
                  删除上一步
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                title="+"
                style={styles.buttonArea}
                onPress={this.handleAddStep}
              >
                <Text style={styles.buttonText}>
                  添加
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </List>


      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookbookAdd)
