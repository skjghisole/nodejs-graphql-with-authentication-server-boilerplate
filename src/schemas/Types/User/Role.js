import {
	GraphQLEnumType
} from 'graphql'
import {
	USER_ROLE,
	ADMIN_ROLE
} from '../../../constants'

const RoleType = new GraphQLEnumType({
	name: 'RoleTypes',
	values: {
		USER: {
			value: USER_ROLE
		},
		ADMIN: {
			value: ADMIN_ROLE
		}
	}
})

export default RoleType