import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('cookbook');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav(state = {}, action) {
  let nextState;
  switch (action.type) {
    case 'home':
      // nextState = AppNavigator.router.getStateForAction(
      //   NavigationActions.back(),
      //   state
      // );
      break;
    case 'cookbook':
      // nextState = AppNavigator.router.getStateForAction(
      //   NavigationActions.navigate({ routeName: 'cookbook' }),
      //   state
      // );
      break;
    default:
      console.log('default :', action);
      console.log('default :', state);
      // nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

function lastAction(state = null, action) {
  return action;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'home':
      return { ...state, isLoggedIn: true };
    case 'cookbook':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  lastAction,
  nav,
  // auth,
});

export default AppReducer;
