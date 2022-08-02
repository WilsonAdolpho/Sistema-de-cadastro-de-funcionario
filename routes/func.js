var express = require('express')
var router = express.Router()



router.get('/', function(request, response){
    response.render('funcionario/login')
})
router.get('/cadastro', function(request, response){
    response.render('funcionario/cadastro')
})

module.exports = router;