const bcrypt = require('bcryptjs');

const Users = [
  {
    name:'admin',
    email:'admin@admin.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true
  },
  {
    name:'saurabh',
    email:'saurabh@gmail.com',
    password:bcrypt.hashSync('saurabh',10)
  },
  {
    name:'user',
    email:'user@gmail.com',
    password:bcrypt.hashSync('user',10)
  }
]

module.exports = Users;