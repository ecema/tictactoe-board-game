import React from 'react';
import { connect } from 'react-redux';
import { restartGame, resetGame, addMove, goHistory, updateScore, setDraw } from './store/actions';
import './App.css'

export class App extends React.Component {

  render() {
    let items = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    let moveCount = this.props.game.history.length;

    const checkWinner = (moves, i, index) => {
      this.props.addMove({ rowCol: i * 3 + index, item: moveCount % 2 === 0 ? "x" : "o", move: moveCount });

      //axios


      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c])
          this.props.updateScore({ winnerKey: moves[a], winnerLine: lines[i] })
        else if (moveCount === 8) this.props.setDraw();
      }
    };
    return (
      <div className="app">
        <div className="row">
          <button className="button"
            disabled={this.props.game.score.x === 0 && this.props.game.score.o === 0}
            onClick={() =>
              this.props.resetGame()
            }
          >
            Reset Game
          </button>
          <button className="button"
            disabled={moveCount === 0}
            onClick={() =>
              this.props.restartGame()
            }
          >
            {this.props.game.isDraw ? "DRAW - " : null}
            Restart
          </button>
        </div>

        <span className="winner-input">{this.props.game.score.x} - {this.props.game.score.o}</span>

        <table id="table" >
          <tbody>
            {items.map((item, i) => {
              return <tr key={i}>
                {item.map((col, index) => {
                  return <td className={this.props.game.winnerLine.includes(i * 3 + index) ? "winner-input" : "input"}
                    key={index}
                    onClick={() =>
                      !this.props.game.history.includes(i * 3 + index) && !this.props.game.endGame ?
                        checkWinner(this.props.game.moves, i, index) :
                        null
                    }
                  >
                    {this.props.game.moves[i * 3 + index]}
                  </td>
                })}
              </tr>
            })}
          </tbody>
        </table>
        {
          moveCount > 0 ?
            <div>
              <div className="row">
                <span className="text">Go to move # </span>
                {this.props.game.history.map((move, i) => {
                  return <button className="history-button" key={i} onClick={() => this.props.goHistory({ index: i })}>{i + 1}
                    ({Math.floor(move / 3)},{move % 3})</button>
                })}
              </div>

            </div>
            : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = {
  restartGame,
  resetGame,
  addMove,
  goHistory,
  updateScore,
  setDraw
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;