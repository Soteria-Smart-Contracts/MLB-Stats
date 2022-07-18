const APIprefix = 'http://lookup-service-prod.mlb.com';
let PlayerHittingStats;



async function GetPlayerOBP(MLBID){
    StatRequest = await fetch(`${APIprefix}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id=${MLBID}`)
    let PlayerHittingStats = await StatRequest.json();
    let PlayerOBP = PlayerHittingStats.sport_hitting_tm.queryResults.row.obp;
    console.log(PlayerOBP);
}

async function GetGameIDs(date){
    let date = 
}




//BaseLevel Functions

function ReturnMonthString(month){
    if(month == 1){
        return "JAN";
    }
    if(month == 2){
}