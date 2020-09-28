/*!RECORDER OBJECT
const recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function () {
        console.log('started recording')
    },
}); */

//!LISTENERS
//*(+)BUTTON
const CreateButton = document.getElementById("BtnCrearGifo1");
CreateButton.addEventListener("click", () => {
    CreateButton.src = "assets/CTA-crear-gifo-active.svg"
    CreateSection.classList.remove("hidden");
    HeroSection.classList.add("hidden");
    FavSection.classList.add("hidden");
    SearchSection.classList.add("hidden");
    TrendingGifosSection.classList.add("hidden");
    MaxSection.classList.add("hidden");
    CreateSection.scrollIntoView()
});

//*START BUTTON
const BtnStart = document.querySelector(".start");
BtnStart.addEventListener("click", executeStep1);

//*SECTION
const CreateSection = document.querySelector(".createSection");

//*GET STREAM
async function getStreamAndRecord() {
    var video = document.createElement("video");
    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            document.querySelector(".create_window").innerHTML = "";
            document.querySelector(".create_window").append(video);
            BtnStart.innerHTML = "GRABAR";
            BtnStart.addEventListener("click", () => {
                recorder.startRecording();
                console.log("AAAA")
            });
            video.srcObject = stream;
            video.play()
        })
}

//!EXECUTION
//*STEPS
function executeStep1() {
    BtnStart.removeEventListener("click", executeStep1);
    document.querySelector(".createSection h2").innerHTML = "¿Nos das acceso a tu cámara?";
    document.querySelector(".createSection .level_1 p").innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    document.querySelector(".createSection .level_2 .p1").style.backgroundColor = "#572EE5";
    document.querySelector(".createSection .level_2 .p1").style.color = "white";
    BtnStart.innerHTML = "OK";
    
    BtnStart.addEventListener("click", () => {
        getStreamAndRecord()
    });
}
