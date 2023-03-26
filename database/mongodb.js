const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://juhojj:stETtJ6lasFgzkvr@tjdata.tio2aid.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


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



main().catch(console.error);