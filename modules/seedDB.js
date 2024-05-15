var xlsx = require("xlsx");
const excelFile = xlsx.readFile( "./seeders/seed_data.xlsx" );

async function seed_data(db,start=0,end=0){
    const table = excelFile.Sheets[db];
    let adds = xlsx.utils.sheet_to_json( table, { defval : "" } );
    if (!end){
        end=adds.length
    }
    adds=adds.filter((key,i)=>start<=i&& i<=end)
    return adds 
}

module.exports={
    seed_data
}