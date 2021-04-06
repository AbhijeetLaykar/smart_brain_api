const Clarifai = require('clarifai');

const app = new Clarifai.App({
 		apiKey: '30698788fe344aac8ac1b4036660f790'
	});

const handleApiCall = (req, res) => {
	app.models
		.predict("d02b4508df58432fbb84e800597b8959", req.body.input)
		.then(data => {
			res.json(data)
			})
		.catch(err => res.status(400).json('Unable to call API'))	
}

module.exports = {
	handleApiCall
}