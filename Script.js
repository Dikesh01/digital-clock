// Clock functionalities...
const setTime = document.getElementById("setTime");
const setDay = document.getElementById("setDay");

function setClock(x) {
  const now = new Date();

  // current Hour, Minutes and Seconds
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let am_pm = "AM";
  let day = now.getDay();
  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();

  // All week days Array
  const dayArray = ["Sun", "Mon", "Tue", "Web", "Thus", "Fri", "Sat"];
  // All months Array
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (hour > 12) {
    hour = hour - 12;
    am_pm = "PM";
  }

  if (second < 10) {
    second = "0" + second;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (hour < 10) {
    hour = "0" + hour;
  }

  const timing = hour + " : " + minute + " : " + second + " " + am_pm;
  // Assigning value to id=setTime
  setTime.textContent = timing;
  const fullDate =
    dayArray[day] + ", " + monthsArr[month] + " " + date + ", " + year;
  setDay.textContent = fullDate;
}
setInterval(setClock, 1000);


// Stop watch functionalities
const counter = document.getElementById("counter");

let miliSecond = 0;
let second = 0;
let minute = 0;
let intervalId;

function start() {
  intervalId = setInterval(() => {
    miliSecond++;
    if (miliSecond == 100) {
      second++;
      miliSecond = 0;
    }
    if (second == 60) {
      minute++;
      second = 0;
    }

    if (miliSecond < 10) {
      miliSecond = "0" + miliSecond;
    }

    let sec = second;
    let min = minute;
    if (second < 10) {
      sec = "0" + second;
    }
    if (minute < 10) {
      min = "0" + minute;
    }

    counter.innerHTML = min + " : " + sec + " : " + miliSecond;
  }, 10);
}

function stop() {
  clearInterval(intervalId);
}

function reset() {
  clearInterval(intervalId);
  counter.innerHTML = "00" + " : " + "00" + " : " + "00";
  miliSecond = 0;
  second = 0;
  minute = 0;
    // location.reload();
}
