$(document).ready(function () {
  // Function to get the current date and time
  function updateCurrentDay() {
    var currentDate = dayjs().format("dddd, MMMM D YYYY, h:mm A");
    $("#currentDay").text(currentDate);
  }

  // Function to generate time blocks
  function generateTimeBlocks() {
    var currentTime = dayjs().hour();

    // Clear existing time blocks
    $("#time-blocks").empty();

    // Loop through each hour from 9 AM to 5 PM
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlockDiv = $("<div>").addClass("row time-block");
      var formattedHour = (hour > 12) ? hour - 12 : hour;
      var amPm = (hour >= 12) ? "PM" : "AM";
      var hourDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(`${formattedHour}${amPm}`);
      var textArea = $("<textarea>").addClass("col-8 col-md-10 description");

      // Add past, present, or future class based on the current time
      if (hour < currentTime) {
        timeBlockDiv.addClass("past");
      } else if (hour === currentTime) {
        timeBlockDiv.addClass("present");
      } else {
        timeBlockDiv.addClass("future");
      }

      // Add saved event from local storage, if any
      var savedEvent = localStorage.getItem(`event-${hour}`);
      if (savedEvent) {
        textArea.val(savedEvent);
      }

      var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save")
        .html("<i class='fas fa-save' aria-hidden='true'></i>").on("click", function () {
          var eventText = $(this).siblings(".description").val();
          var eventHour = $(this).parent().attr("id").split("-")[1];
          localStorage.setItem(`event-${eventHour}`, eventText);
        });

      timeBlockDiv.append(hourDiv, textArea, saveButton);
      $("#time-blocks").append(timeBlockDiv);
    }
  }

  // Initial setup
  updateCurrentDay();
  generateTimeBlocks();

  // Update time every minute
  setInterval(function () {
    updateCurrentDay();
  }, 60000);
});
