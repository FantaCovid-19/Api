import { Router } from 'express'
const router = Router()

import * as busCtrl from '../controller/bus.controller'

router.get('/', busCtrl.getBus)
router.get('/:busId', busCtrl.getBusById)

router.post('/', busCtrl.createBus)
router.put('/:busId', busCtrl.updateBus)
router.delete('/:busId', busCtrl.deleteBus)

export default router
