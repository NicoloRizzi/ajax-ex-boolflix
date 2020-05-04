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
    var searchMovie = input.val().trim().toLowerCase();
    
  }); // ----- END CLICK SUBMIT
}); // ----- END DOC READY