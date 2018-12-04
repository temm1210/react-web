const router = require('express').Router();

router.post('/', async (req, res) => {

    const comment = req.body;
    
    console.log('test');
})

module.exports = router;