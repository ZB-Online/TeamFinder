export default function createStore (initialState, reducer) {
  const INITIAL_STATE = initialState;
  let state = initialState;
  const listeners = [];

  const subscribe = eventCallback => {
    if (listeners.includes(eventCallback)) return;
    listeners.push(eventCallback);
  };

  const publish = () => {
    listeners.map(cb => cb());
  };

  const dispatch = action => {
    state = reducer(state, action, INITIAL_STATE);
    publish();
  };

  const getState = () => state;

  return {
    getState,
    subscribe,
    dispatch,
  };
}
