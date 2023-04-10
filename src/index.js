"use strict";
const registerController = require("./controllers/registerController");
const sessionController = require("./controllers/sessionController");
const express = require("express");
const app = express();
app.set("trust proxy", 1);
const session = require('express-session');
// 初期設定　sessionの設定
const ses_opt = {
    secret: 'my_secret',
    // 画面遷移した際にセッションの保存がされなかったので以下の設定を一旦コメントアウト
    // resave: false,          //trueにするとsessionに変更がなくても強制的に保存　通常false
    // saveUninitialized: false, //trueにすると初期はされていなくても保存 通常false
    cookie: {
        maxAge: 1000 * 60 * 30, //cookieの寿命　単位はミリ秒
    }
};
app.use(session(ses_opt));
// postの値を受け取るために以下を追記(body-parserインストール済)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// バリデーション
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
    console.log(req.session.name);
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
// ログイン
app.post("/login", sessionController.login);
app.listen(8080, () => { });
