let GameDayLinks = [];
let Matchups = [];
let BoxesMLB;


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
    let BoxesRW = await parsedRW.getElementsByClassName('lineup__box');
    BoxesMLB = await parsedmlb.getElementsByClassName('grid-itemstyle__GridItemWrapper-sc-cq9wv2-0 gmoPjI');

    if( (BoxesRW.length - 2) != BoxesMLB.length){
        console.log('Game Number Conflict')
        return;
    }

    let index = 0;
    let total = BoxesMLB.length;

    while(index < total){
        Matchups[index] = {
            HomeTeam: BoxesMLB[index].getElementsByClassName('TeamWrappersstyle__DesktopTeamWrapper-sc-uqs6qh-0 fdaoCu')[1].innerText,
            AwayTeam: BoxesMLB[index].getElementsByClassName('TeamWrappersstyle__DesktopTeamWrapper-sc-uqs6qh-0 fdaoCu')[0].innerText,
            HomeTeamRecord: BoxesMLB[index].getElementsByClassName('teamstyle__TeamLabel-sc-1suh43a-3 teamstyle__DesktopRecordWrapper-sc-1suh43a-4 gbRmLr')[1].innerText,
            AwayTeamRecord: BoxesMLB[index].getElementsByClassName('teamstyle__TeamLabel-sc-1suh43a-3 teamstyle__DesktopRecordWrapper-sc-1suh43a-4 gbRmLr')[0].innerText,
       //     HomeTeamLineup: ,
      //      HomeTeamLineupIDs: 



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

async function GetLineupOrders(BoxesRW){
    let LineupBoxes = BoxesRW.getElementsByClassName('lineup__player').;

    index = 0;
    total = BoxesMLB.length;
    let HomeLineup = [];
    let AwayLineyup = [];
    while(index < total){
        let lineupindex;
        if(index <= 8){
            AwayLineup[index] = BoxesMLB[index].getElementsByClassName('TeamWrappersstyle__DesktopTeamWrapper-sc-uqs6qh-0 fdaoCu')[1].innerText;
            lineupindex++;
        }
        if(index > 9){
        index++;
    }
    
}

// Deprecated functions

async function GetGameDayLinks(){

    let currentDate = new Date;
    let month = '0' + (currentDate.getMonth() + 1);
    let formatteddate = `${currentDate.getFullYear()}-${month}-21`;
    
    const parser = new DOMParser();
    const parsedSite = parser.parseFromString(await (await fetch('https://www.mlb.com/scores/' + formatteddate)).text(), "text/html");
//https://cors-anywhere.herokuapp.com/
    LinkBoxes = parsedSite.getElementsByClassName('linkstyle__AnchorElement-sc-1rt6me7-0 lcFuuA getProductButtons__ButtonLink-sc-bgnczd-1 elIcfn trk-preview');
    GameDayLinks = await ParseBoxesForLinks(LinkBoxes);

    console.log(GameDayLinks);
    return GameDayLinks;
}