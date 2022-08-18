
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

populateUI();

//update count and total
function updatedSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatIndex = [...selectedSeats].map(function(seat){
    return [...seats].indexOf(seat);
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

  // console.log(seatIndex);

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
 
}

//get selected seats from local storage and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach(function(seat, index){
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  movieSelect.selectedIndex = selectedMovieIndex;

}

//Movie select Event
movieSelect.addEventListener('change',(e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updatedSelectedCount();
})


//seat click Event
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updatedSelectedCount();
  }
} )

//update count and total set
updatedSelectedCount();

