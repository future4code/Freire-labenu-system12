import { Request, Response } from "express";
import { uuid } from "uuidv4";
import { StudentData } from "../data/StudentData";
import { Student } from "../model/Student";

export class StudentController {

    async createStudent(req: Request, res: Response) {

        try {

            const { name, email, birth_date, team_id, hobbies } = req.body

            if (!name || !email || !birth_date || !team_id || !hobbies) {
                throw new Error('Nome, email, data de nascimento e turma são informações obrigatórias!')
            }

            const newDate = birth_date.split('/').reverse().join('-')

            const id = uuid()

            const newStudent = new Student(id, name, email, newDate, team_id, hobbies)

            const studentDB = new StudentData()

            await studentDB.insertStudent(newStudent)

            res.status(201).send({ message: 'Estudente cadastrado com sucesso!' })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }

    async getStudentByName(req: Request, res: Response) {

        try {

            const { name } = req.query

            if (!name) {
                throw new Error("O nome é obrigatório!");
            }

            const studentDB = new StudentData()

            const student = await studentDB.getStudentByName(name as string)

            res.status(200).send({ student })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }

    async changeTeamStudent(req: Request, res: Response) {

        try {

            const { id } = req.params
            const { team_id } = req.body

            

            if (!id || !team_id) {
                throw new Error("Id e turma são informações obrigatórias!")
            }

            const studentDB = new StudentData()

            await studentDB.updateTeamStudent(id, team_id)

            console.log('ola')

            res.status(200).send({ message: 'Estudante alterado com sucesso!' })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }

    async getStudents(req: Request, res: Response) {

        try {

            const studentDB = new StudentData()

            const student = await studentDB.selectStudents()

            if (!student) {
                res.statusCode = 404
                throw new Error("Nenhum estudente encontrado")
            }

            res.status(200).send({ student })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }
}
