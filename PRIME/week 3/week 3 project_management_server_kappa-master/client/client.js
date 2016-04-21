
var randomCompanyName=['Seagate','4M','Apple','Banana Republic','Prime Digital Academy','Scott and Company','Mark and Sons','Michael Cripto Photo', "Michelle's Press", "Roman's Randoms"];

var serverPoints;
var frontEndPoints;
var clientSidepoints;

var serverPointsAdded=0;
var frontEndPointsAdded=0;
var clientSidepointsAdded=0;

var frontEndStaffBasket = [];
var serverSideStaffBasket = [];
var clientSideStaffBasket = [];

$(document).ready( function(){
    init();
});

function init(){
    //event listeners
    $('.btn-generateProject').on('click', generateProject);
    $('.projectInfo').on('click', '.assignStaff', fetchStaff);
    $('.projectInfo').on('click', '.addEmployeeBtn', fetchStaff);
}



function generateProject(){
    randomizeSpritePoints();
    randomizeCompanyInfo();
}

function fetchStaff(){

    $.ajax({
       type: 'GET',
        url: '/addEmployee',
        success: function(responseFromServer){
            console.log(responseFromServer);
            appendStaffDom(responseFromServer);
        }
    });


}

function randomizeCompanyInfo(){
    $('.companyStuff').remove();
    $('.projectInfo').append('<div class="companyStuff"></div>');
    var $el = $('.projectInfo').children().last();

    var randomIndex = randomNumber(0, randomCompanyName.length-1);
    $el.append('<h2 class="companyName">'+randomCompanyName[randomIndex]+'</h2> ');
    $el.append('<button class="assignStaff">Assign Staff</button>');
    appendRamdonizedPoints();
}


function randomizeSpritePoints() {
    serverPoints = randomNumber(10, 60);
    frontEndPoints = randomNumber(10, 60);
    clientSidepoints = randomNumber(10, 60);

}

function appendRamdonizedPoints(){
    $('.companyName').append('<div class=""></div>');
    var $el = $('.companyName').children().last();
    $el.append('<h3 id="appendRamdonizedPoints">'+"Server Side Sprites: "+serverPoints +'</h3>');
    $el.append('<h3 id="appendRamdonizedPoints">'+"FrontEnd Sprites: "+frontEndPoints +'</h3>');
    $el.append('<h3 id="appendRamdonizedPoints">'+"Client Side Sprites: "+clientSidepoints +'</h3>');
    $('.projectInfo').children().last().append('<h4 class="currentPoints">' +'The Current Server Side Sprite Point is:'+serverPointsAdded+ ", The Current Front End Sprites is:" +frontEndPointsAdded+ ', The Current Client Side Sprites is:' +clientSidepointsAdded+ '.</h4>');

    console.log(serverPointsAdded ,frontEndPointsAdded, clientSidepointsAdded);
}

function appendStaffDom(employeeObject){

    var frontEndStaffBasket = [];
    var serverSideStaffBasket = [];
    var clientSideStaffBasket = [];


    if(employeeObject.skill == "Server Side" && employeeObject.scrum<=serverPoints){
        serverPointsAdded+=employeeObject.scrum;
        serverPoints-=employeeObject.scrum;
        serverSideStaffBasket.push(employeeObject);
        //$('.companyName').text('<h5>'+serverPoints+'</h5>');
        console.log('serverPoints', serverPoints);
        appendEmployee();
    }
    else if(employeeObject.skill == "Client Side" && employeeObject.scrum<=clientSidepoints){
        clientSidepointsAdded+=employeeObject.scrum;
        clientSidepoints-=employeeObject.scrum;
        clientSideStaffBasket.push(employeeObject);
        console.log('client Points ', clientSidepoints);
        appendEmployee();
    }
    else if(employeeObject.skill == "Front End"&& employeeObject.scrum<=frontEndPoints){
        frontEndPointsAdded+=employeeObject.scrum;
        frontEndPoints-=employeeObject.scrum;
        frontEndStaffBasket.push(employeeObject);
        console.log('frontEndPoints',frontEndPoints);
        appendEmployee();
    }

    function appendEmployee(){
        $('.addEmployeeBtn').remove();
        $('.projectInfo').children().last().append('<p class="employeeForClient">' + employeeObject.names + " " + employeeObject.scrum + " " + employeeObject.skill +'</p>');
        $('.projectInfo').children().last().append('<button class="addEmployeeBtn">'+'Add Employee'+'</button>');
        $('.currentPoints').text('The Current Server Side Sprite Point is: '+serverPointsAdded+ ", The Current Front End Sprites is: " +frontEndPointsAdded+ ', The Current Client Side Sprites is: ' +clientSidepointsAdded);
    }

}

function promode(skillDone){
  var type = skillDone;

    $.ajax({
        type : "GET",
        url : "/addemployee",
        data: type,
        success: function(response){
            console.log(resoonse);
        }
    });


}


var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);

};