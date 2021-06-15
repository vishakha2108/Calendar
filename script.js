/* eslint-disable no-undef */
const getDiv = (() => document.createElement('div'));
const getLabel = (() => document.createElement('label'));
let month = '01';
let year = '01';

function fade() {
    //fading popout
    const pop = document.querySelector('.popup');
    const arrow = document.querySelector('.arrowleft');
    if (pop !== null) {
    pop.remove();
    }
    if (arrow !== null) {
    arrow.remove();
    }
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

function display() {
    clear();
    //let  userDate = document.querySelector("#date").value
    //*need to fetch date from dropdown
    month = document.querySelector('.months').value;
    year = document.querySelector('.year').value;
    const userDate = new Date(`20${year}`, month - 1);
    //getting the number of the day on which this month starts
    const day = userDate.getDay();
    //No of Days in the month
    const noOfDays = new Date(`20${year}`, month, 0).getDate();
    const space = document.querySelector('.inner');
    let count = day;
    let division = getDiv();
    division.classList.add('week');
    division.classList.add('display-flex');
    space.append(division);
    //FirstLine
    hiddenButtons(division, day);
    //Dates of the Month
    for (let i = 1; i <= noOfDays; i++) {
        const dateButton = document.createElement('button');
        dateButton.textContent = i;
        dateButton.classList.add('numeric-date');
        dateButton.addEventListener('click', getPopup);
        dateButton.addEventListener('focusout', fade);
        division.append(dateButton);
        count++;
        if (count === 7) {
            //change division in case week is up
            count = 0;
            division = document.createElement('div');
            division.classList.add('week');
            division.classList.add('display-flex');
            space.append(division);
        }
    }
    //Last Line
    hiddenButtons(division, 7 - count);
}
const globalHeader = (() => {
    //function creating the header of the page
    //div (header) for month and year
    const container = document.querySelector('#body');
    const header = getDiv();
    header.classList.add('date-select-division');
    header.classList.add('display-flex');
    container.appendChild(header);
    //adding month and year in header
    const labelMonth = getLabel();
    header.appendChild(labelMonth);
    const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
    const arrayMonthsValues = ['01', '02', '03', '04', '05', '06', 
    '07', '08', '09', '10', '11', '12'];
    const selectMonth = document.createElement('select');
    selectMonth.classList.add('drop-down');
    selectMonth.classList.add('months');
    selectMonth.addEventListener('change', display);
    header.appendChild(selectMonth);
    createListBox(selectMonth, 12, arrayMonths, arrayMonthsValues);
    header.appendChild(labelMonth);
    //year
    const labelYear = getLabel();
    header.appendChild(labelYear);
    const arrayYears = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', 
    '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', 
    '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
    const arrayYearsValues = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
    const selectYear = document.createElement('select');
    selectYear.classList.add('drop-down');
    selectYear.classList.add('year');
    selectYear.addEventListener('change', display);
    header.appendChild(selectYear);
    createListBox(selectYear, 30, arrayYears, arrayYearsValues);
    //name of days
    const nameOfDays = getDiv();
    nameOfDays.classList.add('days-division');
    nameOfDays.classList.add('display-flex');
    container.append(nameOfDays);
    getWeekDays(nameOfDays);
});

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
    globalHeader();
    display();
})();


function getPopup() {
    //The on click listentener of date buttons
    //Displays the popup
    const oldRect = document.querySelector('.popup');
    if (oldRect !== null) {
        oldRect.remove();
    }
    const oldArrow = document.querySelector('.arrowleft');
    if (oldArrow !== null) {
        oldArrow.remove();
    }
    const popup = getDiv();
    //selecting the arrow and main rectangle 
    document.querySelector('#body').appendChild(popup);
    const rect = document.createElement('p');
    rect.classList.add('popup');
    const arrow = document.createElement('p');
    arrow.classList.add('arrowleft');
    popup.appendChild(rect);
    popup.appendChild(arrow);
    rect.textContent = `${this.textContent}/${month}/${year}`;
    //aligning the arrow and popup
    //left of arrow = right of the button
    const x = this.getBoundingClientRect().right;
    const y = this.getBoundingClientRect().top - 5;
    arrow.style.left = `${x}px`;
    rect.style.left = `${x + 20}px`;
    arrow.style.top = `${y}px`;
    rect.style.top = `${y}px`;
}
  
function clear() {
    //clear function - clears the space -- 
    //useful on more than one click of Display button
    const old = document.querySelector('.inner');
    //validation for first time display button click
    if (old !== null) { old.remove(); }
    //the main space
    const space = getDiv();
    //creating a child -- this child is created afresh on clicking display button
    space.classList.add('inner');
    document.querySelector('#body').append(space);
}

function hiddenButtons(location, n) {
    for (let i = 0; i < n; i++) {
        const dateButton = document.createElement('button');
        dateButton.classList.add('hide');
        dateButton.classList.add('numeric-date');
        location.append(dateButton);         
    }
}
