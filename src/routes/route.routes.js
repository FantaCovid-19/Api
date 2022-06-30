import { Router } from 'express'
const router = Router()

import * as routeCtrl from '../controller/route.controller'

router.get('/', routeCtrl.getRoute)
router.get('/:routeId', routeCtrl.getRouteById)

router.post('/', routeCtrl.createRoute)
router.put('/:routeId', routeCtrl.updateRoute)
router.delete('/:routeId', routeCtrl.deleteRoute)

export default router
