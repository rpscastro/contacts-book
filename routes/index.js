const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Contacts Book API!');
});

module.exports = router;