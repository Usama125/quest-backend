import { Document } from 'mongoose';

export default interface IGame extends Document {
	gameTypeId: string;
	name: string;
	towns: string[];
	durationType: string;
	duration: string;
	introduction: string;
}