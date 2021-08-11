export const restartGame = (item) => ({
  type: 'RESTART_GAME',
  item
});

export const resetGame = () => ({
  type: 'RESET_GAME',
});

export const addMove = (item) => ({
  type: 'ADD_MOVE',
  item: item,
});

export const updateScore = (item) => ({
  type: 'UPDATE_SCORE',
  item: item,
});
export const setDraw = () => ({
  type: 'SET_DRAW'
});

export const goHistory = (item) => ({
  type: 'GO_HISTORY',
  item: item,
});