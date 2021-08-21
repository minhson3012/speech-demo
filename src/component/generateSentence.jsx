const article = ["the", "a", "one", "some", "any"];
const nouns = ["bird", "clock", "boy", "plastic", "duck", "teacher", "old lady", "professor", "hamster", "dog"];
const verbs = ["kicked", "ran", "flew", "dodged", "sliced", "rolled", "breathed", "slept", "drove", "jumped", "walked"];
const adjectives = ["beautiful", "lazy", "professional", "lovely", "rough", "soft"];
const adverbs = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "shockingly", "calmly", "passionately"];
const preposition = ["down", "into", "up", "on", "upon", "below", "above", "through", "across", "towards"];

function generateSentence() {
//     const rand1 = Math.floor(Math.random() * 10);
//     const rand2 = Math.floor(Math.random() * 10);
//     const rand3 = Math.floor(Math.random() * 10);
//     const rand4 = Math.floor(Math.random() * 10);
//     const rand5 = Math.floor(Math.random() * 10);
//     const rand6 = Math.floor(Math.random() * 10);

//     const content = "The " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + verbs[rand4] + " because some " + nouns[rand1] + " " + adverbs[rand1] + " " + verbs[rand1] + " " + preposition[rand1] + " a " + adjectives[rand2] + " " + nouns[rand5] + " which, became a " + adjectives[rand3] + ", " + adjectives[rand4] + " " + nouns[rand6] + ".";
    let content = "";
    content += capitalizeFirstLetter(article[Math.floor(Math.random() * article.length) ] ) + " ";
    content += adjectives[Math.floor(Math.random() * adjectives.length)] + " ";
    content += nouns[Math.floor(Math.random() * nouns.length)] + " ";
    content += adverbs[Math.floor(Math.random() * adverbs.length)] + " ";
    content += verbs[Math.floor(Math.random() * verbs.length)] + " ";
    content += article[Math.floor(Math.random() * article.length)] + " ";
    content += nouns[Math.floor(Math.random() * nouns.length)] + " ";
    content += preposition[Math.floor(Math.random() * preposition.length)] + " ";
    content += article[Math.floor(Math.random() * article.length)] + " ";
    content += adjectives[Math.floor(Math.random() * adjectives.length)] + " ";
    content += nouns[Math.floor(Math.random() * nouns.length)] + ". ";
    return content
}

function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}


export default generateSentence;
