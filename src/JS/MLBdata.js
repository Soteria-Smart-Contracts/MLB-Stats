const APIprefix = 'http://lookup-service-prod.mlb.com';
const APIkey = '?key=36e1a1ee5dcd46d994b4dd2bd86080a1';
let PlayerHittingStats;
let GamedayRequest;



async function GetBatterOBP(MLBID){
    let StatRequest = await fetch(`${APIprefix}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id=${MLBID}`)
    let PlayerHittingStats = await StatRequest.json();
    let PlayerOBP = PlayerHittingStats.sport_hitting_tm.queryResults.row.obp;
    console.log(PlayerOBP);
}

async function GetPitcherFIP(MLBID){
    let StatRequest = await fetch(`${APIprefix}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id=${MLBID}`)
    let PlayerPitchingStats = await StatRequest.json();
    
    let HR = PlayerPitchingStats.sport_pitching_tm.queryResults.row.hr;
    let BB = PlayerPitchingStats.sport_pitching_tm.queryResults.row.bb;
    let HBP = PlayerPitchingStats.sport_pitching_tm.queryResults.row.hb;
    let SO = PlayerPitchingStats.sport_pitching_tm.queryResults.row.so;
    let IP = PlayerPitchingStats.sport_pitching_tm.queryResults.row.ip;

    let FIP = (HBP + BB) / (IP * 3) + (HR * 2) + (SO * -1);

    console.log(PlayerFIP);
}






//BaseLevel Functions


async function CalculateFIP()

