import React from 'react';

class Square extends React.Component{
  render(){
    return (
      <button
        className="square"
        onClick={this.props.onClick}
      >
        {this.props.data[this.props.rowIndex][this.props.columnIndex]}
      </button>
    );
  }
  
}
class BoardRow extends React.Component{
  render(){
    let squares=[];
    const data = this.props.data;
    for (let i = 0; i < data.length; i++) {
      squares.push(<Square key={i} rowIndex={this.props.rowIndex} columnIndex={i} data={this.props.data} onClick={()=>{this.props.onClick(this.props.rowIndex, i)}}/>);
    }
    return(
      <div className="board-row">
        {squares}
      </div>
    );
  }
}

class Board extends React.Component{
  handleClick(i, j){
    this.props.onClick(i, j);
  }
  render(){
    let rows =[];
    const data  =this.props.data;
    for (let i = 0; i < data.length; i++) {
      rows.push(<BoardRow key={i} rowIndex={i} data={this.props.data} onClick={this.props.onClick}/>);
    }
    return (
      <div className='board'>
        {rows}
      </div>
    );
    
  }
}

export default Board;