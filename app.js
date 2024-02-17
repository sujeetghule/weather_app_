let loc = document.getElementById("loc");
let date = document.getElementById("date");
let wetherimg = document.getElementById("wetherimg");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let rain = document.getElementById("rain");
let wSpeed = document.getElementById("Wspeed");
let Curr_temp= document.getElementById("Curr_temp");

let place= prompt("Enter Avaliable City Name\n\tDelhi\n\tMumbai\n\tPune\n\tHyderabad\n\tBengaluru\n\tAhmedabad\n\tKolkata")
if (place=="Mumbai") {
    weather(19.0728 , 72.8826)
}else if (place=="Pune") {
    weather(18.5196 , 73.8554)
}
else if (place=="Delhi") {
    weather(28.6519 , 77.2315)
}
else if (place=="Hyderabad") {
    weather(17.384 , 78.4564)
}
else if (place=="Bengaluru") {
    weather(12.9719 ,77.5937)
}
else if (place=="Ahmedabad") {
    weather(23.0424 ,72.5713)
}
else if (place=="Kolkata") {
    weather(22.5499 ,88.3631)
}
else{
    alert("City Not Found")
}

async function weather(lat,lon) {
 await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=auto&forecast_days=1`)
//fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&current=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max&timezone=auto&forecast_days=1')
//fetch('test.json')
    .then((res) => {
    return res.json()
}).then((res2) => {
    console.log(res2);
    setData(res2);

}).catch((err) => {
    console.log(err);
})
}

function setData(res2){
   let W_code =res2.daily.weather_code[0]
   loc.innerText=place;

   wetherimg.style.backgroundImage=`url(./images/${W_code}.png)`
    date.innerText=(res2.daily.time[0]);
    maxTemp.innerHTML=res2.daily.temperature_2m_max[0]+"°C";
    minTemp.innerHTML=res2.daily.temperature_2m_min[0]+"°C";
    sunrise.innerText=res2.daily.sunrise[0].substring(11);
    sunset.innerText=res2.daily.sunset[0].substring(11);
    rain.innerText=res2.daily.rain_sum[0]+" mm";
    wSpeed.innerHTML=res2.daily.wind_speed_10m_max[0]+" km/h";
    Curr_temp.innerText=Math.ceil(res2.current.temperature_2m-2)+" °C"; 
}

