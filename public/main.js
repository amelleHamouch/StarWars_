// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès

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

//définition de l'image de fond par rapport au numéro d'épisode 
function setMovieImage(episode, cardImg) {
  switch (episode) {
    case 1:
      cardImg.src = "asset/starWars_img/episodeI.jpg";
      break;
    case 2:
      cardImg.src = "asset/starWars_img/episodeII.jpg";
      break;
    case 3:
      cardImg.src = "asset/starWars_img/episodeIII.jpg";
      break;
    case 4:
      cardImg.src = "asset/starWars_img/episodeIV.jpg";
      break;
    case 5:
      cardImg.src = "asset/starWars_img/episodeV.jpg";
      break;
    case 6:
      cardImg.src = "asset/starWars_img/episodeVI.jpg";
      break;
    default:
      console.log(`Pas d'image pour episode ${episode}.`);
  }
}


function redirectToMovieDetail(episode,films) {

var scrawlerTxt = films["results"][episode].opening_crawl;

var title = films["results"][episode].title;
var releaseDate = films["results"][episode].release_date;
var directorName =  films["results"][episode].director;
var container = document.getElementById("ScrawlerContainer");
if (document.getElementById("crawl")== null) {
  var crawler = document.createElement('div');
  crawler.id = "crawl";



  var filmTitle = document.createElement('h2');
  filmTitle.id = "movieTitle";
  
  var filmIllu = document.createElement('img');
  filmIllu.id = "movieIllu";


  var filmDirector = document.createElement('h4');
  filmDirector.id = "directorName";

  var release = document.createElement('h5');
  release.id ="releaseDate";
  
  var crawlerContent = document.createElement('p');
  crawlerContent.id = "crawlerTxt";

  var goBackBtn = document.createElement('btn');
  goBackBtn.id = "goBackBtn";
  goBackBtn.textContent ="^";
  goBackBtn.onclick = function () {
   document.getElementsByClassName("titleContainer").scrollIntoView();;
    
};


  crawler.appendChild(filmTitle);
  crawler.appendChild(filmIllu);
  crawler.appendChild(filmDirector);
  crawler.appendChild(release);
  crawler.appendChild(crawlerContent);
  crawler.appendChild(goBackBtn);

   setMovieImage(episode,filmIllu);


  container.appendChild(crawler);
  crawler.id = "crawl";
  crawlerContent.textContent = scrawlerTxt;
  filmTitle.textContent = title;
  filmDirector.textContent = directorName;
  release.textContent = releaseDate;

} else {

  var crawlerContent =document.getElementById("crawlerTxt")
  crawlerContent.textContent = scrawlerTxt;

  var filmTitle =document.getElementById("movieTitle")
  filmTitle.textContent = title;


  var filmDirector =document.getElementById("directorName")
  filmDirector.textContent = directorName;

  var release =document.getElementById("releaseDate")
  release.textContent = releaseDate;

  var filmIllu = document.getElementById("movieIllu");
  setMovieImage(episode,filmIllu);
}
 //scroll

  crawlerContent.scrollIntoView();
}

//Liste de tout les films avec le titre et le producteur sous forme de carte 
function afficherListe(reponse) {
  var listFilm = document.getElementById("movieContainer");
  var films = JSON.parse(reponse);
  for (var key in films["results"]) {
    var card = document.createElement('div');
    card.id = "card";
    var cardTiltle = document.createElement('h3');
    cardTiltle.textContent = films["results"][key].title;

    var cardProducer = document.createElement('p');
    cardProducer.textContent = films["results"][key].producer;

    const episode = films["results"][key].episode_id;
    var cardImg = document.createElement('img');
    setMovieImage(episode, cardImg);

    var btnSeeMore = document.createElement('button');

    btnSeeMore.onclick = function () {
        var films = JSON.parse(reponse);

      redirectToMovieDetail(episode,films);
    };


    btnSeeMore.className = "NeonBtn";
    btnSeeMore.textContent = "voir plus";


    card.appendChild(cardTiltle);
    card.appendChild(cardImg);
    card.appendChild(btnSeeMore);
    card.appendChild(cardProducer);

    listFilm.appendChild(card);
  }
}



ajaxGet("https://swapi.dev/api/films/", afficherListe);

