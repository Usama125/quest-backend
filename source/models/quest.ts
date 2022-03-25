import mongoose, { Schema } from 'mongoose';
import IQuest from '../interfaces/quest';

const QuestSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: false
		},
		cities: {
			type: [Schema.Types.ObjectId],
			ref: "City",
			index: false
		},
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IQuest>('Quest', QuestSchema);