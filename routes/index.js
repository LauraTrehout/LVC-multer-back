const imageRouter = require('./images')
const multipleRouter = require('./multiples')

const setupRoutes = app => {
    app.use('/images', imageRouter)
    app.use('/multiples', multipleRouter)
}

module.exports = { setupRoutes }