//!-----------------------------------------
//!MISC
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
    } else{
        NavBurger.src = "assets/close-modo-noct.svg";
    }
  } else{
      //IF ALREADY OPEN
      NavUL.style.display = "none";
      burgerOpen = false;
      //CHECK FOR DARK MODE
      if (darkModeEnabled == false) {
        NavBurger.src = "assets/burger.svg";
    } else{
        NavBurger.src = "assets/burger-modo-noct.svg";
    }
  }
});

//!-----------------------------------------
//!TRENDING
//!-----------------------------------------
//*FILL TRENDING TAGS
function fillTrendingTags(array) {
    //DELETE PLACEHOLDER
    TrendingTags.innerHTML = "";
    //CREATE & APPEND ALL ELEMENTS
    for (let i = 0; i < 5; i++) {
        let tag = document.createElement("span");
        tag.classList.add("trending_tag");
        tag.innerHTML = array[i];
        TrendingTags.appendChild(tag);
    }
}