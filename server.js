const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')
var url = require('url');


const fs = require('fs');

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const db = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
})
app.get('/', (req, res) => {
  const sqlSelect = 'SELECT * FROM users';
  db.query(sqlSelect, (err, result) => {
    var list = ""
    for (var i = 0; i < result.length; i++) {
      list = list + "<li>id:" + result[i].id + " 유저 아이디:" + `<a href="/id/${result[i].id}">${result[i].userId}</a>` + "</li>"
    }
    res.send(`
    <a href="/create"><h1>유저관리 어드민 페이지</h1></a>
    ${list}
    <a href="/notice"><h1>공지사항 관리</h1></a>
    <a href="/signIn"><h1>로그인</h1></a>
    `)
  })
});

app.get('/id/:id', (req, res) => {
  const id = req.params.id
  const sqlSpec = "SELECT * FROM users WHERE id=?"
  db.query(sqlSpec, id, (err, result) => {
    res.send(`
    상태:${result[0].userStatus}
    </br>
    기수:${result[0].years}
    </br>
    유저 등록 여부:${result[0].authorized}
    </br>
    </br>
    <form method="post" action="/register/${id}">
      <input type="submit" value="회원 권한 등록">
    </form>
    <form method="post" action="/deregister/${id}">
      <input type="submit" value="회원 권한 등록해제">
    </form>
    <form method="post" action="/delete/${id}">
      <input type="submit" value="유저 삭제">
    </form>
    `)
  })
})
app.get('/notice', (req, res) => {
  const sqlSelect = 'SELECT * FROM notice';
  db.query(sqlSelect, (err, result) => {
    var list = ""
    for (var i = 0; i < result.length; i++) {
      list = list + "<li>id:" + result[i].id + " 제목:" + `<a href="/notice/id/${result[i].id}">${result[i].title}</a>` + "</li>"
    }
    res.send(`
    <h1>공지사항 관리 어드민 페이지</h1>
    ${list}
    <a href="/notice/create"><h1>공지사항 작성</h1></>
    `)
  })
});

app.get('/notice/create', (req, res) => {

    res.send(`
    <form method="post" action="/notice/create">
    <h1>제목:</h1>
      <input type="text" name="title">
      <h2>본문 내용:</h2>
      <textarea name="description"></textarea>
      </br>
      <input type="submit" value="글 작성">
    </form>
    `
    )

});

app.post('/notice/create', function (req, res) {
  const title = req.body.title
  const description = req.body.description

  const sqlInsert = "INSERT INTO notice VALUES(null,?,?)"
  db.query(sqlInsert, [title,description], (err, result) => {
    console.log(err)
  })
  res.redirect('/notice');
});

app.get('/notice/id/:id', (req, res) => {
  const id = req.params.id
  const sqlSpec = "SELECT * FROM notice WHERE id=?"
  db.query(sqlSpec, id, (err, result) => {
    res.send(`
    제목:${result[0].title}
    </br>
    내용:${result[0].description}
    </br>
    </br>
    <form method="post" action="/notice/delete/${id}">
      <input type="submit" value="공지 삭제">
    </form>
    `)
  })
})


app.post('/notice/delete/:id', (req, res) => {
  const id = req.params.id
  const sqlDelete = "DELETE FROM notice WHERE id=?"
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err)
    }
  })
  res.redirect('/notice');
})

app.get('/users/enrolled', (req, res) => {
  // const years = req.body.years
  const sqlSpec = "SELECT * FROM users where userStatus='enrolled'"
  db.query(sqlSpec, (err, result) => {
    res.send(result)
    // console.log(userStatus)
  })
})

app.get('/users/graduated', (req, res) => {
  // const years = req.body.years
  const sqlSpec = "SELECT * FROM users where userStatus='graduated'"
  db.query(sqlSpec, (err, result) => {
    res.send(result)
    // console.log(userStatus)
  })
})
app.get('/users/professor', (req, res) => {
  // const years = req.body.years
  const sqlSpec = "SELECT * FROM users where userStatus='professor'"
  db.query(sqlSpec, (err, result) => {
    res.send(result)
    // console.log(userStatus)
  })
})

app.get('/numberData', (req, res) => {
  const sqlSpec = "SELECT id FROM numberdata"
  db.query(sqlSpec, (err, result) => {
    res.send(result)
    // console.log(userStatus)
  })
})

app.get('/create', (req, res) => {
  const sqlSelect = 'SELECT * FROM author';
  db.query(sqlSelect, (err, result) => {
    res.send(`
    <form method="post" action="/create">
    <h1>제목:</h1>
      <input type="text" name="name">
      <h2>본문 내용:</h2>
      <textarea name="profile"></textarea>
      </br>
      <input type="submit" value="글 작성">
    </form>
    `
    )
  })
});


app.post('/login', function (req, res) {
  const userId = req.body.userId
  const userPassword = req.body.userPassword
  const sqlLogin = "SELECT * FROM users WHERE userId=? AND userPassword=?"
  db.query(sqlLogin, [userId, userPassword], (err, result) => {
    res.send(result)
  })
  // res.redirect('/');
});

app.post('/board/write', function (req, res) {
  const title = req.body.title
  const author = req.body.userId
  const description = req.body.description
  const sqlInsert = "INSERT INTO board VALUES(null,?,?,?)"
  db.query(sqlInsert, [title,description,author], (err, result) => {
    console.log(err)
    res.send(result)
  })
  // res.redirect('/');
  // console.log()
});

app.put('/board/edit', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description
  const sqlUpdate = "UPDATE board SET title=?, description=? WHERE id=?"
  db.query(sqlUpdate, [title, description,id], (err, result) => {
    console.log(err)
    res.send(result)
  })
})

app.post('/board/delete', (req, res) => {
  const id = req.body.id
  const sqlDelete = "DELETE FROM board WHERE id=?"
  db.query(sqlDelete, id, (err, result) => {
      console.log(err)
      res.send(result)
  })
})

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM users';
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
  // res.send("hi")
})

app.get('/board', (req, res) => {
  const sqlSelect = 'SELECT * FROM board';
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
  // res.send("hi")
})

app.get('/noticeData', (req, res) => {
  const sqlSelect = 'SELECT * FROM notice';
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
  // res.send("hi")
})




app.get('/review/:id', (req, res) => {
  console.log(req.params.id)
})

// 아래 res.send안의 form 안에 들어갈 내용
{/* <input type="text" name="profile" value="${result[0].title}"> */}
app.get('/update/:id', (req, res) => {
  // const name = req.body.name
  // const profile = req.body.profile
  const id = req.params.id
  const sqlSpec = "SELECT * FROM topic WHERE id=?"
  db.query(sqlSpec, id, (err, result) => {
    res.send(`
      <form method="post" action="/update/${id}">
        <h4>회원 승인</h4>
        
        </br>
        <input type="submit" value="회원 인증">
      </form>
    `)

  })
  // res.redirect('/');
})

app.post('/register/:id', (req, res) => {
  // const name = req.body.name
  // const profile = req.body.profile
  const id = req.params.id
  const sqlUpdate = "UPDATE users SET authorized='yes'  WHERE id=?"
  // const sqlUpdate = "UPDATE topic SET profile=?  WHERE id=?"
  db.query(sqlUpdate, id, (err, result) => {
    // db.query(sqlUpdate, [profile, id], (err, result) => {
    if (err) {
      console.log(err)
    }
  })
  res.redirect('/');
})

app.post('/deregister/:id', (req, res) => {
  // const name = req.body.name
  // const profile = req.body.profile
  const id = req.params.id
  const sqlUpdate = "UPDATE users SET authorized='no'  WHERE id=?"
  // const sqlUpdate = "UPDATE topic SET profile=?  WHERE id=?"
  db.query(sqlUpdate, id, (err, result) => {
    // db.query(sqlUpdate, [profile, id], (err, result) => {
    if (err) {
      console.log(err)
    }
  })
  res.redirect('/');
})

app.post('/delete/:id', (req, res) => {
  const id = req.params.id
  const sqlDelete = "DELETE FROM users WHERE id=?"
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err)
    }
  })
  res.redirect('/');
})

app.get('/signUp', (req, res) => {
  const sqlSelect = 'SELECT * FROM author';
  db.query(sqlSelect, (err, result) => {
    res.send(`
    <form method="post" action="/signUp">
      <p>이름:</p>
      <input type="text" name="name">
      <p>아이디:</p>
      <input type="text" name="userid">
      <p>비밀번호:</p>
      <input type="text" name="userPassword"></input>
      <p>사용자 정보(교수 or 학생):</p>
      <input type="text" name="userStatus"></input>
      <p>기수</p>
      <input type="text" name="years"></input>
      <p>권한여부</p>
      <input type="text" name="authorized"></input>
      </br>
      </br>
      <input type="submit" value="유저 등록">
    </form>
    `
    )
  })
});

app.post('/signUp', function (req, res) {
  const name = req.body.name
  const userId = req.body.userId
  const userPassword = req.body.userPassword
  const userStatus = req.body.userStatus
  const years = req.body.years
  const authorized = req.body.authorized

  const sqlInsert = "INSERT INTO users VALUES(null,?,?,?,?,?,null)"
  db.query(sqlInsert, [userId,name,userPassword,userStatus,years], (err, result) => {
    console.log(err)
  })
  res.redirect('/');
});


app.get('/signIn', (req, res) => {
  const sqlSelect = 'SELECT * FROM author';
  db.query(sqlSelect, (err, result) => {
    res.send(`
    <form method="post" action="/signIn">
    <p>아이디:</p>
      <input type="text" name="name">
      <p>비밀번호:</p>
      <input type="text" name="profile"></input>
      </br>
      </br>
      <input type="submit" value="로그인하기">
    </form>
    `
    )
  })
});

app.get('/:name', (req, res) => {
  var _url = req.url;
  var pathname = url.parse(_url, true).pathname;
  const name = req.params.name
  const sqlSpec = "SELECT * FROM author WHERE name=?"
  db.query(sqlSpec, name, (err, result) => {
    res.send(
      "hi22")
  })
})

app.post('/api/insert', (req, res) => {

  const name = req.body.name
  const profiles = req.body.profiles

  const sqlInsert = "INSERT INTO author VALUES(null,?,?)"
  db.query(sqlInsert, [name, profiles], (err, result) => {
    console.log(err)
  })
})

app.delete('/api/delete/:name', (req, res) => {
  const name = req.params.name
  const sqlDelete = "DELETE FROM author WHERE name=?"
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err)
  })
})

app.put('/api/update', (req, res) => {
  const name = req.body.name
  const profiles = req.body.profile
  const sqlUpdate = "UPDATE author SET profile=? WHERE name=?"
  db.query(sqlUpdate, [profiles, name], (err, result) => {
    if (err) console.log(err)
  })
})

app.listen(3001, () => {
  console.log('running on port 3001')
})