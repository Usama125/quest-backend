import { Document } from 'mongoose';

export default interface IGame extends Document {
	questId: string;
	name: string;
}