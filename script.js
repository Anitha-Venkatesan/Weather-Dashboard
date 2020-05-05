$(document).ready(function() {

 


$(".searchBtn").on("click",function(){
var searchTerm = $("#search-city").val();
var apiKey= "89ac10db36e375ec24dd06e7440fc3a4";
 if(searchTerm !=="")
 {
 $(".list-group").append ($('<li class="list-group-item">' +searchTerm + '</li>'));
 localStorage.setItem("city-"+searchTerm,searchTerm);
 
 }
 var queryURL ="https://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&appid="+apiKey;
 console.log(queryURL);
 var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid="+apiKey+"&q="+searchTerm;

 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        var todayDate=moment().format('l');
        var temperature = response.main.temp;
        temperature = (temperature - 273.15) * 1.80 + 32;
        temperature=Number.parseFloat(temperature).toFixed(1);
       
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvIndexURL="https://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+(latitude)+"&lon="+(longitude);
        console.log(uvIndexURL);
        

        $.ajax({
            url: uvIndexURL,
            method: "GET"
          }).then(function(uvResponse) {  
              var uvIndex = uvResponse.value;
              console.log(uvIndex);
             //$(".uv").text("UV Index: "+(uvResponse.value));  
               if(uvIndex <=2)
               {
                 $(".uv").text("UV Index: "+uvIndex).addClass('uvLow')  
               }
               if(uvResponse.value >=3 && uvResponse.value <=5  )
               {
                 $(".uv").text("UV Index: "+uvIndex).addClass('uvModerate');
               }
               if(uvResponse.value >=6 && uvResponse.value <=7)
               {
                 $(".uv").text("UV Index: "+uvIndex).addClass('uvHigh');
               }if(uvResponse.value >=8 && uvResponse.value <=10)
               {
                 $(".uv").text("UV Index: "+uvIndex).addClass('uvVeryHigh');
               }
              if(uvResponse.value >=11)
              {
                $(".uv").text("UV Index: "+uvIndex).addClass('uvExtreme');
              }

          });  

        var weatherIcon = response.weather[0].icon;
        var iconUrl="https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
         $("#icon").attr("src",iconUrl).width(40).height(40);
         //iconImage=$("#icon").text(iconImage);
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
        var futureIcon=[];
        for(var i=0;i<response.list.length;i++)
        {
           var forecast=(response.list[i].dt_txt);
           //console.log(forecast);
           var forecastDay=forecast.split(" ");
           if(forecastDay[1]=="00:00:00") 
           {
               futureDay.push(forecastDay[0]);
               futureTemp.push(response.list[i].main.temp);
               futureHumid.push(response.list[i].main.humidity); 
               futureIcon.push(response.list[i].weather[0].icon);   
            }
        } 
        for(var j=0;j<futureDay.length ;j++)
         {
            var dayTemp = (futureTemp[j] - 273.15) * 1.80 + 32;
            dayTemp=Number.parseFloat(dayTemp).toFixed(1);
            var futureForecast=futureDay[j].split("-").reverse().join("/");
    
            var futureImage="https://openweathermap.org/img/wn/"+futureIcon[j]+"@2x.png";
            
            $(".date-"+j).text(futureForecast); 
            $("#icon-"+j).attr("src",futureImage).width(50).height(50);
            $(".temperature-"+j).text("Temp: "+dayTemp+" °F");
            $(".humidity-"+j).text("Humidity: "+futureHumid[j]+"%");
                    
         }
       
        
 });
    
});
});

//openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=439d4b804bc8187953eb36d2a8c26a02

