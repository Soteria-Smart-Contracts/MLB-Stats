let GameDayLinks = [];
let Matchups = [];


async function GetLineups(){
    let Boxes = [];

    let currentDate = new Date;
    let month = '0' + (currentDate.getMonth() + 1);
    let formatteddate = `${currentDate.getFullYear()}-${month}-21`;

    const parser1 = new DOMParser();
    const parser2 = new DOMParser();
    const parsedRW = parser1.parseFromString(await (await fetch('https://www.rotowire.com/baseball/daily-lineups.php?date=tomorrow')).text(), "text/html");
    const parsedmlb = parser2.parseFromString(await (await fetch('https://www.mlb.com/scores/' + formatteddate)).text(), "text/html");
    //https://cors-anywhere.herokuapp.com/
    BoxesRW = parsedRW.getElementsByClassName('lineup__box');
    BoxesRW.pop();
    BoxesRW.pop();

    BoxesMLB = parsedmlb.getElementsByClassName('grid-itemstyle__GridItemWrapper-sc-cq9wv2-0 gmoPjI');

    console.log(BoxesRW.length);
    console.log(BoxesMLB.length);

    if(BoxesRW.length != BoxesMLB.length){
        console.log('Game Number Conflict')
        return;
    }

    let index = 0;
    let total = BoxesRW.length;

    while(index < total){
        console.log(BoxesRW[index].getElementsByClassName('lineup__mteam is-visit')[index].innerText);
        Matchups[index] = {
            HomeTeam: parsedmlb[index].getElementsByClassName('TeamWrappersstyle__DesktopTeamWrapper-sc-uqs6qh-0 fdaoCu')[0].innerText,
            AwayTeam: parsedmlb[index].getElementsByClassName('TeamWrappersstyle__DesktopTeamWrapper-sc-uqs6qh-0 fdaoCu')[1].innerText,



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