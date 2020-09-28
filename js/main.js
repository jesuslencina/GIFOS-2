//!-----------------------------------------
//!VARIABLES
//!-----------------------------------------
var darkModeEnabled;
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
//ENTIRE NAVBAR
const Nav = document.querySelector(".nav");
//LOGO
const logo = document.querySelector(".nav_logo");
//NAVSEARCH
const NavSearch = document.querySelector(".nav_search_container");
const NavSearchBar = document.querySelector(".NAVsearchbar");
const NavSearchPurple = document.querySelector(".NAVsearchIconPurple");
const NavSearchGray = document.querySelector(".NAVsearchIconGray");
const NavSearchClose = document.querySelector(".NAVsearchClose");
//BURGER
const NavBurger = document.querySelector(".nav_container_burger");
//UL
const NavUL = document.querySelector(".nav_container_items");
const NavULitems = document.querySelectorAll(".nav_container_items li");
//DARKMODE
const ButtonDarkMode = document.getElementById("BtnDarkMode");
//FAVS
const ButtonFavs = document.getElementById("BtnFavs");
//*HERO
const HeroSection = document.querySelector(".hero");
const TrendingTags = document.querySelector(".hero_trending_tags");
//*SEARCHBAR
const SearchBar = document.querySelector(".searchbar");
const SearchPurple = document.querySelector(".searchIconPurple");
const SearchGray = document.querySelector(".searchIconGray");
const SearchClose = document.querySelector(".searchClose");
const AutocompleteUL = document.querySelector(".autocomplete");
//*MAX SECTION
const MaxSection = document.querySelector(".max");
//*FAV SECTION
const FavSection = document.querySelector(".favs")
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
ButtonDarkMode.addEventListener("click", () => {
  enableDarkMode(); if (darkModeEnabled == false) {
    NavBurger.src = "assets/close.svg";
  } else {
    NavBurger.src = "assets/close-modo-noct.svg";
  }
});
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



//*FAVS SECTION
ButtonFavs.addEventListener("click", () => {
  HeroSection.classList.add("hidden")
  FavSection.classList.remove("hidden")
  MaxSection.classList.add("hidden");
  if (burgerOpen == true) {
    NavUL.style.display = "none";
    burgerOpen = false;
  }
  //CHECK FOR DARK MODE
  if (darkModeEnabled == false) {
    NavBurger.src = "assets/burger.svg";
  } else {
    NavBurger.src = "assets/burger-modo-noct.svg";
  }
  retrieveFavs();
})

//*SEARCH
//TRENDING TAGS
function generateTagListeners() {
  for (let i = 0; i < 5; i++) {
    TrendingTags.querySelectorAll(".trending_tag")[i].addEventListener("click", () => {
      SearchBar.value = TrendingTags.querySelectorAll(".trending_tag")[i].innerHTML;
      NavSearchBar.value = TrendingTags.querySelectorAll(".trending_tag")[i].innerHTML;
      searchStart();
    })
  }
}
//SEARCH ACTION
//?HERO'S SEARCHBAR
SearchBar.addEventListener("input", () => { suggest(SearchBar.value) })
SearchPurple.addEventListener("click", () => { searchStart() });
SearchBar.addEventListener("keypress", (input) => {
  if (input.charCode === 13) {
    searchStart()
  }
});
//?NAV'S SEARCHBAR
NavSearchPurple.addEventListener("click", () => {
  SearchBar.value = NavSearchBar.value;
  searchStart();
});
NavSearchBar.addEventListener("keypress", (input) => {
  if (input.charCode === 13) {
    SearchBar.value = NavSearchBar.value;
    searchStart();
  }
});
//FOCUS & CLICK ACTION
//?HERO'S SEARCHBAR
SearchBar.addEventListener("focus", () => { searchActive() });
SearchGray.addEventListener("click", () => { searchStart() });
SearchClose.addEventListener("click", () => { searchDisable(); SearchBar.value = ""; NavSearchBar.value = ""; SearchSection.innerHTML = ""; });

//?NAV'S SEARCHBAR

NavSearchGray.addEventListener("click", () => {
  SearchBar.value = NavSearchBar.value;
  searchStart();
});
NavSearchClose.addEventListener("click", () => { searchDisable(); SearchBar.value = ""; NavSearchBar.value = ""; SearchSection.innerHTML = ""; });

//*TRENDING ARROWS
TrendingRightArrow.addEventListener("click", () => {
  if (sliderOffset < 6) {
    sliderOffset = sliderOffset + 3;
  } else {
    sliderOffset = 0;
  }
  renderTrendingGifos(sliderOffset)
});

TrendingRightArrow.addEventListener("mouseover", () => {
  TrendingRightArrow.src = "assets/button-slider-right-hover.svg"
});

TrendingRightArrow.addEventListener("mouseout", () => {
  if (darkModeEnabled == false) {
    TrendingRightArrow.src = "assets/Button-Slider-right.svg"
  } else {
    TrendingRightArrow.src = "assets/button-slider-right-md-noct.svg";
  }
});

TrendingLeftArrow.addEventListener("click", () => {
  if (sliderOffset > 0) {
    sliderOffset = sliderOffset - 3;
  } else {
    sliderOffset = 6;
  }
  renderTrendingGifos(sliderOffset)
});

TrendingLeftArrow.addEventListener("mouseover", () => {
  TrendingLeftArrow.src = "assets/button-slider-left-hover.svg"
});

TrendingLeftArrow.addEventListener("mouseout", () => {
  if (darkModeEnabled == false) {
    TrendingLeftArrow.src = "assets/button-slider-left.svg"
  } else {
    TrendingLeftArrow.src = "assets/button-slider-left-md-noct.svg";
  }
});

//*SOCIAL ICONS
FacebookIcon.addEventListener("click", () => {
  window.location.href = "https://www.facebook.com/";
});
FacebookIcon.addEventListener("mouseover", () => {
  FacebookIcon.src = "assets/icon_facebook_hover.svg";
});
FacebookIcon.addEventListener("mouseout", () => {
  if (darkModeEnabled == false) {
    FacebookIcon.src = "assets/icon_facebook.svg";
  } else {
    FacebookIcon.src = "assets/icon_facebook_noc.svg"
  }
});
TwitterIcon.addEventListener("click", () => {
  window.location.href = "https://twitter.com/home?lang=fr";
});
TwitterIcon.addEventListener("mouseover", () => {
  TwitterIcon.src = "assets/icon-twitter-hover.svg";
});
TwitterIcon.addEventListener("mouseout", () => {
  if (darkModeEnabled == false) {
    TwitterIcon.src = "assets/icon-twitter.svg";
  } else {
    TwitterIcon.src = "assets/icon_twitter_noc.svg"
  }
});
InstagramIcon.addEventListener("click", () => {
  window.location.href = "https://www.instagram.com/";
});
InstagramIcon.addEventListener("mouseover", () => {
  InstagramIcon.src = "assets/icon_instagram-hover.svg";
});
InstagramIcon.addEventListener("mouseout", () => {
  if (darkModeEnabled == false) {
    InstagramIcon.src = "assets/icon_instagram.svg";
  } else {
    InstagramIcon.src = "assets/icon_instagram_noc.svg"
  }
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
