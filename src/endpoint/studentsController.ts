import { Request, Response } from "express";

class studentsController {

async createStudent(req:Request,res:Response){
try {
    const {name,email,birthdate,turma_id}=req.body
    const id = Date.now.toString()
if(!name||!email||!birthdate||!turma_id){
    throw new Error("Todos os campos deve ser preenchidos");
}
// const student = new student(id,name,email,birthdate,turma_id)



} catch (error:any) {
    res.status(500).send({message: error.sqlMessage || error.message})
}




}

async getStudent(){

}

}
 export default studentsController