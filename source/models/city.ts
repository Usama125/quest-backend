import mongoose, { Schema } from 'mongoose';
import ICity from '../interfaces/city';

const UserSchema: Schema = new Schema(
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

export default mongoose.model<ICity>('City', UserSchema);