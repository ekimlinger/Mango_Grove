$(document).ready(function() {
  $('form').on('submit', handleSubmit);
  $('.employee-container').on('click', 'button', handleRemove)
});

var totalMonthlyCost = 0;

function handleSubmit(event) {
  event.preventDefault();

  var formDataArray = $('form').serializeArray();
  var data = {};

  $.each(formDataArray, function(index, individualEmployeeContainerement) {
      console.log("index=", index);
      console.log("individualEmployeeContainerement", individualEmployeeContainerement);
      data[individualEmployeeContainerement.name] = individualEmployeeContainerement.value; // name and value are special names here, these won't change
  });


  $('input[type="text"]').val('');
  $('input[type="number"]').val('');

  appendDom(data);
  totalMonthlyCost += parseFloat(data.salary) / 12;
  updateTotal();

  console.log(formDataArray);
  console.log(data);
}

function appendDom(employeeData) {
  $('.employee-container').append('<div></div>');
  var $individualEmployeeContainer = $('.employee-container').children().last();
  $individualEmployeeContainer.append('<p>First Name: '+ employeeData.firstName +'</p>');
  $individualEmployeeContainer.append('<p>Last Name: ' + employeeData.lastName + '</p>');
  $individualEmployeeContainer.append('<p>ID: ' + employeeData.employeeId + '</p>');
  $individualEmployeeContainer.append('<p>Title: ' + employeeData.jobTitle + '</p>');
  $individualEmployeeContainer.append('<p>Salary: ' + employeeData.salary + '</p>');

  $individualEmployeeContainer.append('<button>Delete</button>');
  var $deleteButton = $individualEmployeeContainer.find('button');
  var monthlySalary = parseFloat(employeeData.salary) / 12;
  $deleteButton.data('monthlySalary', monthlySalary);
}

function handleRemove() {
  var $button = $(this); // the button that was clicked
  var monthlySalary = $button.data('monthlySalary');
  totalMonthlyCost -= monthlySalary;
  updateTotal();
  $button.parent().remove();
}

function updateTotal() {
  $('p span').text(totalMonthlyCost);
}
