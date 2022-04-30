import { Document } from 'mongoose';

interface IUrl extends Document {
	url: string;
}

export default interface IClue extends Document {
	name: string;
	gameId: string;
	hint_1: string;
	hint_2: string;
	type: string;
	urls: IUrl[];
	text: string;
	ans: string;
	clue_type: string;
}