//!-----------------------------------------
//!VARIABLES
//!-----------------------------------------
var darkModeEnabled = false;
var burgerOpen = false;
var sliderOffset = 0;
var TrendingGIFOS = [];
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
//*TRENDING GIFOS SECTION
const TrendingGifosContainer = document.querySelector(
  ".trending_gifos_gifos_container"
);
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
