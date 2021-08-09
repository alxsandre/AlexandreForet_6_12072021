const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const sauceController = require('../controllers/sauce');

router.post('/', multer, sauceController.createSauce)
router.get('/:id', sauceController.getOneSauce);
router.get('/', sauceController.getAllSauces);

/*
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/sauces', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);
*/
module.exports = router;