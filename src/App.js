import React from 'react';
import './App.css';
import {randomAttributes, convertToScale} from './utils/utilities';
import Input from './components/Input';
import Attributes from './components/Attributes';
import { thisExpression } from '@babel/types';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      text : '',
      attributes : null,
      emotionalScore : 0
    };
  }
  render() {
    const colorTheory = {
      "-1" : "blue",
      "0" : "yellow",
      "1" : "red",
    };

    const styles = {backgroundColor : colorTheory[this.state.emotionalScore]};
    return (
      <div style={styles} className="App">
        <Input
          text={this.state.inputText} 
          handleChange={this._setText}
          handleClick={this._generateAttributes}  
          setScore={this._setScore} 
        />
        {this.state.emotionalScore? <Attributes emotionalScore={this.state.emotionalScore} attributes={this.state.attributes} /> : null}
      </div>
    );
  }
  _generateAttributes = () => {
    const attributes = randomAttributes()
    this.setState({
      attributes : {...attributes}
    },
    () => {
      this._setScore()
    })
  }
  // _axiosAttributes = async () =>{
  //   const attributes = await axios()
  //   this.setState({
  //     attributes : {...attributes}
  //   },
  //   () => {
  //     this._setScore()
  //   })
  // }
  _setScore = () => {
    const emotionalScore = convertToScale(this.state.attributes).toString()

    this.setState({
      emotionalScore
    })
  }
  _setText = (text) => {
    this.setState({
      text,
    })
    
  }
}

export default App;
