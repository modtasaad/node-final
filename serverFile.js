const express = require("express");
const bodyParser = require("body-parser");
const bodyParserJson = bodyParser.json();
const fs = require("fs");



const app = express();
 app.use(bodyParserJson);

let contacts = [];
let settings = {
  contactsLastId:1
};

//get contacts
  
app.get("/",function(res,res){
  res.sendFile(__dirname+"/frontend/index.html");
})

app.get("/contacts",function(req,res){
    let responseBody = {
      Success:true,
      Error:"",
      Data:contacts
    }
    res.send(responseBody);
  })

  app.get("/contacts/:id",function(req,res){
    let contact = contacts.find(x=>x.Id=req.params.id);
    let responseBody = {
      Success:true,
      Error:"",
      Data:contact
    }
    if(!contact){
      responseBody.Success=false;
      responseBody.Error="Contact Not Found";

    }
    res.send(responseBody);
  })

//add contacts
app.post("/contact",function(req,res){
  let responseBody = {
      Success:true,
      Error:"",
      Data:req.body
  }

  let validationResult = validateContact(req.body);
  responseBody.Success=validationResult.Success;
  responseBody.Error=validationResult.Error;

  if(responseBody.Success){
      req.body.Id=settings.contactsLastId++;
  
      contacts.push(req.body);
      saveToDB();
  }


  res.send(responseBody)
})


//update contacts
app.put("/contacts",function(req,res){
  let contact = contacts.find(x=>x.Id==req.body.Id);
  let responseBody = {
    Success:true,
    Error:"",
    Data:contact
}
if(!contact){
  responseBody.Success=false;
  responseBody.Error="contact Not Found"; 
}

if(responseBody.Success){
  let validationResult = validateContact(req.body);
  responseBody.Success=validationResult.Success;
  responseBody.Error=validationResult.Error;
}

if(responseBody.Success){
  contact.Name=req.body.Name;
  contact.Phone=req.body.Phone;
  saveToDB();
}
res.send(responseBody);
})


//delete courses
app.delete("/contacts/:id",function(req,res){
  let contactIndex = courses.findIndex(x=>x.Id==req.params.id);
  let responseBody = {
      Success:true,
      Error:"",
      Data:req.params.id
  }

  if(contactIndex==-1){
      responseBody.Success=false;
      responseBody.Error="Contact Not Found"; 
  }

  if(responseBody.Success){
      contacts.splice(contactIndex,1);
      saveToDB();
  }
  res.send(responseBody);
})

//--------------------------//
function validateContact(contact){
    
  let validationResult = {Success:true,Error:""}
  if(!contact.Name || contact.Name.length<3){
      validationResult.Success=false;
      validationResult.Error="Contact Name Should Be At Least 3 Characters";
  }

  let exists = contacts.find(x=>x.Name==contact.Name && x.Id != contact.Id);

  if(exists){
      validationResult.Success=false;
      validationResult.Error="Contact Name Already Exists";
  }
  return validationResult;
}




//save DB

  function saveToDB(){
    fs.writeFile("contacts.db",JSON.stringify(contacts),function(err){
      if(err)
      console.log(err);
    })
fs.writeFile("settings.db",JSON.stringify(settings),function(err){
      if(err)
      console.log(err);
    })
  }

  function loadFromDB(){
    fs.readFile("contacts.db",function(err,data){
      if(err)
      console.log(err);
      else
      contacts=JSON.parse(data);
    })

    fs.readFile("settings.db",function(err,data){
      if(err)
      console.log(err);
      else
      settings=JSON.parse(data);
    })
  }


loadFromDB();


app.listen(8080);