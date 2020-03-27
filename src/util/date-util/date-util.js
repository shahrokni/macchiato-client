
var months = Object.freeze(["Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"]);

function getCompactCurrentDate() {

    //Example : 20200323
    let compactCurrentDate = "";
    let date = new Date();

    compactCurrentDate += date.getFullYear();

    let month = date.getMonth()+1;

    //Add month
    if (month.toString().length === 1)
        compactCurrentDate = compactCurrentDate + "0" + month;
    else
        compactCurrentDate += month;

    //Add day
    if (date.getDate().toString().length === 1)
        compactCurrentDate = compactCurrentDate + "0" + date.getDate();
    else
        compactCurrentDate += date.getDate();

    return compactCurrentDate;
}
module.exports.getCompactCurrentDate = getCompactCurrentDate;

function getCurrentDate() {
    //Example : 14 Mar 2016
    let currentDate = "";
    let date = new Date();

    currentDate += date.getDate();
    currentDate += " ";
    currentDate += months[date.getMonth()];
    currentDate += " ";
    currentDate += date.getFullYear();

    return currentDate;
}
module.exports.getCurrentDate = getCurrentDate;

function getCurrentTime() {

    //Example: 7:31:25
    let currentTime = "";
    let date = new Date();

    currentTime += date.getHours();
    currentTime += ":";
    currentTime += date.getMinutes();
    currentTime += ":";
    currentTime += date.getSeconds();

    return currentTime;
}
module.exports.getCurrentTime = getCurrentTime;

function getCurrentDateTime() {

    //Example 14 Mar 2016 7:31:25
    let currentDateTime = getCurrentDate() + " "
        + getCurrentTime();

    return currentDateTime;
}
module.exports.getCurrentDateTime = getCurrentDateTime;