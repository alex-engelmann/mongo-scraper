// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For just the first 15 (can use data.length to grab all)
  for (var i = 0; i < 15; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class='card'>" +
      "<h5 class='card-header'>" + data[i].title + "</h5>" +
      "<div class='card-body'><p class='card-text'>" + data[i].excerpt + "</p>"
      + "<a target='_blank' href='" + data[i].link + "' class='btn btn-primary'>Link to article</a>" +
      "<button class='btn btn-primary' id='note' data-id='" + data[i]._id + "'>Make a note</button>" +
      "</div></div>"
    );
  }
});


// $(document).on("click", "#scrape", function(e){
//   e.preventDefault();
//   $.get("/scrape").then(function(res){
//     JSON.parse(res);
//     location.reload();
//   })

// })


// Whenever someone clicks a the note btn
$(document).on("click", "#note", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the note btn
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {

      // The title of the article
      $("#notes").append("<h5>" + data.title + "</h5>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button class='btn btn-primary 'data-id='" +
        data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Empty the notes section
      $("#notes").empty();
    });

  // remove the values entered in textarea for note entry
  $("#bodyinput").val("");
});
