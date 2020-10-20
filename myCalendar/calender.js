const calendar = document.getElementById('calendar');

const buttonMonthBack = document.getElementById('monthBack'); 

const buttonMonthForward = document.getElementById('monthForward');

const listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthNameAndYearNumber = document.getElementById('monthNameAndYearNumber');


// ПОЛУЧАЕМ НАЧАЛЬНЫЕ ДАННЫЕ

const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

// ФУНКЦИЯ ОТРИСОВКИ КАЛЕНДАРЯ В HTML

function drawCalender(year = currentYear, mon = currentMonth, htmlElem = calendar){

    showCurrentDate(currentMonth, currentYear); // показываем выбранную дату (месяц, год) в html 
    
    const month = mon;

    const day = new Date(year, month);

    // ничинаем рисовать таблицу-календарь

    let table = '<table class = "calendar"><tr><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th class = "weekend">SAT</th><th class = "weekend">SUN</th></tr><tr>'

    let firstDayOfMonth = getDayOfTheWeek(day);

    // рисуем пустые ячейки таблицы до начала выбранного месяца
    
    for(let i = 0; i < firstDayOfMonth - 1; i++) {
      table += '<td></td>';
    }
 
    // заполняем дни выбранного месяца

    while(day.getMonth() == month) {
      if (getDayOfTheWeek(day) === 6 || getDayOfTheWeek(day) === 7) {
        table += '<td class = "weekend">' + day.getDate() + '</td>';
      } else {
          table += '<td>' + day.getDate() + '</td>'
        };

      let k = new Date(year, month + 1, 0);
      let l = day.getDate();
      let s = k.getDate()

      if (getDayOfTheWeek(day) % 7 == 0 && l !== s) { //  перевод строки после каждого воскресенья, кроме воскресенья, которое является последним днем месяца
          table += '</tr><tr>';
      } 
    
      day.setDate(day.getDate() + 1);
    }

    // рисуем пустые ячейки, чтобы придать таблице правильную форму

    let lastDayOfMonth = getDayOfTheWeek(day) - 1;

    if(lastDayOfMonth !== 0) {
      for(let i = lastDayOfMonth; i < 7; i++) {
        table += '<td></td>';
      }
    }

    // закрываем таблицу
    
    table += '</tr></table>'

    calendar.innerHTML = table;
}

// ФУНКЦИЯ УСТАНОВКИ ВС ПОСЛЕДНИМ ДНЕМ НЕДЕЛИ

function getDayOfTheWeek(date) { 
  let d = date.getDay();
  
  if(d == 0) {
      d = 7;
    }
  
  return d;
}

// ФУНКЦИИ ПЕРЕКЛЮЧЕНИЯ (+/-) МЕСЯЦА

counterIncrement = () => {
  currentMonth += 1;
  if(currentMonth == 12) {
    currentMonth = 0;
    currentYear += 1;
  }
  drawCalender(currentYear, currentMonth, calendar);
}

counterDecrement = () => {
  currentMonth -= 1;
  if(currentMonth == -1) {
    currentMonth = 11;
    currentYear -= 1;
  }
  drawCalender(currentYear, currentMonth, calendar);
}

// ФУНКЦИИ ОТОБРАЖЕНИЯ ВЫБРАННОГО МЕСЯЦА И ГОДА

function showCurrentDate(currentMonth, currentYear) {
  monthNameAndYearNumber.innerText = `${listOfMonths[currentMonth]} ${currentYear}`;
}


buttonMonthForward.addEventListener('click', counterIncrement);
buttonMonthBack.addEventListener('click', counterDecrement);

drawCalender(currentYear, currentMonth, calendar)



