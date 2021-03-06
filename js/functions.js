//!-----------------------------------------
//!MISC
//!-----------------------------------------
//*ACTIVATE DARK MODE
function enableDarkMode() {
  if (darkModeEnabled == false) {
    console.log("Cambiando a modo nocturno");
    ButtonDarkMode.innerHTML = `<a href="#">MODO DIURNO</a>`;
    document.body.classList.add("dark");
    darkModeEnabled = true;
    //REPLACE SOURCES
    logo.src = "assets/Logo-modo-noc.svg";
    TrendingRightArrow.src = "assets/button-slider-right-md-noct.svg";
    TrendingLeftArrow.src = "assets/button-slider-left-md-noct.svg";
    FacebookIcon.src = "assets/icon_facebook_noc.svg";
    TwitterIcon.src = "assets/icon_twitter_noc.svg";
    InstagramIcon.src = "assets/icon_instagram_noc.svg";
    SearchPurple.src = "assets/icon-search-modo-noct.svg";
    //STYLES
    SearchBar.style.borderBottom = "1pt solid #9CAFC3";
    //LOCALSTORAGE
    localStorage.setItem("COLORMODE", "dark");
  } else {
    console.log("Cambiando a modo diurno");
    ButtonDarkMode.innerHTML = `<a href="#">MODO NOCTURNO</a>`;
    document.body.classList.remove("dark");
    darkModeEnabled = false;
    //REPLACE SOURCES
    logo.src = "assets/logo-desktop.svg";
    TrendingRightArrow.src = "assets/Button-Slider-right.svg";
    TrendingLeftArrow.src = "assets/button-slider-left.svg";
    FacebookIcon.src = "assets/icon_facebook.svg";
    TwitterIcon.src = "assets/icon-tw-normal.svg";
    InstagramIcon.src = "assets/icon_instagram.svg";
    SearchPurple.src = "assets/icon-search.svg";
    //STYLES
    SearchBar.style.borderBottom = "1pt solid #572EE5";
    //LOCALSSTORAGE
    localStorage.setItem("COLORMODE", "light");
  }
}
//*RETRIEVE DARK MODE FROM LOCALSTORAGE
function retrieveMode() {
  if (localStorage.getItem("COLORMODE")) {
    if (localStorage.getItem("COLORMODE") == "light") {
      darkModeEnabled = true;
    } else {
      darkModeEnabled = false;
    }
  } else {
    darkModeEnabled = true;

  }
  enableDarkMode();
}
retrieveMode();


//!-----------------------------------------
//!GIFOS
//!-----------------------------------------
//*GENERATE LISTENERS
function generateGifoListeners(selected) {
  //SHOW  & HIDE HOVER
  selected.addEventListener("mouseover", () => {
    selected.querySelector(".gifoHover").classList.remove("hidden");
  });
  selected.addEventListener("mouseout", () => {
    selected.querySelector(".gifoHover").classList.add("hidden");
  });
  //MEDIA QUERY (IF ON MOBILE, THE CLICK WILL MAXIMIZE GIFO)
  if (window.matchMedia("(max-width: 1000px)").matches) {
    selected.addEventListener("click", () => {
      maximizeGIFO(selected);
    });
  }
}
//*GENERATE BUTTON LISTENERS
function genenerateGifoButtons(selected) {
  //STORE BUTTON ELEMENTS
  let buttons = selected.querySelectorAll(".gifo_buttonbar img");

  //!CLICK LISTENERS
  //fav
  buttons[0].addEventListener("click", () => {
    console.log("Favoriteando GIFO: " + selected.querySelector(".gifo_title").innerHTML)
    favItem = new FAVGIFO(FavArray.length, selected.querySelector(".gifo_title").innerHTML, selected.querySelector(".gifo_user").innerHTML, selected.querySelector("img").src);
    buttons[0].src = "assets/icon-fav-active.svg";

  })

  //download
  buttons[1].addEventListener("click", () => {
    downloadGifo(selected.querySelector("img").src, selected.querySelector(".gifo_title").innerHTML)
  });

  //maximize
  buttons[2].addEventListener("click", () => {
    maximizeGIFO(selected);
  });
  buttons[1].addEventListener("click", () => {
    console.log(selected);
  });

  //!HOVER LISTENERS
  //fav button
  buttons[0].addEventListener("mouseover", () => {
    buttons[0].src = "assets/icon-fav-hover.svg";
  });
  buttons[0].addEventListener("mouseout", () => {
    buttons[0].src = "assets/icon-fav.svg";
  });
  //download button
  buttons[1].addEventListener("mouseover", () => {
    buttons[1].src = "assets/icon-download-hover.svg";
  });
  buttons[1].addEventListener("mouseout", () => {
    buttons[1].src = "assets/icon-download.svg";
  });

  //expand button
  buttons[2].addEventListener("mouseover", () => {
    buttons[2].src = "assets/icon-max-hover.svg";
  });
  buttons[2].addEventListener("mouseout", () => {
    buttons[2].src = "assets/icon-max-normal.svg";
  });
}

//*MAXIMIZE GIFO
function maximizeGIFO(selected) {
  let username = selected.querySelector(".gifo_user").innerHTML;
  let title = selected.querySelector(".gifo_title").innerHTML;
  let url = selected.querySelector("img").src;
  console.log("Maximizando GIFO: " + title);
  MaxSection.querySelector(".title").innerHTML = title;
  MaxSection.querySelector(".username").innerHTML = username;
  MaxSection.querySelector(".gifo").src = url;
  MaxSection.classList.remove("hidden");
  HeroSection.classList.add("hidden");
  FavSection.classList.add("hidden");
  window.scrollTo(0, 0);
  //!BUTTONS
  let buttons = MaxSection.querySelectorAll(".bottomz img");
  //fav
  buttons[0].addEventListener("click", () => {
    console.log("Favoriteando GIFO: " + selected.querySelector(".gifo_title").innerHTML)
    favItem = new FAVGIFO(FavArray.length, username, title, url);
    buttons[0].src = "assets/icon-fav-active.svg";
  })
  buttons[0].addEventListener("mouseover", () => {
    buttons[0].src = "assets/icon-fav-hover.svg";
  });
  buttons[0].addEventListener("mouseout", () => {
    buttons[0].src = "assets/icon-fav.svg";
  });
  //download 
  buttons[1].addEventListener("click", () => {
    downloadGifo(MaxSection.querySelector(".gifo").src, MaxSection.querySelector(".title").innerHTML)
  });
  buttons[1].addEventListener("mouseover", () => {
    buttons[1].src = "assets/icon-download-hover.svg";
  });
  buttons[1].addEventListener("mouseout", () => {
    buttons[1].src = "assets/icon-download.svg";
  });
}

//*MINIMIZE GIFO
MaxSection.querySelector(".closez").addEventListener("click", () => {
  MaxSection.classList.add("hidden");
  HeroSection.classList.remove("hidden");
  FavSection.classList.add("hidden");
});

//*DOWNLOAD GIFO
async function downloadGifo(url, title) {
  let blob = await fetch(url).then(img => img.blob());
  invokeSaveAsDialog(blob, title + ".gif");
}
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
  generateTagListeners();
}

//*FILL TRENDING GIFOS
function generateTrendingGifos(array) {
  for (let i = 0; i < 9; i++) {
    //CALL CONSTRUCTOR
    TrendingGIFOS[i] = new GIFO(
      i,
      array[i].username,
      array[i].title,
      array[i].images.original.url
    );
  }
}
//*RENDER TRENDING GIFOS
function renderTrendingGifos(offset) {
  TrendingGifosContainer.innerHTML = "";
  for (let i = offset; i < offset + 3; i++) {
    //GENERATE OBJECT
    gifo = document.createElement("div");
    gifo.classList.add("gifo");
    gifo.innerHTML = `<img src="${TrendingGIFOS[i].url}" alt="${TrendingGIFOS[i].title}">
        <!--OVERLAY-->
        <div class="gifoHover hidden">
            <div class="gifo_buttonbar">
                <img src="assets/icon-fav.svg" class="fav" alt="Botón favorito">
                <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
                <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
            </div>
            <p class="gifo_user">${TrendingGIFOS[i].author}</p>
            <p class="gifo_title">${TrendingGIFOS[i].title}</p>
        </div>`;
    TrendingGifosContainer.appendChild(gifo);
    generateGifoListeners(gifo);
    genenerateGifoButtons(gifo);
  }
}
//!-----------------------------------------
//!SEARCH
//!-----------------------------------------
//*AUTOCOMPLETE WITH SUGGESTIONS
function fillSearchSuggestions(array) {
  AutocompleteUL.classList.remove("hidden");
  AutocompleteUL.innerHTML = "";
  SearchBar.style.borderRadius = "27px 27px 0 0";
  SearchBar.style.borderBottom = "none";
  for (let i = 0; i < 5; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<img src="../../assets/icon-search.svg" class="suggestButton"></img><p>${array[i].title}</p>`;
    AutocompleteUL.appendChild(li);
    li.addEventListener("click", () => {
      SearchBar.value = array[i].title;
      search(array[i].title);
      hideSearchSuggestions();
      searchDisable();
      
      Iterations = 0;
      offsetS = 0;
      SearchSection.innerHTML = "";
      SearchedGIFOS = [];
      SearchSection.classList.remove("hidden");
      SearchSection.scrollIntoView()
    })
  }
}
//*HIDE AUTOCOMPLETE W. SUGGESTIONS
function hideSearchSuggestions() {
  SearchBar.style.borderRadius = "27px";
  if (darkModeEnabled == false) {
    SearchBar.style.borderBottom = "1pt solid #572EE5";
  } else {
    SearchBar.style.borderBottom = "1pt solid #9CAFC3";
  }

  AutocompleteUL.classList.add("hidden");
}

//*NAVBAR'S SEARCH INPUT
function navSearch() {
  if (window.matchMedia("(max-width: 800px)").matches) {
    console.log("Mobile user. The searchbar won't show in the Navbar");
  } else if (window.matchMedia("(max-width: 1280px)")) {
    if (document.documentElement.scrollTop > 500) {
      navSearchShow()
    } else {
      NavSearch.classList.add("hidden");
      Nav.style.borderBottom = "none";
    }
  }
}

function navSearchShow() {
  NavSearch.classList.remove("hidden");
  if (SearchBar.value != "") {
    NavSearchBar.value = SearchBar.value;
  }
  Nav.style.borderBottom = "1pt solid black";
}
//NAVBAR'S SEARCHBAR
window.addEventListener('scroll', navSearch);

//*SEARCH FOCUS
function searchActive() {
  //HIDE TRENDING TAGS
  document.querySelector(".hero_h3").classList.add("hidden");
  document.querySelector(".hero_trending_tags").classList.add("hidden");
  //HIDE & SHOW OTHER STUFF
  SearchPurple.classList.add("hidden");
  SearchClose.classList.remove("hidden");
  SearchGray.classList.remove("hidden");
  NavSearchPurple.classList.add("hidden");
  NavSearchClose.classList.remove("hidden");
  NavSearchGray.classList.remove("hidden");
}

function searchDisable() {
  document.querySelector(".hero_h3").classList.remove("hidden");
  document.querySelector(".hero_trending_tags").classList.remove("hidden");
  SearchPurple.classList.remove("hidden");
  SearchClose.classList.add("hidden");
  SearchGray.classList.add("hidden");
  NavSearchPurple.classList.remove("hidden");
  NavSearchClose.classList.add("hidden");
  NavSearchGray.classList.add("hidden");
  SearchSection.classList.add("hidden");
}

//*CALL API
function searchStart() {
  if (SearchBar.value != "") {
    //SCROLL TO SECTION
    SearchSection.scrollIntoView()
    //CLEAN
    Iterations = 0;
    offsetS = 0;
    SearchSection.innerHTML = "";
    SearchedGIFOS = [];
    searchDisable();
    //SHOW SEARCH SECTION
    SearchSection.classList.remove("hidden");
    //SUMMON API
    search(SearchBar.value);
  }
}

//*GENERATE SEARCHED GIFOS
function fillSearchedGifos(array, input) {
  for (let i = 0; i < array.length; i++) {
    let newgifo = new GIFO(
      i + offsetS,
      array[i].username,
      array[i].title,
      array[i].images.original.url
    );
    SearchedGIFOS.push(newgifo);
  }
  renderSearchedGifos(SearchedGIFOS, input);
}

//*RENDER SEARCHED GIFOS
function renderSearchedGifos(array, input) {
  console.log(input)
  //ONLY IF IT'S THE 1ST TIME
  if (offsetS == 0) {
    //CLEAN
    SearchSection.innerHTML = " ";
    SearchedGIFOS = [];
    //LINE
    hr = document.createElement("hr");
    SearchSection.appendChild(hr);
    //H3
    h3 = document.createElement("h3");
    h3.innerHTML = input;
    SearchSection.appendChild(h3);
  }
  //IF NO RESULTS

  if (array.length == 0) {
    ouch = document.createElement("div");
    ouch.style = "display:flex; flex-flow: column;";
    ouch.innerHTML = `<img src="assets/icon-busqueda-sin-resultado.svg"> <h3 class="noresult">Intenta con otra búsqueda.</h3>`;
    SearchSection.appendChild(ouch);
  }
  //RENDER
  for (let i = 0; i < array.length; i++) {
    div = document.createElement("div");
    div.classList.add("gifo");
    div.innerHTML = `<img src="${array[i].url}" alt="GIFO" class="GIFO TrendingGifo">
    <!--OVERLAY-->
    <div class="gifoHover hidden">
        <div class="gifo_buttonbar">
            <img src="assets/icon-fav.svg" class="fav" alt="Botón favorito">
            <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
            <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
        </div>
        <p class="gifo_user">${array[i].author}</p>
        <p class="gifo_title">${array[i].title}</p>`;
    SearchSection.appendChild(div);
    generateGifoListeners(div);
    genenerateGifoButtons(div);
  }
  Iterations++;

  //VIEW MORE
  if (Iterations < 3) {
    if (array.length > 11) {
      createButton();
    }
  } else if (array.length - (offsetS - 12) > 11) {
    createButton();
  }

  //CREATE ELEMENT
  function createButton() {
    let button = document.createElement("button");
    button.classList.add("verMAS");
    button.innerHTML = "VER MÁS";

    //*ACTUAL ACTION
    button.addEventListener("click", () => {
      document.querySelector(".verMAS").remove();
      offsetS = offsetS + 12;
      search(SearchBar.value);
    });
    SearchSection.append(button);
  }
}

