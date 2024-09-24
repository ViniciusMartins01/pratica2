//import Crud from '../Crud'

import CrudAluno from './dao.js';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import nunjucks from "nunjucks"

// Necessário para obter __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const router = express.Router()

//Instância da classe - funciona como prototype
const crud = new CrudAluno()

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../../pages/public')))

   // Configurar o body-parser para dados JSON
    app.use(bodyParser.json());

    // Config da template engine.
    app.set("view engine", "njk")
    nunjucks.configure('views', {
        express: app,
        autoescape: false,
        noCache: true,
    });
    

    app.get("/", (request , response) => {
        return response.render("index")
    })

    app.get("/atualiza", (request , response) => {
        return response.render("atualiza")
    })

    app.get("/listar-aluno", (request , response) => {
        crud.listarAlunos(function(result){
            response.json(result);
        });
    })

    app.post("/cadastroAluno", (request , response) => {
        const {id,nome,email,telefone} = request.body;

        const aluno = {
            id:id,
            nome:nome,
            email:email,
            telefone : telefone
        }

        crud.inserirAluno(aluno, id, function(result){
            console.log(result);
        });
    })

    app.post("/updateAluno", (request , response) => {
        const {id,nome,email,telefone} = request.body;

        const aluno = {
            id:id,
            nome:nome,
            email:email,
            telefone : telefone
        }

        crud.atualizarAluno(aluno, function(result){
            console.log(result);
        });
    })



    let server = app.listen(3018, function(){
    let host = server.address().address
    let port = server.address().port
    console.log(`Servidor iniciado em ${host}:${port}`)
})





