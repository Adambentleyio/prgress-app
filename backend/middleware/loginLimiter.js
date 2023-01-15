const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 50, //limit each IP to 5 login requests per window ⬆ e.g. per minute
    message: {
        message: 'There have been too many attempts from this computer, please try again later'
    },
    handler: (req, res, next, options) => {
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}} `, 'errLog.log')
        res.Status(options.statusCOde).send(options.message)
    },
    standardHeaders: true,  //return rate limit info in 'rateLimit headers
    legacyHeaders: false // disable the X-rate-limit headers
})

module.exports = loginLimiter