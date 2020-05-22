const mongoose = require('mongoose')
const db = process.env.MONGODB_URI


const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('mongoDB running!')
	} catch (err) {
		console.error(err.message)
		// Exit process with failure
		process.exit(1)
	}
};

module.exports = connectDB