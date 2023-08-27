// popup button 
{
  // Get references to the buttons and popups
const openAnnouncementButton = document.getElementById("openAnnouncementButton");
const openCoursesScheduleButton = document.getElementById("openCoursesScheduleButton");
const openYourInfoButton = document.getElementById("openYourInfoButton");
const openMedicalCareButton = document.getElementById("openMedicalCareButton");
const openStudentClassworkButton = document.getElementById("openStudentClassworkButton");

const popupAnnouncement = document.getElementById("popup_announcement");
const popupCoursesSchedule = document.getElementById("popup_Courses_Schedule");
const popupYourInfo = document.getElementById("popup_Your_Info");
const popupMedicalCare = document.getElementById("popup_medical_care");
const popupStudentClasswork = document.getElementById("popup_Student_Classwork");

// Add event listeners to the buttons
openAnnouncementButton.addEventListener("click", function () {
  popupAnnouncement.style.display = "block";
});

openCoursesScheduleButton.addEventListener("click", function () {
  popupCoursesSchedule.style.display = "block";
});

openYourInfoButton.addEventListener("click", function () {
  popupYourInfo.style.display = "block";
});

openMedicalCareButton.addEventListener("click", function () {
  popupMedicalCare.style.display = "block";
});

openStudentClassworkButton.addEventListener("click", function () {
  popupStudentClasswork.style.display = "block";
});

// Close the popups when the close button is clicked
const closeButtons = document.querySelectorAll(".close-button");
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    // Get the parent popup and hide it
    const popup = this.closest(".popup");
    if (popup) {
      popup.style.display = "none";
    }
  });
});

// Helper function to close popups when clicking outside
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup")) {
    event.target.style.display = "none";
  }
});
}
//end of script

// Scriprs for Announcement
{
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let slideIndex = 0;

function showSlide(index) {

    slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slider.children.length;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slider.children.length) % slider.children.length;
    showSlide(slideIndex);
}

const interval = setInterval(nextSlide, 5000);

nextBtn.addEventListener('click', () => {
    clearInterval(interval); 
    nextSlide();
});

prevBtn.addEventListener('click', () => {
    clearInterval(interval); 
    prevSlide();
});
}
//end of script

// scrtipt for med care
{
const form = document.getElementById('appointmentForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  // Simulate form submission success
  successMessage.style.display = 'block';
  form.reset();
});
}
//end of script

//script for classwork
{
    // Get references to the group buttons and submit button
const groupButtons = document.querySelectorAll('.groupBtn');
const submitButton = document.getElementById('submitBtn');
const downloadLink = document.getElementById('downloadLink');

// Add event listeners to the group buttons
groupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const group = button.getAttribute('data-group');
    showTable(group);
  });
});

// Show or hide the specified table
function showTable(group) {
  const allTables = document.querySelectorAll('.marksTable');
  allTables.forEach(table => {
    table.style.display = table.id === `marksTable${group}` ? 'table' : 'none';
  });

  downloadLink.style.display = 'none';
  window.scrollTo(0, 0);
}

// Add event listener to the submit button
submitButton.addEventListener('click', () => {
  const allTables = document.querySelectorAll('.marksTable');
  let validInput = true;

  allTables.forEach(table => {
    const inputs = table.querySelectorAll('.marksInput');
    inputs.forEach(input => {
      const enteredMark = parseInt(input.value);
      if (isNaN(enteredMark) || enteredMark < 0 || enteredMark > 30) {
        validInput = false;
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = '';
      }
    });
  });

  if (!validInput) {
    alert('Please enter marks between 0 and 30.');
    return;
  }

  allTables.forEach(table => {
    table.style.display = 'none';
  });

  groupButtons.forEach(button => {
    button.style.display = 'none';
  });

  downloadLink.style.display = 'block';

  const wb = XLSX.utils.book_new();
  allTables.forEach(table => {
    const tableData = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const rowData = [];
      const cells = row.querySelectorAll('td');
      cells.forEach(cell => {
        rowData.push(cell.textContent);
      });
      tableData.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, table.id);
  });

  const excelBlob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'blob' })], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const excelURL = URL.createObjectURL(excelBlob);

  downloadLink.href = excelURL;
  downloadLink.download = 'classwork_marks.xlsx';
});

}
//end of script

// sscript for rotate-message but.
{
document.addEventListener('DOMContentLoaded', function () {
  const rotateMessage = document.querySelector('.rotate-message');
  const closeRotateMessageButton = document.getElementById('closeRotateMessage');

  closeRotateMessageButton.addEventListener('click', function () {
    rotateMessage.style.display = 'none';
  });
});
}
//end of script
