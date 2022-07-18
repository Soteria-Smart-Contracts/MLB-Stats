const APIprefix = 'http://lookup-service-prod.mlb.com';

async function GetPlayerOBP(MLBID){
    PlayerHittingStats = await fetch(`${APIprefix}/json/named.s_player_hitting_tm.bam?game_type='R'&season='2019'&player_id='${MLBID}'`)
}