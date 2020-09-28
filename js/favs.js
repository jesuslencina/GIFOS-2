//*ARRAY
var FavArray = [];
//*RETRIEVE FROM LOCALSTORAGE
function retrieveFavs() {
    if (localStorage.hasOwnProperty("FAVGIFOS")) {
        FavArray = JSON.parse(localStorage.getItem("FAVGIFOS"))
    } else{
       //localStorage.setItem("FAVGIFOS", [])
    }
}

retrieveFavs();

//*FAV A GIFO
function favSelected (item){
    FavArray.push(item);
    localStorage.setItem("FAVGIFOS", JSON.stringify(FavArray));
}

//*CONSTRUCT FAV GIFOS
function FAVGIFO(index, author, title, url) {
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
    
    console.log(this)
    favSelected(this);
    return this;
   
}


//*RENDER GIFOS
if(FavArray.length == 0){
    div = document.createElement("div");
    div.style = "display:flex; flex-direction: column; align-items: center; margin-top: 4rem"
    div.innerHTML = `<img src="assets/icon-fav-sin-contenido.svg" alt="Sin gifos">
    <p class="noresult">¡Guarda tu primer GIFO en Favoritos 
    para que se muestre aquí</p>`;
    FavSection.appendChild(div);
} else{
    let container = document.createElement("div");
    container.classList.add("container");
    FavSection.appendChild(container);
    for (let i = 0; i < FavArray.length; i++) {
        let gifoo = document.createElement("div")
        gifoo.classList.add("gifo");
        gifoo.innerHTML = `<img src="${FavArray[i].url}" alt="${FavArray[i].title}">
        <!--OVERLAY-->
        <div class="gifoHover hidden">
            <div class="gifo_buttonbar">
                <img src="assets/icon-trash-normal.svg" class="delete" alt="Botón borrar">
                <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
                <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
            </div>
            <p class="gifo_user">${FavArray[i].author}</p>
            <p class="gifo_title">${FavArray[i].title}</p>
        </div>`;
        container.appendChild(gifoo);

        gifoo.addEventListener("mouseover", () => {
            gifoo.querySelector(".gifoHover").classList.remove("hidden");
          });
          gifoo.addEventListener("mouseout", () => {
            gifoo.querySelector(".gifoHover").classList.add("hidden");
          });
    }
}
