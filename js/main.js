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
  var moviesAPI = {
    url: 'https://api.themoviedb.org/3/search/movie',
    type : 'Film'
  };
  var serieAPI = {
    url: 'https://api.themoviedb.org/3/search/tv',
    type: 'Serie Tv'
  };

  
  submitBtn.click(function () {
    getResults(querySearch,movieList,template,moviesAPI);
    getResults(querySearch, movieList,template,serieAPI);
    reset(movieList);
    //getMoviesTV(template,querySearch,movieList);
  }); // ----- END CLICK SUBMIT
  
  querySearch.keyup(function (e) {
    if (e.which == 13) {
      getResults(querySearch, movieList, template, moviesAPI);
      getResults(querySearch, movieList, template, serieAPI);
      reset(movieList);
      //getMoviesTV(template,querySearch,movieList);
    }
  });
}); // ----- END DOC READY

function getResults(querySearch, movieList, template , API ) {
  var searchMovie = querySearch.val().trim().toLowerCase();
  if (searchMovie !== ""){
    $.ajax({
      url: API.url,
      type: 'GET',
      data: {
        api_key: 'e98fb56b8c3a7d7884b98e6cff128fde',
        query: searchMovie,
        language: 'it-IT',
        type: API.type
      },
      success: function (data) {
        var result = data.results;
        for (var i = 0; i < result.length; i++) {
          var thisResult = result[i];        
          if (API.type == "Film") {
            var context = {
              original_title: thisResult.original_title,
              title: thisResult.title,
              original_language: printFlag(thisResult),
              vote_average: printStar(thisResult),
              type: API.type,
              poster_path: generateImgUrl(thisResult)
            }
          } else if (API.type == "Serie Tv") {
            var context = {
              original_title: thisResult.original_name,
              title: thisResult.name,
              original_language: printFlag(thisResult),
              vote_average: printStar(thisResult),
              type: API.type,
              poster_path: generateImgUrl(thisResult)
            }
          }
          var html = template(context);
          movieList.append(html);
        }
      },
      error : function(){
        console.error('ERROR AJAX CALL')
      }
    }) // end ajaxcall

  } else {
    alert('Prego, inserire un valore nella ricerca');
    querySearch.focus();
  }
} // end function 

/**
 * FUNCTION GETMOVIES


function getMoviesTV(template,querySearch,movieList,moviesAPI, serieAPI) {
  var searchMovie = querySearch.val().trim().toLowerCase();
  if(searchMovie !=="") {
    // chiamata Ajax
    $.ajax({
      url: ,
      type: 'GET',
      data: {
        api_key: 'e98fb56b8c3a7d7884b98e6cff128fde',
        query: searchMovie,
        language: 'it-IT'
      },
      success: function (data) {
        var movies = data.results;
        // rimuovo contenuto precedente
        reset(movieList);
        for (var i = 0; i < movies.length; i++) {
          var thisMovie = movies[i];          
          var context = {
            original_title: thisMovie.original_title,
            title: thisMovie.title,
            original_language: printFlag(thisMovie),
            vote_average: printStar(thisMovie),
            type: 'Film'
          }
          var html = template(context);
          movieList.append(html);
        }
      },
      error: function () {
        console.error('Errore chiamata Ajax');
      }
    }); // end ajax call

    /**
     * AJAX CALL SERIE TV
     
    $.ajax({
      type: "GET",
      url: "https://api.themoviedb.org/3/search/tv",
      data: {
        api_key: 'e98fb56b8c3a7d7884b98e6cff128fde',
        query: searchMovie,
        language: 'it-IT'
      },
      success: function (data) {
        var series = data.results;
        for (var i = 0; i < series.length; i++){
          var thisSerie = series[i];
          var context2 = {
            original_title: thisSerie.original_name,
            title: thisSerie.name,
            vote_average: printStar(thisSerie),
            original_language: printFlag(thisSerie),
            type: 'SerieTV'
          }
          var html = template(context2);
          movieList.append(html);
        }
        
      },
      error: function (){
        console.error('Errore chiamata Ajax');
      }
    });
    // else condition
  } else {
    alert('Prego, inserire un valore nella ricerca');
    querySearch.focus();
  } // end IF
} */ // END FUNCTION



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
 * FUNZIONE CREA URL
 */
function generateImgUrl (API) {
  var url = " https://image.tmdb.org/t/p/w342";
  var result = url + API.poster_path;  
  return result
}