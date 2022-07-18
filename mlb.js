const APIprefix = 'http://lookup-service-prod.mlb.com';
let PlayerHittingStats;



async function GetPlayerOBP(MLBID){
    StatRequest = await fetch(`${APIprefix}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id=${MLBID}`)
    let PlayerHittingStats = await StatRequest.json();
    let PlayerOBP = PlayerHittingStats.sport_hitting_tm.queryResults.row.obp;
    console.log(PlayerOBP);
}

async function GetGameIDs(){
    let currentDate = new Date;
    let formatteddate = `${currentDate.getFullYear()}-${ReturnMonthString(currentDate.getMonth() + 1)}-21`;
    
    return formatteddate;
}




//BaseLevel Functions

function ParseGameFile(){

}

function ReturnMonthString(month){
    if(month == 1){
        return "JAN";
    }
    if(month == 2){
        return "FEB";
    }
    if(month == 3){
        return "MAR";
    }
    if(month == 4){
        return "APR";
    }
    if(month == 5){
        return "MAY";
    }
    if(month == 6){
        return "JUN";
    }
    if(month == 7){
        return "JUL";
    }
    if(month == 8){
        return "AUG";
    }
    if(month == 9){
        return "SEP";
    }
    if(month == 10){
        return "OCT";
    }
    if(month == 11){
        return "NOV";
    }
    if(month == 12){
        return "DEC";
    }
}