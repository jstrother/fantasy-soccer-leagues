exports.DATABASE_URL = process.env.DATABASE_URL ||
											 global.DATABASE_URL ||
											 (process.env.NODE_ENV === 'production' ? 'mongodb://localhost/fantasy-soccer-leagues' : 'mongodb://localhost/fantasy-soccer-leagues-dev');

exports.PORT = process.env.PORT || 8080;