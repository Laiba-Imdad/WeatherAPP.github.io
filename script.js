getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadDoc);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function loadDoc(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let x = JSON.parse(this.responseText);
        console.log(x)
        let weather = document.getElementById('weather');
        let icon = x.weather[0].description;
        if (icon == "clear sky") {
            iconCode = ` <div class="icon sunny">
            <div class="sun">
              <div class="rays"></div>
            </div>
          </div>`
        }
        else if (icon == "few clouds") {
            iconCode = `<div class="icon sun-shower">
            <div class="cloud"></div>
            <div class="sun">
              <div class="rays"></div>
            </div>
          </div>`;
        }
        else if (icon == "scattered clouds") {
            iconCode = `<div class="icon cloudy">
            <div class="cloud"></div>
            <div class="cloud"></div>
          </div>`;
        } else if (icon == "broken clouds") {
            iconCode = `<div class="icon cloudy">
            <div class="cloud"></div>
            <div class="cloud"></div>
          </div>`;
        } else if (icon == "shower rain") {
            iconCode = `
            <div class="icon rainy">
              <div class="cloud"></div>
              <div class="rain"></div>
            </div>
            `;
        } else if (icon == "thunderstorm") {
            iconCode = `<div class="icon thunder-storm">
            <div class="cloud"></div>
            <div class="lightning">
              <div class="bolt"></div>
              <div class="bolt"></div>
            </div>
          </div>`;
        } else if (icon == "snow") {
            iconCode = `<div class="icon flurries">
            <div class="cloud"></div>
            <div class="snow">
              <div class="flake"></div>
              <div class="flake"></div>
            </div>
          </div>`;
        } else if (icon == "rain") {
            iconCode = `<div class="icon sun-shower">
            <div class="cloud"></div>
            <div class="sun">
              <div class="rays"></div>
            </div>
            <div class="rain"></div>
          </div>
          `;
        }
        else {
            iconCode = `<div class="icon cloudy">
            <div class="cloud"></div>
            <div class="cloud"></div>
          </div>`;
        }
        let temp = Math.floor(x.main.temp) + "&#8451;";
        weather.innerHTML += `<div><h3>${x.name},${x.sys.country}</h3></div>
                       <div>${iconCode}</div>
                       <h3>${temp} &nbsp;&nbsp; ${x.weather[0].main}</h3> 
                       <h3></h3>`;
    }
    xhttp.open("GET", url);
    xhttp.send();
}

