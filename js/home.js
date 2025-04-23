const API_URL = "http://51.38.232.174:3000/v1";

const mobSearch = document.getElementById("mobs-search");
const result = document.getElementById("result");

mobSearch.addEventListener("input", () => {
  searchMob(mobSearch.value);
});

async function searchMob(value) {
  const response = await fetch(`${API_URL}/entities?${value}`);
  const json = await response.json();
  for (let elements of json) {
    console.log(elements);
    result.appendChild(createCard(elements)); 
  }
}

function createCard(elements) {
  result.appendChild(
    Object.assign(document.createElement("div"), {
      innerHTML: elements.name,
      className: `box ${elements.type}`,
    })
  );
  console.log(result);
  result.appendChild(
    Object.assign(document.createElement("img"), { src: elements.image })
  );
  const info = Object.assign(document.createElement("div"), {
    classList: "info",
  });
  info.appendChild(
    Object.assign(document.createElement("p"), {
      innerHTML: elements.classification,
    })
  );
  info.appendChild(
    Object.assign(document.createElement("p"), { innerHTML: elements.type })
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
  result.appendChild(idk);

  return result;
}

fetch("http://51.38.232.174:3000/v1/arena/entities", {
  headers: {
    "Content-type": "application/json",
  },
  method: "POST",
  body: JSON.stringify({
    entityId: 10,
    x: 0,
    z: 0,
  }),
})
  .then((e) => e.json())
  .then((json) => console.log(json));
