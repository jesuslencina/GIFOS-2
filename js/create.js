//!LISTENERS
//*BUTTON
const CreateButton = document.getElementById("BtnCrearGifo1");

CreateButton.addEventListener("click", () => {
    CreateButton.src = "assets/CTA-crear-gifo-active.svg"
    CreateSection.classList.remove("hidden");
    HeroSection.classList.add("hidden");
    FavSection.classList.add("hidden");
    SearchSection.classList.add("hidden");
    TrendingGifosSection.classList.add("hidden");
    MaxSection.classList.add("hidden");
});

//*SECTION
const CreateSection = document.querySelector(".createSection");