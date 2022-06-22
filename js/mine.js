let todayName = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    todayLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    todayDesc = document.getElementById("today-description"),
    todayHumidty = document.getElementById("humidty"),
    todayWind = document.getElementById("wind"),
    todayCompass = document.getElementById("compass");


let searchBar = document.querySelector(".search input");
let currentCity = "Cairo",
    apiResponse,
    responseData,
    date = new Date(),
    weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];


let nextDayName = document.getElementsByClassName("nextDay"),
    nextDayDate = document.getElementsByClassName("nextDate"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    nextDayMaxDeg = document.getElementsByClassName("max-degree"),
    nextDayMinDeg = document.getElementsByClassName("min-degree"),
    nextDayDesc = document.getElementsByClassName("nextDay-description");




async function getWeatherData() {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=848e4c9efef048e494f100521210205&q=${currentCity}&days=3&aqi=no&alerts=no`);
    responseData = await apiResponse.json();
    displayTodayWeather();
    displayNextDaysWeather();
};

//Display Today's Data:
function displayTodayWeather() {

    let dateApi = responseData.forecast.forecastday[0].date;
    let date_components = dateApi.split("-");
    let current_day = date_components[2];

    todayName.innerHTML = weekDays[date.getDay()];
    todayDate.innerText = `${current_day} ${monthName[date.getMonth()]}`;
    todayLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = Math.round(responseData.current.temp_c);
    todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`);
    todayDesc.innerHTML = responseData.current.condition.text;
    todayHumidty.innerHTML = responseData.current.humidity;
    todayWind.innerHTML = responseData.current.wind_kph;
    todayCompass.innerText =responseData.current.wind_dir
};

//Next Day - Name Function;
function getNextDays(nextDateApi) {

   let d = new Date(nextDateApi);
   return weekDays[d.getDay()];
};

//Next Day - Month Function;
function getNextDayMonth(nextDateApi) {

    let m = new Date(nextDateApi);
    return monthName[m.getMonth()];
 };

//Display Next Days Data:
function displayNextDaysWeather() {
    for(let i = 0;  i < nextDayName.length; i++)
    {   
        let nextDateApi = responseData.forecast.forecastday[i+1].date;
        let nextDate_components = nextDateApi.split("-");
        let next_day = nextDate_components[2];

        nextDayName[i].innerHTML = getNextDays(nextDateApi);
        nextDayDate[i].innerHTML = `${next_day} ${getNextDayMonth(nextDateApi)}`;
        nextDayIcon[i].setAttribute("src", `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        nextDayMaxDeg[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.maxtemp_c);
        nextDayMinDeg[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.mintemp_c);
        nextDayDesc[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
        
    }
};

//Live Search City Function:
searchBar.addEventListener("keyup", function() {
    currentCity = searchBar.value;
    getWeatherData();
});

//Onload Calling Function:
getWeatherData();


// *****************************************************************************************

let successSubscribeScreen = document.getElementsByClassName("success-subscribe"),
    emailInput = document.getElementById("emailInput"),
    emailInputAlert = document.getElementById("emailInputAlert")
    subsBtn = document.getElementById("subsBtn"),
    closeBtn = document.getElementById("closebtn");



closeBtn.addEventListener("click",function(){

    successSubscribeScreen[0].style.display = "none";
    emailInput.value=""

});



subsBtn.addEventListener("click",function(){

    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
           
    if(regex.test(emailInput.value) == true)
    {
        emailInputAlert.classList.add("d-none");
        emailInputAlert.classList.remove("d-block");
        successSubscribeScreen[0].style.display = "flex";
        subscribeBtn.disabled = false;
    
    } 
    else 
    {
        emailInputAlert.classList.add("d-block");
        emailInputAlert.classList.remove("d-none");
        subscribeBtn.disabled = true;
    };
});

