const API_URL = "http://51.38.232.174:3000/v1";

const tbody = document.querySelector("tbody");
const spawnForm = document.getElementById("form-spawn");
const select = document.querySelector("select");
const statusDiv = document.querySelector(".arena-status span");

const allEntities = await (await fetch(`${API_URL}/entities`)).json();
for (let entity of allEntities) {
  const option = document.createElement("option");
  option.innerHTML = entity.name;
  option.value = entity.id;
  select.appendChild(option);
}

async function createTableElement({ x, z, id, entity }) {
  const tr = document.createElement("tr");

  const tdImg = document.createElement("td");
  const img = document.createElement("img");
  img.src = entity.icon;
  img.alt = entity.name;
  tdImg.appendChild(img);
  tr.appendChild(tdImg);

  tr.appendChild(
    Object.assign(document.createElement("td"), { innerHTML: entity.name })
  );
  tr.appendChild(Object.assign(document.createElement("td"), { innerHTML: x }));
  tr.appendChild(Object.assign(document.createElement("td"), { innerHTML: z }));

  const { strength } = await (
    await fetch(`${API_URL}/entities/${entity.id}`)
  ).json();
  tr.appendChild(
    Object.assign(document.createElement("td"), { innerHTML: strength })
  );

  const tdButton = document.createElement("td");
  const button = document.createElement("button");
  button.innerHTML = "DELETE";
  button.className = "delete-btn";
  button.addEventListener("click", async () => {
    const answ = await (
      await fetch(`${API_URL}/arena/entities/${id}`, { method: "DELETE" })
    ).text();
    console.log(answ);
    tr.remove();
  });
  tdButton.appendChild(button);
  tr.appendChild(tdButton);

  return tr;
}

const arenaEntitiesRes = await fetch(`${API_URL}/arena/entities`);
const arenaEntities = await arenaEntitiesRes.json();

for (let entity of arenaEntities) {
  tbody.append(await createTableElement(entity));
}

spawnForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(spawnForm);

  const entityId = formData.get("entityId");

  const data = {
    entityId: entityId,
    x: parseFloat(formData.get("x")),
    z: parseFloat(formData.get("z")),
  };

  console.log("Sending data to API:", data);

  try {
    const response = await fetch(`${API_URL}/arena/entities`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log("API response:", responseData);

    if (response.ok) {
      const newEntityRes = await fetch(
        `${API_URL}/arena/entities/${responseData.id}`
      );
      const newEntityData = await newEntityRes.json();
      tbody.append(await createTableElement(newEntityData));

      spawnForm.reset();
    } else {
      console.error("Failed to spawn entity:", responseData);
      alert("Failed to spawn entity. See console for details.");
    }
  } catch (error) {
    console.error("Error during spawn request:", error);
    alert("Error during spawn request. See console for details.");
  }
});

const arenaStatusRes = await fetch(`${API_URL}/arena`);
const arenaStatusData = await arenaStatusRes.json();

statusDiv.innerHTML = arenaStatusData.status.toUpperCase();
statusDiv.classList.add(arenaStatusData.status);

if (arenaStatusData.status === "close") {
  for (let field of spawnForm.querySelectorAll("select, input, button")) {
    field.disabled = true;
  }
}
