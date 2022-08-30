import express from "express"

const app = express()

app.use(express.json())

const people = []

app.get("/", (request, response) => {

    return response.json({
        ok: true,
        people_count: people.length,
        data: people,
    })
})

app.post("/create", function (req, res) {
    const data = req.body

    data.forEach(person => {
        person.id = people.length + 1
        people.push(person)
    })

    return res.status(201).json({
        ok: true,
        data: "Persona/s creada.",
    })
})

app.put("/edit/:id", function (req, res) {
    const data = req.body
    let id = req.params.id

    for (let index = 0; index < people.length; index++) {
        if (people[index].id == id) {
            data.id = Number(id)
            people[index] = data
        }
    }

    return res.status(204).send()
})

app.delete("/delete/:id", function (req, res) {
    let id = req.params.id

    for (let index = 0; index < people.length; index++) {
        if (people[index].id == id) {
            people.splice(index, 1)
        }
    }

    return res.status(204).send()
})

app.listen(6004, () =>
    console.log(`El servidor inicio en http://localhost:6004`)
)