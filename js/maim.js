'use strict'
{
  const today = new Date();
  let year = today.getFullYear();//2022
  let month = today.getMonth();//5
  
  function getCarenderHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();
    for (let i = 0 ; i < n; i++ ) {
      dates.unshift(
        {
          date: d - i,
          isToday: false,
          isDisabled: true,
        });
    }
    return dates;
  }

  function getCarenderBody() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push(
        {
          date: i,
          isToday: false,
          isDisabled: false, 
         });
        }
        if (month === today.getMonth() && year === today.getFullYear() ){
          dates[today.getDate() - 1].isToday = true;
        }
    return dates;
    
  }

  function getCarenderFoot() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();
    for (let i = 1 ; i < 7 - lastDay; i++ ) {
      dates.push(
        {
          date: i,
          isToday: false,
          isDisabled: true,
        });
    }
    return dates;
  }
  
  function createCarender() {
    const tbody = document.querySelector('tbody');
    while(tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    const dates = [
      ...getCarenderHead(),
      ...getCarenderBody(),
      ...getCarenderFoot(),
    ];
    const weeks = [];
    const n = dates.length /  7;
    for (let i = 0; i < n; i++) {
      weeks.push(dates.splice(0, 7));
    }
    weeks.forEach(week => {
    const tr = document.createElement('tr');
    week.forEach(date => {
      const td = document.createElement('td');
      td.textContent = date.date;
      if(date.isToday) {
        td.classList.add('today');
      }
      if(date.isDisabled) {
        td.classList.add('disabled');
      }
      tr.appendChild(td);
    });
    document.querySelector('tbody').appendChild(tr);
    });
    document.getElementById('title').textContent
    = `${year}/${String(month + 1).padStart(2,'0')}`;
  }

  createCarender();

  document.getElementById('prev').addEventListener('click',() => {
    month--;
    if(month < 0) {
      month = 11;
      year--;
    }
    createCarender();
  });

  document.getElementById('next').addEventListener('click',() => {
    month++;
    if(month > 11) {
      month = 0;
      year++;
    }
    createCarender();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCarender();
  });
}