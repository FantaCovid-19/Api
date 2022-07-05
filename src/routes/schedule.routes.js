import { Router } from 'express'
const router = Router()

import * as scheduleCtrl from '../controller/schedule.controller'

router.get('/', scheduleCtrl.getAllSchedule)
router.get('/details', scheduleCtrl.getAllSpecificDetailsSchedule)

router.get('/:scheduleId', scheduleCtrl.getScheduleById)
router.get('/:scheduleId/detail', scheduleCtrl.getScheduleByIdAllDetails)

router.post('/', scheduleCtrl.createSchedule)
router.put('/:scheduleId', scheduleCtrl.updateSchedule)
router.delete('/:scheduleId', scheduleCtrl.deleteSchedule)

export default router
