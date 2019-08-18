
//check off specific to-do item by clicking
$('ul').on('click', 'li',function(){
    $(this).toggleClass('done');
})

//click on delete button to delete item
$('ul').on('click','.deltbtn',function(event){
    $(this).parent().fadeOut(500,function(e){
        $(this).remove();
    });
    event.stopPropagation();
})

//get user input from input form and add it as new li
$('#inputText').on('keypress',function(e){
    if(e.which===13){
        getinput();
    }
})
//open or close the add input area
$('#inputbtn').on('click',function(){
    $('#inputText').fadeToggle();
})


var getinput = (function () {
    //grab text from input form
    var inputtext = $('#inputText').val();
    //empty the input form
    $('#inputText').val("");
    //create a new li and add it to the ul
    $('ul').append('<li><span class="deltbtn"><i class="far fa-trash-alt"></i></span>' + inputtext + '<input type="text" class="datepicker"></li>')

    //create deadline by using jQueryui.datepicker() component 
    $(function () {
        $(".datepicker").datepicker({ minDate: new Date() });
    });
    $.datepicker.setDefaults({
        showOn: "both",
        buttonImageOnly: true,
        buttonImage: "deadlineicon.svg",
        buttonText: "Set Deadline"
    });
    $('ul').on('click', '.datepicker', function (event) {
        event.stopPropagation();
    })
});

//create deadline by using jQueryui.datepicker() component 
$( function() {
    $( ".datepicker" ).datepicker({ minDate : new Date() });
  } );

$('ul').on('click','.datepicker',function(event){
    event.stopPropagation();
})
$.datepicker.setDefaults({
    showOn: "both",
    buttonImageOnly: true,
    buttonImage: "deadlineicon.svg",
    buttonText: "Set Deadline"
});


 

