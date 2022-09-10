import { uuid } from "uuidv4";
import { Instructor } from "../model/Instructor";
import BaseDataBase from "./BaseDataBase";
import moment from 'moment'


export class InstructorData extends BaseDataBase {

    private static TABLE_NAME = 'lbn_system12_instructor'

    async insertInstructor(instructor: Instructor): Promise<void> {

        try {

            await BaseDataBase.connection()
                .insert({
                    id: instructor.getId(),
                    name: instructor.getName(),
                    email: instructor.getEmail(),
                    birth_date: instructor.getBirthDate(),
                    team_id: instructor.getTeamId()
                })
                .into(InstructorData.TABLE_NAME)

            const specialtys = instructor.getSpecialty()

            for (const specialty of specialtys) {
                const id = uuid()

                const listOfSpecialtys = await BaseDataBase.connection()
                    .select('*')
                    .from('lbn_system12_specialty')
                    .where('name', 'like', `%${specialty}%`)

                if (listOfSpecialtys.length === 0) {
                    await BaseDataBase.connection()
                        .insert({
                            id: id,
                            name: specialty
                        })
                        .into('lbn_system12_specialty')

                    await BaseDataBase.connection()
                        .insert({
                            id: uuid(),
                            instructor_id: instructor.getId(),
                            specialty_id: id
                        })
                        .into('lbn_system12_instructor_specialty')
                } else {
                    await BaseDataBase.connection()
                        .insert({
                            id: uuid(),
                            instructor_id: instructor.getId(),
                            specialty_id: listOfSpecialtys[0].id
                        })
                        .into('lbn_system12_instructor_specialty')
                }
            }

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async selectInstructors(): Promise<Instructor[]> {

        try {

            const result = await BaseDataBase.connection()
                .select('*')
                .from(InstructorData.TABLE_NAME)

            return result.map(instructor => {
                return new Instructor(
                    instructor.id,
                    instructor.name,
                    instructor.email,
                    moment(instructor.birth_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                    instructor.team_id,
                    instructor.specialty
                )
            })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async updateTeamInstructor(id: string, team_id: string): Promise<void> {

        try {

            await BaseDataBase.connection()
                .update({ team_id })
                .into(InstructorData.TABLE_NAME)
                .where({ id })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}