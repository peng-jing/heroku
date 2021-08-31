const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 5001

const userController = require('./controllers/c_user')
const boardController = require('./controllers/c_board')
app.set('view engine', 'EJS')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 }
}))

app.use(flash())

app.use(express.urlencoded({ extended: false })) // use 表示全部檔案都要套用
app.use(express.json())

app.use((req, res, next) => {
	res.locals.username = req.session.username
	res.locals.errorMessage = req.flash('errorMessage')
	next()
})

function redirectBack(req, res, next) {
	res.redirect('back')
	next()
}

app.get('/', boardController.getComments, redirectBack)
app.post('/comments', boardController.addComment, redirectBack)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/logout', userController.handleLogout)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)

app.get('/update_comment/:id', boardController.updateComment, redirectBack)
app.post('/update_comment/:id', boardController.handleUpdate, redirectBack)
app.get('/delete_comment/:id', boardController.handleDelete, redirectBack)


app.listen(port, () => {
	console.log(`Example app listening at ${port}`)
})