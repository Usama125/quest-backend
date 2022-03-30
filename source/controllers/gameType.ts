import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import GameType from '../models/gameType'

const NAMESPACE = "GameType"

const createGameType = async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body

	if (name) {
		await new GameType({ name }).save();
		const result = await GameType.find({});
		return makeResponse(res, 201, "Game Type Created Successfully", result, false)
	} else {
		return makeResponse(res, 400, "Validation Failed", null, true)
	}
}

const getGameTypes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await GameType.find({});
		return makeResponse(res, 200, "Game Types", result, false);
	} catch (err) {
		return makeResponse(res, 400, "Problem while getting game types", null, true)
	}
}

const updateGameType = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const filter = { _id: id }
	let update = { ...req.body }

	await GameType.findOneAndUpdate(filter, update, { upsert: true });
	const updatedGameTypes = await GameType.find({});
	return makeResponse(res, 200, "Updated Successfully", updatedGameTypes, false)
}

const deleteGameType = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const gameTypes = await GameType.findByIdAndDelete(_id)
		if (!gameTypes) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", gameTypes, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

export default {
	createGameType,
	getGameTypes,
	updateGameType,
	deleteGameType
}
