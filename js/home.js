const API_URL = "http://51.38.232.174:3000/v1";

const mobSearch = document.getElementById("mobs-search");
const result = document.getElementById("result");
const searchBtn = document.getElementById("mobs-search-btn-green");

const allInputs = document.querySelectorAll(".moreInput input");
const [classificationInput, typeInput, healthInput, armorInput, damageInput] = allInputs;

let allEntities = [];

async function fetchAllEntities() {
  try {
    const response = await fetch(`${API_URL}/entities`);
    allEntities = await response.json();
    renderEntities(allEntities);
  } catch (err) {
    console.error("Error fetching all entities:", err);
    result.innerHTML = "<p style='color:red;'>Failed to load entities.</p>";
  }
}

function renderEntities(entities) {
  result.innerHTML = "";

  if (entities.length === 0) {
    result.innerHTML = "<p style='color:white;'>No results found.</p>";
    return;
  }

  for (let element of entities) {
    result.appendChild(createCard(element));
  }
}

function filterEntities() {
  const name = mobSearch.value.toLowerCase().trim();
  const classification = classificationInput.value.toLowerCase().trim();
  const type = typeInput.value.toLowerCase().trim();
  const health = healthInput.value.trim();
  const armor = armorInput.value.trim();
  const damage = damageInput.value.trim();

  const filtered = allEntities.filter((e) => {
    if (name && !e.name.toLowerCase().includes(name)) return false;
    if (classification && !e.classification.toLowerCase().includes(classification)) return false;
    if (type && !e.type.toLowerCase().includes(type)) return false;
    if (health && e.health != health) return false;
    if (armor && e.armor != armor) return false;
    if (damage && e.damage != damage) return false;
    return true;
  });

  renderEntities(filtered);
}

mobSearch.addEventListener("input", filterEntities);
searchBtn.addEventListener("click", filterEntities);

[classificationInput, typeInput, healthInput, armorInput, damageInput].forEach(input => {
  input.addEventListener("input", filterEntities);
});

function createCard(elements) {
  const container = document.createElement("div");
  container.className = elements.type;

  const box = Object.assign(document.createElement("div"), {
    innerHTML: elements.name,
    className: `box ${elements.type}`,
  });

  const image = Object.assign(document.createElement("img"), {
    src: elements.image,
  });

  const info = Object.assign(document.createElement("div"), {
    className: "info",
  });

  info.appendChild(
    Object.assign(document.createElement("p"), {
      innerHTML: elements.classification,
    })
  );
  info.appendChild(
    Object.assign(document.createElement("p"), {
      innerHTML: elements.type,
    })
  );

  const idk = document.createElement("div");
  idk.appendChild(info);
  idk.appendChild(document.createElement("hr"));

  const seemore = Object.assign(document.createElement("div"), {
    className: `box ${elements.type}`,
  });

  seemore.appendChild(
    Object.assign(document.createElement("a"), {
      href: `../html/details.html?id=${elements.id}`,
      innerHTML: "SEE MORE",
    })
  );

  idk.appendChild(seemore);

  container.appendChild(box);
  container.appendChild(image);
  container.appendChild(idk);

  return container;
}

fetchAllEntities();

function renderEntities(entities) {
  result.innerHTML = "";

  if (entities.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.style.display = "flex";
    emptyDiv.style.flexDirection = "column";
    emptyDiv.style.alignItems = "center";
    emptyDiv.style.justifyContent = "center";
    emptyDiv.style.textAlign = "center";
    emptyDiv.style.color = "white";

    const image = document.createElement("img");
    image.src = "../assets/no-entity-logo.svg";
    image.alt = "No entity";
    image.style.maxWidth = "180px";
    image.style.marginBottom = "16px";

    const text = document.createElement("p");
    text.innerText = "No entity found.";
    text.style.color = "#8C8C8C";

    emptyDiv.appendChild(image);
    emptyDiv.appendChild(text);
    result.appendChild(emptyDiv);
    return;
  }

  for (let element of entities) {
    result.appendChild(createCard(element));
  }
}