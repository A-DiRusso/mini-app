import React from 'react';
import './App.css';
import {randomAttributes, convertToScale} from './utils/utilities';
// import Input from './components/Input';
import Attributes from './components/Attributes';
import axios from 'axios';
// import invert from 'invert-color';
import LittleDude from './components/LittleDude';
import Speech from './components/Speech';
import annyang from "annyang";
import Mic from './components/Mic';
import Info from './components/Info';

// window.addEventListener("onchange", ()=> {console.log('Look ma, I changed!')})

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text : '',
      attributes : null,
      emotionalScore : 0,
      showInfo : false
    };
  }

  componentDidMount(){
    console.log("CDM ran");
    window.addEventListener("mouseup", ()=> {
      setTimeout(()=>{
        console.log("Look ma, I changed.");
        console.log(window.sayWhat);
      },10);
    });
  }






  render() {
    const styles = this.state.text ? {color:'white'} : {transform: `scale(2)`};
    return (
      <div className="App">
        <Speech />
        <Mic setText={this._setText} doThisNext={this._axiosAttributes} style={styles} />
        <br />
        <br />
        {this.state.emotionalScore
          ? 
            <>
              <div>
              {this.state.showInfo? 
                < Info
                  whatYouHadSaid={this.state.text}            
                  emotionalScore={this.state.emotionalScore} 
                  attributes={this.state.attributes} 
                  styles={this.styleAttributes} 
                /> 
              : 
                <LittleDude 
                  emotionalScore={this.state.emotionalScore} 
                />
              }
              </div>
              <Attributes 
                emotionalScore={this.state.emotionalScore} 
                // styles={this.styleAttributes} 
                attributes={this.state.attributes} 
                infoClick={this._showInfo}
              /> 
            </>
          : 
            null
        }
      </div>
    );
  }
  _setText = (text) => {
    this.setState({
      text,
    }, ()=>{
      this._axiosAttributes()
    })
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
    let attributes = await axios({
      method: 'post',
      url: 'https://my-little-cors-proxy.herokuapp.com/https://api.codeq.com/v1',
      data: JSON.stringify(body)
    })
    .catch(function (error) {
      console.log("ERROR");
      console.log(error);
    })
    this.setState({
      attributes : {
        "emotions": [attributes.data.sentences[0].emotions[0]] || "No emotion",
        "sentiments": [attributes.data.sentences[0].sentiments[0]]
      }
    },
    () => {
      console.log(this.state.attributes);
      this._setScore()
    })
  }
  _setScore = () => {
    console.log(this.state.attributes);
    const emotionalScore = convertToScale(this.state.attributes).toString()
    this.setState({
      emotionalScore
    })
  }
  _showInfo = () => {
    this.setState({
      showInfo : !this.state.showInfo
    })
  }
}

export default App;
