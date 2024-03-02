const express = require('express');
const Miniature = require('../models/miniature');
const router = express.Router();


router.get('/',async (req, res) => {
    try {
        const minis = await Miniature.find({}); 
        res.render('Miniatura', { arrayMini: minis });
    } catch (error) {
        console.log('Error al obtener las miniaturas:', error);
        res.status(500).send('Hubo un error al obtener las miniaturas');
    }
   
});


router.get('/contacto', (req, res) => {
    res.render('index', { titulo: "Contacto" });
});

router.get('/crear',(req,res)=>{
    res.render('crear')
});



module.exports = router;