import { sittingPlayer } from "./default-sitting.js";

// Charger le fichier XML
async function loadXMLFile(xmlPath) {
  const response = await fetch(xmlPath);
  const xmlText = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(xmlText, "application/xml");
}

// Charger l'image en PNG
function loadImage(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

// Utiliser des éléments HTML pour afficher les textures
export async function drawTexturesFromAtlas(xmlPath, imagePath, container) {
  // Charger le fichier XML et l'image
  const xmlDoc = await loadXMLFile(xmlPath);
  const image = await loadImage(imagePath);
  const widthWindows = window.innerWidth;
  const heightWindows = window.innerHeight;

  // Récupérer les sous-textures depuis le fichier XML
  const subTextures = xmlDoc.getElementsByTagName("SubTexture");

  // Parcourir les textures et les ajouter au conteneur
  for (let subTexture of subTextures) {
    const name = subTexture.getAttribute("name");
    const x = parseInt(subTexture.getAttribute("x"));
    const y = parseInt(subTexture.getAttribute("y"));
    const width = parseInt(subTexture.getAttribute("width"));
    const height = parseInt(subTexture.getAttribute("height"));

    // Créer un élément div pour représenter chaque texture
    const textureDiv = document.createElement("div");
    textureDiv.classList.add("texture");
    textureDiv.style.width = `${width}px`;
    textureDiv.style.height = `${height}px`;
    textureDiv.style.backgroundImage = `url(${imagePath})`;
    textureDiv.style.backgroundPosition = `-${x}px -${y}px`;
    textureDiv.style.position = "absolute";

    // Positionner selon le type de flèche et Ajouter l'élément au conteneur
    if (name === "arrowDOWN0000") {
      textureDiv.style.left = `${widthWindows / 2 - width / 2}px`; // Centré horizontalement
      textureDiv.style.top = `${heightWindows - height - 80}px`; // En bas
      container.appendChild(textureDiv);
    } else if (name === "arrowLEFT0000") {
      textureDiv.style.left = `${widthWindows / 3 - width / 3}px`; // À gauche
      textureDiv.style.top = `${heightWindows / 2 - height / 2}px`; // Centré verticalement
      container.appendChild(textureDiv);
    } else if (name === "arrowUP0000") {
      textureDiv.style.left = `${widthWindows / 2 - width / 2}px`; // Centré horizontalement
      textureDiv.style.top = `80px`; // En haut
      container.appendChild(textureDiv);
    } else if (name === "arrowRIGHT0000") {
      textureDiv.style.right = `${widthWindows / 3 - width / 3}px`; // À droite
      textureDiv.style.top = `${heightWindows / 2 - height / 2}px`; // Centré verticalement
      container.appendChild(textureDiv);
    }

    // Ajouter des interactions clavier
    document.addEventListener("keydown", (event) => {
      if (
        (event.key === sittingPlayer.left && name === "left press0000") ||
        (event.key === sittingPlayer.down && name === "down press0000") ||
        (event.key === sittingPlayer.up && name === "up press0000") ||
        (event.key === sittingPlayer.right && name === "right press0000")
      ) {
        textureDiv.style.transform = "scale(1.1)";
        setTimeout(() => (textureDiv.style.transform = "scale(1)"), 100);
        console.log(`Key pressed: ${event.key}, Texture: ${name}`);
      }
    });
  }
}
