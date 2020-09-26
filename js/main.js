//!-----------------------------------------
//!VARIABLES
//!-----------------------------------------
var darkModeEnabled = false;
var burgerOpen = false;
var sliderOffset = 0;
var offsetS = 0;
var TrendingGIFOS = [];
var SearchedGIFOS = [];
var Iterations = 0;
//!-----------------------------------------
//!SELECTORS
//!-----------------------------------------
//*NAVBAR
//LOGO
const logo = document.querySelector(".nav_logo");
//BURGER
const NavBurger = document.querySelector(".nav_container_burger");
//UL
const NavUL = document.querySelector(".nav_container_items");
const NavULitems = document.querySelectorAll(".nav_container_items li");
//DARKMODE
const ButtonDarkMode = document.getElementById("BtnDarkMode");
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
//*FOOTER
const FacebookIcon = document.querySelectorAll(".footer_share_buttons_item")[0];
const TwitterIcon = document.querySelectorAll(".footer_share_buttons_item")[1];
const InstagramIcon = document.querySelectorAll(".footer_share_buttons_item")[2];
//!-----------------------------------------
//!LISTENERS
//!-----------------------------------------
//*DARK MODE
ButtonDarkMode.addEventListener("click", () => {enableDarkMode();});
//*CREATE BURGER'S HRs
hr1 = document.createElement("hr");
hr2 = document.createElement("hr");
NavUL.insertBefore(hr1, NavULitems[1])
NavUL.insertBefore(hr2, NavULitems[2])
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
      searchStart();
    })
  }
}
//SEARCH ACTION
SearchPurple.addEventListener("click", () => { searchStart() });
SearchBar.addEventListener("keypress", (input) => {
  if (input.charCode === 13) {
    searchStart()
  }
});
SearchBar.addEventListener("focus", () => { searchActive() });
SearchGray.addEventListener("click", () => { searchStart() });
SearchClose.addEventListener("click", () => { searchDisable(); SearchBar.value = ""; SearchSection.innerHTML = "";});


//*TRENDING ARROWS
TrendingRightArrow.addEventListener("click", () => {
  if (sliderOffset < 6) {
    sliderOffset = sliderOffset + 3;
  } else {
    sliderOffset = 0;
  }
  renderTrendingGifos(sliderOffset)
});

TrendingLeftArrow.addEventListener("click", () => {
  if (sliderOffset > 0) {
    sliderOffset = sliderOffset - 3;
  } else {
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
