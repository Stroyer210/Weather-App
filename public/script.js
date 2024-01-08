var searchFormEl = document.querySelector('#searchButton');
var resultContentEl = document.querySelector('#result-content');
var inputValue = document.querySelector('.inputValue');
var name1 = document.querySelector('.name1');
var temp = document.querySelector('.temp');
var feelsLike = document.querySelector('.feelsLike');
var description = document.querySelector('.description');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var submit = document.querySelector('.submit');
var date = document.querySelector('.date1');
var img = document.querySelector('#img');
var searchedCities = document.querySelector('.searchedCities');
var listButtoms = document.querySelectorAll('.searchedCities li button')
var arrayOfSearchedThings = [];
var arrayOfCities=[];
arrayOfSearchedThings = JSON.parse(localStorage.getItem("cities"));

const weatherCity = function (city){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=3eb4b5f37d450dfaf2a3d0243165cb76&units=imperial')
  .then(response => response.json())
  .then(data => {
    var nameValue = data['name'];
    var tempValue = data['main']['temp'];
    var feelsLikeValue = data['main']['feels_like'];
    var descriptionValue = data['weather'][0]['description'];
    var windValue = data['wind']['speed'];
    var humidityValue = data['main']['humidity'];
    var image = data['weather'][0]['icon'];
    var link1= 'https://openweathermap.org/img/wn/'+image+'@4x.png';

    name1.innerHTML = nameValue;
    temp.innerHTML = "Temp: "+tempValue+"°F";
    feelsLike.innerHTML = "Feels like: "+feelsLikeValue+"°F";
    description.innerHTML = "Desciption: "+descriptionValue;
    wind.innerHTML = "Wind: "+windValue+ "MPH";
    humidity.innerHTML = "Humidity: "+humidityValue+" %";
    date.innerHTML = dayjs().format("- dddd, MMMM DD, YYYY");
    img.setAttribute('src',link1);
  })
  
  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=3eb4b5f37d450dfaf2a3d0243165cb76&units=imperial')
  .then(response => response.json())
  .then(data => {
    var day=0;
    for(i=0;i<5;i++){
      document.getElementById('card-temp'+(i+1)).innerHTML = "Temp: "+data['list'][day]['main']['temp']+"°F";
      document.getElementById('card-wind'+(i+1)).innerHTML = "Wind: "+data['list'][day]['wind']['speed']+" MPH";
      document.getElementById('card-humidity'+(i+1)).innerHTML = "Humidity: "+data['list'][day]['main']['humidity']+" %";
      document.getElementById('card-description'+(i+1)).innerHTML = "Description: "+data['list'][day]['weather'][0]['description'];
      document.getElementById('card-img'+(i+1)).src ='https://openweathermap.org/img/wn/'+data['list'][day]['weather'][0]['icon']+'@4x.png';
      document.getElementById('card-date'+(i+1)).innerHTML = dayjs().add((i+1),'day').format('dddd, MMMM DD,YYYY');
      day=day+7;
    }
  })
  .catch(err => alert("Wrong City Name!"));
}
const searchFunction = function(){
  weatherCity(inputValue.value);
  if (arrayOfSearchedThings === null) {
    arrayOfCities.push(inputValue.value.toUpperCase());
    window.localStorage.setItem("cities", JSON.stringify(arrayOfCities));
    var cityList = document.createElement("li");
    var links = document.createElement("button");
    links.classList.add("flex", "items-center", "p-2", "rounded-lg", "text-white", "hover:bg-gray-100", "hover:text-black", "group", "w-full");
    links.textContent = inputValue.value.toUpperCase();
    cityList.appendChild(links);
    searchedCities.appendChild(cityList);
    links.addEventListener("click", function() {
      weatherCity(element);
    });
  } else {
    searchedCities.textContent ="";
    arrayOfSearchedThings.push(inputValue.value.toUpperCase());
    window.localStorage.setItem("cities", JSON.stringify(arrayOfSearchedThings));
    arrayOfSearchedThings.forEach((element) => {
      var cityList = document.createElement("li");
      var links = document.createElement("button");
      links.classList.add("flex", "items-center", "p-2", "rounded-lg", "text-white", "hover:bg-gray-100", "hover:text-black", "group", "w-full");
      links.textContent = element;
      cityList.appendChild(links);
      searchedCities.appendChild(cityList);
      links.addEventListener("click", function() {
        weatherCity(element);
      });
    })}
}
searchFormEl.addEventListener('click', searchFunction);
window.addEventListener("load", (event) => {
    arrayOfSearchedThings = JSON.parse(localStorage.getItem("cities"));
    searchedCities.textContent ="";
    if(arrayOfSearchedThings !== null){
      arrayOfSearchedThings.forEach((element) => {
        var cityList = document.createElement("li");
        var links = document.createElement("button");
        links.classList.add("flex", "items-center", "p-2", "rounded-lg", "text-white", "hover:bg-gray-100", "hover:text-black", "group", "w-full");
        links.textContent = element;
        cityList.appendChild(links);
        searchedCities.appendChild(cityList);
        links.addEventListener("click", function() {weatherCity(element)});
    });
    }
  });