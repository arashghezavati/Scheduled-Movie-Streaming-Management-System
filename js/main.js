
let movieObjectsArray = [];
let currentIndex = 0;
let moviePrice = 0;


const load = document.getElementById("load");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pickMovie = document.getElementById("pickMovie");
const movieInput = document.getElementById("c3Movie");
const timeInput = document.getElementById("c3Time");
const calcTotal = document.getElementById("calcTotal");
const outputPara = document.getElementById("c3Output");
const addMovie = document.getElementById("addMovie");
const newMovieNameInput = document.getElementById("c1Movie");
const newShowTimeInput = document.getElementById("c1Time");
const newPriceInput = document.getElementById("c1Price");

const apiKey = "";
const movieTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`;

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  movieObjectsArray = data.results;
  separateMovies();
  loadFirstMovie();
}

function separateMovies() {
  const newMovieObjectsArray = [];

  for (const movie of movieObjectsArray) {
    const showTimes = [];
    const prices = [];

    switch (true) {
      case (movie.vote_average >= 8):
        showTimes.push("8pm");
        prices.push(11.99);
      case (movie.vote_average >= 7):
        showTimes.push("5pm");
        prices.push(8.99);
      case (movie.vote_average >= 6):
        showTimes.push("2pm");
        prices.push(6.99);
      case (movie.vote_average >= 4):
        showTimes.push("11am");
        prices.push(4.99);

        default:
        showTimes.push("11am");
        prices.push(4.99);

    }


    for (let i = 0; i < showTimes.length; i++) {
      const showTime = showTimes[i];
      const price = prices[i];

      newMovieObjectsArray.push({
        movieName: movie.title,
        price: price,
        showTime: showTime,
      });
    }
  }

  movieObjectsArray = newMovieObjectsArray;
}

function displayMovieInfo() {
  const currentMovie = movieObjectsArray[currentIndex];
  document.getElementById("c2Movie").value = currentMovie.movieName;
  document.getElementById("c2Time").value = currentMovie.showTime;
  document.getElementById("c2Price").value = `$${currentMovie.price}`;
}

function loadFirstMovie() {
  currentIndex = 0;
  displayMovieInfo();
  updateButtons()
 
}

function loadPrevMovie() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = movieObjectsArray.length - 1;
  }
  displayMovieInfo();
  updateButtons()
 
}

function loadNextMovie() {
  currentIndex++;
  if (currentIndex > movieObjectsArray.length - 1) {
    currentIndex = 0;
  }
  displayMovieInfo();
  updateButtons()
}

function pickMovieFun() {
  const currentMovie = movieObjectsArray[currentIndex];
  movieInput.value = currentMovie.movieName;
  timeInput.value = currentMovie.showTime;
  moviePrice = currentMovie.price;

}

function addMovieToMovieObjectsArray() {
  const movieName = document.getElementById("c1Movie").value;
  const showTime = document.getElementById("c1Time").value;
  const price = document.getElementById("c1Price").value;
  
  movieObjectsArray.push({
    movieName: movieName,
    price: price,
    showTime: showTime,
  });
  movieName=''
}

load.addEventListener("click", () => {
  updateButtons()
  getMovies(movieTrending);
});

prev.addEventListener("click", loadPrevMovie);
next.addEventListener("click", loadNextMovie);
pickMovie.addEventListener("click", pickMovieFun);
calcTotal.addEventListener("click", calculateTotalPrice);
addMovie.addEventListener("click", addMovieToMovieObjectsArray);

function addMovieToMovieObjectsArray() {
  const newMovieName = newMovieNameInput.value;
  const newShowTime = newShowTimeInput.value;
  const newPrice = parseInt(newPriceInput.value);

  movieObjectsArray.push({
    movieName: newMovieName,
    showTime: newShowTime,
    price: newPrice,
  });

  displayMovieInfo();
  updateButtons()


}

function calculateTotalPrice() {
  const ticketQuantity = parseInt(document.getElementById("c3NumTickets").value);
  console.log("ticketQuantity:", ticketQuantity);
  const totalPrice = ticketQuantity * moviePrice*1.15
  const name = document.getElementById('c3Movie').value
  const time = document.getElementById('c3Time').value
  document.getElementById('c3Total').value = totalPrice.toFixed(2)

  outputPara.textContent = `${ticketQuantity} tickets (@${moviePrice} each) to see ${name} at ${time} is $${totalPrice.toFixed(2)}.`;
}

function defaultButtons() {
  prev.disabled = true;
  next.disabled = true;
  pickMovie.disabled = true;
}

function updateButtons(){
  prev.disabled = false;
  next.disabled = false;
  pickMovie.disabled = false;
}
defaultButtons();


