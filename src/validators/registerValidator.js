"use strict";
const { check } = require('express-validator');
module.exports = [
    check('name').not().isEmpty().withMessage('入力必須です'),
    check('email').not().isEmpty().withMessage('入力必須です'),
    check('pass').not().isEmpty().withMessage('入力必須です').isLength({ min: 7 }).withMessage('7文字以上にしてください。')
        .custom((value, { req }) => {
        if (req.body.pass !== req.body.pass_confirm) {
            throw new Error('パスワード（確認）と一致しません。');
        }
        return true;
    }),
];
