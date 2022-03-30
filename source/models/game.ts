import mongoose, { Schema } from 'mongoose';
import IGame from '../interfaces/game';

const GameSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: false
		},
		gameTypeId: {
			type: Schema.Types.ObjectId,
			ref: "GameType",
			index: false
		},
		towns: {
			type: [Schema.Types.ObjectId],
			ref: "Town",
			index: false
		},
		durationType: {
			type: String,
			required: false
		},
		duration: {
			type: String,
			required: false
		},
		introduction: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IGame>('Game', GameSchema);