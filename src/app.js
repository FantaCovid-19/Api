import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import pkg from '../package.json'
import './config'

import { createRoles, createAdmin } from './libs/initialSetup'

// Routes Imports
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import scheduleRoutes from './routes/schedule.routes'
import companyRoutes from './routes/company.routes'
import driverRoutes from './routes/driver.routes'
import busRoutes from './routes/bus.routes'

// Init App Express
const app = express()
createRoles()
createAdmin()

// Settings
app.set('pkg', pkg)
app.set('port', process.env.PORT || 4000)
app.set("json spaces", 4)

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
app.use('/auth', authRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/drivers', driverRoutes)
app.use('/api/bussed', busRoutes)

export default app
