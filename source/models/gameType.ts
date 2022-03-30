import mongoose, { Schema } from 'mongoose';
import IGameType from '../interfaces/gameType';

const GameTypeSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IGameType>('GameType', GameTypeSchema);