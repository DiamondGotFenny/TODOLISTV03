/************UI Control**************/

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
  removeItemFromStorage(this);
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

//save object to localstorage
function saveToLocal(obj) {
  localStorage.setItem(obj.id, JSON.stringify(obj));
}

//get user input from input form and add it as new li
$("#inputText").on("keypress", function(e) {
  if (e.which === 13) {
    handlingInput();
  }
});
$("#inputbtn").on("click", function() {
  handlingInput();
});

function handlingInput() {
  //grab text from input form
  var inputtext = $("#inputText").val();
  //empty the input form
  $("#inputText").val("");

  //save input content as object
  const saveObj = {
    id: new Date().toISOString().replace(/[^0-9]/g, ""),
    item: inputtext,
    deadline: ""
  };

  //save to local storage
  saveToLocal(saveObj);
  //rendering input content
  inputRender(saveObj.item, saveObj.id);
}

//save the selected date to the saveObj
$("ul").on("change", ".datepicker", function(event) {
  const date = $(this).val();

  //get the unique id from the parent object-li
  let li_id = $(event.target)
    .parent()
    .attr("id");

  //compare the id to the key in localstorage then retrieve the matched object
  //then assign that deadline to the copy of that object
  let obj;
  $.each(localStorage, function(key, value) {
    if (key === li_id) {
      obj = JSON.parse(value);
    }
  });
  obj.deadline = date;

  //save the updated object to local storage
  saveToLocal(obj);
});

const inputRender = function(inputText, id) {
  //create a new li and add it to the ul
  $("ul").append(
    `<li id=${id}><span class="deltbtn"><i class="far fa-trash-alt"></i></span>${inputText}
        <input type="text" class="datepicker"></li>`
  );

  //render icon
  renderDeadlineIcon();
};

$(window).on("load", function() {
  $.each(localStorage, function(key, value) {
    if (localStorage.length > 0 && key !== "length") {
      const obj = JSON.parse(value);
      $("ul").append(
        `<li id=${obj.id}><span class="deltbtn"><i class="far fa-trash-alt"></i></span>${obj.item}
          <input type="text" class="datepicker"></li>`
      );

      //render deadline
      $(`#${obj.id}`)
        .find(".datepicker")
        .val(obj.deadline);

      //render icon
      renderDeadlineIcon();
    }
  });
});

function renderDeadlineIcon() {
  //create deadline by using jQueryui.datepicker() component
  $(".datepicker").datepicker({ minDate: new Date() });

  //this will stop add "done" to item while selecting deadline
  $("ul").on("click", ".datepicker", function(event) {
    event.stopPropagation();
  });
}

function removeItemFromStorage(elem) {
  const id = $(elem)
    .parent()
    .attr("id");
  localStorage.removeItem(id);
}

/* //test only
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
} */
