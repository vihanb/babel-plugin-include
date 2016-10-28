"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            Identifier: function Identifier(path) {
                console.log(path);
            }
        }
    };
};