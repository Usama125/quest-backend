// @ts-nocheck
import http from 'http'
import bodyParser from 'body-parser'
// @ts-ignore
import express from 'express'
import logging from './config/logging'
import config from './config/config'
import mongoose from 'mongoose'
import userRoutes from './routes/user'
import townsRoutes from './routes/town'
import gameTypesRoutes from './routes/gameType'
import gamesRoutes from './routes/game'
import cluesRoutes from './routes/clue'
import cors from 'cors'

const NAMESPACE = 'Server'
const router = express()

router.use(cors())

/** Connect to MONGO **/
mongoose.connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, "Connected to MongoDB!")
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error)
    })

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`)
    })

    next()
})

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next()
})

// Upload Files Setup
router.use(express.static("./source/uploads"))
// Note:- Simply save ( req.file/files.filename ) into the database and then get the file with URL:- http://localhost:1337/filename

router.use(bodyParser.urlencoded({ extended: false, limit: "100mb", parameterLimit: 10000000 }))
router.use(bodyParser.json({ limit: "50mb", extended: false }))


/** Routes go here */
router.use('/api/users', userRoutes)
router.use('/api/towns', townsRoutes)
router.use('/api/game-types', gameTypesRoutes)
router.use('/api/games', gamesRoutes)
router.use('/api/clues', cluesRoutes)

// Simple Root Message
router.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.write("<html>")
    res.write("<head><title>Welcome to Quest</title></head>")
    res.write("<body><h4>Welcome to Quest Backend API's, Please use Postman Collection for respective API's</h4></body>")
    res.write("</html>")
    return res.end()
})

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found')

    res.status(404).json({
        message: error.message
    })
})

const httpServer = http.createServer(router)

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`))
