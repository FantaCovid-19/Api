import { Router } from 'express'
const router = Router()

import * as userCtrl from '../controller/user.controller'

router.get('/', userCtrl.getUser)

export default router
