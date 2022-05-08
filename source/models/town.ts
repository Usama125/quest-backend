import mongoose, { Schema } from 'mongoose';
import ITown from '../interfaces/town';

const TownSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: false
		},
		url: {
			type: String,
			required: false
		},
	},
	{
		timestamps: true
	}
);

export default mongoose.model<ITown>('Town', TownSchema);