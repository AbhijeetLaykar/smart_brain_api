const handleSignin = (req, res, db, bcrypt) => {

	if(!req.body.email || !req.body.password) {
		return res.status(400).json('Invalid input for signin')
	}
	// if (req.body.email === database.users[0].email &&
	// 	req.body.password === database.users[0].password) {
	// 				// res.json('success');
	// 			res.json(database.users[0]);
	// 	} else {
	// 	res.status(400).json('sign-in failed!');
	// }
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			// console.log(isValid);
			if (isValid){
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						// console.log(user);
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))

};


module.exports = {
	handleSignin: handleSignin

};