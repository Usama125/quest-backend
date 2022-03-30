import { Document } from 'mongoose';

export default interface IGameType extends Document {
	name: string;
}