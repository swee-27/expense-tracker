// const http=require('http');

// const server=http.createServer((req,res)=>{   //to write header
//     res.writeHead(200,{"content-Type":"text/html"});
//     res.end("<h1>Hello World</h1>");
// });

// server.listen(3000,()=>{
//     console.log("Server running at http://127.0.0.1:3000/");
// });
  
 //const calculate=require("./calculator");
 //console.log(calculate.add(10,20));

//  const fs = require("fs");
// const newPerson={
//   name: "Dharun",
//   age: 21,
//   city : "Chennai",
//   amount: 7000
// }
// fs.readFile("sample.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const json = JSON.parse(data); 
//   json.push(newPerson)
//   console.log(json);
// });
const fs = require("fs");
// const newPerson = {
  // name: "Dharun",
  // age: 21,
  // city: "Chennai",
  // amount: 7000,
// };
const deleteName = "Ram";
fs.readFile("sample.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const json = JSON.parse(data);
  const updatedJson = json.filter((person) => person.name !== deleteName);
  fs.writeFile("sample.json", JSON.stringify(updatedJson), (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
    } else {
      console.log("Deleted successfully!");
    }
  });
});