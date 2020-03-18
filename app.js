const redux = require("redux");

const { createStore, combineReducers } = redux;

const countReducer = (state = 0, action) => {
  if (action.type === "INC") {
    state = state + 1;
  }
  if (action.type === "DEC") {
    state = state - 1;
  }
  return state;
};

const usersReducer = (state = [], action) => {
  if (action.type === "SET_USERS") {
    state = action.users;
  }
  if (action.type === "ADD_USER") {
    state = [...state, action.user];
  }
  if (action.type === "REMOVE_USER") {
    state = state.filter(user => user.id !== action.user.id);
  }
  if (action.type === "UPDATE_USER") {
    state = state.map(user =>
      user.id === action.user.id ? action.user : user
    );
  }
  return state;
};

const reducer = combineReducers({
  count: countReducer,
  users: usersReducer
});

const store = createStore(reducer);
// console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "INC" });

store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
store.dispatch({
  type: "SET_USERS",
  users: [
    { id: 1, name: "moe" },
    { id: 2, name: "lucy" }
  ]
});
store.dispatch({ type: "INC" });
store.dispatch({ type: "DEC" });

store.dispatch({ type: "ADD_USER", user: { id: 3, name: "Ethyl" } });
store.dispatch({ type: "REMOVE_USER", user: { id: 1, name: "Lucy" } });
store.dispatch({ type: "UPDATE_USER", user: { id: 3, name: "ETHYL" } });

unsubscribe();
