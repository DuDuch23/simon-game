// import
import { canvas } from "/asset/js/script/default-sitting.js";
import { select } from "./menue.js";

// debut de la fonction
start();
//
function start() {
  // Contenu initial
  let element = `
    <div id="start-game">
      <h1>Bienvenue dans le jeu SIMON!</h1>
      <button id="start-button">START</button>
    </div>
  `;

  // Ajouter le contenu au canvas
  canvas.innerHTML = element;

  // Ajouter un gestionnaire d'événements au bouton
  const startButton = document.querySelector("#start-button");
  if (startButton) {
    startButton.addEventListener("click", () => {
      // on vide le canvas lorsque le joueur press sur le bouton starts
      canvas.innerHTML = "";
      // menue de jeu
      select();
    });
  }
}
