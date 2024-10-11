//on lit les entrer du clavier
document.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    console.log("gauche");
  }
  if (event.key === "f") {
    console.log("haut");
  }
  if (event.key === "j") {
    console.log("bas");
  }
  if (event.key === "k") {
    console.log("droite");
  }
});
