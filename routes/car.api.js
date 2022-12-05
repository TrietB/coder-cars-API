const express = require('express');
const { createCar, getCars, editCar, deleteCar } = require('../controllers/car.controller');
const router = express.Router();

// CREATE
router.post('/', createCar);

// READ
router.get('/', getCars);

// UPDATE
router.put('/:id', editCar);
// router.put('/:id', (req,res,next)=> {
//     console.log(req.params)
// })

// // DELETE
router.delete('/:id', deleteCar);

module.exports = router;
