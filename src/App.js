import React from 'react';
import './App.css';
import {randomAttributes, convertToScale} from './utils/utilities';
import Input from './components/Input';
import Attributes from './components/Attributes';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      inputText : '',
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
        <Input handleClick={this._generateAttributes} setScore={this._setScore} />
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
  _setScore = () => {
    const emotionalScore = convertToScale(this.state.attributes).toString()

    this.setState({
      emotionalScore
    })
  }
}

export default App;
