"use strict";
const registerController = require("./controllers/registerController");
const express = require("express");
const app = express();
const session = require('express-session');
// 初期設定　sessionの設定
const ses_opt = {
    secret: 'my_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } //cookieの寿命　単位はミリ秒
};
app.use(session(ses_opt));
// postの値を受け取るために以下を追記(body-parserインストール済)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const registerValidator = require('./validators/registerValidator');
// DBへの接続
const mysql = require('mysql');
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: ''
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log('Connected');
});
// ejsファイルをexpressに読み込む
// 第一引数：view engineを指定。 第二引数：使用するテンプレートを指定。
app.set('view engine', 'ejs');
// cssを反映させるため
app.use(express.static('public'));
//ホーム画面
app.get("/", (req, res) => {
    res.render("home");
});
//ログイン画面
app.get("/login", (req, res) => {
    res.render("login");
});
//ユーザー登録画面
app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/signup", registerValidator, registerController.signup);
app.listen(8080, () => { });
