const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const sauceController = require('../controllers/sauce');

router.post('/', auth, multer, sauceController.createSauce);
router.post('/:id/like', auth, sauceController.modifyLike);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.get('/', auth, sauceController.getAllSauces);

/*
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/sauces', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);
*/
module.exports = router;