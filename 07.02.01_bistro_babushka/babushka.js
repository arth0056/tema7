let personer = [];
const googleData = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let filter = "alle";
document.addEventListener("DOMContentLoaded", startUp);
const detalje = document.querySelector("#pop_up");






function startUp() {
    hentData();
    knapper();


}

async function hentData() {
    console.log("fuck u");
    const response = await fetch(googleData);
    console.log(response);
    personer = await response.json();
    console.log(personer);
    visTing();

}

function knapper() {
    document.querySelectorAll(".filter").forEach(elm_knap1 => {
        elm_knap1.addEventListener("click", filtering);
    })
}


function filtering() {
    filter = this.dataset.sex;

    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })

    this.classList.add("valgt");
    visTing();
    document.querySelector("h1").textContent = this.textContent;
}



function visTing() {
    console.log("VIS ting");

    const container = document.querySelector(".data-container");
    const dyrTemplate = document.querySelector("template");
    console.log("VIS ting2");

    container.innerHTML = "";

    personer.feed.entry.forEach(ting => {

        if (filter == "alle" || filter == ting.gsx$kategori.$t) {

            console.log("hej");
            let klon = dyrTemplate.cloneNode(true).content;
            klon.querySelector("h3").textContent = ting.gsx$navn.$t;
            klon.querySelector("img").src = "pics/small/" + ting.gsx$billede.$t + "-sm.jpg";
            klon.querySelector(".p1").textContent += ting.gsx$kategori.$t;
            klon.querySelector(".p2").textContent += ting.gsx$kort.$t;
            klon.querySelector(".p3").textContent += ting.gsx$pris.$t + " kr";
            klon.querySelector(".tik").addEventListener("click", function () {
                visPopUp(ting);
            });
            container.appendChild(klon);
        }
    });

}

function visPopUp(ting) {
    detalje.classList.remove("hide");
    detalje.querySelector("#pop_up_button").addEventListener("click", () => detalje.classList.add("hide"));
    console.log(ting.gsx$navn.$t);
    detalje.querySelector(".pop_up_h1").textContent = ting.gsx$navn.$t;
    detalje.querySelector("p").textContent = ting.gsx$kategori.$t;
    detalje.querySelector("p + p").textContent = ting.gsx$lang.$t;
    detalje.querySelector("p + p + p").textContent = ting.gsx$pris.$t + " kr.";

    detalje.querySelector("img").src = "pics/large/" + ting.gsx$billede.$t + ".jpg";
}
