import React from 'react';
import './App.css';
import {randomAttributes, convertToScale} from './utils/utilities';
import Input from './components/Input';
import Attributes from './components/Attributes';
import axios from 'axios';

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
          // handleClick={this._axiosAttributes}  
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
  _axiosAttributes = async () =>{
    const body = {
      "user_id": "e660e712",
      "user_key": "ab3e4bdf-0b3d-4112-bcab-ae05112caceb",
      "text": `${this.state.text}`
    }
    const attributes = await axios({
      method: 'post',
      url: 'https://my-little-cors-proxy.herokuapp.com/https://api.codeq.com/v1',
      data: JSON.stringify(body)
    })
    .catch(function (error) {
      console.log(error);
    })
    this.setState({
      attributes : {
        "emotions": [attributes.data.sentences[0].emotions[0]],
        "sentiments": [attributes.data.sentences[0].sentiments[0]]
      }
    },
    () => {
      console.log(this.state.attributes);
      this._setScore()
    })
  }
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
