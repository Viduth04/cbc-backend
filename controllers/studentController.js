//import Student from "../../models/student.js"
import Student from "../models/student.js";

export function getStudent(req, res){
  Student.find().then((studentList)=>{

    res.json({
        list:studentList
    });
  })
   
}

export function createStudent(req, res){
   

    const newStudent=new Student(req.body);
    newStudent.save().then(()=>{
     res.json({
         message:"Created"
     });
    }).catch(()=>{
     res.json({
         message:"Not Created"
     })
    })
 
    
 }

 export function deleteStudent(req,res){
  Student.deleteOne({name:req.body.name}).then(()=>{
    res.json({
      message:"Deleted it"
    })
  })
 }