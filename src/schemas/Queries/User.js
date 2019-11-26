import {
	GraphQLString,
	GraphQLList,
} from 'graphql'

import {
	UserType,
} from '../Types'

import {
	User
} from '../../models'

const UserQueries = {
	users: {
		type: new GraphQLList(UserType),
		async resolve(_, args, { req: { user, authError } }) {
			try {
				if (authError) {
					throw new Error(authError)
				} else if (user.role !== "ADMIN") {
					throw new Error("NOT AUTHORIZED!")
				} else {
					return await User.find({})
				}
			} catch (e) {
				return e
			}

		}
	},
	user: {
		type: UserType,
		args: {
			username: { type: GraphQLString }
		},
		async resolve(_, { username }) {
			return await User.findOne({ username })
		}
	},
	me: {
		type: UserType,
		resolve(parent, _, { req: { user, authError } }) {
			if (authError) {
				throw new Error(authError)
			} else {
				return user
			}
		}
	}
}

export default UserQueries