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
        console.log("listou")
    },
    findById: function(id){},
    save: function(funcionario){},
    update: function(funcionario){},
    remove: function(id){},
}
module.exports = operations
