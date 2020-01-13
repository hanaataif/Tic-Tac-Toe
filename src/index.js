
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

    const name = "square "+ (props.value === 'X' ? "squareBlue" : "");
    const style = (props.highlight) ? name+" box" : name;
    return (  
      <button className={style} onClick={props.onClick}  >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      const lines = this.props.lines;
      return (
        <Square
          key ={i}
          highlight = {lines && lines.includes(i)}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true
      };
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      const winInfo = calculateWinner(squares);
      if (winInfo.winner || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
    }
  
   restart(){
    this.setState({
        squares: Array(9).fill(null),

   })}
  
    render() {
      const squares = this.state.squares.slice();
      const winInfo = calculateWinner(squares);
      const winner = winInfo.winner;
   
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
      if(squares.every(element => element != null) && !winner){
         status = "Game ended in a draw";
       }
        
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={squares}
              onClick={i => this.handleClick(i)}
              lines = {winInfo.lines}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button className="restart"onClick ={()=> this.restart()}>Restart</button>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return{ winner: squares[a],
          lines: lines[i],
      };
    }}
    return {
      winner: null,
      lines: null,
    };
  }
  
  
  