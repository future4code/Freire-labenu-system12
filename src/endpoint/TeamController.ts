import { Request, Response } from "express";
import TeamData from "../data/TeamData";
import Team from "../model/Team";


export default class TeamController {

    async createTeam(req: Request, res: Response) {

        try {

            const { id, name, module } = req.body

            if (!id || !name) {
                throw new Error("O 'Id', 'Nome' e 'Módulo' devem ser informados")
            }

            const team = new Team(id, name, module)

            const teamData = new TeamData()

            const answer = await teamData.insertTeam(team)

            res.status(201).send('Turma criada com sucesso!')

        } catch (error: any) {

            res.status(500).send({ message: error.message })

        }
    }

    async getTeam(req: Request, res: Response) {

        try {

            const teamData = new TeamData()

            const allTeam = await teamData.selectTeam()

            if (!allTeam.length) {
                throw new Error('Não há nenhuma Turma cadastrada!')
            }

            res.status(200).send(allTeam)

        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }

}