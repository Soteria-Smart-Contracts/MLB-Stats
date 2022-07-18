

async function GetGameDayLinks(){

    let currentDate = new Date;
    let formatteddate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-22`;
    
    const parser = new DOMParser();
    const parsedSite = parser.parseFromString(await (await fetch('https://www.mlb.com/scores/${formattedDat')).text(), "text/html");
    console.log(parsedSite);


    return GameIDs; 
}