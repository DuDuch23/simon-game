//traitement xml pour les images flêches
const xmlPath = "./asset/image/notes/default.xml";
const imagePath = "./asset/image/notes/default.png";
const canvas = document.getElementById("myCanvas");

// on charge le fichier weml
async function loadXMLFile(xmlPath) {
  const response = await fetch(xmlPath);
  const xmlText = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(xmlText, "application/xml");
}

//on charge l'imafe en png
function loadImage(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

//on extrait les images dans l'images
async function drawTexturesFromAtlas(xmlPath, imagePath, canvas) {
  // Charger le fichier XML et l'image
  const xmlDoc = await loadXMLFile(xmlPath);
  const image = await loadImage(imagePath);

  // Récupérer les sous-textures depuis le fichier XML
  const subTextures = xmlDoc.getElementsByTagName("SubTexture");

  // Créer le contexte du canvas
  const ctx = canvas.getContext("2d");

  let i = 0;
  // Boucler sur chaque sous-image et les dessiner
  for (let subTexture of subTextures) {
    i = i + 60;
    const name = subTexture.getAttribute("name");
    const x = parseInt(subTexture.getAttribute("x"));
    const y = parseInt(subTexture.getAttribute("y"));
    const width = parseInt(subTexture.getAttribute("width"));
    const height = parseInt(subTexture.getAttribute("height"));

    // Optionnel : Prendre en compte les frames si présents
    const frameX = subTexture.getAttribute("frameX")
      ? parseInt(subTexture.getAttribute("frameX"))
      : 0;
    const frameY = subTexture.getAttribute("frameY")
      ? parseInt(subTexture.getAttribute("frameY"))
      : 0;

    // Dessiner chaque sous-image sur le canvas
    // ctx.drawImage(image, x, y, width, height, frameX, frameY, width, height);

    // Ou afficher seulement la sous-image si besoin
    // console.log(
    //   `Dessin de la texture : ${name} aux coordonnées (${x}, ${y}) avec taille (${width}x${height})`
    // );
    if (name.includes("arrow")) {
      // Dessiner cette sous-image qui correspond à une flèche
      ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        frameX + i,
        frameY,
        width - 100,
        height - 100
      );
      console.log(
        `Dessin de la texture : ${name} aux coordonnées (${x}, ${y}) avec taille (${width}x${height})`
      );
    }
  }
}

// Appeler la fonction pour charger et dessiner
drawTexturesFromAtlas(xmlPath, imagePath, canvas);
