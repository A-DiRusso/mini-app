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
        "Postive",
        "Neutral"
    ];
    const indexOfEmotion = Math.floor(Math.random() * Math.floor(emotionClassifiers.length));
    results.emotions = emotionClassifiers[indexOfEmotion];
    const indexOfSentiment = Math.floor(Math.random() * Math.floor(sentimentClassifiers.length));
    results.sentiments = sentimentClassifiers[indexOfSentiment];
    return results;
}