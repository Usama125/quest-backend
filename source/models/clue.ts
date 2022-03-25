import mongoose, { Schema } from 'mongoose';
import IClue from '../interfaces/clue';

const ClueSchema: Schema = new Schema(
	{
		hint: {
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
		url: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IClue>('Clue', ClueSchema);