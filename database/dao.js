/*o arquivo dao vai ter um conjunto de codigos 
como save,delete e etc
const pool = require('./config')
pool.promise().query('select * from funcionario')
.then((result)=>{
console.log(result)
})
*/
const pool = require('./config')

let operations = {
    list: function(){
      return pool.promise().query('select * from funcionario')
    },
    findById: function(id){},
    save: function(funcionario){
      return pool.promise().execute('insert into funcionario (nome, email, matricula, senha, contato) VALUES (?,?,?,?,?)', [funcionario.nome, funcionario.email, funcionario.matricula, funcionario.senha, funcionario.contato])
    },
    update: function(funcionario){},
    remove: function(id){
      return pool.promise().execute('delete from funcionario where id= ?', [id])
    },
}
module.exports = operations
