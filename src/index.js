const express = require("express");
const app = express();

// ejsファイルをexpressに読み込む
// 第一引数：view engineを指定。 第二引数：使用するテンプレートを指定。
app.set('view engine','ejs');

//ログイン画面
app.get("/login", (req, res) => {
  res.render("login");
});

//ユーザー登録画面
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(8080, ()=>{});