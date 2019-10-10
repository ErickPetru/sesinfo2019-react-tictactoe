import React from 'react';
import Board from './Board';
import './Game.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      stepNumber: 0,
      currentPlayer: 'X',
      winner: null
    };
  }

  hasWinner() {
    if (this.state.winner) return true;

    const squares = this.state.squares;
    const matches = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
      [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < matches.length; i++) {
      const [a, b, c] = matches[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        this.setState({ winner: [ a, b, c ] });
        return true;
      }
    }

    return false;
  }

  restart() {
    this.setState({
      squares: Array(9).fill(null),
      stepNumber: 0,
      currentPlayer: this.state.currentPlayer,
      winner: null
    });
  }

  click(i) {
    const squares = this.state.squares;
    if (squares[i] || this.state.winner) return;

    squares[i] = this.state.currentPlayer;
    this.setState({ squares: squares });

    if (!this.hasWinner()) {
      this.setState({
        stepNumber: this.state.stepNumber + 1,
        currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
      });
    }
  }

  render() {
    let info;
    if (this.state.stepNumber === 0)
      info = (<p>
        Vamos começar! Vai lá&nbsp;
        <b className={this.state.currentPlayer}>
          {this.state.currentPlayer}
        </b>!
      </p>);
    else if (this.state.winner)
      info = (<p>
        O vencedor foi:&nbsp;
        <b className={this.state.currentPlayer}>
          {this.state.currentPlayer}
        </b>!&nbsp;
        <button onClick={i => this.restart(i)}>Jogar novamente</button>
      </p>);
    else if (this.state.stepNumber > 8)
      info = (<p>
        Deu velha!&nbsp;
        <button onClick={i => this.restart(i)}>Jogar novamente</button>
      </p>);
    else
      info = (<p>
        Agora é a vez do jogador&nbsp;
        <b className={this.state.currentPlayer}>
          {this.state.currentPlayer}
        </b>&nbsp;atuar.
      </p>);

    return (
      <div className="game">
        <div className="game-area">
          <div className="game-title">
            <img src="logo.svg" alt="React" />
            <h1>Jogo da Velha</h1>
          </div>

          <Board
            squares={this.state.squares}
            winner={this.state.winner}
            onClick={i => this.click(i)}
          />
          <div className="game-info">{info}</div>
        </div>
      </div>
    );
  }
}
