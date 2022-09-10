import { app } from "./app";
import { InstructorController } from "./endpoint/InstructorController";
import { StudentController } from "./endpoint/studentsController";
import TeamController from "./endpoint/TeamController";

const teamController = new TeamController()
const instructorController = new InstructorController()
const studentController = new StudentController()

app.post('/team', teamController.createTeam)
app.get('/team', teamController.getTeam)
app.put('/team/update/:id', teamController.changeModule)

app.post('/instructor', instructorController.createInstructor)
app.get('/instructor', instructorController.getInstructor)
app.put('/instructor/:id', instructorController.changeTeamInstructor)

app.post('/student', studentController.createStudent)
app.get('/student', studentController.getStudentByName)
app.get('/student/all', studentController.getStudents)
app.put('/student/:id', studentController.changeTeamStudent)
