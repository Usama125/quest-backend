import { Document } from 'mongoose';

export default interface ICity extends Document {
	name: string;
}