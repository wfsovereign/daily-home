import { AppNavigator } from '../../navigators'

export default (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state)
  return newState || state
}
