import { sittingPage } from "/asset/js/sitting.js";
import { drawTexturesFromAtlas } from "/asset/js/image.js";
const xmlPath = "/asset/img/default.xml";
const imagePath = "/asset/img/default.png";

export function select() {
  const canvas = document.querySelector(".menu");
  // contenue du menue
  let element = `
      <ul class="game-menue"> 
        <li id="play"><button>JOUER</button></li>
        <li id="freePlay"><button>Entrainement</button></li>
        <li id="sitting"><button>Option</button></li>
      </ul>
  `;
  canvas.innerHTML += element;

  const playButton = document.querySelector("#play");
  const freePlay = document.querySelector("#freePlay");
  const sitting = document.querySelector("#sitting");

  playButton.addEventListener("click", () => {
    console.log("u want to play, let's play.");
    canvas.innerHTML = "";
    //  Appele de la fonction pour charger et dessiner
    drawTexturesFromAtlas(xmlPath, imagePath, canvas);
  });
  freePlay.addEventListener("click", () => {
    console.log("please be my guess");
  });
  sitting.addEventListener("click", () => {
    console.log("5 star for the technique support");
    sittingPage();
  });
}
