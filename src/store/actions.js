export const activateGame = (game) => ({
  type: 'ACTIVATE_GAME',
  game
});

export const closeGame = () => ({
  type: 'CLOSE_GAME',
});

export const addMove = (item) => ({
  type: 'ADD_MOVE',
  item: item,
});