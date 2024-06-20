const models = require("../models")
const schedule = require('node-schedule');
const job = schedule.scheduleJob('00 09 * * *', async function(){
    datas=await rank_datas()
    models.EternalReturn.create(datas)
    }
)

async function rank_datas(){
    data = await rank_data_page(2)
    rank200Mmr=data["leaderboards"].pop()["mmr"]
    rank200_minusMmr150people=0
    limit_mmr=rank200Mmr-150
    for (let i=3;i<=10;i++){
        data= await rank_data_page(i)
        for(j in data["leaderboards"]){
            if(data["leaderboards"][j]["mmr"]>=limit_mmr){
                rank200_minusMmr150people+=1
            }
            else{
                return {rank200Mmr,rank200_minusMmr150people}
            }
        }
    }
    return {rank200Mmr,rank200_minusMmr150people}
}

async function rank_data_page(page){
    url=`https://er-node.dakgg.io/api/v0/leaderboard?page=${page}&seasonKey=SEASON_13&serverName=seoul&teamMode=SQUAD&hl=ko`
    get_data = await fetch(url,
        {method:"GET"})
    data=await get_data.json()
    return data
}
// const job2 = schedule.scheduleJob('00 20 * * *', function(){
//     console.log('The answer to life, the universe, and everything2!');
//   });
