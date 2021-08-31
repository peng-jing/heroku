const db = require('../models')
const Comment = db.Comment
const User = db.User
const board = {
	getComments: (req, res, next) => {
		Comment.findAll({
      include: User,
      order: [
        ['id', 'DESC']
      ]
    }).then(comments => {
      console.log('c_board.js的comments:', comments)
      res.render('index', {
				comments
			})
		}).catch(err => {
			req.flash('errorMessage', err.toString())
			return next()
		})
	},
	addComment: (req, res, next) => {
		const {content} = req.body
		const {userId} = req.session
		if (!content || !userId) {
			req.flash('errorMessage', '資料有缺')
			return next()
		}
    Comment.create({
      UserId: userId,
      content
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      req.flash('errorMessage', err.toString())
      return next()
    })

	},
	updateComment: (req, res, next) => {
		const { userId } = req.session
		const id = req.params.id
		if (!userId || !id) {
			req.flash('errorMessage', '你沒有權限編輯留言')
			return next()
		}
    Comment.findOne({
      where: {
        id,
        userId
      }
    }).then(comment => {
      if (!comment) {
				req.flash('errorMessage', '你沒有權限編輯留言')
				return next()
			}
			res.render('board/update', {
				comment
			})
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
	},
	handleUpdate: (req, res, next) => {
		const id = req.params.id
		const { content } = req.body
		if (!content) {
			feq.flash('errorMessage', '請輸入留言')
			return next()
		}
    Comment.update({
      content
    },{
      where: {
        id
      }
    }).then(() => {
      res.redirect('/')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
	},
	handleDelete: (req, res, next) => {
		const id = req.params.id
		const { userId } = req.session
		if (!id || !userId) {
			req.flash('errorMessage', '錯誤')
			return next()
		}
    Comment.destroy({
      where: {
        id,
        userId
      }
    }).then(() => {
      if (results.changedRows === 0) {
				req.flash('errorMessage', '你沒有權限刪除')
				return next()
			}
			res.redirect('/')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
	},
}

module.exports = board