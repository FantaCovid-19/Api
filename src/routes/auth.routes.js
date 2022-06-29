import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controller/auth.controller'
import { verifySignUp } from '../middlewares'

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.post('/signup', [verifySignUp.checkDuplicateDataUser, verifySignUp.checkRoleExisted], authCtrl.singUp)
router.post('/signin', authCtrl.singIn)

export default router
