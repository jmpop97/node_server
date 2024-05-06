const seed_db = require("./modules/seedDB")
async function test(){
    let adds=await seed_db.seed_data('Permissions',true)
    console.log(adds)
}
test()
// var xlsx = require("xlsx");
// const excelFile = xlsx.readFile( "./seeders/seed_data.xlsx" );

// // @breif 엑셀 파일의 첫번째 시트의 정보를 추출
// const test = excelFile.Sheets['test'];       // @details 시트의 제목 추출



// // @details 엑셀 파일의 첫번째 시트를 읽어온다.

// const jsonData = xlsx.utils.sheet_to_json( test, { defval : "" } );



// console.log( jsonData );

// const {Status,User} = require('./models')
// const result = Status.findAll({
//     include:{
//         model:User,
//         attributes:['id','state']}
// })
// .then((comment) => {
// console.log(JSON.stringify(comment, null, 2))
// })