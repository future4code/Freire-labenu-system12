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

            const result = await BaseDataBase.connection().select("*").from(TeamData.TABLE_NAME)

            return result

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }


    }

}