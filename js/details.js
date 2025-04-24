document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://51.38.232.174:3000/v1";
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) return;

  try {
    const res = await fetch(`${API_URL}/entities/${id}`);
    const mob = await res.json();

    document.querySelector(".desc p").innerHTML = mob.description;
    document.querySelector("h2").innerHTML = mob.name;
    document.querySelector("#title-name").innerHTML = mob.name;
    document.querySelector("#title-icon").src = mob.icon;
    document.querySelector(".mob-img").src = mob.image;

    document.querySelector("#health").innerHTML = mob.health;
    document.querySelector("#armor").innerHTML = mob.armor;
    document.querySelector("#damage").innerHTML = mob.strength;
    document.querySelector("#classification").innerHTML = mob.classification;
    document.querySelector("#category-classification").innerHTML = `${mob.classification}&nbsp;`;
    document.querySelector("#behavior").innerHTML = mob.type;
    document.querySelector("#width").innerHTML = mob.width;
    document.querySelector("#height").innerHTML = mob.height;

    document.querySelector(".card").classList.add(mob.type);
    document.querySelector(".btn").classList.add(mob.type);
    for (let hr of document.querySelectorAll("hr")) hr.classList.add(mob.type);
  } catch (err) {
    console.error("Erreur lors du chargement du mob :", err);
  }

});


document.querySelector(".card").classList.add(mob.type);
document.querySelector(".btn").classList.add(mob.type);
document.querySelector(".card-title").classList.add(mob.type);
for (let hr of document.querySelectorAll("hr")) {
  hr.classList.add(mob.type);
}