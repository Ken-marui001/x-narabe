import React from 'react'

class InputForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      num: 0,
    };
  }

  handleNumChange(event) {
    const inputValue = event.target.value;
    this.setState({
      num: inputValue,
    });
  }
  render(){
    return(
      <div>
        <label>{this.props.name}</label>
        <input 
          value={this.state.num}
          onChange={(event) => {this.handleNumChange(event)}}
        />
        <button
          type = "submit"
          value = "変更"
          onClick ={()=>{
            console.log('akasatana') 
            this.props.onClick(this.state.num)}}
        >更新</button>
      </div>
    );
  }
}

export default InputForm;