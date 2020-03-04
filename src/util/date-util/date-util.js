
const months = Object.freeze(
["Jan","Feb","Mar",
"Apr","May","Jun",
"Jul","Aug","Sep",
"Oct","Nov","Dec"]);

export function getCurrentDate(){
    //Example : 14 Mar 2016
    let currentDate = "";
    let date = new Date();

    currentDate+=date.getDate();
    currentDate+=" ";
    currentDate+=months[date.getMonth];
    currentDate+=" ";
    currentDate+=date.getFullYear();

    return currentDate;
}

export function getCurrentTime(){

    //Example: 7:31:25
    let currentTime = "";
    let date = new Date();

    currentTime+=date.getHours();
    currentTime+=":";
    currentTime+=date.getMinutes();
    currentTime+=":";
    currentTime+=date.getSeconds();

    return currentTime;
}

export function getCurrentDateTime(){
    
    //Example 14 Mar 2016 7:31:25
    let currentDateTime = getCurrentDate()+" "
    +getCurrentTime();

    return currentDateTime;
}