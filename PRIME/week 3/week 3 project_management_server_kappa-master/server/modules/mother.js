var names = require('./names.js');
var scrumPoints = require('./scrumPoints.js');
var skillSet = require('./skillSet.js');



 function Employee(names, scrum, skill) {
     this.names = names;
     this.scrum = scrum;
     this.skill = skill;
 }

var employeeCreator = function(){
    var mom = new Employee(names(), scrumPoints(), skillSet());
    return mom;
};




module.exports = employeeCreator;

