const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const dotenv = require("dotenv");
dotenv.config();

const conn = require("./db/conn");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(

    express.urlencoded({

        extended: true

    })

)

app.use(express.json());

// session middleware
/* 
    - Informa onde o express irá salvar a sessão;
*/
app.use(

    session({
        name: "session",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
                // Configuração necessária para termos sessões por arquivo
                logFn: function() {},
                // Caminho para a pasta que guarda as sessões
                path: require("path").join(require("os").tmpdir(), "sessions") 
            }
        ),
        // Configuração de cookie
        cookie: {
            secure: false,
            // Tempo de duração
            maxAge: 360000,
            // Tempo de expiração (automática)
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })

);

// Flash messages
app.use(flash());

// COnfigurando a sessão na resposta
app.use((req, res, next) => {

    if(req.session.userId)  {

        res.locals.session = req.session;

    }

    next();

});

conn
    .sync()
    .then(() => {

        app.listen(3000, console.log("App funcionando!"));

    })
    .catch((error) => console.error(error));