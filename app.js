// const express=require('express')

// const app=express()

// const expenses=[{
//     id:1,
//     title:"Food",
//     amount:200},{
//     id:2,
//     title:"top",
//     amount:500
// }];

// app.get('/api/expenses',(req,res)=>{
//     console.log(req.query)
//    res.status(200).json(expenses)
// });
// app.listen(3000,()=>{
//     console.log("Server is running");
    
// })

const express=require('express')
//const {default:mongoose}=require('mongoose');
const mongoose=require("mongoose");
const app=express()
app.use(express.json());
const {v4:uuidv4}=require("uuid")
//import { v4 as uuidv4 } from "uuid";
mongoose.connect("mongodb+srv://swethaigs27:swethaig27@cluster0.dvmhr.mongodb.net/").then(()=>{
    console.log("Connected to mongodb");
});
const expenseSchema=new mongoose.Schema({
    id:{type:String,required:true,unique:true},//instead of id:String we can give like this 
    title:{type:String,required:true},
    amount:{type:String,required:true}
})
const Expense=mongoose.model("Expense",expenseSchema)



app.get("/api/expenses",async (req, res) => {
    try{
    const expenses = await Expense.find()
    if(!expenses){
      res.status(406).send({message:"No expense found"})
      return
    }
    res.status(200).json(expenses);
  }catch{
    res.status(500).json({message:"Internal Server Error"})
  }
  });

app.get("/api/expenses/:id",async(req,res)=>{
    //const expenses= await Expense.find(); to find all
    //console.log(req.query)
    const {id}=req.params;
    try{
    const expenses= await Expense.findOne({id})
    if(!expenses){
        res.status(404).send({message:"No expense found"});
    }
    res.status(200).json(expenses)
}catch (error){
    res.status(500).json({message:"internal server error"});
};
 });

 app.put("/api/expense/:id",async(req,res)=>{
    const {id}=req.params;
    const {title,amount}=req.body
    try{
        const updatedExpense=await Expense.findOneAndUpdate(
            {id},{title,amount},{new:true}
        );
        if(!updatedExpense){
            res.status(404).send({message:"No expense found"});
        }
        res.status(200).json(updatedExpense); // Respond with the updated expense
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
// app.get("/api/expenses/:id",(req,res)=>{
//     const{id}=req.params;
//     const expense=expenses.find((expense)=>expense.id===id);
//     if(!expense){
//         res.status(404).json({message:"Not Found"});
//         return 
//     }
//     res.status(200).json(expense);
// })
app.post("/api/expenses",async(req,res)=>{
    // console.log(req.body);
    const {title,amount}=req.body;
    try{
    if(!title || !amount){
        res.status(400).json({message:"Please provide both title and amount"})
    }
    const newExpense=  new Expense({
        id:uuidv4(),
        title,//title:title we can also give like this
        amount
    })
    const saveExpense= await newExpense.save()
    res.status (201).json(saveExpense)
    res.end();
}catch (error){
    res.status(500).json({message:"internal server error"});
}

})

// app.delete("/api/expense/:id",async(req,res)=>{
//     const {id}=req.params;
//   try{
//       const deletedItem=await Expense.findOneAndDelete({id});
//       if(!deletedExpense){
//         res.status(200).json({message:"Expense not found"});
//         return
//     }
//       res.status(200).json({message:"Deleted Successully"});

//   }catch(error){
//     res.status(500).json({message:"internal server error"});
//   }
// });

app.put("/api/expense/:id",async()=>{
   const {id}=params;
   try{

   }catch (error){
    res.status(500).json({message:"internal server error"});
   }
});
app.listen(3000,()=>{

    console.log("Server is running")
})