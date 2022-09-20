"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const cors_1 = __importDefault(require("cors"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const app = (0, express_1.default)();
const port = 3000;
const host = '127.0.0.1';
app.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`);
});
const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});
(0, user_route_1.default)(app);
(0, auth_route_1.default)(app);
(0, order_route_1.default)(app);
(0, product_route_1.default)(app);
(0, cart_route_1.default)(app);
exports.default = app;
