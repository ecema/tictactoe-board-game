import { combineReducers } from 'redux';
const initialState =
{
  moves: ["", "", "", "", "", "", "", "", ""],
  history: [],
  winnerLine: [],
  score: { x: 0, o: 0 },
  endGame: false,
  isDraw: false,
}

export const game = (state = initialState, action) => {
  switch (action.type) {
    case 'RESTART_GAME':
      return {
        ...state,
        moves: ["", "", "", "", "", "", "", "", ""],
        history: [],
        winnerLine: [],
        endGame: false,
        isDraw: false
      }

    case 'ADD_MOVE':
      let modified = state.moves
      let modifiedHistory = state.history
      modified[action.item.rowCol] = action.item.item
      modifiedHistory[action.item.move] = action.item.rowCol
      return { ...state, moves: modified, history: modifiedHistory }

    case 'SET_DRAW':
      return { ...state, isDraw: true, endGame: true }

    case 'UPDATE_SCORE':
      let score = state.score
      score[action.item.winnerKey] = score[action.item.winnerKey] + 1
      return { ...state, winnerLine: action.item.winnerLine, score: score, isDraw: false, endGame: true }


    case 'GO_HISTORY':
      let some = state.moves
      let someHistory = state.history
      some.forEach((element, i) => {
        if (!someHistory.slice(0, action.item.index + 1).includes(i)) some[i] = ""
      });
      return { ...state, history: someHistory.slice(0, action.item.index + 1) }

    case 'RESET_GAME':
      return {
        moves: ["", "", "", "", "", "", "", "", ""],
        history: [],
        winnerLine: [],
        score: { x: 0, o: 0 },
        endGame: false,
        isDraw: false,
      }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  game,
});