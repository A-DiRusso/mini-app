import React from 'react';
import './App.css';
import {randomAttributes, convertToScale} from './utils/utilities';
import Input from './components/Input';
import Attributes from './components/Attributes';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      attributes : null,
      emotionalScore : 0
    };
  }
  render() {
    return (
      <div className="App">
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
    const emotionalScore = convertToScale(this.state.attributes)
    this.setState({
      emotionalScore
    })
  }
}

export default App;
