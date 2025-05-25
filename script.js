document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.getElementById("moviescontainer");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalcontent");
  const searchInput = document.getElementById("searchinput");
  let moviesData = [];

  fetch("movies.json")
    .then((response) => response.json())
    .then((data) => {
      moviesData = data;
      displayMovies(moviesData);
    })
    .catch((error) => console.error("Error fetching movies:", error));

    // Function to display movies in the container
function displayMovies(movies) {
    movieContainer.innerHTML = "";

    // Conditional class for one result
    if (movies.length === 1) {
        movieContainer.classList.add("single-result");
    } else {
        movieContainer.classList.remove("single-result");
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-thumbnail");
        movieDiv.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
            <button class="viewdetails">View Details</button>
        `;
        movieDiv.querySelector(".viewdetails").addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(movie);
        });
        movieContainer.appendChild(movieDiv);
    });
}


  function openModal(movie) {
    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <h2>${movie.title}</h2>
      <img src="${movie.image}" alt="${movie.title}" style="width: 100%; border-radius: 5px;"/>
      <p>${movie.synopis}</p>
      <p><strong>Release Year:</strong> ${movie.year}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Rating:</strong> ${movie.rating}</p>
    `;
    modal.style.display = "block";
    modalContent.querySelector(".close").addEventListener("click", closeModal);
  }

  function closeModal() {
    modal.style.display = "none";
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    if (filteredMovies.length > 0) {
      displayMovies(filteredMovies);
    } else {
      movieContainer.innerHTML = `<p>No movies found.</p>`;
    }
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
});
