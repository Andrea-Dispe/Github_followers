var router = require('express').Router(); 
const controllers = require('./controllers/GithubFollowers.js');

router.get('/', controllers.getGithubFollowers);

module.exports = router;
