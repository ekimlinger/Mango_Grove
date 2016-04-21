arrayFnames=['Mark','Michelle','Michael','Mike','Huckleberry','Scarlett','Moby','Jay','Dick','Joe','Jeeves','Hannibal','Huckleberry','Philip','Joe'];
arrayLnames=['Moby',"O'Hara",'Humbert','Humbert','Brother','Big','Carlson','Rothermal','Christmas','Lecter','Gatsby','Holmes','Finn','Dick','Wang'];

var createName = function (){

    var firstName = arrayFnames[randomNumber(0,arrayFnames.length-1)];
    var lastName = arrayLnames[randomNumber(0,arrayLnames.length-1)];
    var name = firstName +' '+ lastName;
    return name;

};

var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);

};





module.exports = createName;







