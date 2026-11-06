const db = require("../db")
const router = express.Router()// Quando criar um arquivo router precisa usar o express.Router
const express = require("express")

router.get("/", async (req, res) => {
    const [professores] = await db.execute("SELECT * FROM professor")
    return res.json(professores)
})

router.post("/", async (req, res) =>{
    const {nome, especialidade} = req.body

    if(!nome || !especialidade){
        return res.status(400).json({error: "Nome e especialidade são obrigatorios"})
    }

    if(nome.length < 3) {
        return res.status(400).json({error: "Nome precisa ter mais de 2 caracteres"})
    }

    const [resultado] = await db.execute(
        "INSERT INTO professor(nome, especialidade) VALUES (?, ?)", [nome, especialidade]
    )

    return res.status(201).json({id: resultado.insertId, nome, especialidade})
})

module.exports = router 