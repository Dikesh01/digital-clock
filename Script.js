
const setTime = document.getElementById("setTime");
const setDay = document.getElementById("setDay");

function setClock(x){

    let intervalId = setInterval(()=>{
        // current Data factor
        const now = new Date();

        // current Hour, Minutes and Seconds
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        let am_pm = 'AM';
        let day = now.getDay();
        let date = now.getDate();
        let month = now.getMonth();
        let year = now.getFullYear();

        const dayArray = [ "Mon", "Tue", "Web", "Thus", "Fri", "Set", "Sun" ];
        const monthsArr = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];
          
        if(second < 10){
            second = '0'+ second;
        }
      
        if(minute < 10){
            minute = '0' + minute;
        }

        if(hour < 10){
            hour = '0' + hour;
        }

        if( hour > 12 ){
            hour = hour-12;
            am_pm = "PM";
        }

        const timing = hour + " : " + minute + " : " + second + " "+ am_pm;
        // Assigning value to id=setTime
        setTime.textContent = timing;
        const fullDate = dayArray[ day - 1 ]+ ", "+ date + " " + monthsArr[ month ] + " " + year;
        setDay.textContent = fullDate;
    }, x)

    return intervalId;
}

setClock(1000);