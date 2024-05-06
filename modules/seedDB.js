var xlsx = require("xlsx");
const excelFile = xlsx.readFile( "./seeders/seed_data.xlsx" );

async function seed_data(db,migration=false){
    const table = excelFile.Sheets[db];
    let adds = xlsx.utils.sheet_to_json( table, { defval : "" } );
    adds=adds.filter((key)=>key.migration==migration)
    return adds 
}

module.exports={
    seed_data
}