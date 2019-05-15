const functions = require('firebase-functions');
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

const API_KEY =
  'ElfcJlFIXxr0ySR9hkgoiqDjnNdw8yhTbB7qGU0wMvvWprpzVyfZbIn83AE7wDEr';

app.get('/', async (req, res) => {
  try {
    const { zip, distance } = req.query;
    console.log(zip, distance);
    const endPoint = `https://www.zipcodeapi.com/rest/${API_KEY}/radius.json/${zip}/${distance}/mile`;
    const { data } = await axios.get(endPoint);
    zips = data.zip_codes.map(z => parseInt(z.zip_code));
    return res.status(200).json(zips);
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
});

exports.getZip = functions.https.onRequest(app);
