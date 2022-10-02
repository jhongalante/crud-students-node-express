import { makeFindAllStudentsWithPaginateController } from '../Factories/Student/FindAllStudentsWithPaginateFactory'
import { makeFindAllStudentsController } from '../Factories/Student/FindAllStudentsFactory'
import { makeUpdateStudentController } from '../Factories/Student/UpdateStudentFactory'
import { makeHelloWorldController } from '../Factories/HelloWorldFactory'
import { adaptRoute } from '../Adapters/Express/ExpressRouteAdapters'
import { Router } from 'express'
import { makeRegisterStudentController } from '../Factories/Student/RegisterStudentFactory'
import { makeDeleteStudentController } from '../Factories/Student/DeleteStudentFactory'
import { makeFindStudentByAcademicRecordController } from '../Factories/Student/FindStudentByAcademicRecordFactory'

export default (router: Router): void => {
  router.get('/hello-world', adaptRoute(makeHelloWorldController()))
  router.get('/student', adaptRoute(makeFindAllStudentsController()))
  router.post('/student', adaptRoute(makeRegisterStudentController()))
  router.put('/student/:academicRecord', adaptRoute(makeUpdateStudentController()))
  router.delete('/student/:academicRecord', adaptRoute(makeDeleteStudentController()))
  router.get('/student/:academicRecord', adaptRoute(makeFindStudentByAcademicRecordController()))
  router.get('/students/pagination', adaptRoute(makeFindAllStudentsWithPaginateController()))
}
