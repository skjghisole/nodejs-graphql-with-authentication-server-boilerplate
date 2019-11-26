import mongoose from 'mongoose'
import { USER_ROLE } from '../constants'

const { Schema, model, Types: { ObjectId } } = mongoose

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true
	},
	avatar: {
		imageSrc: String,
		minifiedImageSrc: String,
		preloadImageSrc: String
	},
	password: {
		type: String,
		required: true
	},
	credentials: {
		firstName: {
			type: String,
			default: ''
		},
		lastName: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			default: ''
		},
		phone: {
			type: String,
			default: ''
		}
	},
	role: {
		type: String,
		required: true,
		default: USER_ROLE
	},
	createdAt: Date,
	updatedAt: Date
}, {
	strict: true,
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
})

export default model('User', UserSchema)