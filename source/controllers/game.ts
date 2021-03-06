import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import Game from '../models/game'

const NAMESPACE = "Game"

const createGame = async (req: Request, res: Response, next: NextFunction) => {
	const { name, gameTypeId, towns, durationType, duration, introduction } = req.body

	if (name && gameTypeId && towns && introduction) {
		await new Game({ name, gameTypeId, towns, durationType, duration, introduction }).save();
		const result = await Game.find({}).populate("gameTypeId").populate("towns");
		return makeResponse(res, 201, "Game Created Successfully", result, false)
	} else {
		return makeResponse(res, 400, "Validation Failed", null, true)
	}
}

const getGames = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await Game.find({}).populate("gameTypeId").populate("towns");
		return makeResponse(res, 200, "Games", result, false);
	} catch (err) {
		return makeResponse(res, 400, "Problem while getting games", null, true)
	}
}

const updateGame = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const filter = { _id: id }
	let update = { ...req.body }

	await Game.findOneAndUpdate(filter, update, { upsert: true });
	const updatedGames = await Game.find({}).populate('gameTypeId').populate("towns");
	return makeResponse(res, 200, "Updated Successfully", updatedGames, false)
}

const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const games = await Game.findByIdAndDelete(_id).populate("gameTypeId").populate("towns")
		if (!games) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", games, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

const getSingleGame = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const game = await Game.findById(_id).populate("gameTypeId").populate("towns")
		if (!game) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", game, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

export default {
	createGame,
	getGames,
	updateGame,
	deleteGame,
	getSingleGame
}
