
const handleRegister = (req, res, db, bcrypt) => {
	if(!req.body.name || !req.body.email || !req.body.password) {
		return res.status(400).json('Invalid input for register')
	}

	const { name, email, password } = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
				return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date(),
				})
				.then(user => {
					res.status(200).json(user[0]);	  
				})
 		})
 		.then(trx.commit)
 		.catch(trx.rollback)
	})
	 .catch(err => {
					res.status(400).json('unable to register');
				})
};

module.exports = {
	handleRegister: handleRegister
};