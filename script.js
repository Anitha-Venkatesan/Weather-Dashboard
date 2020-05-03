$(".icon").on("click",function(){
 var searchTerm = $("#search-city").val();
var apiKey= "89ac10db36e375ec24dd06e7440fc3a4";
 if(searchTerm !=="")
 {
 $(".list-group").append ($('<li class="list-group-item">' +searchTerm + '</li>'));
 }
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&appid="+apiKey;
 console.log(queryURL);
 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {


        var temperature = response.main.temp
        temperature = (temperature - 273.15) * 1.80 + 32;
        $(".name").text(response.name);
        $(".temperature").text("Temperature: "+temperature+ " °F");
        $(".humidity").text("Humidity: "+response.main.humidity+ " %");
        $(".wind").text("Wind Speed: "+response.wind.speed+ " MPH");

    


    
 });

 

});