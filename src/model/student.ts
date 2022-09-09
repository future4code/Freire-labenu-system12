 import { User } from "./user";

 class Student extends User {
  protected team_id:string
    constructor(id:string ,name:string ,email:string ,birthdate:Date,team_id:string){
        super(id,name,email,birthdate)
        this.team_id=team_id
    }

 }