const { Router } = require('express');
const controller = require('../controllers/checkout.controller');

const router = Router();

router.get('/', controller.checkout);
router.get('/payment/success', controller.success)
router.post('/payment/pingback', controller.pingBack)
module.exports = router;