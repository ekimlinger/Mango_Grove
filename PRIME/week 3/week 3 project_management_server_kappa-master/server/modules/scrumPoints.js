
var randomScrumPoints = function(){
    var scrumPoints = randomNumber(1,9);
    return scrumPoints;
};


function randomNumber (min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);

};

//console.log(scrumPoints);

module.exports = randomScrumPoints;