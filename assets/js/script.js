//Puts current date in header
var createHeaderDay = function() {
  var currentDate = moment().format('dddd MMM Do YYYY');
  console.log(currentDate);  
  $("#currentDay").text(currentDate);
};

//Creates the row timeblock elements
var createRowsEl = function(){
  for (var i = 0; i < 9; i++) {
    //create row div to put the hourly info into
    var rowEl = $("<div>")
      .addClass("row time-block")
      .attr("id", i);
    //create the hour display
    var timeEl = $("<div>")  
      .addClass("hour col-2")

      if(i+9 < 13){
      timeEl.text( i+9 + "AM");
      }
      else if( i+9 > 12) {
      timeEl.text( i-3 + "PM");
      }
    
    //Create the text area for plans
    var planDescription = $("<div>")
      .addClass("description col-7")
      .text("Dummy " + i)
      if (moment().diff(timeEl,"hours") < 1){
        planDescription.addClass("present");
      } else if (moment().isAfter(timeEl)){
       planDescription.addClass("past");
      } else if (moment().isBefore(timeEl)){
       planDescription.addClass("future");
      }

    //Create save button
    var submitBtn = $("<button>")
      .addClass("oi oi-lock-locked saveBtn col-2")   
    //append elements to row and append row to container
    rowEl.append(timeEl);
    rowEl.append(planDescription);
    rowEl.append(submitBtn);
    $(".container").append(rowEl);    
  }
};

//Click on description box edits the text
$('.container').on('click', '.description', function(){
    //Gather current text
    var descText = $(this)
    .text()
    .trim();

    //create text area to edit
    var descInput = $("<textarea>")
      .addClass("form-control col-7")
      .val(descText);
      $(this).replaceWith(descInput);
      descInput.trigger("focus");

});

$('.container').on('click','button',function(){
    console.log("check")
  //get value of current text
  var descText = $("textarea")
  .val()
  .trim();

  var status = $(this)
  
  //recreat div element
  var descDiv = $("<div>")
    .addClass("decription col-7")
    .text(descText);

});

createHeaderDay();
createRowsEl();




/*
- Check the task color function
- correct click input on description
- make save button functional
- create a saveItem/loadItem localStorage function
*/