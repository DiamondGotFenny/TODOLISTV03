(function () {
  /************UI Control**************/

  //check off specific to-do item by clicking
  $("ul").on("click", "li", function () {
    $(this).toggleClass("done");
    const id = $(this).attr("id");
    const obj = myMapItems.get(id);
    obj.done = obj.done === "done" ? false : "done";
    myMapItems.set(obj.id, obj);
    saveToLocal();
  });

  //click on delete button to delete item
  $("ul").on("click", ".deltbtn", function (event) {
    $(this)
      .parent()
      .fadeOut(500, function (e) {
        $(this).remove();
      });
    removeItemFromMap(this);
    saveToLocal();
    event.stopPropagation();
  });

  //display the clock icon
  $.datepicker.setDefaults({
    showOn: "both",
    buttonImageOnly: true,
    buttonImage: "deadlineicon.svg",
    buttonText: "Set Deadline",
  });

  /********************************** */

  //map for new create items. use map for keeping the order of items when reload
  let myMapItems = new Map();

  //save object to map
  function saveToMap(obj) {
    myMapItems.set(obj.id, obj);
  }

  //convert map to objects
  function mapToObject(myMap) {
    const obj = {};
    for (let [k, v] of myMap) obj[k] = v;
    return obj;
  }

  //convert objects back to map
  function objToMap(obj) {
    const newMap = new Map();
    for (let [key, value] of Object.entries(obj)) {
      newMap.set(key, value);
    }

    return newMap;
  }

  //for setting local storage
  const storageName = "storageMap";

  //save object to localstorage
  function saveToLocal() {
    let myMapObj = {};
    myMapObj = mapToObject(myMapItems);
    const objsJson = JSON.stringify(myMapObj);
    localStorage.setItem(storageName, objsJson);
  }

  //retrieve object from local and convert to map
  function loadFromLocal() {
    if (localStorage.length > 0) {
      const myItemObj = JSON.parse(localStorage.getItem(storageName));
      myMapItems = objToMap(myItemObj);
    }
  }

  //get user input from input form and add it as new li
  $("#inputText").on("keypress", function (e) {
    if (e.which === 13) {
      handlingInput();
    }
  });
  $("#inputbtn").on("click", function () {
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
      done: false,
      deadline: "",
    };

    //save to map
    saveToMap(saveObj);
    //save to local storage
    saveToLocal();
    //rendering input content
    inputRender(saveObj);
  }

  //save the selected date to the saveObj
  $("ul").on("change", ".datepicker", function (event) {
    const date = $(this).val();

    //get the unique id from the parent object-li
    let li_id = $(event.target).parent().attr("id");

    const obj = myMapItems.get(li_id);

    obj.deadline = date;

    //save update obj to map
    saveToMap(obj);
    //myMapItems.set(li_id,obj)
    //save the updated map to local storage
    saveToLocal();
  });

  const inputRender = function (obj) {
    //create a new li and add it to the ul
    $("ul").append(
      `<li id=${obj.id} class=${obj.done}><span class="deltbtn"><i class="far fa-trash-alt"></i></span><span class="textContent">${obj.item}</span>
       <div class="datepicker-container"><input type="text" class="datepicker"></div></li>`
    );

    //render icon
    renderDeadlineIcon();
  };

  $(window).on("load", function () {
    loadFromLocal();
    for ([key, value] of myMapItems) {
      const obj = value;
      $("ul").append(
        `<li id=${obj.id} class=${
          obj.done ? "done" : ""
        }><span class="deltbtn"><i class="far fa-trash-alt"></i></span><span class="textContent">${
          obj.item
        }</span>
        <div class="datepicker-container"><input type="text" class="datepicker"></div></li>`
      );

      //render deadline
      $(`#${obj.id}`).find(".datepicker").val(obj.deadline);

      //render icon
      renderDeadlineIcon();
    }
  });

  function renderDeadlineIcon() {
    //create deadline by using jQueryui.datepicker() component
    $(".datepicker").datepicker({ minDate: new Date() });

    //this will stop add "done" to item while selecting deadline
    $("ul").on("click", ".datepicker", function (event) {
      event.stopPropagation();
    });
  }

  function removeItemFromMap(elem) {
    const id = $(elem).parent().attr("id");
    myMapItems.delete(id);
  }

  /* //test only
$("#clearAll").on("click", function() {
  localStorage.clear();
  myMapItems.clear();
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
})();
