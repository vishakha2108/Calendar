/* eslint-disable no-undef */
const createDiv = (() => document.createElement('div'));
const createLabel = (() => document.createElement('label'));
let month = '01';
let year = '01';

function fadePopup() {
    //fading popout
    const rectangle = document.querySelector('.popup');
    const arrow = document.querySelector('.arrowleft');
    rectangle.classList.add('hide');
    arrow.classList.add('hide');
}

const createListBox = ((location, n, array, arrayValues) => {
    //function for creating a dropdown menu
    for (let i = 0; i < n; i++) {
        const option = document.createElement('option');
        option.value = arrayValues[i];
        option.text = array[i];
        location.appendChild(option);
    }
});

const getWeekDays = ((nameOfDays) => {
    //creates the name of days
    const nameOfDaysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    ' Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < 7; i++) {
        const labelDayName = document.createElement('p');
        labelDayName.classList.add('days');
        labelDayName.innerHTML = nameOfDaysArray[i];
        nameOfDays.appendChild(labelDayName);
    }
});

function displayCalendar() {
    clearExistingCalendar();
    //need to fetch date from dropdown
    month = document.querySelector('.months').value;
    year = document.querySelector('.year').value;
    const userDate = new Date(`20${year}`, month - 1);
    //getting the number of the day on which this month starts
    const day = userDate.getDay();
    //No of Days in the month
    const noOfDays = new Date(`20${year}`, month, 0).getDate();
    const count = day - 1;
    const dateButtons = document.querySelectorAll('.numeric-date');
    //making buttons visible with the correct date value
    for (let i = 1; i <= noOfDays; i++) {
        const dateButton = dateButtons[count + i];
        dateButton.textContent = i;
        dateButton.classList.remove('hide');
    }
}

const renderGlobalHeader = (() => {
    //function creating the header of the page
    //div (header) for month and year
    const container = document.querySelector('#body');
    const header = createDiv();
    header.classList.add('date-select-division');
    header.classList.add('display-flex');
    container.appendChild(header);
    //adding month and year in header
    const labelMonth = createLabel();
    header.appendChild(labelMonth);
    const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
    const arrayMonthsValues = ['01', '02', '03', '04', '05', '06', 
    '07', '08', '09', '10', '11', '12'];
    const selectMonth = document.createElement('select');
    selectMonth.classList.add('drop-down');
    selectMonth.classList.add('months');
    //As soon as user changes month render calendar again
    selectMonth.addEventListener('change', displayCalendar);
    header.appendChild(selectMonth);
    createListBox(selectMonth, 12, arrayMonths, arrayMonthsValues);
    //year
    const labelYear = createLabel();
    header.appendChild(labelYear);
    const arrayYears = [];
    const arrayYearsValues = [];
    //generating yearArray
    let yearIterator = 2001;
    while (yearIterator !== 2031) {
        const yearString = yearIterator.toString();
        arrayYears.push(yearString);
        arrayYearsValues.push(yearString.substring(2, 4));
        yearIterator += 1;
    }
    const selectYear = document.createElement('select');
    selectYear.classList.add('drop-down');
    selectYear.classList.add('year');
    selectYear.addEventListener('change', displayCalendar);
    header.appendChild(selectYear);
    createListBox(selectYear, 30, arrayYears, arrayYearsValues);
    //name of days
    const weekDaysContainer = createDiv();
    weekDaysContainer.classList.add('days-division');
    weekDaysContainer.classList.add('display-flex');
    container.append(weekDaysContainer);
    getWeekDays(weekDaysContainer);
});

function createPopup() {
    //creates the popup and hides it till button is clicked
    const popup = createDiv();
    document.querySelector('#body').appendChild(popup);
    const rectangle = document.createElement('p');
    rectangle.classList.add('popup');
    rectangle.classList.add('hide');
    const arrow = document.createElement('p');
    arrow.classList.add('arrowleft');
    arrow.classList.add('hide');
    popup.appendChild(rectangle);
    popup.appendChild(arrow);
}

function createCalendar() {
    //creates the DOM calendar elements
    const areaForDates = createDiv();
    //creating a child -- this child is created afresh on clicking display button
    areaForDates.classList.add('inner');
    document.querySelector('#body').append(areaForDates);
    for (let i = 0; i < 6; i++) {
        const division = createDiv();
        division.classList.add('week');
        division.classList.add('display-flex');
        areaForDates.append(division);
        renderHiddenButtons(division, 7);
    }
}

// eslint-disable-next-line no-unused-vars
const calendarApp = (() => {
    //Function creating the app
    const container = document.querySelector('#body');
    //heading
    const heading = document.createElement('h3');
    heading.textContent = 'Calendar';
    heading.classList.add('display-flex');
    container.appendChild(heading);
    //rendering the header
    renderGlobalHeader();
    //creating body elements
    createCalendar();
    createPopup();
    displayCalendar();
})();

function getPopup() {
    //The on click listentener of date buttons
    //Displays the popup
    const rect = document.querySelector('.popup');
    const arrow = document.querySelector('.arrowleft');
    rect.textContent = `${this.textContent}/${month}/${year}`;
    //aligning the arrow and popup
    //left of arrow = right of the button
    const x = this.getBoundingClientRect().right;
    const y = this.getBoundingClientRect().top - 5;
    arrow.style.left = `${x}px`;
    rect.style.left = `${x + 20}px`;
    arrow.style.top = `${y}px`;
    rect.style.top = `${y}px`;
    rect.classList.remove('hide');
    arrow.classList.remove('hide');
}
  
function clearExistingCalendar() {
    //clears the existing Calender
    const dateButtons = document.querySelectorAll('.numeric-date');
    dateButtons.forEach(button => { button.classList.add('hide'); });
}

function renderHiddenButtons(location, n) {
    //These buttons are recycled for dates
    for (let i = 0; i < n; i++) {
        const dateButton = document.createElement('button');
        dateButton.classList.add('hide');
        dateButton.classList.add('numeric-date');
        location.append(dateButton); 
        dateButton.addEventListener('click', getPopup);
        dateButton.addEventListener('focusout', fadePopup);        
    }
}
