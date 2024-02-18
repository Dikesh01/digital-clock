// Calender Implementation

  // taking current timezone function
const noww = new Date();
let date_div = document.getElementById("date_div");

const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"]
const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let toDay = daysArr[noww.getDay()];
let month = monthsArr[noww.getMonth()];
let date = noww.getDate();
let year = noww.getFullYear();

date_div.innerHTML = toDay + ", " + month + " " + date + ", " + year;

// ----------------------------------------------------------------
// Clock time implementation
let second = document.getElementById("second");
let minute = document.getElementById("minute");
let hour = document.getElementById("hour");
let ampm = document.getElementById("ampm");

let ss = document.getElementById("ss");
let mm = document.getElementById("mm");
let hh = document.getElementById("hh");

let sec_dot = document.querySelector(".sec_dot")
let min_dot = document.querySelector(".min_dot");
let hr_dot = document.querySelector(".hr_dot");
 
// Implement setInterval function for running at every one second
setInterval(()=>{
    // taking current timezone function
    const now = new Date();

    // taking current second, minute and hour and am/pm
    let sec = now.getSeconds();
    let min = now.getMinutes();
    let hr = now.getHours();
    let am_pm = "AM";

    // Conditions
    am_pm = (hr >= 12) ? "PM" : "AM";
    if(hr == 0){
        hr = 12;
        am_pm = "AM";
    }
    sec = (sec < 10) ? "0" + sec : sec;
    min = (min < 10) ? "0" + min : min;
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? (hr -12) : hr;
    hr = (hr < 10) ? "0" + hr : hr;

    // Import all correct values to html id
    second.innerHTML = sec;
    minute.innerHTML = min;
    hour.innerHTML = hr;
    ampm.innerHTML = am_pm;
    
    // Import all correct values for circle offset
    ss.style.strokeDashoffset = 1069 - (1069 * sec) / 60;
    mm.style.strokeDashoffset = 315 - (315 * min) / 60;
    hh.style.strokeDashoffset = 315 - (315 * hr) / 12;

    // Import all correct values for dot rotation degree
    sec_dot.style.transform = `rotate(${ sec * 6 }deg)`;
    min_dot.style.transform = `rotate(${ min * 6 }deg)`;
    hr_dot.style.transform = `rotate(${ hr * 30 }deg)`;

})

//-------------------------------------------------------------------------
// Weather details implememtation
let temp = document.getElementById("temperature");
let wind = document.getElementById("windSpeed");

function getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(fetchApi);
    }
  }

  function fetchApi(data){
    // console.log(data);
    let lat = data.coords.latitude;
    let lon = data.coords.longitude;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
    .then((res) => res.json())
    .then((data)=>{
      console.log(data);
      temp.innerHTML = data.current.temperature_2m;
      wind.innerHTML = data.current.wind_speed_10m;
      document.getElementsByClassName("displayWeather")[0].style.display = "flex";
    })
    .catch((msg)=>console.log(msg));
  }

//--------------------------------------------------------------------
// Stop Watch Implementation
let counter = document.getElementById("counter");
let sw_ss = document.getElementById("sw_ss");
let sw_dot = document.querySelector(".sw_dot");

// Stop watch buttons
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let resetBtn = document.getElementById("resetBtn");

let sw_miliSecond = 0;
let sw_second = 0;
let sw_minute = 0;
let intervalId;

function start() {

  intervalId = setInterval(() => {
    sw_miliSecond++;
    if (sw_miliSecond == 100) {
      sw_second++;
      sw_miliSecond = 0;
      playAudio();
    }
    if (sw_second == 60) {
      sw_minute++;
      sw_second = 0;
    }

    if (sw_miliSecond < 10) {
      sw_miliSecond = "0" + sw_miliSecond;
    }

    let sec = sw_second;
    let min = sw_minute;
    if (sw_second < 10) {
      sec = "0" + sw_second;
    }
    if (sw_minute < 10) {
      min = "0" + sw_minute;
    }

    counter.innerHTML = min + " : " + sec + " : " + sw_miliSecond;
    sw_ss.style.strokeDashoffset = 1069 - (1069 * sw_second) / 60;
    sw_dot.style.transform = `rotate( ${ sw_second * 6 }deg)`

    startBtn.style.display = "none";
    stopBtn.style.display = "block";
    resetBtn.style.display = "block";
  }, 10);
}

function stop() {
  clearInterval(intervalId);

  stopBtn.style.display = "none";
  startBtn.style.display = "block";
  resetBtn.style.display = "block";

  pauseAudio();
}

function reset() {
  clearInterval(intervalId);
  counter.innerHTML = "00" + " : " + "00" + " : " + "00";
  sw_miliSecond = 0;
  sw_second = 0;
  sw_minute = 0;
    // location.reload(); // it will reload the whole page
  sw_ss.style.strokeDashoffset = 1069 - (1069 * sw_second) / 60;
  sw_dot.style.transform = `rotate(0deg)`

  startBtn.style.display = "block";
  stopBtn.style.display = "none";
  resetBtn.style.display = "none";

  pauseAudio();
}

function playAudio(){
  document.getElementById("sound").play();
}

function pauseAudio(){
  document.getElementById("sound").pause();
}

 