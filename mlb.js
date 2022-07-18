const APIprefix = 'http://lookup-service-prod.mlb.com';

async function GetPlayerOBP(MLBID){
    PlayerHittingStats = await fetch(`${APIprefix}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season={season}&player_id={player_id}`)
}