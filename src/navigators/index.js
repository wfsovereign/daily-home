import React from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Home from '../home/home';
import Cookbook from '../cookbook/list';
import { connect } from 'react-redux';
import CookbookDetail from '../cookbook/detail';

export const AppNavigator = StackNavigator({
  cookbook: { screen: Cookbook, path: 'cookbook' },
  home: { screen: Home, path: 'home' },
  cookbookDetail: { screen: CookbookDetail, path: 'cookbookDetail' }
}, {
  initialRouteName: 'home',
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  actionEventSubscribers = new Set();

  addListener = (eventName, handler) => {
    console.log('add listener');
    // eventName === 'action' && this.actionEventSubscribers.add(handler);
    return {
      // remove: () => {
      //   console.log('remove call');
      //   this.actionEventSubscribers.delete(handler);
      // },
    };
  };

  componentDidUpdate(lastProps) {
    const lastState = lastProps.nav;
    console.log('actionEventSubscribers ', this.actionEventSubscribers);
    // this.actionEventSubscribers.forEach(subscriber => {
    //   subscriber({
    //     lastState: lastProps.nav,
    //     state: this.props.nav,
    //     action: this.props.lastAction,
    //   });
    // });
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  // lastAction: state.lastAction,
});

export default connect(mapStateToProps)(AppWithNavigationState);
