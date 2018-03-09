import React, { Component } from 'react'
import { InputItem, List, Picker, TextareaItem } from 'antd-mobile'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { cloneDeep, find, get, isEmpty, map } from 'lodash'
import { COOKBOOK_TYPES } from '../constants/cookbook'
import { connect } from 'react-redux';
import { addStep, saveCookbook, updateCookbookDetail, updateCurrentStep } from '../store/cookbookDetail/action';
// import { ImagePicker as RNImagePicker } from 'react-native-image-picker'
import RNImagePicker from 'react-native-image-picker'
// const RNImagePicker = require('react-native-image-picker');
import deleteRedIcon from '../images/deleteRed/deleteRed.png'

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
  addButtonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  addButton: {
    width: 40,
    backgroundColor: '#108EE9',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
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
  imageArea: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  image: {
    width: 80,
    height: 80,
  },
  deleteImageArea: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  operationArea: {
    marginTop: 50,
  }
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
  saveCookbook,
}

const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
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
      files: [],
      imageSource: { uri: '' }
    }
  }

  handleTypeChange = (type) => {
    console.log('type :', type);
    this.props.updateCookbookDetail({ type: type[0] })
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

  handleAddImageClick = () => {
    RNImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log('souce :', JSON.stringify(sou));
        //
        // this.setState({
        //   avatarSource: source
        // });
        this.props.updateCookbookDetail({ imageSource: source })
        this.setState({ imageSource: source })
      }
    });
  }

  handleSaveClick = () => {
    this.props.saveCookbook()
  }

  renderSteps = () => {
    const { cookbook } = this.props
    if (isEmpty(cookbook.steps)) {
      return
    }

    return (
      <View>
        {cookbook.steps.map((step, index) => {
          return (
            <List renderHeader={() => `第${index + 1}步`} key={this.getRandomKey()}>
              <TextareaItem
                value={step.content}
                autoHeight
                disabled
              />
            </List>
          )
        })}
      </View>
    )
  }

  renderCurrentStepContent = () => {
    const { cookbook, currentStepContent } = this.props
    const currentStepNumber = get(cookbook, 'steps.length', 0) + 1

    return (
      <List renderHeader={() => `第${currentStepNumber}步`}>
        <TextareaItem
          placeholder={'这里写步骤哦...'}
          value={currentStepContent}
          autoHeight
          disabled
          onChange={this.handleCurrentStepChange}
        />
      </List>
    )
  }

  renderCookbookImage = () => {
    const imageSource = this.props.cookbook.imageSource
    if (isEmpty(imageSource.uri)) {
      return (
        <View style={styles.imageArea}/>
      )
    }
    return (
      <View style={styles.imageArea}>
        <Image
          style={styles.image}
          resizeMode={'stretch'}
          source={imageSource}
        />
        <View style={styles.deleteImageArea}>
          <TouchableOpacity
            onPress={() => {
              this.props.updateCookbookDetail({ imageSource: {} })
              this.setState({ imageSource: {} })
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              resizeMode={'stretch'}
              source={deleteRedIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { cookbook } = this.props
    const { files } = this.state;

    return (
      <ScrollView>
        <InputItem
          clear
          defualtValue={cookbook.name}
          onChange={(name) => {
            this.props.updateCookbookDetail({ name })
          }}
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
            onChange={(notes) => this.props.updateCookbookDetail({ notes })}
          />
        </List>
        <List renderHeader={() => '步骤'}>
          <View style={styles.stepsContent}>

            {this.renderSteps()}
            {this.renderCurrentStepContent()}

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
        <List renderHeader={() => '添加图片'}>
          {this.renderCookbookImage()}
        </List>
        <View style={styles.addButtonArea}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={this.handleAddImageClick}
          >
            <Text style={styles.addButtonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.operationArea}>
          <TouchableOpacity
            style={styles.buttonArea}
            onPress={this.handleSaveClick}
          >
            <Text style={styles.buttonText}>
              保存
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookbookAdd)
