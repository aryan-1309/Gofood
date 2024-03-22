const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({ success: false, message: `Auth Failed` })
            }
            else {
                req.body.userId = decode.id
                next()
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(401).send({success: false, message: 'Something went wrong while Auth Middleware'})
    }
}