import React from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Home from '../home/home';
import Cookbook from '../cookbook/list';
import { connect } from 'react-redux';
import CookbookDetail from '../cookbook/detail';
import { ROUTES_CONFIG } from '../constants/routes';

export const AppNavigator = StackNavigator({
  [ROUTES_CONFIG.HOME.name]: { screen: Home, path: ROUTES_CONFIG.HOME.path },
  [ROUTES_CONFIG.COOKBOOK.name]: { screen: Cookbook, path: ROUTES_CONFIG.COOKBOOK.path },
  [ROUTES_CONFIG.COOKBOOK_DETAIL.name]: {
    screen: CookbookDetail,
    path: ROUTES_CONFIG.COOKBOOK_DETAIL.path,
    navigationOptions: ({ navigation }) => ({
      title: ROUTES_CONFIG.COOKBOOK_DETAIL.title(navigation)
    })
  },
}, {
  initialRouteName: ROUTES_CONFIG.HOME.name,
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  // lastAction: state.lastAction,
});

export default connect(mapStateToProps)(AppWithNavigationState);
