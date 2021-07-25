var schedule = {};

//color codes the description div elements
var colorCode = function(hour,divObject){
    if (moment().diff(hour, "hours") === 0  && moment().diff(hour, "minutes") > 0){
        divObject.removeClass("future past present");
        divObject.addClass("present");
      } else if (moment().isAfter(hour)){
        divObject.removeClass("future past present");
        divObject.addClass("past");
      } else if (moment().isBefore(hour)){
        divObject.removeClass("future past present");
        divObject.addClass("future");
      }
}
//Saves the current Schedule
saveSchedule = function() {
  localStorage.setItem("schedule", JSON.stringify(schedule))
};

loadSchedule = function(){
    schedule = JSON.parse(localStorage.getItem("schedule"));

    if(!schedule) {
        schedule = {
            timeBlockId:[],
            descText:[]
        }
    }
  
    createRowsEl(schedule.timeBlockId, schedule.descText)
    
  
  };

//Puts current date in header
var createHeaderDay = function() {
  var currentDate = moment().format('dddd MMM Do YYYY'); 
  $("#currentDay").text(currentDate);
};

//Creates the row timeblock elements
var createRowsEl = function(timeBlockId, desctext){
  for (var i = 0; i < 9; i++) {
    //create row div to put the hourly info into
    var rowEl = $("<div>")
      .addClass("row time-block")
      .attr("id", i);
    //create the hour display
    var timeEl = $("<div>")  
      .addClass("hour col-2")

      if(i+9 < 13){
      timeEl.text(i+9 + " AM");
      }
      else if( i+9 > 12) {    
      timeEl.text(i-3 + " PM");
      }
    
    //Create the text area for plans and color code according to date
    var convertedDate = moment(i+9,"h");
    var planDescription = $("<div>")
      .addClass("description col-7")
    
    
      colorCode(convertedDate,planDescription);

      //check if index of saved matches current index and insert appropriate text
      for( var j = 0; j < timeBlockId.length; j++) {
          if (parseInt(timeBlockId[j]) === i){
            planDescription.text(desctext[j]);
          }
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
  
  //get value of current text
  var descText = $(this)
  .closest(".time-block")
  .children(".form-control")
  .val()
  .trim();
  
  //get the parent time-block id attribute
  var timeBlockId = $(this)
    .closest(".time-block")
    .attr("id");
  

  //Push info into schedule array and save schedule changes to localStorage
  schedule.timeBlockId.push(timeBlockId);
  schedule.descText.push(descText);
  saveSchedule();
  
  //recreate div element
var descDiv = $("<div>")
    .addClass("description col-7")
    .text(descText);

    //check the time element and color code accordingly
    var blockHour = $(this).closest(".time-block").children(".hour").text().trim().replace(" PM","").replace(" AM","");
    if (parseInt(blockHour) < 8) {blockHour =JSON.stringify((parseInt(blockHour) +12))};
    blockHour = moment(blockHour,"h");
    
    colorCode(blockHour,descDiv);
    console.log(blockHour);
  //replace textarea with div element
  $("[id="+timeBlockId+"]").children(".form-control").replaceWith(descDiv);
});

createHeaderDay();

loadSchedule();

//update the color code regularly (every second)
setInterval(function(){
    for (var i=0; i < 9; i++) {
        //get hour from page
        var blockHour = $("[id="+i+"]").children(".hour").text().trim().replace(" PM","").replace(" AM","");
      
        if (parseInt(blockHour) < 8) {blockHour =JSON.stringify((parseInt(blockHour) +12))};
        blockHour = moment(blockHour,"h");
        
        //get text content
        var descText = $("[id="+i+"]").children(".description");
        
        colorCode(blockHour,descText)
    }
}, 1000);