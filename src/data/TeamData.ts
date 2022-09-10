import Team from "../model/Team";
import BaseDataBase from "./BaseDataBase";


export default class TeamData extends BaseDataBase {

    private static TABLE_NAME = "lbn_system12_team"

    async insertTeam(team: Team): Promise<void> {

        await BaseDataBase.connection()
            .insert({
                id: team.getIdTeam(),
                name: team.getName(),
                module: team.getModule()
            })
            .into(TeamData.TABLE_NAME)
    }

    async selectTeam() {

        try {

            const result = await BaseDataBase.connection()
                .select("*")
                .from(TeamData.TABLE_NAME)
                .where('module', '>', '0')

            return result

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async selectTeamById(id: string) {

        try {

            const result = await BaseDataBase.connection()
                .select('*')
                .from(TeamData.TABLE_NAME)
                .where({ id })

            return new Team(result[0].id, result[0].name, result[0].module)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async updateModule(id: string, module: string) {

        try {

            await BaseDataBase.connection()
                .update({ module })
                .into(TeamData.TABLE_NAME)
                .where({ id })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}