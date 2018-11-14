const express = require('express');
const { name, version } = require('../package.json');

const router = express.Router();

router.get('/', (_, res) => res.json({ name, version, serverStatus: '👌' }));

module.exports = router;
