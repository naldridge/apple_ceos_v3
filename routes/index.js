'use strict';

const express = require('express');
const router = express.Router();
const ExecutiveModel = require('../models/executiveModel');
const slugify = require('slugify');

router.get('/:slug?', async (req, res) => {
    if (req.params.slug) {
        
    const { slug } = req.params;
    const executive = await ExecutiveModel.getBySlug(slug);

    if (executive) {
        res.json(executive).status(200);
    } else {
        res.status(400).send(`No CEO found that matches slug, ${slug}`);
    }
    } else {
        const ceos = await ExecutiveModel.getAll();
        res.json(ceos).status(200);
    }})


router.post('/', async (req, res) => {
    const { ceo_name, ceo_year } = req.body;

    const slug = slugify(ceo_name, {
        replacement: '_',
        lower: true,
        strict: true
    });

    const newExec = new ExecutiveModel(null, ceo_name, slug, ceo_year);

    const response = await newExec.addEntry();
    res.sendStatus(200);
});

router.post('/delete', async (req, res) => {
    const { id, ceo_name, slug, ceo_year } = req.body;
    const execToDelete = new ExecutiveModel(id, ceo_name, slug, ceo_year);

    const response = await execToDelete.deleteEntry();
    res.sendStatus(200);
});

module.exports = router;