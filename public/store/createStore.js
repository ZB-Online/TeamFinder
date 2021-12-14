export default function createStore (initialState, reducer) {
  const INITIAL_STATE = initialState;
  let state = initialState;
  const events = {};

  const subscribe = (actionType, eventCallback) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eventCallback);
  };

  const publish = actionType => {
    if (!events[actionType]) {
      return;
    }
    events[actionType].map(cb => cb());
  };

  const dispatch = action => {
    state = reducer(state, action, INITIAL_STATE);
    publish(action.type);
  };

  const getState = () => state;

  return {
    getState,
    subscribe,
    dispatch,
  };
}
