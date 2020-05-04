$(document).ready(function () {
  /**
   * INIT HANDLEBARS
   */
  var source = $('#movie-template').html();
  var template = Handlebars.compile(source);

  // references
  var submitBtn = $('#submit');
  var input = $('#search');
  var movieList = $('.movie-list');
  var movieApi = 'https://api.themoviedb.org/3/search/movie';

  $(submitBtn).click(function () {
    //ottengo il valore dalla input
    var searchMovie = input.val().trim().toLowerCase();
    // chiamata Ajax
    $.ajax({
      url: movieApi,
      type: 'GET',
      data: {
        api_key:'e98fb56b8c3a7d7884b98e6cff128fde',
        query: searchMovie,
        language: 'it-IT'
      },
      success: function (res) {
        var movies = res.results;
        for(var i = 0; i < movies.length; i++) {
          var thisMovie = movies[i];
          var context = {
            original_title: thisMovie.original_title,
            title: thisMovie.title,
            original_language: thisMovie.original_language,
            vote_average: thisMovie.vote_average
          }

          console.log(context);
          
          
        }
        
        

        

        
      },
      error: function(){
        console.error('Errore chiamata Ajax');
      }
    });
    
  }); // ----- END CLICK SUBMIT
}); // ----- END DOC READY