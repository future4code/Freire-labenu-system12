import { User } from "./User"

export class Instructor extends User {
    private specialty: string[] = []

    constructor(
        id: string, name: string, email: string, birth_date: string,
        team_id: string, specialty: string[]
    ) {
        super(id, name, email, birth_date, team_id)
        this.specialty = specialty
    }

    getSpecialty(): string[] {
        return this.specialty
    }

    setSpecialty(specialty: string[]): void {
        this.specialty = specialty
    }
}