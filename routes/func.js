var express = require('express')
var router = express.Router()
var dao = require('../database/dao')


router.get('/', function(request, response){
    dao.list()
    response.render('funcionario/login')
})
router.get('/cadastro', function(request, response){
    response.render('funcionario/cadastro')
})
router.get('/listagem', function(request, response){
    response.render('funcionario/listagem')
})

module.exports = router;