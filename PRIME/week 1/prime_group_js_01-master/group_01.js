var atticus = ["Atticus", "2405", "47000", 3];
var jem = ["Jem", "62347", "63500", 4];
var boo = ["Boo", "11435", "54000", 3];
var scout = ["Scout", "6243", "74750", 5];

var employees = [atticus, jem, boo, scout];



var newArray= [];

var name = employees[i][0];

newArray.push(name);

var sti = function (name) { 
	var bonus = 0;
	switch(name[3]) {
		case 1: 
		bonus = 0;
		break;
		case 2: 
		bonus = 0;
		break;
		case 3: 
		bonus = 4;
		break;
		case 4:
		bonus = 6;
		break;
		case 5: 
		bonus = 10;
		break;
	default:
		break;
}
if(name[1].length ==4 ) {
	bonus +=5;
};
if(parseInt(name[2])>65000){
	bonus-=1;
};
if(bonus>13){
	bonus=13
};
	return bonus;
}

newArray.push(sti);

var income = function (val){
	return parseInt(newArray(val)[2])*(1+newArray(val)[1]/100));
};

newArray.push(income);

var finalBonus = math.round(newArray[2]-parseInt(name[2]));
newArray.push(finalBonus);

console.log(newArray);


