var student = {};

student.name = "Mark"


function Student (name,location,salary) {
	this.name = name;
	this.location = location;
	this.salary = salary;
	this.validate = function () {
		if(this.name == undefined ) {
			this.name == "Name not entered";
		}

	}
}

vr scott = new Student ("Michelle", "Bloomington", 100000 )
var array = [];
array.push(Mark)

for (var i = 0; i<array.length; i++) {
	var object = array[i];
	console.log(object.name);
}
