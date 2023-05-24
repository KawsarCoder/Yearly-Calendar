// Get current year and month
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// Get calendar elements
let calendarBody = document.getElementById("calendar-body");
let previousButton = document.getElementById("previous-btn");
let nextButton = document.getElementById("next-btn");
let monthTitle = document.getElementById("month-title");

// Function to get the number of days in a month
getDaysInMonth = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return daysInMonth;
};

// Function to render the calendar
renderCalendar = (year, month) => {
  let startDate = new Date(year, month, 1);
  let daysInMonth = getDaysInMonth(year, month);

  let startDay = startDate.getDay();
  if (startDay === 0) startDay = 7;

  let calendarHTML = "";

  // Generate calendar cells
  let prevMonthEndDate = getDaysInMonth(year, month - 1);
  let nextMonthStartDate = 1;

  for (let i = 1; i <= 42; i++) {
    if (i <= startDay) {
      // Previous month days
      calendarHTML +=
        "<td class='inactive'>" + (prevMonthEndDate - startDay + i) + "</td>";
    } else if (i > daysInMonth + startDay) {
      // Next month days
      calendarHTML += "<td class='inactive'>" + nextMonthStartDate + "</td>";
      nextMonthStartDate++;
    } else {
      // Current month days
      let day = i - startDay;
      if (
        day === new Date().getDate() &&
        year === currentYear &&
        month === currentMonth
      ) {
        // Highlight current day
        calendarHTML += "<td class='current-month'>" + day + "</td>";
      } else {
        calendarHTML += "<td>" + day + "</td>";
      }
    }

    if (i % 7 === 0) {
      calendarHTML += "</tr><tr>";
    }
  }

  calendarBody.innerHTML = calendarHTML;

  // Display month name and year
  let monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });
  monthTitle.textContent = monthName + " " + year;
};

// Event listener for previous button
showPreviousMonth = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentYear--;
    currentMonth = 11;
  }
  renderCalendar(currentYear, currentMonth);
};

// Event listener for next button
showNextMonth = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentYear++;
    currentMonth = 0;
  }
  renderCalendar(currentYear, currentMonth);
};

previousButton.addEventListener("click", showPreviousMonth);
nextButton.addEventListener("click", showNextMonth);

// Initial rendering of the calendar
renderCalendar(currentYear, currentMonth);
