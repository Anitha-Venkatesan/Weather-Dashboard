$(".icon").on("click",function(){
 var searchTerm = $("#search-city").val();
 var local=localStorage.setItem("city",searchTerm);
 console.log(local);
var apiKey= "89ac10db36e375ec24dd06e7440fc3a4";
 if(searchTerm !=="")
 {
 $(".list-group").append ($('<li class="list-group-item">' +searchTerm + '</li>'));
 }
 var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&appid="+apiKey;
 var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?appid="+apiKey+"&q="+searchTerm;
 //var uvIndexURL="http://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude;
 console.log(forecastURL);

 
 
 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        var temperature = response.main.temp;
        temperature = (temperature - 273.15) * 1.80 + 32;
        temperature=Number.parseFloat(temperature).toFixed(1);
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) { 

            apiKey= "89ac10db36e375ec24dd06e7440fc3a4";
             var longitude = response.coord.lat;
             var latitude = response.coord.lon;
             var uvIndexURL="http://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+(latitude)+"&lon="+(longitude);
             console.log(uvIndexURL);
            // $(".uv").text("UV Index: "+JSON.stringify(window.myObj.value)); 

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
          
        var forecast=[];
       for(var i=0;i<response.list.length;i++)
       {
           forecast=(response.list[i].dt_txt);
           var forecastDay =forecast.split(" "); 
           if( forecastDay[1]=="00:00:00") 
           {

                var day= forecastDay[0];
                var newDate=(day.split("-").reverse().join("/"));
                newDate=moment().format('l');
                $(".day1-"+i).text(newDate+response.list[i].main.humidity);
                //console.log(".day1-"+i);
           }
               
                
           
        }
 
 });
});
//http://api.openweathermap.org/v3/uvi/{location}/{datetime}.json?appid={api_key}




