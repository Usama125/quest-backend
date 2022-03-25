import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import City from '../models/city'

const NAMESPACE = "City"

const createCity = async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body

	if (name) {
		const result = await new City({ name }).save();
		return makeResponse(res, 201, "City Created Successfully", result, false)
	} else {
		return makeResponse(res, 400, "Validation Failed", null, true)
	}
}

const getCities = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await City.find({});
		return makeResponse(res, 200, "Cities", result, false);
	} catch (err) {
		return makeResponse(res, 400, "Problem while getting cities", null, true)
	}
}

const updateCity = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const filter = { _id: id }
	let update = { ...req.body }

	City.findOneAndUpdate(filter, update).then(updatedCity => {
		return makeResponse(res, 200, "City updated Successfully", updatedCity, false)
	}).catch(err => {
		return makeResponse(res, 400, err.message, null, true)
	})
}

const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const cities = await City.findByIdAndDelete(_id)
		if (!cities) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", cities, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

export default {
	createCity,
	getCities,
	updateCity,
	deleteCity
}
