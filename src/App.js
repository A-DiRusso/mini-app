import React from 'react';
import './App.css';
import {randomAttributes} from './utils/utilities';
import Input from './components/Input';
import Attributes from './components/Attributes';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      attributes : null
    };
  }
  render() {
    console.log("I did a render.");
    return (
      <div className="App">
        <Input handleClick={this._generateAttributes} />
        {this.state.attributes? <Attributes attributes={this.state.attributes} /> : null}
        {/* <Attributes attributes={this.state.attributes} /> */}
      </div>
    );
  }
  _generateAttributes = () => {
    const attributes = randomAttributes()
    this.setState({
      attributes : {...attributes}
    }) 
  }
}

export default App;
