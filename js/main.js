$(document).ready(function () {
  /**
   * INIT HANDLEBARS
   */

  var source = $('#movie-template').html();
  var template = Handlebars.compile(source);
  



  var html = template(context)
  $('#movie-list').append(html);
}); // ----- END DOC READY