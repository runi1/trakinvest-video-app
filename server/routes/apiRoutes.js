const express = require('express');
const router = express.Router();

const request = require('superagent');


router.get('/movie/:id', (req, res) => {
  request
  .get('http://demo9371423.mockable.io/movie/' + req.params.id)
  .end((err, response) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(response.body);
  });
});

module.exports = router;
