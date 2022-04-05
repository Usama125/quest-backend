import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import Town from '../models/town'

const NAMESPACE = "Town"

const createTown = async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body

	if (name) {

		const town = await Town.find({ name });

		if (town.length > 0) {
			return makeResponse(res, 400, "Already Exists", null, true);
		}

		const result = await new Town({ name }).save();
		return makeResponse(res, 201, "Town Created Successfully", result, false)
	} else {
		return makeResponse(res, 400, "Validation Failed", null, true)
	}
}

const getTowns = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await Town.find({});
		return makeResponse(res, 200, "Towns", result, false);
	} catch (err) {
		return makeResponse(res, 400, "Problem while getting Towns", null, true)
	}
}

const updateTown = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const filter = { _id: id }
	let update = { ...req.body }

	Town.findOneAndUpdate(filter, update).then(updatedTown => {
		return makeResponse(res, 200, "Town updated Successfully", updatedTown, false)
	}).catch(err => {
		return makeResponse(res, 400, err.message, null, true)
	})
}

const deleteTown = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const towns = await Town.findByIdAndDelete(_id)
		if (!towns) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", towns, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

export default {
	createTown,
	getTowns,
	updateTown,
	deleteTown
}
