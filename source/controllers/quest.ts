import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import Quest from '../models/quest'

const NAMESPACE = "Quest"

const createQuest = async (req: Request, res: Response, next: NextFunction) => {
	const { name, cities } = req.body

	if (name && cities.length > 0) {
		await new Quest({ name, cities }).save();
		const result = await Quest.find({}).populate('cities');
		return makeResponse(res, 201, "Quest Created Successfully", result, false)
	} else {
		return makeResponse(res, 400, "Validation Failed", null, true)
	}
}

const getQuests = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await Quest.find({}).populate("cities");
		return makeResponse(res, 200, "Quests", result, false);
	} catch (err) {
		return makeResponse(res, 400, "Problem while getting quests", null, true)
	}
}

const updateQuest = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const filter = { _id: id }
	let update = { ...req.body }

	await Quest.findOneAndUpdate(filter, update, { upsert: true });
	const updatedQuests = await Quest.find({}).populate('cities');
	return makeResponse(res, 200, "Updated Successfully", updatedQuests, false)
}

const deleteQuest = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const quests = await Quest.findByIdAndDelete(_id)
		if (!quests) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", quests, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

export default {
	createQuest,
	getQuests,
	updateQuest,
	deleteQuest
}
