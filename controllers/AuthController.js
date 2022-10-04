const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = class AuthController {

    static login(req, res) {

        res.render("auth/login");

    }

    static async loginPost(req, res) {

        const { email, password } = req.body;

        // Verificar se o usuário existe e se a senha está correta
        const user = await User.findOne({ where: { email: email }});

        if(user === null) {

            req.flash("message", "E-mail não encontrado!");

            res.render("auth/login")

            return;

        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if(!passwordMatch)  {

            req.flash("message", "Senha incorreta!");

            res.render("auth/login");

            return;

        }

        // Inicializando a sessão
        req.session.userId = user.id;

        req.flash("message", "Seja bem-vindo!");

        req.session.save(() => {

            res.redirect("/");

        });

    }

    static register(req, res) {

        res.render("auth/register");

    }

    static async registerPost(req, res) {

        const { name, email, password, confirmPassword } = req.body;

        // Validando senha
        if(password !== confirmPassword)    {

            req.flash("message", "As senhas não conferem, tente novamente!");

            res.render("auth/register");

            return;

        }

        // Verificando se o usuário existe
        const checkIfUserExists = await User.findOne({ where: { email: email }});

        if(checkIfUserExists)   {

            req.flash("message", "O e-mail já está em uso!");

            res.render("auth/register");

            return;

        }

        // Criando senha
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        };

        try {

            const createrdUser = await User.create(user);

            // Inicializando a sessão
            req.session.userId = createrdUser.id;

            req.flash("message", "Conta criada com sucesso!");

            req.session.save(() => {

                res.redirect("/");

            });
            
        } catch (error) {
            
            console.log(error);

        }

    }

    static logout(req, res) {

        // Removendo a sessão do sistema
        req.session.destroy();

        res.redirect("/login");

    }

};