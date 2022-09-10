import { app } from "./app";
import { InstructorController } from "./endpoint/InstructorController";
import TeamController from "./endpoint/TeamController";

const teamController = new TeamController()
const instructorController = new InstructorController()

app.post('/team', teamController.createTeam)
app.get('/team', teamController.getTeam)
app.put('/team/update/:id', teamController.changeModule)

app.post('/instructor', instructorController.createInstructor)
app.get('/instructor', instructorController.getInstructor)
app.put('/instructor/:id', instructorController.changeTeamInstructor)


