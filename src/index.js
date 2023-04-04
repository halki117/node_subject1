const express = require("express");
const app = express();

// DBへの接続
const mysql = require('mysql');

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: ''
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});


// ejsファイルをexpressに読み込む
// 第一引数：view engineを指定。 第二引数：使用するテンプレートを指定。
app.set('view engine','ejs');

// cssを反映させるため
app.use(express.static('public'))

//ログイン画面
app.get("/login", (req, res) => {
  res.render("login");
});

//ユーザー登録画面
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(8080, ()=>{});