let submit = document.getElementById("submit");
let search = document.getElementById("search");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let searching = search.value.split(" ").join("+");
  fetch(`http://www.omdbapi.com/?s=${searching}&apikey=52fc3777`)
    .then((response) => response.json())
    .then((response) => showMovie(response.Search))
    .catch((error) => console.error("error:", error));
});

const showMovie = (data) => {
  document.querySelector(".movie").innerHTML = "";
  data.forEach((info) => {
    document.querySelector(".movie").innerHTML += `
<article>
    <div>
     <img src="${info.Poster}" onclick="OpenModal('${info.Title}')">
     </div>
     <div class="infoMovie">
     <h2 onclick="OpenModal('${info.Title}')">${info.Title} </h2></br>
     <p class="Year" >Sortie en ${info.Year}</p>
     <button id="ReadMore" onclick="OpenModal('${info.Title}')" >
     En savoir plus
     </button>
    </div>
</article>
`;
  });

  let items = document.querySelectorAll("article");

  let observer = new IntersectionObserver(
    function (observable) {
      observable.forEach((observable) => {
        if (observable.intersectionRatio > 0.5) {
          observable.target.classList.remove("not-visible");
        } else {
          observable.target.classList.add("not-visible");
        }
      });
    },
    {
      threshold: [0.5],
    }
  );

  items.forEach((item) => {
    item.classList.add("not-visible");
    observer.observe(item);
  });
};

const OpenModal = (data) => {
  fetch(`http://www.omdbapi.com/?t=${data}&apikey=52fc3777`)
    .then((response) => response.json())
    .then((response) => showModal(response))
    .catch((error) => console.error("error:", error));
};

let modal = document.getElementById("myModal");

const showModal = (data) => {
  modal.innerHTML = `
    <div class="modal-content">
    
    <div class="imgInModal">
     <img src="${data.Poster}">
     </div>
     <div class="infoMovieModal">
     <span class="close">&times;</span>
     <h2 style="color:#f50029cb;">${data.Title}</h2></br>
     <p>Date de sortie le <strong>${data.Released}</strong>, durée : <strong>${data.Runtime}</strong></p></br>
     <p>Realisé par <strong>${data.Director}</strong></p></br>
     <p><strong>Synopsis :</strong></p>
     <p> ${data.Plot}</p></br>
     <p><strong>Genre :</strong> </p>
     <p>${data.Genre}</p></br>
     <p><strong>Acteurs :</strong></p>
     <p>${data.Actors}</p></br>
     <p><strong>Production :</strong></p>
     <p>${data.Production}</p></br>
     <p><strong>Critiques :</strong></p>
    </div>
    </div>`;

  data.Ratings.forEach((note) => {
    document.querySelector(".infoMovieModal").innerHTML += `
    <p>${note.Source} ${note.Value}</p>`;
  });

  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  let span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };
};
