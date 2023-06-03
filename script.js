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

    //renia
    const pexelsApiKey = 't55JsDB4A5n1Bm1dtI74rhLK65M9abqIvvNp2gbztN4BSXjVnS2OQhrc';
    const pexelsApiUrl = "https://api.pexels.com/v1/search?query=${?city}&per_page=1";

    fetch(pexelsApiUrl, {
      headers: {
        Authorization: pexelsApiKey
      }
    })
      .then(response => response.json())
      .then(photoData => {
        if (photoData && photoData.photos && photoData.photos.length > 0) {
          const photoUrl = photoData.photos[0].src.large2x;
          document.body.style.backgroundImage = `url(${photoUrl})`;
        } else {
           document.body.style.backgroundImage =
              "url('https://source.unsplash.com/1600x900/?" + name + "')";
        }
      })
      // .catch(error => {
      //   console.error('Error:', error);
      //   document.querySelector('.img').style.backgroundImage = '';
      // });
      //telos renia



                // document.body.style.backgroundImage =
                //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
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


