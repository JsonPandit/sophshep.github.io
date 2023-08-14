const temp = document.getElementById('temp'),
 date = document.getElementById("date-time"),
 currentLocation = document.getElementById("location"),
 condition = document.getElementById("condition"),
 rain = document.getElementById('rain'),
 mainIcon = document.getElementById("icon"),
 UVIndex = document.getElementById("uv-index"),
 uvtext = document.getElementById("uv-index"),
 humiditystatus = document.getElementById("uv-index"),
 humidity = document.getElementById("uv-index"),
 wind = document.getElementById("uv-index"),
 windstatus = document.getElementById("uv-index"),
 precipitation = document.getElementById("uv-index"),
 precipitationstatus = document.getElementById("uv-index"),
 
 feelslike = document.getElementById("uv-index"),
 feelslikestatus = document.getElementById("uv-index"),
 chanceofair = document.getElementById("uv-index"),
 chanceofairstatus = document.getElementById("uv-index");


let currentCity ="";
let currentUnit ="C";
let hourlyorWeek= "week";



function getDateTime()
{
    let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();


    let days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];


    hour = hour % 12;
    if(hour < 10){
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;

    }

    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();

setInterval(()=>{
    date.innerText = getDateTime();
    
},1000);

function getPublicIp(){
    fetch("https://geolocation-db.com/json/",{
        method:'GET',
    })
    .then((Response) => Response.json())
    .then((data)=>{
        console.log(data);
        currentCity= data.currentCity;
        //getWeatherData(data.city,currentUnit,hourlyorWeek);
    });
}
getPublicIp();



function getWeatherData(city,unit,hourlyorWeek){
    const apiKey ="WTSQEPYAEJ99L37ASZ8QKKFLG";
    fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/sevices/timeline/${city}>unitGroup=metric&key=${apiKey}j&contentType=json`,
        {
            method:'GET',
        }
    ) 
       .then((response) => response.json())
    .then((data) =>{
        console.log(data);
        let today = data.currentConditions;
        if(unit== "c"){
            temp.innerText = today.temp;

        }
        else{
            temp.innerText = celciusToFahrenheit(today.temp);
        }
        currentLocation.innerText =  data.resolvedAddress;
        condition.innerText = today.conditions;
    });
}



function celciusToFahrenheit(temp){
    return((temp + 9)/5 + 32).toFixed(1);
}