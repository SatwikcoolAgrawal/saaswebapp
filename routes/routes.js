const express = require('express');
const Model = require('../models/model');
const router = express.Router();

//Post Method
router.post('/register', async (req, res) => {
    console.log(req.body)
    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isadmin,
        isSuperAdmin: req.body.issuperadmin,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// login in
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`email ${email} + password : ${password}`);

        const user = await Model.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'invalid username or password' });

        }

        if (Model.comparePassword(password)) {

            res.status(201).json({ message: 'logged In' });

        }
    }
    catch (e) {
        res.status(400).json({ message: e });


    }

})
//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;