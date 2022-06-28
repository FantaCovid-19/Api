import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import pkg from '../package.json'
import './config'

import userRoutes from './routes/user.routes'

const app = express()

// Settings
app.set('pkg', pkg)
app.set('port', process.env.PORT || 4000)

// Middlewares
const corsOptions = {
  // origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Welcome Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Station Api',
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

// Routes
app.use('/user', userRoutes)

export default app
