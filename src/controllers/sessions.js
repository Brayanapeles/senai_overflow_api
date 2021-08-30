const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
    store(req, res) {
        async const { email, password } = req.body;

        //verificar se o usuário existe 
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //verificar se a senha esta correta
        if (!user || user.password !== password) {
            return res.status(403).send({ error: 'Usuario e/ou senha inválidos' });
        }
        //gerar um token
        const token = jwt.sign({ userId: user.id}, auth.secret, {
            expiresIn: "1h"
        });
        //eviar resposta

        res.send({
            user : {
                email: user.email,
                name: user.name

            },
            token
        });
    }
}