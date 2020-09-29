//!LOCALSTORAGE JOB
var MyGifosArray = [];
function retrieveMyGifos() {
    if (localStorage.hasOwnProperty("MYGIFOS")) {
        MyGifosArray = JSON.parse(localStorage.getItem("MYGIFOS"))
    }
}
retrieveMyGifos();

//!CONSTRUCT MY GIFOS
function MYGIFO(index, author, title, url) {
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

//!LISTENERS
ButtonMyGifos.addEventListener("click", takeUserToMyGifos);
//!FUNCTIONS
function takeUserToMyGifos() {
    MyGifosSection.classList.remove("hidden");
    FavSection.classList.add("hidden");
    CreateSection.classList.add("hidden");
    HeroSection.classList.add("hidden");
    MaxSection.classList.add("hidden");
    SearchSection.classList.add("hidden");
}

//!RENDER MY GIFOS
function renderMyGifos() {
    MyGifosSection.innerHTML = `<img src="assets/icon-mis-gifos.svg" alt="Mis GIFOS"> 
    <h4>Mis GIFOS</h4>
    <button class="volver">VOLVER</button>`;
    document.querySelector(".volver").addEventListener("click", () => {
        MaxSection.classList.add("hidden");
        HeroSection.classList.remove("hidden");
        MyGifosSection.classList.add("hidden");
    });
    if (MyGifosArray.length == 0) {
        div = document.createElement("div");
        div.style = "display:flex; flex-direction: column; align-items: center; margin-top: 4rem"
        div.innerHTML = `<img src="assets/icon-mis-gifos-sin-contenido.svg" alt="Sin gifos">
    <p class="noresult">¡Anímate a crear tu primer GIFO!</p>`;
        MyGifosSection.appendChild(div);
    } else {
        let container = document.createElement("div");
        container.classList.add("container");
        MyGifosSection.appendChild(container);
        for (let i = 1; i < MyGifosArray.length; i++) {
            let gifou = document.createElement("div")
            gifou.classList.add("gifo");
            gifou.innerHTML = `<img src="${MyGifosArray[i].url}" alt="${MyGifosArray[i].title}">
        <!--OVERLAY-->
        <div class="gifoHover hidden">
            <div class="gifo_buttonbar">
                <img src="assets/icon-trash-normal.svg" class="delete" alt="Botón borrar">
                <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
                <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
            </div>
            <p class="gifo_user">${MyGifosArray[i].author}</p>
            <p class="gifo_title">${MyGifosArray[i].title}</p>
        </div>`;
            container.appendChild(gifou);
            //HOVER
            gifou.addEventListener("mouseover", () => {
                gifou.querySelector(".gifoHover").classList.remove("hidden");
            });
            gifou.addEventListener("mouseout", () => {
                gifou.querySelector(".gifoHover").classList.add("hidden");
            });
            let buttons = gifou.querySelectorAll(".gifo_buttonbar img");
            //MEDIA QUERY (IF ON MOBILE, THE CLICK WILL MAXIMIZE GIFO)
            if (window.matchMedia("(max-width: 1000px)").matches) {
                gifou.addEventListener("click", () => {
                    maximizeGIFO(gifou);
                });
            } 
            ////BUTTONS
            //!CLICK LISTENERS
            //remove
            buttons[0].addEventListener("click", () => {
                console.log("Borrando GIFO: " + gifou.querySelector(".gifo_title").innerHTML)
                MyGifos.splice(i, 1);
                localStorage.setItem("MYGIFOS", JSON.stringify(MyGifosArray));
                renderMyGifos();
            })

            //download
            buttons[1].addEventListener("click", () => {
                downloadGifo(MyGifosArray[i].url,MyGifosArray[i].title);
            });

            //maximize
            buttons[2].addEventListener("click", () => {
                maximizeGIFO(gifou);
            });


            //!HOVER LISTENERS
            //remove button
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
renderMyGifos();