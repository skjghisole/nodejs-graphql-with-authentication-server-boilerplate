import mongoose from 'mongoose'

const { Types: { ObjectId } } = mongoose


const toObjectIDConversion = (id) => {
	try {
		if (id instanceof String) {
			return ObjectId(id)
		} else if (id instanceof Array) {
			return id.map(x => ObjectId(x))
		}
	} catch (e) {
		console.error(e)
	}
}

export default toObjectIDConversion