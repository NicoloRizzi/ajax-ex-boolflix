$(document).ready(function () {
  /**
   * INIT HANDLEBARS
   */
  var source = $('#movie-template').html();
  var template = Handlebars.compile(source);

  // references
  var submitBtn = $('#submit');
  var querySearch = $('#search');
  var movieList = $('.movie-list');
  var movieElement = $('li');
  var movieImg = $('li img')
  var movieText = $('li .card p')


  submitBtn.click(function () {
    getResults(querySearch, movieList, template);
    reset(movieList);
    
  }); // ----- END CLICK SUBMIT
  
  querySearch.keypress(function (e) {
    if (e.which == 13) {
      getResults(querySearch, movieList, template);
      reset(movieList);
      movieElement.hover(function () {
          // over
          movieImg.addClass('display-none');
          movieText.addClass('display-block');
        }, function () {
          // out
          movieText.removeClass('display-block');
          movieImg.removeClass('display-none');
        }
      );
      movieImg.addClass('.display-none')
    }
  });
}); // ----- END DOC READY


/**
 * AJAX API CALL
*/

function getResults(querySearch, movieList, template) {
  var query = querySearch.val().trim().toLowerCase();
  var moviesAPI = {
    url: 'https://api.themoviedb.org/3/search/movie',
    type: 'Film'
  };
  var serieAPI = {
    url: 'https://api.themoviedb.org/3/search/tv',
    type: 'Serie Tv'
  };
  if (query !== ""){
    $.ajax({
      url: moviesAPI.url,
      type: 'GET',
      data: {
        api_key: 'e98fb56b8c3a7d7884b98e6cff128fde',
        query: query,
        language: 'it-IT',
        type: moviesAPI.type
      },
      success: function (data) {
        var result = data.results; 
        print(result, moviesAPI, movieList, template);
      },
      error : function(){
        console.error('ERROR AJAX CALL');
      },
    }),
    $.ajax({
      type: "GET",
      url: serieAPI.url,
      data: {
        api_key: 'e98fb56b8c3a7d7884b98e6cff128fde',
        query: query,
        language: 'it-IT',
        type: serieAPI.type
      },
      success: function (data) {
        var result = data.results;
        print(result, serieAPI, movieList, template);
      },
      error : function () {
        console.error('ERROR AJAX CALL');
      }
    }); // end ajax call
  } else {
    alert('Prego, inserire un valore nella ricerca');
    querySearch.focus();
  } // end else condition
} // end function 

/**
 * 
 * PRINT RESULT
 */
function print (result, API, movieList, template){
  for (var i = 0; i < result.length; i++) {
    if (API.type === "Film") {
      var context = {
        original_title: result[i].original_title,
        title: result[i].title,
        original_language: printFlag(result[i]),
        vote_average: printStar(result[i]),
        type: API.type,
        poster_path: generateImgUrl(result[i]),
        overview: generateOverview(result[i])
      }
      console.log(context);
    } else if (API.type === "Serie Tv") {
      var context = {
        original_title: result[i].original_name,
        title: result[i].name,
        original_language: printFlag(result[i]),
        vote_average: printStar(result[i]),
        type: API.type,
        poster_path: generateImgUrl(result[i]),
        overview: generateOverview(result[i])
      }
    }
    var html = template(context);
    movieList.append(html);
  } // end for 
}

/**
 * FUNZIONE CLEAN UP
 */

function reset (element) {
  element.html('');
}


/**
 * 
 * FUNZIONE STAMPA STELLE VALUTAZIONE
 */
function printStar (element){
  var rating = Math.round(element.vote_average / 2);
  var stars = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

/**
 * 
 * FUNZIONE STAMPA BANDIERA IN BASE ALLA LINGUA
 */
function printFlag (element) {
  var language = element.original_language;
  if (language === "en"){
    var flag = '<img class="flag" src="img/en.svg">';
  } else if (language === "it") {
    var flag = '<img class="flag" src="img/it.svg">';
  } else {
    flag = language;
  }
  return flag;
}


/**
 * FUNZIONE CREA URL IMAGE
 */
function generateImgUrl (API) {
  var thisUrl = API.poster_path;
  if (thisUrl) {
    var url = "https://image.tmdb.org/t/p/w342";
    var result = url + thisUrl;
    return result
  } else {
    var url = 'img/no-poster.png';
    return url
  }
}

/**
 * FUNZIONE GENERA DESCRIZIONE
 */
function generateOverview (API) {
  var overview = API.overview;
  if (overview) {
    var res = overview.substr(0, 300);
    return res 
  } else {
    res = "Nessuna descrizione"
    return res
  }
}