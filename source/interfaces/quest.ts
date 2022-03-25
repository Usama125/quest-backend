import { Document } from 'mongoose';

export default interface IQuest extends Document {
	name: string;
	cities: string[];
}