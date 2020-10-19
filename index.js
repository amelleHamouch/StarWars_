var express = require("express");

var app = express();

app.use(express.static("public"));


app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(8080);

//ajax 
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        // Appelle la fonction callback en lui passant la réponse de la requête
        callback(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + url);
      }
  
  
    });
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
  }

  function asignMovieDetails(reponse){
    var films = JSON.parse(reponse);
    return films;
  }


app.get("/", function(request, response)  {

    response.render("home");
});




