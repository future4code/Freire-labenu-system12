import moment from "moment";
import { uuid } from "uuidv4";
import { Student } from "../model/Student";
import BaseDataBase from "./BaseDataBase";

export class StudentData extends BaseDataBase {

    private static TABLE_NAME = 'lbn_system12_students'

    async insertStudent(student: Student): Promise<void> {

        try {

            await BaseDataBase.connection()
                .insert({
                    id: student.getId(),
                    name: student.getName(),
                    email: student.getEmail(),
                    birth_date: student.getBirthDate(),
                    team_id: student.getTeamId()
                })
                .into(StudentData.TABLE_NAME)

            const hobbies = student.getHobbies()

            for (const hobby of hobbies) {
                const id = uuid()

                const listOfHobbies = await BaseDataBase.connection()
                    .select('*')
                    .from('lbn_system12_hobby')
                    .where('name', 'like', `%${hobby}%`)

                if (listOfHobbies.length === 0) {
                    await BaseDataBase.connection()
                        .insert({
                            id: id,
                            name: hobby
                        })
                        .into('lbn_system12_hobby')

                    await BaseDataBase.connection()
                        .insert({
                            id: uuid(),
                            student_id: student.getId(),
                            hobby_id: id
                        })
                        .into('lbn_system12_student_hobby')
                } else {
                    await BaseDataBase.connection()
                        .insert({
                            id: uuid(),
                            student_id: student.getId(),
                            hobby_id: listOfHobbies[0].id
                        })
                        .into('lbn_system12_student_hobby')
                }
            }

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async updateTeamStudent(id: string, team_id: string): Promise<void> {

        try {
            
            await BaseDataBase.connection()
                .update({
                    team_id: team_id
                })
                .into(StudentData.TABLE_NAME)
                .where('id', '=', id)
                

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getStudentByName(name: string): Promise<Student> {

        try {

            const result = await BaseDataBase.connection()
                .select('*')
                .from(StudentData.TABLE_NAME)
                .where('name', 'like', `%${name}%`)

            const student = new Student(
                result[0].id,
                result[0].name,
                result[0].email,
                moment(result[0].birth_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                result[0].team_id,
                result[0].hobbies,
            )

            return student

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async selectStudents(): Promise<Student[]> {

        try {

            const result = await BaseDataBase.connection()
                .select('*')
                .from(StudentData.TABLE_NAME)

            const students = result.map(student => {
                return new Student(
                    student.id,
                    student.name,
                    student.email,
                    moment(student.birth_date, "YYYY-MM-DD").format("DD/MM/YYYY"),
                    student.team_id,
                    student.hobbies
                )
            })

            return students

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}