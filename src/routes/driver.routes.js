import { Router } from 'express'
const router = Router()

import * as driverCtrl from '../controller/driver.controller'

router.get('/', driverCtrl.getDriver)
router.get('/:driverId', driverCtrl.getDriverById)

router.post('/', driverCtrl.createDriver)
router.put('/:driverId', driverCtrl.updateDriver)
router.delete('/:driverId', driverCtrl.deleteDriver)

export default router
