const APIprefix = 'http://lookup-service-prod.mlb.com';
const APIkey = '?key=36e1a1ee5dcd46d994b4dd2bd86080a1';
let PlayerHittingStats;
let GamedayRequest;

let HR;
let BB;
let HBP;
let SO;
let IP;


async function GetBatterOBP(MLBID){
    let StatRequest = await fetch(`${APIprefix}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id=${MLBID}`)
    let PlayerHittingStats = await StatRequest.json();
    let PlayerOBP = PlayerHittingStats.sport_hitting_tm.queryResults.row.obp;
    console.log(PlayerOBP);
}

async function GetPitcherFIP(MLBID){
    let StatRequest = await fetch(`${APIprefix}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id=${MLBID}`)
    let PlayerPitchingStats = await StatRequest.json();
    
    HR = parseFloat(PlayerPitchingStats.sport_pitching_tm.queryResults.row.hr);
    BB = parseFloat(PlayerPitchingStats.sport_pitching_tm.queryResults.row.bb);
    HBP = parseFloat(PlayerPitchingStats.sport_pitching_tm.queryResults.row.hb);
    SO = parseFloat(PlayerPitchingStats.sport_pitching_tm.queryResults.row.so);
    IP = parseFloat(PlayerPitchingStats.sport_pitching_tm.queryResults.row.ip);
    console.log(HR,BB,HBP,SO,IP);

    let FIP = await (((13 * HR) + (3 * (BB + HBP)) - (2 * SO)) / IP + 3.214).toFixed(3);

    return(FIP);
}






//BaseLevel Functions

GetPlayerID(FullName){
    let StatRequest = await fetch(`${APIprefix}/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${FullName}'`)
    let PlayerInfo = await StatRequest.json();

    let PlayerID = PlayerInfo.search_player_all.queryResults.row.player_id;
}


