import {
	GraphQLString,
	GraphQLID
} from 'graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {
	TokenType
} from '../Types/User'

import {
	UserType,
	InputImageType,
	CredentialInputType
} from '../Types'

import {
	User
} from '../../models'

const UserMutation = {
	register: {
		type: UserType,
		args: {
			email: { type: GraphQLString },
			username: { type: GraphQLString },
			password: { type: GraphQLString },
			credentials: { type: CredentialInputType },
			image: { type: InputImageType }
		},
		async resolve(_, { email, username, password, image, credentials }) {
			try {
				const user = await User.findOne({ $or: [ { email }, { username } ] })
				if (user) {
					if (user.email === email) {
						throw new Error("Sorry! But email has already been used")
					} else if (user.username === username) {
						throw new Error("Sorry! But username has already been used")
					}
				}

				const salt = await bcrypt.genSalt(10)
				const hash = await bcrypt.hash(password, salt)
				password = hash

				const newUser = new User({
					email,
					password,
					username,
					credentials,
					avatar: image
				})
				return await newUser.save()
			} catch (err) {
				return err
			}
		}
	},
	updateUser: {
		type: UserType,
		args: {
			id: { type: GraphQLID },
			password: { type: GraphQLString },
			reEnterPassword: { type: GraphQLString },
			credentials: { type: CredentialInputType },
			image: { type: InputImageType },
			preloadImageSrc: { type: GraphQLString }
		},
		async resolve(parent, args, { req: { user, authError } }) {
			const { id, ...toUpdate } = args
			try {
				if (authError) throw new Error(authError)
				if (user.id !== id) throw new Error('[ERROR] Error in UPDATING user! You are not authorized to update this user! Please Login again')
				const { password, reEnterPassword, ...rest } = toUpdate
				
				let filteredToUpdate
				if (password) {
					if (password !== reEnterPassword) throw new Error('[ERROR] Error in UPDATING user! Passwords doesn\'t match!')
					filteredToUpdate = { ...rest, password } 
				} else {
					filteredToUpdate = {...rest}
				}
				
				const updatedUser = await User.findOneAndUpdate({ _id: id }, filteredToUpdate, { new: true })
				return updatedUser
			} catch (err) {
				return err
			}
		}
	},
	login: {
		type: TokenType,
		args: {
			email: { type: GraphQLString },
			password: { type: GraphQLString }
		},
		async resolve(_, { email, password }) {
			try {
				const user = await User.findOne({ email })
				if (!user) {
					throw new Error("Email not found!")
				}

				const validatePassword = await bcrypt.compare(password, user.password)
				if (!validatePassword) {
					throw new Error("Invalid Password!")
				}
				const token = await jwt.sign({ data: user }, process.env.SECRET_KEY, { expiresIn: Math.floor(60 * 60 * 24) })
				return { token }
			} catch (err) {
				return err
			}
		}
	},
}

export default UserMutation