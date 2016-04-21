var atticus = ["Atticus", "2405", "47000", 3];
var jem = ["Jem", "62347", "63500", 4];
var boo = ["Boo", "11435", "54000", 3];
var scout = ["Scout", "6243", "74750", 5];

var employees = [atticus, jem, boo, scout];


for (var i =0; i<employees.length; i++) {
	processArray(employees[i]);
}

function processArray(array) {
var newArray = [];
var employeeName = array[0];
var employeeNumber = array[1];
var employeeSalary = parseInt(array[2]);
var employeerating = array [3];

var bonusPercent = getBaseSTI(employeerating) + getYearAdjustment(employeeNumber)-getIncomeAdjustment(employeeSalary)
if (bonusPercent >0.13) {
	bonusPercent =0.13;
}

var bonusDollarAmount = employeeSalary*bonusPercent;

newArray[0] = employeeName;
newArray[1]= bonusPercent;
newArray[2] = Math.round(employeeSalary * (1+bonusPercent));
newArray[3] = bonusDollarAmount;



console.log(newArray[0], newArray[1], newArray[2], newArray[3]);
return newArray;
}

function getBaseSTI (reviewScore) {
	var basePercent;
	switch (reviewScore) {
		case 1: 
		basePercent =0;
		break;

		case 2:
		basePercent = 0;
		break;

		case 3:
		basePercent = 0.04;
		break;

		case 4:
		basePercent = 0.06;
		break;

		case 5:
		basePercent = 0.10;
		break;

		default:
		case 0:
		basePercent = 0;
		break;
	} return basePercent;
}



function getYearAdjustment (employmeeNumber) {
	var getYearAdjustment = 0;
	if (employmeeNumber.length == 4) {
		getYearAdjustment = 0.05;

	}
	return getYearAdjustment;
}

function getIncomeAdjustment (salary) {
	var getIncomeAdjustment= 0;
	salary = parseInt(salary);

	if (salary > 65000) {
		    getIncomeAdjustment = 0.01;
  }
  return getIncomeAdjustment;

	








}