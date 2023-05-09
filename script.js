let weather = {
    apiKey: "c082827540eee0a78fe45b93fe26fe8b",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No Location found.");
            throw new Error("No Location found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
    async function getUserData() {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      if (response.status === 200) {
        document.getElementById("ip").textContent = data.query;
        document.getElementById("city").textContent = data.city;
        document.getElementById("region").textContent = data.regionName;
        document.getElementById("country").textContent = data.country;
        document.getElementById("isp").textContent = data.isp;
      } else {
        alert("Δεν ήταν δυνατή η λήψη των πληροφοριών του χρήστη.");
      }
    }

    function detectBrowser() {
      let userAgent = navigator.userAgent;
      let browser;
      if(userAgent.match(/edg/i)){
        browser = "edge";
      }else if(userAgent.match(/firefox|fxios/i)){
        browser = "firefox";
      }else if(userAgent.match(/opr\//i)){
        browser = "opera";
      }else if(userAgent.match(/chrome|chromium|crios/i)){
        browser = "chrome";
      }else if(userAgent.match(/safari/i)){
        browser = "safari";
      }else{
        alert("Other browser");
      }
      const logo = document.querySelector(`.logos .${browser}`);
      if(logo){
        logo.style.opacity = "1";
      }
    }