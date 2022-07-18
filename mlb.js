const APIprefix = 'http://lookup-service-prod.mlb.com';

async function GetPlayerOBP(MLBID){
    let PlayerHittingStats = await fetch(`${APIprefix}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id=${MLBID}`)
    let PlayerOBP = PlayerHittingStats.obp[1];
    console.log(PlayerOBP);
}