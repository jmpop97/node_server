const crypto = require('crypto');
const string = 'this is my password'
const hashPassword =crypto.createHash('sha512').update(string).digest("hex")
console.log(hashPassword)
const hashedPw = crypto.pbkdf2Sync(string, "", 1, 64, 'sha512').toString('hex');
console.log(hashedPw)
const hashedPw2 = crypto.pbkdf2Sync(hashedPw, "", 1, 64, 'sha512').toString('hex');
console.log(hashedPw2)