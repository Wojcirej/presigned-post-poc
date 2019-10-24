const express = require('express');
const router = express.Router();
const indexActionHandler = require('./../app/actions/index');

router.get('/', indexActionHandler);

module.exports = router;
