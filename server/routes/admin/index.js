module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    const routerFormat = require('../../middlerwares/RouterFormat')

    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    router.get('/', async(req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        let items
        const pagesize = parseInt(req.query.pagesize)
        const lastid = req.query.lastid
        if (!lastid) {
            items = await req.Model.find({}).setOptions(queryOptions).limit(pagesize)
        } else {
            items = await req.Model.find({ '_id': { "$gt": lastid } }).setOptions(queryOptions).limit(pagesize).sort({ _id: -1 })
        }
        const totalData = await req.Model.find().setOptions(queryOptions)
        res.send({
            datas: items,
            totalCount: totalData.length
        })
    })
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    router.delete('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', routerFormat, router)

    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.use('/admin/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}