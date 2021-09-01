const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
    async store(req, res){
        const {name, email, password} = req.body;

        //verificar se o usuario ja existe 
        let user = await User.findOne({
            where: {
                email: email
            }
            
        })

        if(user){
            return res.status(400).send({
                error: "Este e-mail já está sendo utilizado"
            })
        }

        //gerar uma senha com hash
        const passwordHashed = bcrypt.hashSync(password);

        //inserir o usuário no banco
        user = await User.create({
            name: name,
            email: email,
            password: passwordHashed
        })

        //gerar um token 
        const token = jwt.sign({userId: user.id}, auth.secret, {
            expiresIn: "1h"
        });


        //retornar o usuario
        res.send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    }
}