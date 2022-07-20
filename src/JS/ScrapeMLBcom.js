let GameDayLinks = [];

GetGameDayLinks();


async function GetLineups(){
    let Boxes = [];

    const parser = new DOMParser();
    const parsedSite = parser.parseFromString(await (await fetch('https://cors-anywhere.herokuapp.com/https://www.rotowire.com/baseball/daily-lineups.php?date=tomorrow')).text(), "text/html");
    
    Boxes = parsedSite.getElementsByClassName('lineup__box');

    let index = 0;
    let total = Boxes.length;

    while(index > total){
        
    }
}









//LowLevel Functions


function ParseBoxesForLinks(LinkBoxes){
    index = 0;
    total = LinkBoxes.length;
    let Links = [];
    while(index < total){
        Links[index] = (LinkBoxes[index].href);
        index++;
    }
    return Links;
}

//