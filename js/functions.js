//!-----------------------------------------
//!MISC
//!-----------------------------------------

//!-----------------------------------------
//!GIFOS
//!-----------------------------------------
//*GENERATE LISTENERS
function generateGifoListeners(selected) {
  //SHOW  & HIDE HOVER
  selected.addEventListener("mouseover", () => {
    selected.querySelector(".gifoHover").classList.remove("hidden");
    genenerateGifoButtons(selected);
  });
  selected.addEventListener("mouseout", () => {
    selected.querySelector(".gifoHover").classList.add("hidden");
  });
}
//*GENERATE BUTTON LISTENERS
function genenerateGifoButtons(selected) {
  //STORE BUTTON ELEMENTS
  let buttons = selected.querySelectorAll(".gifo_buttonbar img");
  //HOVER LISTENERS
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
                <img src="assets/icon-max-normal.svg" class="max" alt="Botón maximizar">
            </div>
            <p class="gifo_user">${TrendingGIFOS[i].author}</p>
            <p class="gifo_title">${TrendingGIFOS[i].title}</p>
        </div>`;
    TrendingGifosContainer.appendChild(gifo);
    generateGifoListeners(gifo);
  }
}
//!-----------------------------------------
//!SEARCH
//!-----------------------------------------
//*CALL API
function searchStart() {
  if (SearchBar.value != "") {
    //HIDE TRENDING TAGS
    document.querySelector(".hero_h3").classList.add("hidden");
    document.querySelector(".hero_trending_tags").classList.add("hidden");
    //SHOW SEARCH SECTION
    SearchSection.classList.remove("hidden");
    //SUMMON API
    search(SearchBar.value);
  }
}

//*GENERATE SEARCHED GIFOS
function fillSearchedGifos(array) {
  for (let i = 0; i < array.length; i++) {
    let newgifo = new GIFO(i, array[i].username, array[i].title, array[i].images.original.url);
    SearchedGIFOS.push(newgifo);
  }
  renderSearchedGifos(SearchedGIFOS);
}

//*RENDER SEARCHED GIFOS
function renderSearchedGifos(array) {
  SearchSection.innerHTML = "";
  //ONLY IF IT'S THE 1ST TIME
  if (offsetS == 0) {
    //LINE
    hr = document.createElement("hr");
    SearchSection.appendChild(hr);
    //H3
    h3 = document.createElement("h3");
    h3.innerHTML = SearchBar.value;
    SearchSection.appendChild(h3);
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
            <img src="assets/icon-max-normal.svg" class="max" alt="Botón maximizar">
        </div>
        <p class="gifo_user">${array[i].author}</p>
        <p class="gifo_title">${array[i].title}</p>`;
    SearchSection.appendChild(div);
    generateGifoListeners(div);
  }
}
