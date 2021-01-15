const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {db} = require('./../server/db/mysql');

// GET Routes
router.get('/', (req, res) => {
    let sql = 'select id, name, email, hobby, dob, gender, activestatus from people';
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        
        res.render('index', {result});
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    let sql = `delete from people where id=${id}`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        
        res.redirect('/');
    });
});

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    let sql = `select id, name, email, password, hobby, dob, gender, activestatus from people where id=${id}`;

    db.query(sql, (err, result) => {
        if(err) throw err;

        res.render('edit', {result});
    });
});

// POST Routes
router.post('/', (req, res) => {
    // Format: id, name, email, password, confpassword, hobby, dob, gender, activestatus
    const body = _.pick(req.body, ['name', 'email', 'password', 'confpassword', 'hobby', 'dob', 'gender', 'status']);
    
    if(!body.status){
        body.status = 0;
    } 

    let sql=`insert into people (name, email, password, hobby, dob, gender, activestatus) values('${body.name}', '${body.email}', '${body.password}', '${body.hobby}', '${body.dob}', '${body.gender}', '${body.status}')`;
    
    if(body.password === body.confpassword) {
        db.query(sql, (err, result) => {
            if(err) throw err;

            res.redirect('/');
        });
    } else {
        let pass = true;
        res.render('index', {pass});
    }
});

router.post('/edit/:id', (req, res) => {
    const body = _.pick(req.body, ['name', 'email', 'password', 'confpassword', 'hobby', 'dob', 'gender', 'status']);
    let id = req.params.id;

    if(!body.status){
        body.status = 0;
    } 

    let sql=`update people set name='${body.name}', email='${body.email}', password='${body.password}', hobby='${body.hobby}', dob='${body.dob}', gender='${body.gender}', activestatus='${body.status}' where id=${id}`;
    
    if(body.password === body.confpassword) {
        db.query(sql, (err, result) => {
            if(err) throw err;
    
            res.redirect('/');
        });
    } else {
        let pass = true;
        res.render('index', {pass});
    }
});


module.exports = router;