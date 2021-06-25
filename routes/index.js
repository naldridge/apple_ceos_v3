'use strict';

const express = require('express');
const router = express.Router();
const ExecutiveModel = require('../models/executiveModel');
const slugify = require('slugify');

router.get('/:slug?', async (req, res) => {
    if (!!req.params.slug) {
        const { slug } = req.params;
        const theCEO = await ExecutiveModel.getBySlug(slug);

        res.render('template', {
            locals: {
                title: 'CEO Details',
                ceo: theCEO
            },
            partials: {
                body: 'partials/ceo-details'
            }
        });
    } else {
        const ExecData = await ExecutiveModel.getAll();

        res.render('template', {
            locals: {
                title: 'Home Page',
                data: ExecData
            },
            partials: {
                body: 'partials/home'
            }
        });
    }

});

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
    const {id, ceo_name, slug, ceo_year} = req.body;
    const execToDelete = new ExecutiveModel(id, ceo_name, slug, ceo_year);

    const response = await execToDelete.deleteEntry();
    res.sendStatus(200);
});

module.exports = router;