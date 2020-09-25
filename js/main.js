//!-----------------------------------------
//!VARIABLES
//!-----------------------------------------
var darkModeEnabled = false;
var burgerOpen = false;
var sliderOffset = 0;
var offsetS = 0;
var TrendingGIFOS = [];
var SearchedGIFOS = [];
//!-----------------------------------------
//!SELECTORS
//!-----------------------------------------
//*NAVBAR
//BURGER
const NavBurger = document.querySelector(".nav_container_burger");
//UL
const NavUL = document.querySelector(".nav_container_items");
//*HERO
const TrendingTags = document.querySelector(".hero_trending_tags");
//*SEARCHBAR
const SearchBar = document.querySelector(".searchbar");
const SearchPurple = document.querySelector(".searchIconPurple");
const SearchGray = document.querySelector(".searchIconGray");
const SearchClose = document.querySelector(".searchClose");
//*SEARCH RESULTS
const SearchSection = document.querySelector(".search_results");
//*TRENDING GIFOS SECTION
const TrendingGifosContainer = document.querySelector(".trending_gifos_gifos_container");
const TrendingRightArrow = document.getElementById("right_arrow");
const TrendingLeftArrow = document.getElementById("left_arrow");
//!-----------------------------------------
//!LISTENERS
//!-----------------------------------------
//*BURGER MENU
NavBurger.addEventListener("click", () => {
  //CHECK IF CLOSED
  if (burgerOpen == false) {
    NavUL.style.display = "flex";
    burgerOpen = true;
    //CHECK FOR DARK MODE
    if (darkModeEnabled == false) {
      NavBurger.src = "assets/close.svg";
    } else {
      NavBurger.src = "assets/close-modo-noct.svg";
    }
  } else {
    //IF ALREADY OPEN
    NavUL.style.display = "none";
    burgerOpen = false;
    //CHECK FOR DARK MODE
    if (darkModeEnabled == false) {
      NavBurger.src = "assets/burger.svg";
    } else {
      NavBurger.src = "assets/burger-modo-noct.svg";
    }
  }
});

//*SEARCH
//TRENDING TAGS
function generateTagListeners() {
  for (let i = 0; i < 5; i++) {
    TrendingTags.querySelectorAll(".trending_tag")[i].addEventListener("click", () => {
      SearchBar.value = TrendingTags.querySelectorAll(".trending_tag")[i].innerHTML;
    })  
  }
}
//SEARCH ACTION
SearchPurple.addEventListener("click", () => {searchStart()});
SearchBar.addEventListener("keypress", (input) => {
  if (input.charCode === 13) {
    searchStart()
  }
});
SearchBar.addEventListener("focus", () => {searchActive()});
SearchGray.addEventListener("click", () => {searchStart()});
SearchClose.addEventListener("click", () => {searchDisable()});


//*TRENDING ARROWS
TrendingRightArrow.addEventListener("click", () => {
  if (sliderOffset < 6) {
    sliderOffset = sliderOffset + 3;
  }else{
    sliderOffset = 0;
  }
  renderTrendingGifos(sliderOffset)
});

TrendingLeftArrow.addEventListener("click", () => {
    if (sliderOffset > 0) {
        sliderOffset = sliderOffset - 3;
      }else{
        sliderOffset = 6;
      }
      renderTrendingGifos(sliderOffset)
  });
  
//!-----------------------------------------
//!GIFO OBJECTS
//!-----------------------------------------
function GIFO(index, author, title, url) {
  this.index = index;
  this.author = author;

  if (this.author == "") {
    this.author = "Anónimo";
  }

  this.title = title;

  if (this.title == "") {
    this.title = "Sin título";
  }

  this.url = url;

  return this;
}
