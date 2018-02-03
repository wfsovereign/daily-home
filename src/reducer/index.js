import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('cookbook');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);
const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

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
  nav: navReducer,
  // auth,
});

export default AppReducer;
