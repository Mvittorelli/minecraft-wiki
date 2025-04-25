document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://51.38.232.174:3000/v1";
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) return;

  try {
    const res = await fetch(`${API_URL}/entities/${id}`);
    const mob = await res.json();

    // Met à jour les infos de base
    document.querySelector("h2").textContent = mob.name;
    document.querySelector("#title-name").textContent = mob.name;
    document.querySelector("#title-icon").src = mob.icon;
    document.querySelector(".mob-img").src = mob.image;
    document.querySelector("#health").textContent = mob.health;
    document.querySelector("#armor").textContent = mob.armor;
    document.querySelector("#damage").textContent = mob.strength;
    document.querySelector("#classification").textContent = mob.classification;
    document.querySelector("#behavior").textContent = mob.type;
    document.querySelector("#width").textContent = mob.width;
    document.querySelector("#height").textContent = mob.height;

    // Met en gras le nom du mob dans la description
    const regex = new RegExp(`\\b(${mob.name})\\b`, "gi");
    const formattedDescription = mob.description.replace(
      regex,
      "<strong>$1</strong>"
    );
    document.querySelector(".desc p").innerHTML = formattedDescription;

    // Applique le type pour le style dynamique
    const elementsToStyle = [
      document.querySelector(".card"),
      document.querySelector(".btn"),
      document.querySelector(".card-title"),
      ...document.querySelectorAll("hr"),
    ];

    elementsToStyle.forEach((el) => el.classList.add(mob.type));
  } catch (err) {
    console.error("Erreur lors du chargement du mob :", err);
  }
});
