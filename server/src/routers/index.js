const authRouter = require('./auth')

const routers = (app)=>{
    app.use('/api/auth', authRouter)
}

module.exports=routers