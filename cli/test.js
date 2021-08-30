const db = require('./models')
const User = db.User
const Comment = db.Comments

User.create({
	firstName: "Apple", 
	lastName: "Chen"
}).then(() => {
	console.log('good')
})

Comment.create({
	firstName: "Apple",
	content: "hahahaha"
})