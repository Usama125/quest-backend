import { Document } from 'mongoose';

export default interface ITown extends Document {
	name: string;
	url: string;
}