const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const bodyParser = require("body-parser");
const PORT    = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
    host: "172.29.104.151", // 호스트
    user: "root",      // 데이터베이스 계정
    password: "1433",      // 데이터베이스 비밀번호
    database: "reactdb",  // 사용할 데이터베이스
});

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }))

// JSON Parsing
app.use(bodyParser.json());

// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

// mysql에서 GRANT ALL PRIVILEGES on *.* TO 'root'@'%' WITH GRANT OPTION << 명령어로 해결
app.get("/article", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sqlQuery = "SELECT * FROM ARTICLE AS AT ORDER BY AT.ID DESC";

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
        // console.log(result);
        // console.log(err);
        });
});

app.post("/article", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {title, content, loginNowId, formattedDate} = req.body;

    const sqlQuery = `INSERT INTO ARTICLE(title, content, writer, writedate, modifydate) VALUES ("${title}", "${content}", "${loginNowId}", "${formattedDate}", "${formattedDate}")`;

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    })
});

app.delete("/article", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {articleId} = req.query;
    
    const sqlQuery = `DELETE FROM ARTICLE AS AT WHERE AT.ID = ${articleId};`;
    const sqlQuery2 = `DELETE FROM COMMENT AS CT WHERE CT.ARTICLEID = ${articleId};`;

    db.query(sqlQuery, (err, result) => {

        if(err) res.send(err);
        else {
            db.query(sqlQuery2, (err2, result2) => {
                if(err2) res.send(err2);
                else res.send(articleId);
            })
        }
    });
});

app.put("/article", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {articleId, title, content, writeDate, modifyDate} = req.body;

    // console.log(articleId);
    // console.log(title);
    // console.log(content);

    const sqlQuery = `UPDATE ARTICLE SET TITLE = '${title}', CONTENT = '${content}', WRITEDATE = '${writeDate}', MODIFYDATE = '${modifyDate}' WHERE ID = ${articleId}`;

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    });
})

app.get("/article/:id", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const articleId = req.params.id;

    const sqlQuery = `SELECT * FROM ARTICLE AS AT WHERE AT.ID = ${articleId}`;

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    });
});

app.get("/comment/:id", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const articleId = req.params.id;

    const sqlQuery = `SELECT * FROM COMMENT AS CT WHERE CT.ARTICLEID = ${articleId}`;

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    });

});

app.post("/comment", (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    const {articleId, comment, writerid, writedate, modifydate} = req.body;

    const sqlQuery = `INSERT INTO COMMENT(articleid, comment, writerid, writedate, modifydate) VALUES(${articleId}, "${comment}", "${writerid}", "${writedate}", "${modifydate}")`;

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    });
});

app.delete("/comment", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const {commentId} = req.query;

    const sqlQuery = `DELETE FROM COMMENT AS CT WHERE CT.ID = ${commentId}`;

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    });
});

app.put("/comment", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const {id, articleid, comment, writedate, modifydate} = req.body.comment;

    const sqlQuery = `UPDATE COMMENT SET ARTICLEID = ${articleid}, COMMENT = "${comment}", WRITEDATE = "${writedate}", MODIFYDATE = "${modifydate}" WHERE ID = ${id}`;

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    });
});

app.post("/member/register", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const {id, settingPW, email, birth, gender} = req.body;

    // console.log(id, email, settingPW);

    const sqlQuery = `INSERT INTO MEMBER(email, memberid, memberpw, birth, gender) VALUES("${email}", "${id}", "${settingPW}", "${birth}", "${gender}")`;

    // console.log(sqlQuery);

    db.query(sqlQuery, (err, result) => {

        // console.log(err);
        // console.log(result);
        if(err) res.send(err);
        else res.send(result);
    });
});

app.post("/member/login", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const {email} = req.body;

    const sqlQuery = `SELECT * FROM MEMBER AS MT WHERE MT.EMAIL = "${email}"`

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else {
            if(result.length == 1) {
                res.send(result[0]);
            } else {
                res.send("NOT FOUND");
            }
        }
    })
})

app.get("/address/get", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const sqlQuery = "SELECT * FROM ADDRESSTABLE";

    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else {
            if(result.lenght == 0) {
                res.send("NOT FOUND");
            } else {
                res.send(result);
            }
        }
    })
})

module.exports = app;