import {
	GraphQLObjectType,
} from 'graphql'

import {
	UserMutations,
} from './'

const fields = {
	...UserMutations,
}

const MutationType = new GraphQLObjectType({
	name: 'MutationType',
	fields
})

export default MutationType