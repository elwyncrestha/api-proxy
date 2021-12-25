const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Init cache
let cache = apicache.middleware;

router.get('/*', cache('10 minutes'), async (req, res) => {
  try {
    const { url, headers } = req;
    headers.host = url.split('/')[0];

    const apiResponse = await needle(
      'get',
      `https://${url.substring(1)}`,
      { headers }
    );
    const data = apiResponse.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/*', cache('10 minutes'), async (req, res) => {
  try {
    const { url, headers, body } = req;
    headers.host = url.split('/')[0];

    const apiResponse = await needle(
      'post',
      `https://${url.substring(1)}`,
      JSON.stringify(body),
      { headers }
    );
    const data = apiResponse.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
