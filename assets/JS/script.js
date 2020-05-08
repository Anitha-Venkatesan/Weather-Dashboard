var apiKey = "89ac10db36e375ec24dd06e7440fc3a4";

$(document).ready(function () {
  var cities = JSON.parse(localStorage.getItem("city")); //null

  function getWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var todayDate = moment().format('l');
      var temperature = response.main.temp;
      temperature = (temperature - 273.15) * 1.80 + 32;
      temperature = Number.parseFloat(temperature).toFixed(1);
      var weatherIcon = response.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      $("#icon").attr("src", iconUrl).width(40).height(40);
      $("#icon").attr("alt", "weatherIcon");
      $(".name").text(response.name + " " + "(" + todayDate + ")");
      $(".temperature").text("Temperature: " + temperature + " °F");
      $(".humidity").text("Humidity: " + response.main.humidity + " %");
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      getUVIndex(response);
    });
  }

  function getUVIndex(weatherResponse) {
    var latitude = weatherResponse.coord.lat;
    var longitude = weatherResponse.coord.lon;
    var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + (latitude) + "&lon=" + (longitude);
    $.ajax({
      url: uvIndexURL,
      method: "GET"
    }).then(function (uvResponse) {
      var uvIndex = uvResponse.value;
      $(".uv").removeClass("uvLow uvModerate uvHigh uvVeryHigh uvExtreme");
      if (uvIndex < 3) {
        $(".uv").text("UV Index: " + uvIndex).addClass('uvLow');
      } else if (uvResponse.value >= 3 && uvResponse.value < 6) {
        $(".uv").text("UV Index: " + uvIndex).addClass('uvModerate');
      } else if (uvResponse.value >= 6 && uvResponse.value < 8) {
        $(".uv").text("UV Index: " + uvIndex).addClass('uvHigh');
      } else if (uvResponse.value >= 8 && uvResponse.value < 11) {
        $(".uv").text("UV Index: " + uvIndex).addClass('uvVeryHigh');
      } else if (uvResponse.value >= 11) {
        $(".uv").text("UV Index: " + uvIndex).addClass('uvExtreme');
      }
    });
  }

  function getForecast(cityName) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&q=" + cityName;
    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function (response) {
      var futureDay = [];
      var futureTemp = [];
      var futureHumid = [];
      var futureIcon = [];
      for (var i = 0; i < response.list.length; i++) {
        var forecast = (response.list[i].dt_txt);
        var forecastDay = forecast.split(" ");
        if (forecastDay[1] == "00:00:00") {
          futureDay.push(forecastDay[0]);
          futureTemp.push(response.list[i].main.temp);
          futureHumid.push(response.list[i].main.humidity);
          futureIcon.push(response.list[i].weather[0].icon);
        }
      }
      for (var j = 0; j < futureDay.length; j++) {
        var dayTemp = (futureTemp[j] - 273.15) * 1.80 + 32;
        dayTemp = Number.parseFloat(dayTemp).toFixed(1);
        var futureForecast = futureDay[j].split("-").reverse().join("/");
        var futureImage = "https://openweathermap.org/img/wn/" + futureIcon[j] + "@2x.png";
        $(".date-" + j).text(futureForecast);
        $("#icon-" + j).attr("src", futureImage).width(50).height(50);
        $(".temperature-" + j).text("Temp: " + dayTemp + " °F");
        $(".humidity-" + j).text("Humidity: " + futureHumid[j] + "%");
      }
    });
  }

  function createCityElement(cityName) {
    var cityListElement = $('<li class = "list-group-item">' + cityName + '</li>');
    cityListElement.attr('city', cityName);
    cityListElement.on("click", function () {
      var city = $(this).text();
      getWeather(city);
      getForecast(city);
    });
    $(".list-group").append(cityListElement);
  }

  renderButtons();
  $(".searchBtn").on("click", function () {
    var cityName = $("#search-city").val().trim();
    if (cityName == "") {
      return;
    }
    createCityElement(cityName);
    cities.push(cityName);
    localStorage.setItem("city", JSON.stringify(cities));
    getWeather(cityName);
    getForecast(cityName);
  });

  function renderButtons() {
    if (cities != null) {
      cities.forEach((city, index) => {
        createCityElement(city);
        if (index == cities.length - 1) {
          getWeather(city);
          getForecast(city);
        }
      });
    } else {
      cities = [];
    }
  }
});






