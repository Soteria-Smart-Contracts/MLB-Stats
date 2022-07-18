

async function GetGameDayLinks(){
    let currentDate = new Date;
    let formatteddate = `${currentDate.getFullYear()}-${ReturnMonthString(currentDate.getMonth() + 1)}-22`;
    console.log(formatteddate);
    GamedayRequest = await (await fetch('https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/' + formatteddate + APIkey)).json();
    let GameIDs = ParseGameFileForIDs(GamedayRequest);

    return GameIDs; 
}