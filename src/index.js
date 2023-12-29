const express =require("express");
const {uuid}=  require('uuidv4')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())




const  projects = [];

function logRequests (request,response,next){
    const {method,url} =request;
    
    const loglabel = `[${method.toUpperCase()}], ${url}`;

    console.log(loglabel)
    
    return next()
    }
    
    app.use(logRequests)
    
    
app.get('/projects', (request,response)=>{//metodo get - rota 1
 
   // const query = request.query   

    //console.log(query);
    return response.json(projects)

})

app.post('/projects', (request, response)=>{//metodo post -- rota 2
    const {title, name }= request.body

    const project = {id:uuid(),title, name};
    projects.push(project)
    
    return response.json(project)
})

app.put('/projects/:id', (request, response)=>{//metodo put -- rota 3
  
   const {id} = request.params
   const {title, name }= request.body
   //const {id} = request.id -- aplicando a desestruturação para poder aparecer somente o numero  no console 
    
 const projectIndex = projects.findIndex(project=> project.id === id)

 if(projectIndex < 0){
    return  response.status(400).json({"error": "não  encontramos este id."})
 }

 const project = {
    id,
    title,
    name
 }
 projects[projectIndex]= project
    return response.json(project)
})




app.delete('/projects/:id', (request, response)=>{//metodo delete -- rota 4
    const {id} = request.params


    const projectIndex = projects.findIndex(project=> project.id === id)

 if(projectIndex < 0){
    return  response.status(400).json({"error": "não  encontramos este id."})
 }

 projects.splice(projectIndex,1)
   
    return response.status(204).send()
})


app.listen(3333,()=>{
    console.log('backend start')
})