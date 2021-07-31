// Meal DB Api implementation and Food Section

const recipeSearch = document.getElementById("recipe-search-icon");
const nutritionSearch = document.getElementById("nutrition-search-icon");
const recipeSearchInput = document.getElementById("recipe-search-input");
const nutritionSearchInput = document.getElementById("nutrition-search-input");
const recipeDisplay = document.getElementById("main-recipe-display");
const nutritionDisplay = document.getElementById("main-nutrition-display");
const overlayDiv = document.querySelector(".menu-wrap .menu > div > div");
const matchList = document.getElementById("match-list");

const searchMealApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const MealByFirstLetterApi =
  "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
const searchByMealIngredientApi =
  "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const searchByMealIdApi =
  "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

getMeals(searchMealApi);

async function getMeals(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  myArray = respData.meals;

  showMeals(respData.meals);
  console.log(respData);

  return respData;
}

function showMeals(meals) {
  console.log(meals);

  recipeDisplay.innerHTML = "";

  mealsArray = meals;
  displayMealsArray = [];

  for (i = 0; i < 10; i++) {
    displayMealsArray[i] = mealsArray[i];
  }

  displayMealsArray.forEach((meal, index) => {
    const recipeEl = document.createElement("div");
    recipeEl.classList.add("recipe-card");
    recipeEl.setAttribute("data-id", `${meal.idMeal}`);

    recipeEl.innerHTML = `
            <img src="${meal.strMealThumb}" alt="">
          <h1 class="card-title">
            ${meal.strMeal}
          </h1>
            <div class="recipe-info">
            ${meal.strInstructions}
          </div>
          <div class="area-tags">
            <span class="area"><span id="area-text" >Area</span> : ${meal.strArea}</span>
            <span class="tags"><span id="tags-text">Tags</span> : ${meal.strTags}</span>
          </div>
           <div class="card-btn">
           <button class="show-overlay" id="btn${index}">
              Read More...
            </button>
          </div>
            `;

    recipeDisplay.appendChild(recipeEl);
  });
}

// showMeals(searchMealApi);

recipeSearch.addEventListener("click", searchByIngredient);
recipeDisplay.addEventListener("click", showOverlay);

function searchByIngredient() {
  let searchInputText = recipeSearchInput.value.trim();
  fetch(searchByMealIngredientApi + `${searchInputText}`)
    .then((response) => response.json())
    .then((data) => {
      recipeDisplay.innerHTML = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          const recipeEl = document.createElement("div");
          recipeEl.classList.add("recipe-card");
          recipeEl.setAttribute("data-id", `${meal.idMeal}`);

          recipeEl.innerHTML = `
            <img src="${meal.strMealThumb}" alt="">
          <h1 class="card-title">
            ${meal.strMeal}
          </h1>
           <div class="card-btn1">
           <button class="show-overlay">
              Get Recipe...
            </button>
          </div>
            `;

          recipeDisplay.appendChild(recipeEl);
        });
      } else {
        recipeDisplay.innerHTML = `
          <div class = "notFound">
          <i class="far fa-frown-open"></i>
          <span>Sorry we did'nt find any meal from the given search!</span>
          </div>
          `;
      }
    });
}

function showOverlay(e) {
  e.preventDefault();
  if (e.target.classList.contains("show-overlay")) {
    let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem.dataset.id);
    fetch(searchByMealIdApi + `${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => {
        getOverlay(data.meals);
      });
    menu.style.visibility = "visible";
    scale.style.transform = "scale(1)";
    scale.style.transitionDuration = "1s";
    document.querySelector(".menu > div > div").style.opacity = "1";
    document.querySelector(".menu > div > div").style.transition =
      "opacity 0.4s ease";
    closeOverlay.style.opacity = "1";
  }
}

// var ingredient;

function getOverlay(meal) {
  meal = meal[0];
  console.log(meal.strArea);
  // ingredientsArray = [];

  // for (i = 1; i < 21; i++) {
  //     ingredient = "meal.strIngredient" + i;
  //     con(ingredient);
  //     con(ingredient);
  //     ingredientsArray.push(window[ingredient]);
  // }

  overlayDiv.innerHTML = `
    <h1 class="overlay-heading">${meal.strMeal}</h1>
          <div class="overlay-content">
            <div class="overlay-image-recipe">
              <div class="overlay-image">
                <img src="${meal.strMealThumb}" alt="">
              </div>
              <div class="overlay-recipe">
                <span>Recipe</span>
                <p>
                ${meal.strInstructions}
                </p>
              </div>
            </div>
          </div>
    `;
}

// EDMAM API Implementation

const searchForm = document.querySelector("form");
let searchQuery = "";
const APP_ID = "d7c12f9c";
const APP_KEY = "503c26661c2cb3c4069b1eeb11f927f7";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("#nutrition-search-input").value;
  fetchApi();
});

async function fetchApi() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(baseURL);
  const nutritionData = await response.json();
  generateHTML(nutritionData.hits);
  console.log(nutritionData.hits);
}

async function initialDisplay() {
  apiInitial = `https://api.edamam.com/search?q=butter&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const respInit = await fetch(apiInitial);
  const initData = await respInit.json();
  console.log(initData);
  generateHTML(initData.hits);
}

initialDisplay();

fetchApi();

function generateHTML(results) {
  nutritionDisplay.innerHTML = "";

  results.forEach((result, index) => {
    const nutritionEl = document.createElement("div");
    nutritionEl.classList.add("nutrition-card");

    nutritionEl.innerHTML = `
       <img src="${result.recipe.image}" alt="">
        <h1 class="card-title">
          ${result.recipe.label}
        </h1>
         <div class=calorie >
          <span class="calorie-txt" >Calories</span>
          <br>
          <br>
          <span class="calorie-num" >${result.recipe.calories}</span>
        </div>
        <div class="card-btn1">
            <a href="${result.recipe.uri}">
              <button class="show-overlay" id="btn${index}">
              See Recipe
            </button>
            </a>
          </div>
    `;

    nutritionDisplay.appendChild(nutritionEl);
  });
}

recipeSearchInput.addEventListener("input", () =>
  searchIngredient(recipeSearchInput.value)
);

const searchIngredient = async (searchTxt1) => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const respData = await res.json();
  // console.log(respData.meals);
  // console.log(meals.meals[0].strIngredient)

  let matches1 = respData.meals.filter((meal) => {
    const regex1 = new RegExp(`^${searchTxt1}`, "gi");
    return meal.strIngredient.match(regex1);
  });

  if (searchTxt1.length === 0) {
    matches1 = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches1);
};

const outputHtml = (matches1) => {
  if (matches1.length > 0) {
    const html = matches1
      .map(
        (match=>
          `
      <li class="list-item" >${match.strIngredient}</li>
      `
      ))
      .join("");

    matchList.innerHTML = html;
  }
};

matchList.addEventListener('click',put)

function put(e){
  e.preventDefault();
  console.log(e.target.innerHTML);
  if(e.target.classList.contains("list-item")){
  recipeSearchInput.value = e.target.innerHTML
  matchList.innerHTML = ""
  searchByIngredient();
  };
}