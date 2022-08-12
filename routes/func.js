const { render } = require('ejs')
var express = require('express')
var router = express.Router()
var dao = require('../database/dao')


router.get('/', function(request, response){
    response.render('funcionario/login')
})

router.post('/delete', function(request, response){
    dao.remove(request.body.id)
    .then(([rows])=>{
        response.redirect('/listagem')
    }).catch(err =>{
        console.log(err)
        response.redirect('/listagem')
    })
     
 })
 
router.get('/cadastro', function(request, response){
    row = {
        id: '',
        nome: 'vvv',
        email: 'vvv@gmail.com',
        senha: 'vvv',
        matricula: 'vvv',
        contato: 'vvv',

    }
    if( request.query.id){
        console.log("Edição")
    }else{
        console.log("Novo cadastro")
    }
    response.render('funcionario/cadastro', {funcionario: row})
})

router.get('/listagem', function(request, response){
    dao.list().then(([rows])=>{
        response.render('funcionario/listagem', {funcionario: rows })
    }).catch(err => {
        console.log(err)
        response.render('funcionario/listagem', {funcionario: [] })
    })
    
})

router.post('/save', function(request, response){
    
    dao.save(request.body)
    .then(([result])=>{

    }).catch(err=>{
        console.log(err)
    })
    response.redirect('/listagem')
})


module.exports = router;