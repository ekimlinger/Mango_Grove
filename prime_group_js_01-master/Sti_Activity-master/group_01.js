var atticus = ["Atticus", "2405", "47000", 3];
var jem = ["Jem", "62347", "63500", 4];
var boo = ["Boo", "11435", "54000", 3];
var scout = ["Scout", "6243", "74750", 5];

var employees = [atticus, jem, boo, scout];



var newArray=[];

for (i=0; i<employees.length; i++){
	newArray[i]=[employees[i][0],[],[],[]];
	newArray[i][1]=b1(i);
	newArray[i][2]=Math.round(100*b2(i))/100;
	newArray[i][3]=Math.round(newArray[i][2]-parseInt(employees[i][2]));
	console.log(newArray[i]);
};


function b1(val){
	var bonus=0;
	switch(employees[val][3]){
		case 1:
			bonus=0;
			break;
		case 2:
			bonus=0;
			break;
		case 3:
			bonus=4;
			break;
		case 4:
			bonus=6;
			break;
		case 5:
			bonus=10;
			break;
	};
	if(employees[val][1].length==4){
		bonus+=5;
	};
	if(parseInt(employees[val][2])>65000){
		bonus-=1;
	};
	if(bonus>13){
		bonus=13
	};
	return bonus;

};

function b2(val){
	var twerk=parseInt(employees[val][2])*(1+(newArray[val][1]/100));
	return twerk;
};


