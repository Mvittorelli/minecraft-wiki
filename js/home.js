fetch("http://51.38.232.174:3000/v1/arena/entities", {
  headers: {
    "Content-type": "application/json",
  },
  method: "POST",
  body: JSON.stringify({
    entityId: 10,
    x: -3,
    z: -8,
  }),
})
  .then((e) => e.json())
  .then((json) => console.log(json));
