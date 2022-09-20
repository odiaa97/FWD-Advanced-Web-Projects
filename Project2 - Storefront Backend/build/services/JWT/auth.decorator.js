"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDecorator = void 0;
function MyDecorator() {
    console.log("first(): factory evaluated");
    return function (target, propertyKey) {
        console.log(`first(): called -- ${target} --- ${propertyKey}`);
    };
}
exports.MyDecorator = MyDecorator;
function test(target, propertyKey, descriptor) {
    return descriptor;
}
class Test {
    hello() {
    }
}
__decorate([
    test
], Test.prototype, "hello", null);
function decorator(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; // then we overwrite it with a new implementation,
    console.log("first(): factory evaluated");
    return function (target, propertyKey, descriptor) {
        console.log(`first(): called -- ${target} --- ${propertyKey} --- ${descriptor}`);
    };
}
//export default MyDecorator;
// import jwt from 'jsonwebtoken';
// import Request from 'express';
// class AuthDecorator {
//     _req: Request;
//     constructor(private req: Request) {this._req = req};
//     public auth(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
//         const newDescriptor = Object.assign({}, descriptor);
//         newDescriptor.value = () => {
//             jwt.verify(this._req.body.token, process.env.TOKEN_SECRET as string, (err: unknown, token: unknown) => {
//                 if (err) throw new Error(`Invalid token: ${err}`);
//                 return descriptor.value.apply(this, arguments);
//             })
//         }
//         return newDescriptor;
//     }
// }
// module.exports = { AuthDecorator };
exports.default = MyDecorator;
