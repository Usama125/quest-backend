import { Document } from 'mongoose';

export default interface IGame extends Document {
	gameId: string;
	hint: string;
	type: string;
	url: string;
}