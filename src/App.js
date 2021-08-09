import React from 'react';
import { connect } from 'react-redux';
import { activateGame, closeGame, addMove } from './store/actions';
import './App.css'

let items = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
let data = ["x", "o", "x", "o", "x", "o", "x", "o", "o"];
let moveCount = 0;
export class App extends React.Component {

  render() {
    return (
      <div className="App">
        <table id="table">
          {items.map((item, i) => {
            return <tr key={i}>
              {item.map((col, index) => {
                return <td className="input" key={index} onClick={() => {
                  this.props.addMove({ rowCol: i * 3 + index, item: moveCount % 2 === 0 ? "x" : "o" });
                  moveCount++;
                }
                }>
                  {this.props.game.moves[i * 3 + index]}
                </td>
              })}
            </tr>
          })}

        </table>
        <h1>{this.props.game.title ? this.props.game.title[0] + "," + this.props.game.title[1] : 'Hello World!'}</h1>

        {this.props.game.title ? (
          <button onClick={this.props.closeGame}>Exit Game</button>
        ) : (
          <button
            onClick={() =>
              this.props.activateGame({ title: 'I am a geo dude!' })
            }
          >
            Click Me!
          </button>
        )}
      </div>
    );
  }
}

// AppContainer.js
const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = {
  activateGame,
  closeGame,
  addMove
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;