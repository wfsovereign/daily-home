import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Carousel } from 'antd-mobile';
import { ROUTES_CONFIG } from '../constants/routes';


export default class Home extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Home',
    tabBarLabel: 'Home',
  };

  onselectedIndexChange = (index) => {
    /* tslint:disable: no-console */
    console.log('change to', index);
  }

  render() {
    const tabs = [
      { title: 'First Tab' },
      { title: 'Second Tab' },
      { title: 'Third Tab' },
    ];
    const tabs2 = [
      { title: '1st Tab' },
      { title: '2nd Tab' },
      { title: '3rd Tab' },
      { title: '4th Tab' },
      { title: '5th Tab' },
      { title: '6th Tab' },
      { title: '7th Tab' },
      { title: '8th Tab' },
      { title: '9th Tab' },
    ];
    return (
      <View style={styles.container}>
        <View style={{padding: 15}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>今日推荐</Text>
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

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
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
