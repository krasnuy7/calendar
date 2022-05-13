const months = ["Травень","Червень","Липень","Серпень", "Вересень", "Жовтень"];
const numberMonths = [5,6,7,8,9,10];
const days = [31,30,31,31,30,31];
const months_box = document.querySelector(".months_box");
const calendar_box = document.querySelector(".calendar_box");
const styleCalendarItems = ["orange", "blue", "purple", "red"]
let globalIndexMonth = 0
let holidays = [
{
    "holiday": "вебинар",
    "day": 14,
    "month": 5,
    "style": 0
},
{
    "holiday": "вебинар",
    "day": 15,
    "month": 5,
    "style": 0
},
{
    "holiday": "вебинар",
    "day": 17,
    "month": 5,
    "style": 0
},
{
    "holiday": "конференция",
    "day": 20,
    "month": 5,
    "style": 1
},
{
    "holiday": "вопрос-ответ",
    "day": 25,
    "month": 5,
    "style": 2
},
{
    "holiday": "встреча с экспертом",
    "day": 30,
    "month": 5,
    "style": 3
},
{
    "holiday": "вебинар",
    "day": 2,
    "month": 6,
    "style": 0
},
{
    "holiday": "конференция",
    "day": 22,
    "month": 6,
    "style": 1
},
{
    "holiday": "вопрос-ответ",
    "day": 15,
    "month": 6,
    "style": 2
},
{
    "holiday": "встреча с экспертом",
    "day": 27,
    "month": 6,
    "style": 3
},
{
    "holiday": "встреча с экспертом",
    "day": 27,
    "month": 7,
    "style": 3
},
{
    "holiday": "встреча с экспертом",
    "day": 10,
    "month": 7,
    "style": 3
},  
{
    "holiday": "встреча с экспертом",
    "day": 11,
    "month": 7,
    "style": 2
}
]

const innerMonthsInHtml = () => { 
    const inner_months = months.map((item, idx) => {
        return `
        <li class="months_item" data-indexmonth=${idx}>${item}</li>
        `
    }).join("")
    months_box.innerHTML = inner_months
    document.querySelector(".months_item").classList.add("active_month")   
    clickChooseMonth()
    clickChooseDays()
}

const inner_months_items = (indexmonth = 0) => {
    let filterHoliday = holidays.filter(item => {
        if(item.month ===  numberMonths[indexmonth]){
            return item
        }
    })
    const sortDayHoliday = sortByDay(filterHoliday)
    let calendar_item = "";
    let styleIndex = 0
    if(Number(indexmonth) === 0){
        for(let i=0; i <= 5; i++){
            calendar_item += ` <li class="calendar_item opacity_calendar_item">-</li>`
        }
    }else{
        let date = new Date(2022, numberMonths[indexmonth] - 1  , 1)
        for(let i=0; i < date.getDay() - 1; i++){
            calendar_item += ` <li class="calendar_item opacity_calendar_item">-</li>`
        }
    }

    for(let i=0; i < days[indexmonth]; i++){
        if(sortDayHoliday.length === 0) {
            calendar_item += ` <li class="calendar_item">${i + 1}</li>`
        }else{
            if(sortDayHoliday[styleIndex].day === i + 1){
                calendar_item += ` <li class="calendar_item ${styleCalendarItems[sortDayHoliday[styleIndex].style]}">${i + 1}</li>`
                if(sortDayHoliday.length - 1 > styleIndex){
                    styleIndex += 1
                }
            }else{
                calendar_item += ` <li class="calendar_item">${i + 1}</li>`
            }
        }
    }
    calendar_box.innerHTML = calendar_item
}

const clickChooseMonth = () => {
    months_box.addEventListener("click", (e) => {
        if(document.querySelector('.tooltipp') != null) document.querySelector('.tooltipp').remove()
       const indexmonth = Number(e.target.dataset.indexmonth)
       globalIndexMonth = indexmonth
       inner_months_items(indexmonth)
       document.querySelector(".active_month").classList.remove("active_month")
       e.target.classList.add("active_month")
    })
}
const clickChooseDays = () => {
    let tooltipElem;
    calendar_box.addEventListener("click", (e) => {
        if(document.querySelector('.tooltipp') != null) document.querySelector('.tooltipp').remove()
        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltipp';
        
        document.body.append(tooltipElem);
        if(e.target.className.includes('orange')){
            tooltipElem.innerHTML = 'встреча с экспертом';
        }
        if(e.target.className.includes('blue')){
            tooltipElem.innerHTML = 'вопрос-ответ';
        }
        if(e.target.className.includes('purple')){
            tooltipElem.innerHTML = 'конференция';
        }
        if(e.target.className.includes('red')){
            tooltipElem.innerHTML = 'вебинар';
        }
        // спозиционируем его сверху от аннотируемого элемента (top-center)
        let coords = e.target.getBoundingClientRect();
        let left = coords.left + (e.target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0; // не заезжать за левый край окна
  
        let top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
          top = coords.top + target.offsetHeight + 5;
        }
  
        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
    })
}


const clickCheckBox = () => {
    document.querySelectorAll(".checkboxValue").forEach((item, idx) => {
        item.onclick = function(){
            if(item.checked === false){
                document.querySelectorAll('.' + styleCalendarItems[idx]).forEach(item => {
                    item.classList.remove(styleCalendarItems[idx]);
                })
            }else{
                let filterHoliday = holidays.filter(item => {
                    if(item.month ===  numberMonths[globalIndexMonth] && item.style === idx){
                        return item
                    }
                })
                const sortDayHoliday = sortByDay(filterHoliday)
                let i = 0
                document.querySelectorAll('.calendar_item').forEach(item => {
                   if(sortDayHoliday[i].day != undefined && Number(item.innerHTML) === sortDayHoliday[i].day){
                        item.classList.add(styleCalendarItems[idx]);
                        if(sortDayHoliday.length - 1 > i){
                            i++
                        }     
                   }
                })
            }
        }
    })
}
clickCheckBox()
innerMonthsInHtml()
inner_months_items()
 

function sortByDay(arr) {
    return arr.sort((a, b) => a.day > b.day ? 1 : -1);
  }