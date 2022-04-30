import mongoose, { Schema } from 'mongoose';
import IClue from '../interfaces/clue';

const ClueSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		hint_1: {
			type: String,
			required: true
		},
		hint_2: {
			type: String,
			required: false
		},
		gameId: {
			type: Schema.Types.ObjectId,
			ref: "Game",
			index: false
		},
		type: {
			type: String,
			required: false
		},
		urls: {
			type: [{
				url: {
					type: String
				}
			}],
			required: false
		},
		text: {
			type: String,
			required: false
		},
		ans: {
			type: String,
			required: false
		},
		clue_type: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IClue>('Clue', ClueSchema);