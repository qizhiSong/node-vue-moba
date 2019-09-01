module.exports = app => {
    const express = require('express');
    const router = express.Router();

    const Catetory = require('../../model/Category');

    router.post('/categories', async(req, res) => {
        const model = await Catetory.create(req.body);
        res.send(model);
    });

    router.get('/categories', async(req, res) => {
        const items = await Catetory.find().limit(10);
        res.send(items);
    });
    app.use('/admin/api', router);
}