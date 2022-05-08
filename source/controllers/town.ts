import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import Town from '../models/town'
import config from '../config/config'
import cloudinary from 'cloudinary'

const NAMESPACE = "Town"

const createTown = async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body

	if (name) {

		// @ts-ignore
		cloudinary.v2.config({
			cloud_name: config.cloudinary.name,
			api_key: config.cloudinary.apiKey,
			api_secret: config.cloudinary.secretKey
		})

		// @ts-ignore
		const result = await cloudinary.uploader.upload(req.file.path)

		const town = await Town.find({ name });

		if (town.length > 0) {
			return makeResponse(res, 400, "Already Exists", null, true);
		}

		const result1 = await new Town({ name, url: result.url }).save();
		return makeResponse(res, 201, "Town Created Successfully", result1, false)
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

	// @ts-ignore
	cloudinary.v2.config({
		cloud_name: config.cloudinary.name,
		api_key: config.cloudinary.apiKey,
		api_secret: config.cloudinary.secretKey
	})

	const filter = { _id: id }
	let update = {};
	// @ts-ignore
	if (req?.file?.path) {
		// @ts-ignore
		const result = await cloudinary.uploader.upload(req.file.path)
		update = { url: result.url, name: req.body.name }
	} else {
		update = { name: req.body.name }
	}

	Town.findOneAndUpdate(filter, update, { new: true }).then(updatedTown => {
		return makeResponse(res, 200, "Town updated Successfully", updatedTown, false)
	}).catch(err => {
		return sendErrorResponse(res, 400, "Unable to update record", 400);
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
