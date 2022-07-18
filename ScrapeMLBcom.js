

async function GetGameDayLinks(){
    let currentDate = new Date;
    let formatteddate = `${currentDate.getFullYear()}-${currentDate.getMonth}-22`;
    console.log(formatteddate);
    GamedayRequest = await (await fetch('https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/' + formatteddate + APIkey)).json();
    let GameIDs = ParseGameFileForIDs(GamedayRequest);

    return GameIDs; 
}