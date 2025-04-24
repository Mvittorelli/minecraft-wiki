const API_URL = "http://51.38.232.174:3000/v1";
const mob = await (
  await fetch(
    `${API_URL}/entities/${new URLSearchParams(location.search).get("id")}`
  )
).json();

const desc = document.querySelector(".desc p");
const name = document.querySelector("h2");
const titleName = document.querySelector("#title-name");
const titleIcon = document.querySelector("#title-icon");
const mobImg = document.querySelector(".mob-img");
const health = document.querySelector("#health");
const armor = document.querySelector("#armor");
const damage = document.querySelector("#damage");
const classification = document.querySelector("#classification");
const categoryClassification = document.querySelector(
  "#category-classification"
);
const behavior = document.querySelector("#behavior");
const width = document.querySelector("#width");
const height = document.querySelector("#height");

desc.innerHTML = mob.description;
name.innerHTML = mob.name;
titleName.innerHTML = mob.name;
titleIcon.src = mob.icon;
mobImg.src = mob.image;

health.innerHTML = mob.health;
armor.innerHTML = mob.armor;
damage.innerHTML = mob.strength;
classification.innerHTML = mob.classification;
categoryClassification.innerHTML = `${mob.classification}&nbsp;`;
behavior.innerHTML = mob.type;
width.innerHTML = mob.width;
height.innerHTML = mob.height;

document.querySelector(".card").classList.add(mob.type);
document.querySelector(".btn").classList.add(mob.type);

for (let hr of document.querySelectorAll("hr")) hr.classList.add(mob.type);
