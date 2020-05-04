$(".icon").on("click",function(){
 var searchTerm = $("#search-city").val();
 
 //console.log(local);
var apiKey= "89ac10db36e375ec24dd06e7440fc3a4";
 if(searchTerm !=="")
 {
 $(".list-group").append ($('<li class="list-group-item">' +searchTerm + '</li>'));
 }
 var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&appid="+apiKey;
 console.log(queryURL);
 var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?appid="+apiKey+"&q="+searchTerm;
 //var uvIndexURL="http://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude;
 //console.log(forecastURL);
 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        var temperature = response.main.temp;
        temperature = (temperature - 273.15) * 1.80 + 32;
        temperature=Number.parseFloat(temperature).toFixed(1);
        var weatherIcon = response.weather[0].id;
        console.log(weatherIcon);
        var longitude = response.coord.lat;
        var latitude = response.coord.lon;
        var uvIndexURL="http://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+(latitude)+"&lon="+(longitude);
        $.ajax({
            url: uvIndexURL,
            method: "GET"
          }).then(function(uvResponse) {   
             $(".uv").text("UV Index: "+(uvResponse.value));   
          });
        var todayDate=moment().format('l');
        $(".name").text(response.name +" "+"("+todayDate+")");
        $(".temperature").text("Temperature: "+temperature+ " °F");
        $(".humidity").text("Humidity: "+response.main.humidity+ " %");
        $(".wind").text("Wind Speed: "+response.wind.speed+ " MPH");      
    
 });
$.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(response) { 
        console.log(forecastURL);
        var futureDay=[];
        var futureTemp=[];
        var futureHumid=[];
        for(var i=0;i<response.list.length;i++)
        {
           var forecast=(response.list[i].dt_txt);
           //console.log(forecast);
           var forecastDay=forecast.split(" ");
           if(forecastDay[1]=="00:00:00") 
           {
               futureDay.push(forecastDay[0]);
               
                //console.log(response.list[i]);
           
                //console.log(response.list[i].main);
                futureTemp.push(response.list[i].main.temp);
                futureHumid.push(response.list[i].main.humidity);

                
            }
                //console.log(".day1-"+i);
        } 

        for(var j=0;j<futureDay.length ;j++)
                {
                    var dayTemp = (futureTemp[j] - 273.15) * 1.80 + 32;
                    dayTemp=Number.parseFloat(dayTemp).toFixed(1);
                    var futureForecast=futureDay[j].split("-").reverse().join("/");
                    $(".date-"+j).text(futureForecast); 
                    $(".temperature-"+j).text("Temp: "+dayTemp+" °F");
                    $(".humidity-"+j).text("Humidity: "+futureHumid[j]+"%");
                    
                }
    
           
        
        
    });
    localStorage.setItem("city",searchTerm);
    
});

//http://api.openweathermap.org/v3/uvi/{location}/{datetime}.json?appid={api_key}

//[2020-05-05 00:00:00] forecastDay[0],forecastDay[1]1
//[[2020-05-06 00:00:00]9
//[2020-05-07 00:00:00]17
//[2020-05-08 00:00:00]25
//[2020-05-09 00:00:00]34

