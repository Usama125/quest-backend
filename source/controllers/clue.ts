import { NextFunction, Request, Response } from 'express'
import makeResponse, { sendErrorResponse } from '../functions/makeResponse'
import Clue from '../models/clue'
import cloudinary from 'cloudinary'
import config from '../config/config'
import { uploads } from '../functions/cloudinaries'
import fs from 'fs'

const NAMESPACE = "Clue"

// const check = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		// @ts-ignore
// 		const uploader = async (path: any) => await uploads(path, "Images");

// 		if (req.method === 'POST') {
// 			const urls = []
// 			const files = req.files;
// 			console.log("Files => ", files)
// 			// @ts-ignore
// 			for (const file of files) {
// 				const { path } = file;
// 				const newPath = await uploader(path)
// 				urls.push(newPath)
// 				fs.unlinkSync(path)
// 			}

// 			res.status(200).json({
// 				message: 'images uploaded successfully',
// 				data: urls
// 			})

// 		} else {
// 			res.status(405).json({
// 				err: `${req.method} method not allowed`
// 			})
// 		}
// 	} catch (err) {
// 		console.log("err => ", err);
// 		res.status(400).json({
// 			err: err
// 		})
// 	}
// }

const deleteClueFile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { clueId, fileId } = req.params;

		const clue = await Clue.findById(clueId);

		if (clue) {
			const clueFiles = clue.urls.filter(url => url._id.toString() !== fileId);
			const filter = { _id: clueId };
			const update = { urls: clueFiles }

			await Clue.findOneAndUpdate(filter, update, { upsert: true });
			const updatedClue = await Clue.findById(clueId);
			return makeResponse(res, 200, "File ", updatedClue, false)
		}

	} catch (err) {
		return makeResponse(res, 400, "File Not exists", err, true)
	}
}

const createClue = async (req: Request, res: Response, next: NextFunction) => {
	const { name, hint_1, hint_2, gameId, type, text, ans, clue_type } = req.body

	// @ts-ignore
	const uploader = async (path: any) => await uploads(path, "Images");

	try {
		if (name && hint_1 && hint_2 && gameId && type && text && ans && clue_type) {

			const urls = []
			const files = req.files;

			// @ts-ignore
			for (const file of files) {
				const { path } = file;
				const newPath = await uploader(path)
				urls.push(newPath)
				fs.unlinkSync(path)
			}

			await new Clue({ name, hint_1, hint_2, gameId, type, text, ans, clue_type, urls }).save();
			const clues = await Clue.find({ gameId }).populate("gameId");
			return makeResponse(res, 201, "Clue Created Successfully", clues, false)
		} else {
			return makeResponse(res, 400, "Validation Failed", null, true)
		}
	} catch (err) {
		console.log(err);
		return makeResponse(res, 400, "Validation Failed", err, true)
	}
}

const getGameClues = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { gameId } = req.params;
		const result = await Clue.find({ gameId }).populate("gameId");
		return makeResponse(res, 200, "Clues", result, false);
	} catch (err) {
		return makeResponse(res, 400, "Problem while getting Clues", null, true)
	}
}

const updateClue = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params
	try {
		let update = JSON.parse(JSON.stringify({ ...req.body }))

		const filter = { _id: id };

		console.log("Files => ", req.files);

		// @ts-ignore
		if (req?.files?.length > 0) {
			const uploader = async (path: any) => await uploads(path, "Images");
			const urls = []
			const files = req.files;

			// @ts-ignore
			for (const file of files) {
				const { path } = file;
				const newPath = await uploader(path)
				urls.push(newPath)
				fs.unlinkSync(path)
			}
			console.log("URLS => ", urls)
			update = { ...update, $push: { urls } }

		}

		const updatedClue = await Clue.findOneAndUpdate(filter, update, { upsert: true });
		// @ts-ignore
		const updatedClues = await Clue.find({ gameId: updatedClue.gameId }).populate('gameId');
		return makeResponse(res, 200, "Updated Successfully", updatedClues, false)
	} catch (err: any) {
		return makeResponse(res, 400, err.message, null, true)
	}

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

const getClueDetail = async (req: Request, res: Response, next: NextFunction) => {
	const _id = req.params.id
	try {
		const clue = await Clue.findById(_id).populate("gameId")
		if (!clue) return res.sendStatus(404)
		return makeResponse(res, 200, "Deleted Successfully", clue, false)
	} catch (e) {
		return res.sendStatus(400)
	}
}

export default {
	createClue,
	getGameClues,
	updateClue,
	deleteClue,
	getClueDetail,
	deleteClueFile,
	// check
}
