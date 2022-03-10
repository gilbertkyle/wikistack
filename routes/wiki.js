const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const {Page} = require('../models');

router.get('/', async (req, res, next) => {
   res.send("Hello!")
})

router.post('/', async (req, res, next) => {
   
   const {title, content} = req.body;
   
   try {
    const page = await Page.create({
      title: title,
      content: content,
      status: "open",
      slug: title.split(' ').join("-")
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get('/add', async (req, res, next) => {
   res.send(addPage());
})

module.exports = router;