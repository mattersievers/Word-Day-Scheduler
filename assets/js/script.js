var createHeaderDay = function() {
  var currentDate = moment().format('dddd MMM Do YYYY');
  console.log(currentDate);  
  $("#currentDay").text(currentDate);
};

var createRowsEl = function(){
  for (var i = 0; i < 9; i++) {
    //create row div to put the hourly info into
    var rowEl = $("<div>")
      .addClass("row timeblock")

    //create the hour display
    var timeEl = $("<div>")  
      .addClass("hour col-2")

      if(i+9 < 13){
      timeEl.text( i+9 + "AM")
      }
      else if( i+9 > 12) {
      timeEl.text( i-3 + "PM")
      }
    
    //Create the text area for plans
    var planDescription = $("<div>")
      .addClass("description col-6")
      .text("Dummy" + i)
      if (moment().diff(timeEl,"hours") < 1){
        planDescription.addClass("present");
      } else if (moment().isAfter(timeEl)){
       planDescription.addClass("past");
      } else if (moment().isBefore(timeEl)){
       planDescription.addClass("future");
      }

    //Create save button
    var submitBtn = $("<button>")
      .addClass("oi oi-plus saveBtn col-2")   
    //append elements to row and append row to container
    rowEl.append(timeEl);
    rowEl.append(planDescription);
    rowEl.append(submitBtn);
    $(".container").append(rowEl);    
  }
};


createHeaderDay();
createRowsEl();