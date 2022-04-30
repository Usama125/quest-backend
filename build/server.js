"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
// @ts-ignore
var express_1 = __importDefault(require("express"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = __importDefault(require("./routes/user"));
var town_1 = __importDefault(require("./routes/town"));
var gameType_1 = __importDefault(require("./routes/gameType"));
var game_1 = __importDefault(require("./routes/game"));
var clue_1 = __importDefault(require("./routes/clue"));
var cors_1 = __importDefault(require("cors"));
var NAMESPACE = 'Server';
var router = (0, express_1.default)();
router.use((0, cors_1.default)());
/** Connect to MONGO **/
mongoose_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then(function (result) {
    logging_1.default.info(NAMESPACE, "Connected to MongoDB!");
}).catch(function (error) {
    logging_1.default.error(NAMESPACE, error.message, error);
});
/** Log the request */
router.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/** Rules of our API */
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// Upload Files Setup
router.use(express_1.default.static("./source/uploads"));
// Note:- Simply save ( req.file/files.filename ) into the database and then get the file with URL:- http://localhost:1337/filename
router.use(body_parser_1.default.urlencoded({ extended: false, limit: "100mb", parameterLimit: 10000000 }));
router.use(body_parser_1.default.json({ limit: "50mb", extended: false }));
/** Routes go here */
router.use('/api/users', user_1.default);
router.use('/api/towns', town_1.default);
router.use('/api/game-types', gameType_1.default);
router.use('/api/games', game_1.default);
router.use('/api/clues', clue_1.default);
// Simple Root Message
router.get('/', function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome to Quest</title></head>");
    res.write("<body><h4>Welcome to Quest Backend API's, Please use Postman Collection for respective API's</h4></body>");
    res.write("</html>");
    return res.end();
});
/** Error handling */
router.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server is running ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port)); });
