

async function GetGameDayLinks(){

    let currentDate = new Date;
    let formatteddate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-22`;
    
    const parser = new DOMParser();
    const parsedSite = parser.parseFromString(await (await fetch('https://www.mlb.com/scores/' + formatteddate)).text(), "text/html");
    console.log(parsedSite);

}