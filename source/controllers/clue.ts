import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import Clue from '../models/clue'
import cloudinary from 'cloudinary'
import config from '../config/config'

const NAMESPACE = "Clue"

const createClue = async (req: Request, res: Response, next: NextFunction) => {
	const { hint, type, gameId } = req.body

	try {
		if (hint && gameId && type) {
			// Upload File
			cloudinary.v2.config({
				cloud_name: config.cloudinary.name,
				api_key: config.cloudinary.apiKey,
				api_secret: config.cloudinary.secretKey
			})

			let result = { url: "" };

			if (type === "IMAGE") {
				// @ts-ignore
				result = await cloudinary.uploader.upload(req.file.path);
			} else if (type === "VIDEO" || type === "AUDIO") {
				// @ts-ignore
				result = await cloudinary.v2.uploader.upload(req.file.path, {
					resource_type: "video",
					public_id: "sample_id",
					chunk_size: 6000000,
					eager: [
						{ width: 300, height: 300, crop: "pad", audio_codec: "none" },
						{ width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }],
					eager_async: true,
				})
			}

			await new Clue({ hint, url: result.url, type, gameId }).save();
			const clues = await Clue.find({}).populate("gameId");
			return makeResponse(res, 201, "Clue Created Successfully", clues, false)
		} else {
			return makeResponse(res, 400, "Validation Failed", null, true)
		}
	} catch (err) {
		console.log(err);
		return makeResponse(res, 400, "Validation Failed", err, true)
	}
}

const getClues = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await Clue.find({}).populate("gameId");
		return makeResponse(res, 200, "Clues", result, false);
	} catch (err) {
		return makeResponse(res, 400, "Problem while getting Clues", null, true)
	}
}

const updateClue = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const filter = { _id: id }
	let update = { ...req.body }

	await Clue.findOneAndUpdate(filter, update, { upsert: true });
	const updatedClues = await Clue.find({}).populate('gameId');
	return makeResponse(res, 200, "Updated Successfully", updatedClues, false)
}

const deleteClue = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const clues = await Clue.findByIdAndDelete(_id).populate("gameId")
		if (!clues) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", clues, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

export default {
	createClue,
	getClues,
	updateClue,
	deleteClue
}
