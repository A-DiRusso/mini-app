export function randomAttributes(){
    const results = {
        sentiments: [],
        emotions: []
    };
    const emotionClassifiers = [
        "Anger",
        "Disgust/Dislike",
        "Fear",
        "Joy/Like",
        "Sadness",
        "Suprise",
        "Excitement",
        "Angst",
        "No Emotion"
    ];
    const sentimentClassifiers = [
        "Negative",
        "Positive",
        "Neutral"
    ];
    const indexOfEmotion = Math.floor(Math.random() * Math.floor(emotionClassifiers.length));
    results.emotions = emotionClassifiers[indexOfEmotion];
    const indexOfSentiment = Math.floor(Math.random() * Math.floor(sentimentClassifiers.length));
    results.sentiments = sentimentClassifiers[indexOfSentiment];
    return results;
}

export function convertToScale({sentiments,emotions}){
    const emotionScale = {
        "Anger": 1,
        "Disgust/Dislike": 0.75,
        "Fear": 0.5,
        "Joy/Like": 0.75,
        "Sadness": 0.25,
        "Suprise": 0.25,
        "Excitement": 1,
        "Angst": 0.3,
        "No Emotion": 0
    };
    const sentimentScale = {
        "Negative": -1,
        "Positive": 1,
        "Neutral": 0
    };
    let qualtitativeValue;
    if(((emotions==="Suprise")||(emotions==="Excitement"))&&(sentiments==="Negative")){
        qualtitativeValue = emotionScale[emotions] * - 1;
    }
    else if (sentiments==="Neutral"){
        qualtitativeValue = emotionScale[emotions];
        if (emotionScale[emotions]===0){
            qualtitativeValue = "0";
        }
    }
    else{
        qualtitativeValue = emotionScale[emotions] * sentimentScale[sentiments];
    }
    return qualtitativeValue;
}