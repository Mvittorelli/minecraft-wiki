
fetch("http://192.168.1.15:3000/v1/arena/entities", {
    headers: {
        "Content-type": "application/json"

    },
    method: "POST",
    body: JSON.stringify({
        "entityId": 10 ,
        "x": 15,
        "z": 0
    })
})
    .then(e => e.json())
    .then(json => console.log(json))
