import React from 'react';
import InputForm from './InputForm';
import Board from './Board';
import './stylesheets/game.css';

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      xIsNext: true,
      winner: null,
      board_len: 10,
      num_to_win: 5,
      board_data: [],
    }
  }
  componentDidMount(){
    const origin_squares = Array.from(new Array(this.state.board_len), () => new Array(this.state.board_len).fill(null));
    this.setState({
      board_data: origin_squares
    });
  }

  handleClick(i, j){
    let squares = JSON.parse(JSON.stringify(this.state.board_data));

    if(this.state.winner || squares[i][j]){console.log('already');return;}
    squares[i][j]=this.state.xIsNext ? "X" : "O";
    let winner = calculateWinner(this.state.num_to_win, squares, i, j);
    console.log(winner);
    this.setState({board_data: squares, xIsNext: !this.state.xIsNext, winner: winner});
  }

  handleReloadBoarderLen(i){
    const len = Number(i);
    let num_to_win;
    const origin_squares = Array.from(new Array(len), () => new Array(len).fill(null));

    if(len<this.state.num_to_win){
      num_to_win = len;
    }else{
      num_to_win = this.state.num_to_win;
    }
    this.setState({
      board_len: len, 
      num_to_win: num_to_win,
      board_data: origin_squares,
      winner: null,
    });

  }
  handleReloadWinToNum(i){
    const len = Number(i);
    let origin_squares;
    let board_len;
    if(len>this.state.board_len){
      origin_squares = Array.from(new Array(len), () => new Array(len).fill(null)); 
      board_len = len;     
    }else{
      origin_squares = Array.from(new Array(this.state.board_len), () => new Array(this.state.board_len).fill(null));
      board_len = this.state.board_len;
    }
    this.setState({
      num_to_win: len, 
      board_len: board_len,
      board_data: origin_squares,
      winner: null,
    });

  }

  render(){
    let player = this.state.xIsNext ? "X の番です" : "Oの番です";
    let size = "盤面：" + this.state.board_len +"x"+ this.state.board_len;
    let ruleToWin = "ルール：" + this.state.num_to_win + "目並べ";
    if(this.state.winner){
      player = this.state.winner + "の勝ちです";
    }
    return (
      <div className="contents">
        <div className="head">
          <div className="status">
            <div className="rule-status">
              <p>{size}</p>
              <p>{ruleToWin}</p>
            </div>
            <div className="player-status">
              <p>{player}</p>
            </div>
          </div>
        </div>
        <div className="game-board">
          <Board data={this.state.board_data} onClick={(i, j)=>{this.handleClick(i,j)}}/>
        </div>
        <div className="inputForm">
          <InputForm onClick={(i)=>{this.handleReloadBoarderLen(i)}} name="盤面の大きさを入力してください："/>
          <InputForm onClick={(i)=>{this.handleReloadWinToNum(i)}} name="何目並べにしますか：　　　　　　"/>
        </div>
      </div>
    );
  }
}

export default Game;

// --Functions---
function calculateWinner(num, data, row, column){
  // check row
  for (let j = 0; j <= data.length-num; j++) {
    if(!data[row][j]){
    }else{
      let count=0;
      for (let add = 1; add < num; add++) {
        if(data[row][j+add]!==data[row][j]){
          count=0;
        }else{
          count++;
        }
        if(count+1===num){ 
          console.log('row win!!');
          return data[row][column];
        }
      }
    }  
  }
  let return_val;
  //check column
  for (let i = 0; i <= data.length-num; i++) {
    if(!data[i][column]){
    }else{
      let count=0;
      for (let add = 1; add < num; add++) {
        if(data[i+add][column]!==data[i][column]){
          count=0;
        }else{
          count++;
        }
        if(count+1===num){ 
          console.log('column win!!');
          return data[row][column];
        }
      }
    }  
  }
  //check left diagonal
  const diff = row-column;
  if(diff >= 0){
    return_val=cross(num, data, row-column, 0);
  }else{
    return_val=cross(num, data, 0, Math.abs(diff));
  }
  if(return_val){return return_val;}
  //check right diagonal
  const sum = row + column;
  if(sum <= data.length){
    return_val=reverseCross(num, data, 0, sum);
  }else{
    return_val=reverseCross(num, data, sum-data.length, data.length);
  }
  if(return_val){return return_val;}

  return null;
}

function cross(num, data, startRow, startColumn){
  for (let row = startRow, column=startColumn; row <= data.length-num && column <= data.length-num; row++, column++) {
    let count = 0;
    for(let addR=1, addC=1; addR<num; addR++, addC++){
      if(data[row][column]){
        if(data[row+addR][column+addC]!==data[row][column]){
          count=0;
        }else{
          count++;
        }
        if(count+1===num){ 
          console.log('left diagonal win!!');
          return data[row][column];
        }
      }
    }
  }
}
function reverseCross(num, data, startRow, startColumn){
  for (let row = startRow, column=startColumn; row <= data.length-num && column >= num-1; row++, column--) {
    let count = 0;
    for(let addR=1, subC=1; addR<num; addR++, subC++){
      if(data[row][column]){
        if(data[row+addR][column-subC]!==data[row][column]){
          count=0;
        }else{
          count++;
        }
        if(count+1===num){ 
          console.log('right diagonal win!!');
          return data[row][column];
        }
      }
    }
  }
}