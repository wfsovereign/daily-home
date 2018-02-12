import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, TabBar, Tabs } from 'antd-mobile';
import { get } from 'lodash'
import { ROUTES_CONFIG } from '../constants/routes';
import { PAGE_NAMES } from '../constants/page';
import CookbookAdd from '../cookbook/add';

const friendIcon = require('../images/friend.png');
const friendSelectedIcon = require('../images/friend_sel.png');
const meIcon = require('../images/avatarSmallBlack.png');
const meSelectedIcon = require('../images/avatarSmallBlue.png');

const Item = List.Item;

const NAV_TABS = [
  { title: '早餐' },
  { title: '午餐' },
  { title: '晚餐' },
];

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: get(navigation, 'state.params.title', PAGE_NAMES.HOME.value),
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: PAGE_NAMES.HOME.value,
    };
  }

  isTabSelected = (name) => {
    return this.state.selectedTab === name
  }

  updatePageTitle = (title) => {
    this.props.navigation.setParams({ title })
  }

  renderNavTabContent = (tab, index) => {
    const { navigate } = this.props.navigation;

    const content = (
      <List>
        <Item arrow="horizontal"
              onClick={() => {navigate(ROUTES_CONFIG.COOKBOOK_DETAIL.name, { name: '红烧狮子头' })}}>红烧狮子头</Item>
        <Item arrow="horizontal"
              onClick={() => {navigate(ROUTES_CONFIG.COOKBOOK_DETAIL.name, { name: '红烧兔子🐰' })}}>红烧兔子🐰</Item>
      </List>
    )

    return <ScrollView style={{ backgroundColor: '#fff' }}>
      {content}
    </ScrollView>;
  }

  renderPageContent = (pageText) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <View style={{ flex: 2 }}>
          <Tabs
            tabs={NAV_TABS}
            initialPage={0}
            tabBarPosition="top"
          >
            {this.renderNavTabContent}
          </Tabs>
        </View>
      </View>
    );
  }

  renderAdminPage = () => {
    return (<CookbookAdd/>)
  }

  onChangeTab = (tabName) => {
    this.setState({
      selectedTab: tabName,
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="#fff">
          <TabBar.Item icon={friendIcon}
                       selectedIcon={friendSelectedIcon}
                       title={PAGE_NAMES.HOME.text}
                       selected={this.isTabSelected(PAGE_NAMES.HOME.value)}
                       onPress={() => {
                         this.updatePageTitle(PAGE_NAMES.HOME.value)
                         this.onChangeTab(PAGE_NAMES.HOME.value)
                       }}>
            {this.renderPageContent()}
          </TabBar.Item>
          <TabBar.Item icon={meIcon}
                       selectedIcon={meSelectedIcon}
                       title={PAGE_NAMES.ADMIN.text}
                       selected={this.isTabSelected(PAGE_NAMES.ADMIN.value)}
                       onPress={() => {
                         this.updatePageTitle(PAGE_NAMES.ADMIN.value)
                         this.onChangeTab(PAGE_NAMES.ADMIN.value)
                       }}>
            {this.renderAdminPage()}
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
  navTab: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ddd',
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
