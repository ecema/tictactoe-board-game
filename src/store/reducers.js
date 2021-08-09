import { combineReducers } from 'redux';
const initialState =
  { moves: ["", "", "", "", "", "", "", "", ""] }

export const game = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVATE_GAME':
      return action.game;
    case 'ADD_MOVE':
      let modified = state.moves
      modified[action.item.rowCol] = action.item.item

      return { moves: modified }
    case 'CLOSE_GAME':
      return {};
    default:
      return state;
  }
};

export const reducers = combineReducers({
  game,
});