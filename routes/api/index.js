const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes.js');
const userRoutes = require('./userRoutes.js/index.js');

router.use('/videos', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;