import { Request, Response } from "express";
import { uuid } from "uuidv4";
import { InstructorData } from "../data/InstructorData";
import { Instructor } from "../model/Instructor";


export class InstructorController {

    async createInstructor(req: Request, res: Response) {

        try {

            const { name, email, birth_date, team_id, specialty } = req.body

            if (!name || !email || !birth_date || !team_id) {
                throw new Error('Nome, email, data de nascimento e turma são informações obrigatórias!')
            }

            const newDate = birth_date.split('/').reverse().join('-')

            const id = uuid()

            const newInstructor = new Instructor(id, name, email, newDate, team_id, specialty)

            const instructorDB = new InstructorData()

            await instructorDB.insertInstructor(newInstructor)

            res.status(201).send({ message: 'Docente criado com sucesso!' })

        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }

    async getInstructor(req: Request, res: Response) {
        try {

            const instructorDB = new InstructorData()

            const instructors = await instructorDB.selectInstructors()

            res.status(200).send({ instructors })

        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }

    async changeTeamInstructor(req: Request, res: Response) {

        try {

            const { id } = req.params
            const { team_id } = req.body

            if (!id || !team_id) {
                throw new Error("Id e turma são informações obrigatórias!")
            }

            const instructorDB = new InstructorData()

            await instructorDB.updateTeamInstructor(id, team_id)

            res.status(200).send({ message: 'Turma do Docente atualizada com sucesso!' })


        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }
}