const searchFood = () => {
  const searchInput = document.getElementById("searchField");
  const searchText = searchInput.value;
  searchInput.value = "";
  if (searchText == "") {
    const resultContainer = document.getElementById("searchResults");
    //   resultContainer.innerHTML="";
    resultContainer.textContent = "";
    const alert = document.getElementById("invalid-input");
    alert.innerText = "Please enter a valid number";
    alert.style.color = "red";
    alert.style.textAlign = "center";
    return;
  }
  const alert = document.getElementById("invalid-input");
  alert.innerText = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoods(data));
};

const displayFoods = (mealsList) => {
  const resultContainer = document.getElementById("searchResults");
  //   resultContainer.innerHTML="";
  resultContainer.textContent = "";
  if (mealsList.meals == null) {
    const div = document.createElement("div");
    div.style.textAlign = "center";
    div.innerHTML = `
          <h1>No Results Found</h1>
          `;
    resultContainer.appendChild(div);
    return;
  }

  mealsList.meals.forEach((element) => {
    const div = document.createElement("div");
    div.classList = "col";
    div.innerHTML = `
  <div onclick="foodDetails(${element.idMeal})" class="card">
        <img src="${
          element.strMealThumb
        }" class="card-img-top mx-auto w-50" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${element.strMeal}</h5>
          <p class="card-text">
            ${element.strInstructions.slice(0, 200)}
          </p>
        </div>
      </div>
  `;
    resultContainer.appendChild(div);
  });
};

function foodDetails(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
}
const displayMealDetails = (mealdata) => {
  const singleMealContainer = document.getElementById("single-meal-details");
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <img src="${mealdata.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${mealdata.strMeal}</h5>
          <p class="card-text">
            ${mealdata.strInstructions}
          </p>
          <a href="#" class="btn btn-primary">Buy Now</a>
    `;
  singleMealContainer.appendChild(div);
};
