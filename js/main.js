//!-----------------------------------------
//!VARIABLES
//!-----------------------------------------
var darkModeEnabled = false;
var burgerOpen = false;
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
const TrendingGifosContainer = document.querySelector(".trending_gifos_gifos_container");
//!-----------------------------------------
//!GIFO OBJECTS
//!-----------------------------------------
function GIFO(index, author, title, url) {
    this.index = index;
    this.author = author;

    if(this.author == ""){
        this.author = "Anónimo"
    }

    this.title = title;

    if(this.title == ""){
        this.title = "Sin título"
    }

    this.url = url;

    return this;
}