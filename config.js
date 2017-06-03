exports.DATABASE_URL = process.env.DATABASE_URL || 
  global.DATABASE_URL || 
  (process.env.NODE_ENV === 'production' ? 'mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-leagues' : 'mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-test');

exports.PORT = process.env.PORT || 8080;

exports.API_KEY = '?api_token=SeQWLg7buPRYigOcplCKBHzJQId8Gc28qsN03n7gnoUIi0AzRO7X4tA9A3xV';