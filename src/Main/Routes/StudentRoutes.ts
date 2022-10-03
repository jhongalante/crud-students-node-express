import { makeFindAllStudentsWithPaginateController } from '../Factories/Student/FindAllStudentsWithPaginateFactory'
import { makeFindAllStudentsController } from '../Factories/Student/FindAllStudentsFactory'
import { makeUpdateStudentController } from '../Factories/Student/UpdateStudentFactory'
import { makeHelloWorldController } from '../Factories/HelloWorldFactory'
import { adaptRoute } from '../Adapters/Express/ExpressRouteAdapters'
import { Router } from 'express'
import { makeRegisterStudentController } from '../Factories/Student/RegisterStudentFactory'
import { makeDeleteStudentController } from '../Factories/Student/DeleteStudentFactory'
import { makeFindStudentByAcademicRecordController } from '../Factories/Student/FindStudentByAcademicRecordFactory'
import { Auth } from '../Middlewares/Auth'

export default (router: Router): void => {
  router.get('/hello-world', Auth, adaptRoute(makeHelloWorldController()))
  router.get('/student', Auth, adaptRoute(makeFindAllStudentsController()))
  router.post('/student', Auth, adaptRoute(makeRegisterStudentController()))
  router.put('/student/:academicRecord', Auth, adaptRoute(makeUpdateStudentController()))
  router.delete('/student/:academicRecord', Auth, adaptRoute(makeDeleteStudentController()))
  router.get('/student/:academicRecord', Auth, adaptRoute(makeFindStudentByAcademicRecordController()))
  router.get('/students/pagination', Auth, adaptRoute(makeFindAllStudentsWithPaginateController()))
}
