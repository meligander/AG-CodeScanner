const router = require('express').Router();

const apiAuthRouter = require('./api/auth');
const apiFileRouter = require('./api/file');
const apiProductsRouter = require('./api/product');

router.use('/auth', apiAuthRouter);
router.use('/file', apiFileRouter);
router.use('/product', apiProductsRouter);

module.exports = router;
