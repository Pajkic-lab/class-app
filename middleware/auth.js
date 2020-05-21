const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async function(req, res, next) {
    const token = req.header('x-auth-token')
    if(!token) {
        return res.status(401).json({ msg: 'NO TOKEN, AUTHORIZATION DENIED'})
    }
    try {
        await jwt.verify(token, config.get('jwtSecret'), (error, decoded)=> {
            if(error){
                res.status(400).json({msg: 'TOKEN IS NOT VALID'})
            } else {
                req.user = decoded.user
                next()
            }
        })
    } catch (err) {
        console.error('something wrong with auth middleware')
        res.status(500).json({ msg: 'Server Error' })
    }
}