import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import moviesRoutes from './routes/movies.js'
import reservationRoutes from './routes/reservation.js'
import userRoutes from './routes/user.js'
import draftsRoutes from './routes/drafts.js'
import recommendRoutes from './routes/recommendationsRoutes.js'

dotenv.config()

// express app
const app = express()



// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes...
app.use('/api/movies', moviesRoutes)
app.use('/api/recomendation', recommendRoutes)
app.use('/api/user', userRoutes)
app.use('/api/reservation', reservationRoutes)
app.use('/api/drafts', draftsRoutes)

//testing if it works
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app!'})
})


// db connect
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((err) => console.log(err))


