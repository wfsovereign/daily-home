import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Carousel, SearchBar, TabBar } from 'antd-mobile';
import { ROUTES_CONFIG } from '../constants/routes';

const friendIcon = require('../images/friend.png');
const friendSelectedIcon = require('../images/friend_sel.png');
const meIcon = require('../images/avatarSmallBlack.png');
const meSelectedIcon = require('../images/avatarSmallBlue.png');

export default class Demo extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Demo',
    tabBarLabel: 'Demo',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'greenTab',
    };
  }

  onselectedIndexChange = (index) => {
    console.log('change to', index);
  }

  renderContent = (pageText) => {
    return (<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <SearchBar placeholder="Search" maxLength={8}/>

      <Text style={{ margin: 50 }}>{pageText}</Text>
    </View>);
  }

  onChangeTab = (tabName) => {
    this.setState({
      selectedTab: tabName,
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>今日推荐</Text>
        </View>
        <Carousel style={styles.wrapper}
                  autoplayTimeout={2}
                  selectedIndex={2}
                  autoplay
                  infinite
                  afterChange={this.onselectedIndexChange}>
          <View style={[styles.tabItem, { backgroundColor: 'red' }]}>
            <Text>Carousel 1</Text>
          </View>
          <View style={[styles.tabItem, { backgroundColor: 'blue' }]}>
            <Text>Carousel 2</Text>
          </View>
          <View style={[styles.tabItem, { backgroundColor: 'yellow' }]}>
            <Text>Carousel 3</Text>
          </View>
          <View style={[styles.tabItem, { backgroundColor: 'black' }]}>
            <Text>Carousel 4</Text>
          </View>
          <View style={[styles.tabItem, { backgroundColor: '#ccc' }]}>
            <Text>Carousel 5</Text>
          </View>
        </Carousel>


        <Button type="primary" onClick={() => this.props.navigation.navigate(ROUTES_CONFIG.COOKBOOK.name)}>
          菜谱，go!
        </Button>
        <Button type="primary" onClick={() => this.props.navigation.navigate(ROUTES_CONFIG.COOKBOOK.name)}>
          管理菜谱，go!
        </Button>

        <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="#fff">
          <TabBar.Item icon={friendIcon}
                       selectedIcon={friendSelectedIcon}
                       title="朋友"
                       selected={this.state.selectedTab === 'greenTab'}
                       onPress={() => this.onChangeTab('greenTab')}>
            {this.renderContent('朋友 Tab')}
          </TabBar.Item>
          <TabBar.Item icon={meIcon}
                       selectedIcon={meSelectedIcon}
                       title="我的"
                       selected={this.state.selectedTab === 'yellowTab'} onPress={() => this.onChangeTab('yellowTab')}>
            {this.renderContent('我的 Tab')}
          </TabBar.Item>
        </TabBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  tabItem: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  tabItemText: {
    height: 150,
    width: 300
  }
});
