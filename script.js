
//The display button on click of which the calendar will be displayed
let buttonD = document.querySelector(".display-button");

function clear(){
    //clear function - clears the space -- 
    //useful on more than one click of Display button
    let old = document.querySelector(".inner");
    //validation for first time display button click
    if(old!==null)
        old.remove();
    //the main space
    const space = document.querySelector(".date");
    //creating a child -- this child is created afresh on clicking display button
    let inner  = document.createElement("div");
    inner.classList.add("inner");
    space.append(inner);
}

let month ;
let year;

let popup = function (){
    console.log("Hi");
            //The on click listentener of date buttons
            //Displays the popup
            //selecting the arrow and main rectangle 
            let pop = document.querySelector(".popup");
            let arrow = document.querySelector(".arrowleft");
            //and making them visible
            pop.classList.remove("hide");
            arrow.classList.remove("hide");
            //Setting the value to the date selected
            pop.textContent = `${this.textContent}/${month}/${year}`;
            //aligning the arrow and popup
            //left of arrow = right of the button
            let x = this.getBoundingClientRect().right;
            let y = this.getBoundingClientRect().top-5;
            arrow.style.left = x+'px';
            pop.style.left =(x+20)+'px';
            arrow.style.top = y+'px'
            pop.style.top = y+'px';
        
        }

//fading popout      
 function fade()
 {
    let pop = document.querySelector(".popup");
    let arrow = document.querySelector(".arrowleft");
    //and making them visible
    pop.classList.add("hide");
    arrow.classList.add("hide");
 }
buttonD.addEventListener("click",function(){
    //Event listener of Display button
    clear();
    //let  userDate = document.querySelector("#date").value
    //*need to fetch date from dropdown
    month = document.querySelector("#Months").value;
    year =  document.querySelector("#Year").value;
    let userDate = new Date("20"+year,month-1);
    //getting the number of the day on which this month starts
    const day = userDate.getDay();
    //No of Days in the month
    const noOfDays = new Date("20"+year,month,0).getDate();
    const space = document.querySelector(".inner");
    let count = day;
    let division = document.createElement("div");
    division.classList.add("week");
    space.append(division);

    //FirstLine
    for(let i = 0;i<day;i++)
    {
        let dateButton = document.createElement("button");
        dateButton.classList.add("hide");
        division.append(dateButton);
        
        
    }
    //Dates of the Month
    for(let i = 1;i<=noOfDays;i++)
    {
        let dateButton = document.createElement("button");
        dateButton.textContent = i;
        dateButton.classList.add("numeric-date");
        dateButton.addEventListener("mouseover",popup)
        dateButton.addEventListener("mouseout",fade)

        division.append(dateButton);
        count++;
        if(count==7)
        {
            //change division in case week is up
            count = 0;
            division = document.createElement("div");
            division.classList.add("week");
            space.append(division);

        }
    }
    //Last Line
    while(count!=7)
    {
        let dateButton = document.createElement("button");
        dateButton.classList.add("hide");
        division.append(dateButton);
        count++;
    }
    
});


