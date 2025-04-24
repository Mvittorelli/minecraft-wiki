const API_URL = "http://51.38.232.174:3000/v1";

const mobSearch = document.getElementById("mobs-search");
const result = document.getElementById("result");

mobSearch.addEventListener("input", () => {
  searchMob(mobSearch.value);
});

async function searchMob(value) {
  result.innerHTML = "";
  const response = await fetch(`${API_URL}/entities?name=${encodeURIComponent(value)}`);
  const json = await response.json();
  for (let elements of json) {
    result.appendChild(createCard(elements));
  }
}

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
