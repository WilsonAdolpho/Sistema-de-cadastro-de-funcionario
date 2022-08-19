const { render } = require('ejs')
const { Router } = require('express')
var express = require('express')
var router = express.Router()
var dao = require('../database/dao')
const passport = require('passport')

router.get('/', function(request, response){
    response.render('funcionario/login', {message: null})
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/listagem'
}))

router.post('/delete', function(request, response){
    dao.remove(request.body.id)
    .then(([rows])=>{
        response.redirect('/listagem')
    }).catch(err =>{
        console.log(err)
        response.redirect('/listagem')
    })
     
 })

router.get('/cadastro', async function(request, response){
   let row = {
        id: '',
        nome: '',
        email: '',
        senha: '',
        matricula: '',
        contato: '',

    }
    if( request.query.id){
        [result] = await dao.findById(request.query.id)
        row = result[0]
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
    let operacao;
    if(request.body.id){
        operacao = dao.update
    }else{
        operacao = dao.save
    }




    operacao(request.body)
    .then(([result])=>{

    }).catch(err=>{
        console.log(err)
    })
    response.redirect('/listagem')
})

router.get('/search', function(request, response){
    if(request.query.nome){
        dao.search(request.query.nome)
        .then(([rows])=>{
            response.render('funcionario/listagem', {funcionario: rows})
    
        }).catch( err =>{
            console.log(err)
            response.redirect('listagem')
        })
    }else{
        response.redirect('/listagem')
    }



     
    
})
module.exports = router;