// var key= db783d03fbb7cc24ba3f3d16cf4db9ce;

var searchFormEl = document.querySelector('#searchButton');
var resultContentEl = document.querySelector('#result-content');

function getParams() {
    var searchParamsArr = document.location.search.split('&');
    var query = searchParamsArr[0].split('=').pop();
    searchApi(query);
}

function printResults(resultObj) {
    console.log(resultObj);
  
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      '<strong>Temp:</strong> ' + forecast.temperature.value + '<br/>';
  
    if (resultObj.subject) {
      bodyContentEl.innerHTML +=
        '<strong>Wind:</strong> ' + resultObj.subject.join(', ') + '<br/>';
    }
    if (resultObj.description) {
      bodyContentEl.innerHTML +=
        '<strong>Humidity:</strong> ' + forecast.humidity.value;
    } 
  
    resultBody.append(titleEl, bodyContentEl);
  
    resultContentEl.append(resultCard);
  }


function searchApi(query) {
    var locQueryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=db783d03fbb7cc24ba3f3d16cf4db9ce';
  
    locQueryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + query + '&limit=1&appid=db783d03fbb7cc24ba3f3d16cf4db9ce';
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
}

function SearchSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal ;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', SearchSubmit);

getParams();