import jwt from 'jsonwebtoken'
import { User } from '../models'

const parseBearerToken = (bearerToken) => {
	if (!bearerToken) {
		return null
	}
	const [, token] = bearerToken.split(' ')
	return token
}

const extractAuth = (req) => {
	const headerAuth = req.headers.authorization
	if (!headerAuth) {
		req.authError = "Not Authorized!"
		req.isAuthenticated = false
		return null
	}
	return headerAuth
}

const isAuthenticated = async (req, res, next) => {
	const headerAuth = extractAuth(req)
	if (!headerAuth) return next()
	const token = parseBearerToken(headerAuth)
	if (!token) return next()
	const user = await decryptToken(token)

	if (!user) {
		req.authError = "Invalid Token!"
	} else {
		req.isAuthenticated = true
		req.user = user
	}
	return next()
}

const decryptToken = async (token) => {
	try {
		const result  = await jwt.verify(token, process.env.SECRET_KEY)
		const { data: { _id } } = result
		const user = await User.findOne({ _id })
		
		return user
	} catch (e) {
		return null
	}

}

export default isAuthenticated