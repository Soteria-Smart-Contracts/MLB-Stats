let GameDayLinks = [];
let Matchups = [];

GetGameDayLinks();


async function GetLineups(){
    let Boxes = [];

    const parser = new DOMParser();
    const parsedSite = parser.parseFromString(await (await fetch('https://cors-anywhere.herokuapp.com/https://www.rotowire.com/baseball/daily-lineups.php?date=tomorrow')).text(), "text/html");
    
    Boxes = parsedSite.getElementsByClassName('lineup__box');

    let index = 0;
    let total = Boxes.length;

    while(index > total){
        Matchups[index] = {
            HomeTeam: Boxes[index].getElementsByClassName('lineup__mteam is-visit')[0].innerText,




        }
        index++;
        
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

// Deprecated functions

async function GetGameDayLinks(){

    let currentDate = new Date;
    let month = '0' + (currentDate.getMonth() + 1);
    let formatteddate = `${currentDate.getFullYear()}-${month}-21`;
    
    const parser = new DOMParser();
    const parsedSite = parser.parseFromString(await (await fetch('https://cors-anywhere.herokuapp.com/https://www.mlb.com/scores/' + formatteddate)).text(), "text/html");

    LinkBoxes = parsedSite.getElementsByClassName('linkstyle__AnchorElement-sc-1rt6me7-0 lcFuuA getProductButtons__ButtonLink-sc-bgnczd-1 elIcfn trk-preview');
    GameDayLinks = await ParseBoxesForLinks(LinkBoxes);

    console.log(GameDayLinks);
    return GameDayLinks;
}