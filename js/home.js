// for (let i = 0; i < 100; i++) {

    
    fetch("http://192.168.1.15:3000/v1/arena/entities", {
        headers: {
        "Content-type": "application/json"

    },
    method: "POST",
    body: JSON.stringify({
        "entityId": i,
        "x": 15,
        "z": 0
    })
})
    .then(e => e.json())
    .then(json => console.log(json))
    
// }

