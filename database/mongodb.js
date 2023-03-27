const {MongoClient} = require('mongodb');
require('dotenv').config({path:'../.env'});
const uri = process.env.MONGODB;
const client = new MongoClient(uri);

//Database and collection constants
const database = "JSHTML"
const collection = "tests"

/*
    IMPROVEMENT SUGGESTIONS:

    -Perhaps create a metropolia account ? 

    TODO:
    

*/

// Lists all databases and console.logs them
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// main simply attempts to connect to database and list databases (try)
async function main(){
    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }
    
    finally{
        await client.close();
    }
}

//CRUD FUNCTIONS


//Create functions


//Read functions
async function getTestyByName(nameOfTest){
    
    const result = await client.db(database)
    .collection(collection).findOne({name: nameOfTest})

    if(result){
        console.log(`Found a test with thte name: ${nameOfTest}`)
        console.log(result)
    } else {
        console.log(`No listings found with the name ${nameOfTest}`)
        
    }


}


//Update functions




//Delete functions





getTestyByName("m1-t2")
main().catch(console.error);

module.exports =  {getTestyByName}