let GameDayLinks

async function GetGameDayLinks(){

    let currentDate = new Date;
    let month = '0' + (currentDate.getMonth() + 1);
    let formatteddate = `${currentDate.getFullYear()}-${month}-22`;
    
    const parser = new DOMParser();
    const parsedSite = parser.parseFromString(await (await fetch('https://www.mlb.com/scores/' + formatteddate)).text(), "text/html");

    Games = parsedSite.getElementsByClassName('game-schedules-container')[0].getElementsByClassName('game-schedules-table')[0].getElementsByTagName('tr');

    console.log(parsedSite);

}