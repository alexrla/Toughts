const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {

    static async showToughts(req, res)   {

        res.render("toughts/home")

    }

    static async dashboard(req, res) {

        const userId = req.session.userId;

        const user = await User.findOne({
            where: {
                id: userId
            },
            // Trazendo todos os pensamentos do usuário
            include: Tought,
            plain: true
        });

        // Verificando se o usuário existe
        if(!user)   {

            res.redirect("/login");

        }

        const toughts = user.Toughts.map((result) =>  result.dataValues);

        res.render("toughts/dashboard", { toughts });

    }

    static createTought(req, res) {

        res.render("toughts/create")

    }

    static async createToughtSave(req, res) {

        const tought = {
            title: req.body.title,
            UserId: req.session.userId
        };

        try {

            await Tought.create(tought);

            req.flash("message", "Pensamento criado com sucesso!");

            req.session.save(() => {

                res.redirect("/toghts/dashboard");

            })
                
        } catch (error) {
            
            console.log(error);

        }

    }

};