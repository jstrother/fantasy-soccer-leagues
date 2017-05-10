exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || (process.env.NODE_ENV === 'production' ? 'mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-leagues' : 'mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-test');

exports.PORT = process.env.PORT || 8080;