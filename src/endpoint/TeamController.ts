import { Request, Response } from "express";
import { uuid } from 'uuidv4';
import TeamData from "../data/TeamData";
import Team from "../model/Team";


export default class TeamController {

    async createTeam(req: Request, res: Response) {

        try {

            const { name, module } = req.body

            if (!name || !module) {
                throw new Error("O Nome' e 'Módulo' são obrigatórios")
            }

            const id = uuid()

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

    async changeModule(req: Request, res: Response) {

        try {

            const { id } = req.params
            const { module } = req.body

            if (!module) {
                throw new Error("O módulo é obrigatório.")
            }

            if (!id) {
                throw new Error("O Id é obrigatório.")
            }

            const teamDB = new TeamData()
            const team = await teamDB.selectTeamById(id)

            if (!team) {
                throw new Error('A turma não foi encontrada.')
            }

            await teamDB.updateModule(id, module)

            res.status(200).send({ message: 'Módulo atualizado com sucesso!' })

        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }
}