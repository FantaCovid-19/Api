import { Router } from 'express'
const router = Router()

import * as scheduleCtrl from '../controller/schedule.controller'

router.get('/', scheduleCtrl.getSchedule)
router.get('/:scheduleId', scheduleCtrl.getScheduleById)

router.post('/', scheduleCtrl.createSchedule)
router.put('/:scheduleId', scheduleCtrl.updateSchedule)
router.delete('/:scheduleId', scheduleCtrl.deleteSchedule)

export default router
