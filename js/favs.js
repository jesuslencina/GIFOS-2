//*ARRAY
var FavArray = [];
//*RETRIEVE FROM LOCALSTORAGE
function retrieveFavs() {
    if (localStorage.hasOwnProperty("FAVGIFOS")) {
        FavArray = JSON.parse(localStorage.getItem("FAVGIFOS"))
    } else {
        //localStorage.setItem("FAVGIFOS", [])
    }
}

retrieveFavs();

//*FAV A GIFO
function favSelected(item) {
    FavArray.push(item);
    localStorage.setItem("FAVGIFOS", JSON.stringify(FavArray));
    renderFavGifos();
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
function renderFavGifos() {
    FavSection.innerHTML = `<img src="assets/icon-favoritos.svg" alt="Favoritos"> 
    <h4>Favoritos</h4>
    <button class="volver">VOLVER</button>`;
    document.querySelector(".volver").addEventListener("click", () => {
        MaxSection.classList.add("hidden");
        HeroSection.classList.remove("hidden");
        FavSection.classList.add("hidden");
        
    });
    if (FavArray.length == 0) {
        div = document.createElement("div");
        div.style = "display:flex; flex-direction: column; align-items: center; margin-top: 4rem"
        div.innerHTML = `<img src="assets/icon-fav-sin-contenido.svg" alt="Sin gifos">
    <p class="noresult">¡Guarda tu primer GIFO en Favoritos 
    para que se muestre aquí</p>`;
        FavSection.appendChild(div);
    } else {
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
            //HOVER
            gifoo.addEventListener("mouseover", () => {
                gifoo.querySelector(".gifoHover").classList.remove("hidden");
            });
            gifoo.addEventListener("mouseout", () => {
                gifoo.querySelector(".gifoHover").classList.add("hidden");
            });
            let buttons = gifoo.querySelectorAll(".gifo_buttonbar img");
            //MEDIA QUERY (IF ON MOBILE, THE CLICK WILL MAXIMIZE GIFO)
            if (window.matchMedia("(max-width: 1000px)").matches) {
                gifoo.addEventListener("click", () => {
                    maximizeGIFO(gifoo);
                });
            }
            ////BUTTONS
            //!CLICK LISTENERS
            //fav
            buttons[0].addEventListener("click", () => {
                console.log("Borrando GIFO: " + gifoo.querySelector(".gifo_title").innerHTML)
                FavArray.splice(i, 1);
                localStorage.setItem("FAVGIFOS", JSON.stringify(FavArray));
                renderFavGifos();
            })

            //download
            buttons[1].addEventListener("click", () => {
                downloadGifo(FavArray[i].url, FavArray[i].title);
            });

            //maximize
            buttons[2].addEventListener("click", () => {
                maximizeGIFO(gifoo);
            });


            //!HOVER LISTENERS
            //fav button
            buttons[0].addEventListener("mouseover", () => {
                buttons[0].src = "assets/icon-trash-hover.svg";
            });
            buttons[0].addEventListener("mouseout", () => {
                buttons[0].src = "assets/icon-trash-normal.svg";
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
    }
}
renderFavGifos();