import React from 'react';
import './App.css';
import {randomAttributes, convertToScale} from './utils/utilities';
import Input from './components/Input';
import Attributes from './components/Attributes';
import axios from 'axios';
import invert from 'invert-color';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text : '',
      attributes : null,
      emotionalScore : 0
    };
    console.log("Constructor ran");
  }

  componentDidMount(){
    console.log("CDM ran");
    var phraseDiv;
    var startRecognizeOnceAsyncButton;
    // subscription key and region for speech services.
    var subscriptionKey, serviceRegion;
    var authorizationToken;
    var SpeechSDK;
    var recognizer;

    document.addEventListener("DOMContentLoaded", function () {
      startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
      subscriptionKey = document.getElementById("subscriptionKey");
      serviceRegion = document.getElementById("serviceRegion");
      phraseDiv = document.getElementById("phraseDiv");

      startRecognizeOnceAsyncButton.addEventListener("click", function () {
          startRecognizeOnceAsyncButton.disabled = true;
          phraseDiv.value = "";
          // if we got an authorization token, use the token. Otherwise use the provided subscription key
          var speechConfig;
          if (authorizationToken) {
          speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
          } else {
          if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
              alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
              return;
          }
          speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);
          }

          speechConfig.speechRecognitionLanguage = "en-US";
          var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
          recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

          recognizer.recognizeOnceAsync(
          function (result) {
              console.log("result.text  ", result.text);
              startRecognizeOnceAsyncButton.disabled = false;
              phraseDiv.value += result.text;
              recognizer.close();
              recognizer = undefined;
          },
          function (err) {
              startRecognizeOnceAsyncButton.disabled = false;
              phraseDiv.value += err;
              window.console.log(err);
              recognizer.close();
              recognizer = undefined;
          });
        
      });

      if (!!window.SpeechSDK) {
          SpeechSDK = window.SpeechSDK;
          startRecognizeOnceAsyncButton.disabled = false;

          // document.getElementById('content').style.display = 'block';
          // document.getElementById('warning').style.display = 'none';

          // in case we have a function for getting an authorization token, call it.
          // if (typeof RequestAuthorizationToken === "function") {
          //     RequestAuthorizationToken();
          // }
      }
  });
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
    // this.styleAttributes = {color: invert(colorTheory[this.state.emotionalScore])};
    // this.styleInputs = {color: (colorTheory[this.state.emotionalScore]), backgroundColor: invert(colorTheory[this.state.emotionalScore])};
    this.styleAttributes = {color: "#FFD207"};
    this.stylesInputs = {backgroundColor : colorTheory[this.state.emotionalScore], height: "100%"};
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
          // handleClick={this._generateAttributes}  
          handleClick={this._axiosAttributes}  
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
