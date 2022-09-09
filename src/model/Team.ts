class Team {

    private id: string;
    private name: string;
    private module: string


    constructor(id: string, name: string, module: string) {
        this.id = id,
            this.name = name,
            this.module = module
    }

    getIdTeam() {
        return this.id
    }

    getName() {
        return this.name
    }

    getModule() {
        return this.module
    }

}
export default Team