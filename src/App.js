import React from 'react';
import './App.css';
import {randomAttributes, convertToScale} from './utils/utilities';
import Input from './components/Input';
import Attributes from './components/Attributes';
import axios from 'axios';
import invert from 'invert-color';

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
      "-1" : "#B30C34",
      "-0.75": "#FF4571",
      "-0.5": "#FF45FF",
      "-0.25": "FF45CA",
      "-0.3": "#921EB3",
      "0" : "#E27BFF",
      "0.25" : "#4566FF",
      "0.3" : "#01B33A",
      "0.5" : "#4CB306",
      "0.75" : "#FFF419",
      "1" : "#FFD207",
    };
    this.styleAttributes = {color: invert(colorTheory[this.state.emotionalScore])};
    this.styleInputs = {color: (colorTheory[this.state.emotionalScore]), backgroundColor: invert(colorTheory[this.state.emotionalScore])};
    // this.styleAttributes = {color: "#FFD207"};
    // const styles = {backgroundColor : colorTheory[this.state.emotionalScore], height: "100%"};
    {this.state.emotionalScore 
      ? 
        document.body.style.backgroundColor = colorTheory[this.state.emotionalScore] 
      : 
        document.body.style.backgroundColor = "white";}
    // document.body.style.backgroundColor = colorTheory[this.state.emotionalScore];
    return (
      <div className="App">
        <Input
          styleInputs={this.styleInputs}
          text={this.state.inputText} 
          handleChange={this._setText}
          handleClick={this._generateAttributes}  
          // handleClick={this._axiosAttributes}  
          setScore={this._setScore} 
        />
        {this.state.emotionalScore
          ? 
            <Attributes 
            emotionalScore={this.state.emotionalScore} 
            styles={this.styleAttributes} 
            attributes={this.state.attributes} 
            /> 
          : 
            null
        }
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
