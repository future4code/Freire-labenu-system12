import { AddressInfo } from "net";
import app from "./app";
import TeamController from "./endpoint/TeamController";



const teamController = new TeamController()

app.post('/team', teamController.createTeam)
app.get('/team', teamController.getTeam)


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});
