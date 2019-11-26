import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLID,
	GraphQLList
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { ImageType } from '../'
import { CredentialType, RoleType } from './'

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		email: { type: GraphQLString },
		username: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		role: { type: RoleType },
		avatar: {
			type: ImageType,
			resolve({ image }) {
				return image
			}
		},
		credentials: {
			type: CredentialType
		},
	})
})

export default UserType