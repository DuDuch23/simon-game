//traitement xml pour les images flêches
const xmlPath = "./asset/image/notes/default.xml";
const imagePath = "./asset/image/notes/default.png";
const canvas = document.getElementById("myCanvas");

// on charge le fichier xeml
async function loadXMLFile(xmlPath) {
  const response = await fetch(xmlPath);
  const xmlText = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(xmlText, "application/xml");
}

//on charge l'image en png
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
    // code de base
    // if (name.includes("arrow")) {
    //   // Dessiner cette sous-image qui correspond à une flèche
    //   ctx.drawImage(
    //     image,
    //     x,
    //     y,
    //     width,
    //     height,
    //     frameX + i,
    //     frameY,
    //     width - 100,
    //     height - 100
    //   );
    //   console.log(
    //     `Dessin de la texture : ${name} aux coordonnées (${
    //       frameX + i
    //     }, ${frameY}) avec taille (${width}x${height})`
    //   );
    // }
    // pour faire en sorte que les images soit bien placer
    if (name == "arrowDOWN0000") {
      // Dessiner cette sous-image qui correspond à une flèche
      ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        120,
        0,
        width - 100,
        height - 100
      );
      console.log(
        `Dessin de la texture : ${name} aux coordonnées (${
          frameX + i
        }, ${frameY}) avec taille (${width}x${height})`
      );
    }
    if (name == "arrowLEFT0000") {
      // Dessiner cette sous-image qui correspond à une flèche
      ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        60,
        frameY,
        width - 100,
        height - 100
      );
      console.log(
        `Dessin de la texture : ${name} aux coordonnées (${
          frameX + i
        }, ${frameY}) avec taille (${width}x${height})`
      );
    }
    if (name == "arrowUP0000") {
      // Dessiner cette sous-image qui correspond à une flèche
      ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        180,
        frameY,
        width - 100,
        height - 100
      );
      console.log(
        `Dessin de la texture : ${name} aux coordonnées (${
          frameX + i
        }, ${frameY}) avec taille (${width}x${height})`
      );
    }
    if (name == "arrowRIGHT0000") {
      // Dessiner cette sous-image qui correspond à une flèche
      ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        240,
        frameY,
        width - 100,
        height - 100
      );
      console.log(
        `Dessin de la texture : ${name} aux coordonnées (${
          frameX + i
        }, ${frameY}) avec taille (${width}x${height})`
      );
    }
    document.addEventListener("keydown", (event) => {
      if ((event.key === "d") | (event.key === "ArrowLeft")) {
        if (name == "left press0000") {
          // Dessiner cette sous-image qui correspond à une flèche
          ctx.drawImage(
            image,
            x,
            y,
            width,
            height,
            62,
            1.6,
            width - 89,
            height - 89
          );
          setInterval(console.log("it's works"), 1000);
          ctx.clearRect(60, 0.2, width - 80, height - 80);
        }
      }
      if ((event.key === "f") | (event.key === "ArrowDown")) {
        if (name == "down press0000") {
          // Dessiner cette sous-image qui correspond à une flèche
          ctx.drawImage(
            image,
            x,
            y,
            width,
            height,
            122.5,
            1.6,
            width - 90,
            height - 90
          );
        }
      }
      if ((event.key === "j") | (event.key === "ArrowUp")) {
        if (name == "up press0000") {
          // Dessiner cette sous-image qui correspond à une flèche
          ctx.drawImage(
            image,
            x,
            y,
            width,
            height,
            181,
            1.6,
            width - 90,
            height - 90
          );
        }
      }
      if ((event.key === "k") | (event.key === "ArrowRight")) {
        if (name == "right press0000") {
          // Dessiner cette sous-image qui correspond à une flèche
          ctx.drawImage(
            image,
            x,
            y,
            width,
            height,
            243.3,
            2.5,
            width - 90,
            height - 90
          );
        }
      }
    });
  }
}

// Appeler la fonction pour charger et dessiner
drawTexturesFromAtlas(xmlPath, imagePath, canvas);
