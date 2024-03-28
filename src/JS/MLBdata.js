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

    let FIP = await (((13 * HR) + (3 * (BB + HBP)) - (2 * SO)) / IP + 3.214).toFixed(3);
    console.log(FIP);

    return(FIP);
}

async function GetPitcherFIPfromName(FullName){
    let PlayerID = await GetPlayerID(FullName);
    let FIP = await GetPitcherFIP(PlayerID);
    return FIP;
}

const csvData = `Player,Team,Age,G,Gs,CG,SHO,IP,H,ER,K,BB,HR,W,L,SV,BS,HLD,ERA,WHIP
Player1,Team1,25,20,20,3,1,130,100,40,120,30,10,5,3,0,0,0,2.77,1.15
Player2,Team2,28,22,22,4,2,150,120,50,140,35,12,6,2,0,0,0,3.00,1.25
Player3,Team3,30,25,25,2,0,160,130,60,150,40,15,8,3,0,0,0,3.50,1.30`;

// Function to calculate FIP
function calculateFIP(playerName) {
    // Split CSV data by lines
    const lines = csvData.split('\n');
    
    // Find the row corresponding to the player's name
    const playerRow = lines.find(line => line.includes(playerName));
    
    if (!playerRow) {
        return "Player not found";
    }
    
    // Extract required data from the row
    const playerStats = playerRow.split(',');
    const HR = parseFloat(playerStats[11]);
    const BB = parseFloat(playerStats[12]);
    const HBP = 0; // For simplicity, assuming Hit By Pitch is 0
    const K = parseFloat(playerStats[10]);
    const IP = parseFloat(playerStats[7]);

    // Calculate FIP
    const FIP = ((13 * HR) + (3 * (BB + HBP)) - (2 * K)) / IP + 3.2;

    return FIP.toFixed(2); // Return FIP rounded to 2 decimal places
}

function calculateFIP(playerName, playerData) {
    // Split the CSV data by lines to get individual player records
    const playerRecords = playerData.split('\n');
    
    // Find the player's record by searching for their name
    const playerRecord = playerRecords.find(record => record.includes(playerName));
    
    if (!playerRecord) {
        return "Player not found";
    }
    
    // Split the player's record by commas to extract relevant data
    const playerFields = playerRecord.split(',');
    
    // Extract relevant statistics
    const HR = parseInt(playerFields[12]); // Home Runs allowed
    const BB = parseInt(playerFields[10]); // Walks allowed
    const HBP = 0; // Assuming Hit by Pitch is not provided in the data
    const K = parseInt(playerFields[9]);  // Strikeouts
    const IP = parseFloat(playerFields[6]); // Innings Pitched
    
    // Calculate FIP using the formula: FIP = ((13*HR)+(3*(BB+HBP))-(2*K))/IP + FIP_constant
    const FIP_constant = 3.1; // Typical league-average constant for FIP
    const FIP = ((13 * HR) + (3 * (BB + HBP)) - (2 * K)) / IP + FIP_constant;
    
    return FIP.toFixed(2); // Return FIP rounded to 2 decimal places
}

// Example usage:
const csvData = `
Player,Team,Age,G,Gs,CG,SHO,IP,H,ER,K,BB,HR,W,L,SV,BS,HLD,ERA,WHIP,HR/9IP
Max Scherzer,Washington Nationals,37,30,30,2,1,179.1,128,55,239,41,21,4,15,0,0,0,2.76,1.02,0.72
Jacob deGrom,New York Mets,33,25,25,0,0,151.0,94,35,221,33,7,8,5,0,0,0,2.08,0.87,0.56
`;



//BaseLevel Functions

async function GetPlayerID(FullName){
    let StatRequest = await fetch(`${APIprefix}/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${FullName}'`)
    let PlayerInfo = await StatRequest.json();

    try { PlayerID = await PlayerInfo.search_player_all.queryResults.row.player_id;
    } catch(err){
        console.log(err);
        PlayerID = 000000;
    }

    return PlayerID;
}


