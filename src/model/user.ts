export abstract class User {
    id:string 
    name:string 
    email:string 
    birthdate:Date
constructor( id:string ,name:string ,email:string ,birthdate:Date){
    this.id = id
    this.name = name
    this.email = email
    this.birthdate  = birthdate
}
}