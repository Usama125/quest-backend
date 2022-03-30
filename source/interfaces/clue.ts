import { Document } from 'mongoose';

export default interface IClue extends Document {
	name: string;
	gameId: string;
	hint_1: string;
	hint_2: string;
	type: string;
	url: string;
	text: string;
	ans: string;
}