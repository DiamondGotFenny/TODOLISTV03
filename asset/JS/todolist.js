/************UI Control**************/
//open or close the add input area
$("#inputbtn").on("click", function() {
  $("#inputText").fadeToggle();
});

//check off specific to-do item by clicking
$("ul").on("click", "li", function() {
  $(this).toggleClass("done");
});

//click on delete button to delete item
$("ul").on("click", ".deltbtn", function(event) {
  $(this)
    .parent()
    .fadeOut(500, function(e) {
      $(this).remove();
    });
  event.stopPropagation();
});

//display the clock icon
$.datepicker.setDefaults({
  showOn: "both",
  buttonImageOnly: true,
  buttonImage: "deadlineicon.svg",
  buttonText: "Set Deadline"
});

/********************************** */

//save input text and deadline date to object
(function() {
  const objs = [];
  //object for storing input text and deadline date
  function saveObj() {
    this.id = "";
    this.item = "";
    this.deadline = "";
  }

  //get user input from input form and add it as new li
  $("#inputText").on("keypress", function(e) {
    if (e.which === 13) {
      //grab text from input form
      var inputtext = $("#inputText").val();
      //empty the input form
      $("#inputText").val("");

      //save input content as object

      saveObj.item = inputtext;
      saveObj.id = new Date().toISOString().replace(/[^0-9]/g, "");

      //save to local storage
      saveToLocal(saveObj);
      //rendering input content
      inputRender(inputtext);
    }
  });

  //save the selected date to the saveObj
  $("ll").on("change", ".datepicker", function(event) {
    const date = $(this).val();
    console.log(this);
    saveObj.deadline = date;
    //save to local storage
    saveToLocal(saveObj);
  });
})();

var inputRender = function(inputText) {
  //create a new li and add it to the ul
  $("ul").append(
    '<li><span class="deltbtn"><i class="far fa-trash-alt"></i></span>' +
      inputText +
      '<input type="text" class="datepicker"></li>'
  );

  //create deadline by using jQueryui.datepicker() component
  $(".datepicker").datepicker({ minDate: new Date() });

  //this will stop add "done" to item while selecting deadline
  $("ul").on("click", ".datepicker", function(event) {
    event.stopPropagation();
  });
};

/* //save to localstorage after adding deadline
$("ul").on("change", event => {
  saveToLocal();
}); */

function saveToLocal(obj) {
  localStorage.setItem(obj.id, JSON.stringify(obj));
  console.log(JSON.parse(localStorage.getItem(obj.id)));
}

$("#clearAll").on("click", function() {
  localStorage.clear();
});
$("#printItems").on("click", function() {
  printItems();
});

function printItems() {
  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      console.log(localStorage[key]);
    }
  }
}
