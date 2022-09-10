import { User } from "./User";

export class Student extends User {
    private hobbies: string[] = []

    constructor(
        id: string, name: string, email: string, birth_date: string, team_id: string, hobbies: string[]
    ) {
        super(id, name, email, birth_date, team_id)
        this.hobbies = hobbies
    }

    getHobbies(): string[] {
        return this.hobbies
    }
}