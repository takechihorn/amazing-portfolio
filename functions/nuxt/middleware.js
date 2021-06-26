const middleware = {}

middleware['verify-admin'] = require('../middleware/verify-admin.js')
middleware['verify-admin'] = middleware['verify-admin'].default || middleware['verify-admin']

export default middleware
