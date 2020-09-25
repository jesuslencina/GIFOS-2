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
