const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

const SERVER_URL = process.env.SERVER_URL;
const HOST_NAME = process.env.HOST_NAME;
const CACHE_DURATION = process.env.CACHE_DURATION;

// Init cache
let cache = apicache.middleware;

router.get('/*', cache(CACHE_DURATION), async (req, res) => {
  try {
    const { url, headers } = req;
    headers.host = HOST_NAME;

    console.log('GET: ', url);

    const apiResponse = await needle(
      'get',
      `${SERVER_URL}${url}`,
      { headers }
    );
    const data = apiResponse.body;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post('/*', cache(CACHE_DURATION), async (req, res) => {
  try {
    const { url, headers, body } = req;
    headers.host = HOST_NAME;

    console.log('POST: ', url);

    const apiResponse = await needle(
      'post',
      `${SERVER_URL}${url}`,
      JSON.stringify(body),
      { headers }
    );
    const data = apiResponse.body;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.put('/*', cache(CACHE_DURATION), async (req, res) => {
  try {
    const { url, headers, body } = req;
    headers.host = HOST_NAME;

    console.log('PUT: ', url);

    const apiResponse = await needle(
      'put',
      `${SERVER_URL}${url}`,
      JSON.stringify(body),
      { headers }
    );
    const data = apiResponse.body;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
