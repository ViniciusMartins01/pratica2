import mysql from 'mysql2'

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"fatec123",
    database:"escola2"
})

connection.connect();


class CrudAluno
{

    inserirAluno(aluno, callback)
    {
        let sql =  "insert into aluno set ?"

        connection.query(sql, aluno, function(error,results,fields)
        {
            if(error) throw error;

            callback(`Aluno ${aluno.nome} cadastrado com sucesso`);
        });
    }

    atualizarAluno(aluno,id, callback)
    {
        let sql =  "update aluno set ? where id = ?"

        connection.query(sql, [aluno,id], function(error,results,fields)
        {
            if(error) throw error;

            callback(`Aluno ${aluno.nome} atualizado com sucesso`);
        });
    }

    //Pega todos os registros
    listarAlunos(callback){
        let sql = "select * from aluno"
        connection.query(sql, function(error,results,fields){
            if(error) throw error
            callback(results)
        })
            connection.end()
    }
}

export default CrudAluno;
