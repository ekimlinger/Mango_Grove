

//Front End
//Client Side
//Server Side

var skillSet = function() {
    var skill="";
    switch (randomNumber(1,3)) {
        case 1:
            skill = "Front End";
            break;

        case 2:
            skill = "Server Side";
            break;

        case 3:
            skill = "Client Side";
            break;
    };
    return skill;
};



//console.log(skillSet());

function randomNumber  (min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);

};


module.exports = skillSet;