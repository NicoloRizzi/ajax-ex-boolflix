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

  submitBtn.click(function () {
    getMovies(template,querySearch,movieList);
  }); // ----- END CLICK SUBMIT
  
  querySearch.keyup(function (e) {
    if (e.which == 13) {
      getMovies(template,querySearch,movieList);
    }
  });
}); // ----- END DOC READY

/**
 * FUNCTION
 */
function getMovies(template,querySearch,movieList) {
  var searchMovie = querySearch.val().trim().toLowerCase();
  if(searchMovie !=="") {
    // chiamata Ajax
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      type: 'GET',
      data: {
        api_key: 'e98fb56b8c3a7d7884b98e6cff128fde',
        query: searchMovie,
        language: 'it-IT'
      },
      success: function (data) {
        var movies = data.results;
        // rimuovo contenuto precedente
        movieList.children().remove(); 
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
        querySearch.focus();
      }
    });
  } else {
    alert('Prego, inserire un valore nella ricerca');
    //pulizia del campo
    querySearch.val('');
  }
} // END FUNCTION

// FUNZIONE STAMPA STELLE
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

// FUNZIONE STAMPA BANDIERA
function printFlag (element) {
  var language = element.original_language;
  if (language=="en"){
    var flag = '<img src="img/en.svg">';
  } else if (language =="it") {
    var flag = '<img src="img/it.svg">';
  }
  return flag
}