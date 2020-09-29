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
BtnStart.addEventListener("click", executeStep1,{ once: true });
//*SECTION
const CreateSection = document.querySelector(".createSection");

//!EXECUTION
//*STEP 1 (When COMENZAR is clicked)
function executeStep1() {
    BtnStart.removeEventListener("click", executeStep1);
    document.querySelector(".createSection h2").innerHTML = "¿Nos das acceso a tu cámara?";
    document.querySelector(".createSection .level_1 p").innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    document.querySelector(".createSection .level_2 .p1").style.backgroundColor = "#572EE5";
    document.querySelector(".createSection .level_2 .p1").style.color = "white";
    BtnStart.innerHTML = "OK";

    BtnStart.addEventListener("click", () => {
        getStreamAndRecord()
    },{ once: true });
}



//*STEP 2 (When OK is clicked)
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
            //*STEP 4 (When the stream is gotten)
            BtnStart.innerHTML = "GRABAR";
            BtnStart.addEventListener("click", () => {
                //*STEP 4 (When GRABAR is clicked)
                recorder.startRecording();
                BtnStart.innerHTML ="FINALIZAR";
                BtnStart.addEventListener("click",()=>{
                    //*STEP 5 (When FINALIZAR is clicked)
                    recorder.stopRecording()
                    let form = new FormData();
                    form.append('file', recorder.getBlob(), 'myGifo.gif');
                    form.append('api_key', apiKey)
                    console.log(form.get('file'))
                    fetch("https://upload.giphy.com/v1/gifs",{
                        method: 'POST',
                        body: form,
                    })
                    .then(response => {
                        return response.json();
                    })

                },{ once: true })
            },{ once: true });
            video.srcObject = stream;
            video.play();

            //!RECORDER OBJECT
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started recording')
                },
            });
        })
}



