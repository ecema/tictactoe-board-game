import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { restartGame, resetGame, addMove, goHistory, updateScore, setDraw, setOption } from './store/actions';
import './App.css'

export class App extends React.Component {

  render() {

    let items = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
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

    const getMoveCount = () => {
      return this.props.game.history.length;
    }

    const ai = (moves) => {
      for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (moves[a] === "" && moves[b] === "x" && moves[c] === "x") {
          this.props.addMove({ rowCol: a, item: "o", move: getMoveCount() });
          return
        } else if (moves[a] === "x" && moves[b] === "" && moves[c] === "x") {
          this.props.addMove({ rowCol: b, item: "o", move: getMoveCount() });
          return
        } else if (moves[a] === "x" && moves[b] === "x" && moves[c] === "") {
          this.props.addMove({ rowCol: c, item: "o", move: getMoveCount() });
          return
        }
      }

      for (let i = 0; i < moves.length; i += 1) {
        if (moves[i] === "") {
          this.props.addMove({ rowCol: i, item: "o", move: getMoveCount() });
          return
        }
      }

    }
    const check = (moves) => {
      for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c])
          this.props.updateScore({ winnerKey: moves[a], winnerLine: lines[i] })
        else if (getMoveCount() === 8) this.props.setDraw();
      }
    }
    const checkWinner = (moves, i, index) => {

      this.props.addMove({ rowCol: i * 3 + index, item: getMoveCount() % 2 === 0 || this.props.game.versusAI ? "x" : "o", move: getMoveCount() });

      // axios.post('http:// 209.250.251.187/api/v1/task', { "action": `Move triggered(${moveCount % 2 === 0 ? 'X' : 'O'}) (${i},${index})` })
      //   .then(response => {
      //     alert(response.status + " : " + response.message);
      //   })

      if (!this.props.game.versusAI) {
        check(moves)
      } else {
        setTimeout(function () {
          ai(moves);
          check(moves)
        }, 200)
      }

    };
    return (
      <div className="app" >
        <div className="row">
          <button className="button"
            disabled={this.props.game.score.x === 0 && this.props.game.score.o === 0}
            onClick={() =>
              this.props.resetGame()
            }
          >
            Reset Score
          </button>
          <button className="button"
            disabled={getMoveCount() === 0}
            onClick={() =>
              this.props.restartGame()
            }
          >
            {this.props.game.isDraw ? "DRAW - " : null}
            Restart Game
          </button>
          <button className="button"
            onClick={() => { this.props.setOption(); this.props.restartGame(); }}
          >
            {this.props.game.versusAI ? "Two Players" : "Versus AI"}
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
          getMoveCount() > 0 ?
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
      </div >
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
  setDraw,
  setOption
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;