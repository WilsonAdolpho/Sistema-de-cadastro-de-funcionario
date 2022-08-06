const { render } = require('ejs')
var express = require('express')
var router = express.Router()
var dao = require('../database/dao')


router.get('/', function(request, response){
    response.render('funcionario/login')
})
router.get('/cadastro', function(request, response){
    response.render('funcionario/cadastro')
})

router.get('/listagem', function(request, response){
    dao.list().then(([rows])=>{
        response.render('funcionario/listagem', {funcionario: rows })
    }).catch(err => {
        console.log(err)
        response.render('funcionario/listagem', {funcionario: [] })
    })
    
})

module.exports = router;