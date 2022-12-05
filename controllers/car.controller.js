const mongoose = require('mongoose');
const Car = require('../models/Car');
const { sendResponse, AppError}=require("../helpers/utils.js")

const carController = {};

carController.createCar = async (req, res, next) => {
	const { make, model, release_date, transmission_type, size, style, price } = req.body
	
	
	try {
		if(!make || !model || !release_date|| !transmission_type || !size || !style || !price ) {
			throw new Error("Missing required info!")
		}

		const newCar = await new Car({
			make: make,
    		model: model,
    		release_date: release_date,
    		transmission_type: transmission_type ,
    		size: size,
    		style: style,
    		price: price,
		})
		const created = await Car.create(newCar)
		sendResponse(res,200,true, {car:created},null, 'Create car success')
	} catch (err) {
		next(err)
	}
};

carController.getCars = async (req, res, next) => {
	try {
		let {page, ...filterQuery} = req.query
		const allowedFilter = Object.keys(filterQuery)
		if(allowedFilter.length) throw new AppError(402, "Bad Request", "Only accept page querry")
		page = parseInt(page) || 1
		let limit = 10
		let offset = limit * (page - 1)
		const cars = await Car.find({})
		const totalPages = parseInt(cars.length / 10)
		let result = cars.slice(offset, offset + limit)
		// const listOfFound = await Car.find(filter)
		sendResponse(res,200,true,{cars:result},null,{ message: "Found list of cars success", totalPages})
	} catch (err) {
		next(err)
	}
};

carController.editCar = async (req, res, next) => {
	const {id} = req.params
	const updateInfo = req.body
	console.log(id)

	const options = {new:true}
	try {
		const updated= await Car.findByIdAndUpdate(id,updateInfo,options)

        sendResponse(res,200,true,{data:updated},null,"Update car success")
	} catch (err) {
		next(err)
	}
};

carController.deleteCar = async (req, res, next) => {
	const {id} = req.params
	const options = {new:true}
	console.log(id)
	try {
		const updated= await Car.findByIdAndDelete(id,options)

        sendResponse(res,200,true,{data:updated},null,"Delete foo success")
	} catch (err) {
		next(err)
	}
};

module.exports = carController;
