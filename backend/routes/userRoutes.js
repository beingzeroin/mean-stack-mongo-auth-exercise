var express = require('express')
var router = express.Router()
var userLib = require('../lib/userLib')

router.use(function timeLogMiddleWare (req, res, next) {
    console.log('user Route Time: ', Date.now())
    next();
})

/*
router.get('/', function (req, res) {
    userLib.retrieveAllUsers(function(err, items){
        if(err)
            res.json({'error': err});
        else
            res.json(items);
    })
})
*/

router.route('/')
    .get(function (req, res) {
        userLib.retrieveUsersByQuery(req.query, function(err, items){
            if(err)
                res.json({'error': err});
            else
                res.json(items);
        })
    })
    .post(function(req, res){
        userLib.createUser(req.body, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })  
    });

router.route('/:userid')
    .get(function(req, res){
        userLib.retrieveSingleUserById(req.params.userid, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })
    })
    .put(function(req, res){
        req.body.id = req.params.userid;
        userLib.updateUser(req.body, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })
    })
    .delete(function(req, res){
        userLib.deleteUser(req.params.userid, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })
    })

router.route('/login')
    .post(function(req, res){
        userLib.retrieveSingleUserByQuery({email_address: req.body.email_address}, function(err, user){
            if (err) { return res.json({'error': err}); }
            
            if (!user)
                return res.json({ message: 'Incorrect username or password.' });

            user.validatePassword(req.body.password, function(err, isMatch) {
                if (err) { return res.json({'error': err}); }
                if (!isMatch){
                    return res.json({ message: 'Incorrect username or password.' });
                }
                return res.json({user: user});
            });
        })
    })

router.route('/register')
    .post(function(req, res){
        userLib.retrieveSingleUserByQuery({email_address: req.body.email_address}, function(err, user){
            if (err) { return res.json({'error': err}); }
            
            if (user)
                return res.json({ message: 'username already exists.' });

            userLib.createUser(req.body, function(err, userObj) {
                if (err) { return res.json({'error': err}); }
                return res.json({user: userObj});
            });
        })
    })
module.exports = router;