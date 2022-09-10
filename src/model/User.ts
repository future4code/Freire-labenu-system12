export abstract class User {
    protected id: string
    protected name: string
    protected email: string
    protected birth_date: string
    protected team_id: string

    constructor(id: string, name: string, email: string, birth_date: string, team_id: string) {
        this.id = id,
        this.name = name,
        this.email = email,
        this.birth_date = birth_date,
        this.team_id = team_id
    }

    getId(): string {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getEmail(): string {
        return this.email
    }

    getBirthDate(): string {
        return this.birth_date
    }

    getTeamId(): string {
        return this.team_id
    }

    setDateBirth(birth_date: string): void {
        this.birth_date = birth_date
    }
}