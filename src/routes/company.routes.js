import { Router } from 'express'
const router = Router()

import * as companyCtrl from '../controller/company.controller'

router.get('/', companyCtrl.getCompany)
router.get('/:companyId', companyCtrl.getCompanyById)

router.post('/', companyCtrl.createCompany)
router.put('/:companyId', companyCtrl.updateCompany)
router.delete('/:companyId', companyCtrl.deleteCompany)

export default router
