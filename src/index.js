import Express from 'express';

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    //enviar a resposta
    res.send("Hello Word EXPRESS");
});

app.listen(3333, () => {
    console.log("Servidor rodando na porta: 3333");
}); 