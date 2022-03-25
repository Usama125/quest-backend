import mongoose, { Schema } from 'mongoose';
import IGame from '../interfaces/game';

const GameSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: false
		},
		questId: {
			type: Schema.Types.ObjectId,
			ref: "Quest",
			index: false
		},
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IGame>('Game', GameSchema);