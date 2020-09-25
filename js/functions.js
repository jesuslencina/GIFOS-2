//!-----------------------------------------
//!MISC
//!-----------------------------------------

//!-----------------------------------------
//!GIFOS
//!-----------------------------------------
function generateGifoListeners(selected) {
  //SHOW  & HIDE HOVER
  selected.addEventListener("mouseover", () => {
    selected.querySelector(".gifoHover").classList.remove("hidden");
  });
  selected.addEventListener("mouseout", () => {
    selected.querySelector(".gifoHover").classList.add("hidden");
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
