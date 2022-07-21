let GameDayLinks = [];
let Matchups = [];
let BoxesMLB;

let HomeLineup = [];
let AwayLineup = [];


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

    GetLineupOrders(BoxesRW[0]);

    while(index < total){
        await GetLineupOrders(BoxesRW[index]);
        Matchups[index] = {
            HomeTeam: BoxesMLB[index].getElementsByClassName('TeamWrappersstyle__DesktopTeamWrapper-sc-uqs6qh-0 fdaoCu')[1].innerText,
            AwayTeam: BoxesMLB[index].getElementsByClassName('TeamWrappersstyle__DesktopTeamWrapper-sc-uqs6qh-0 fdaoCu')[0].innerText,
            HomeTeamRecord: BoxesMLB[index].getElementsByClassName('teamstyle__TeamLabel-sc-1suh43a-3 teamstyle__DesktopRecordWrapper-sc-1suh43a-4 gbRmLr')[1].innerText,
            AwayTeamRecord: BoxesMLB[index].getElementsByClassName('teamstyle__TeamLabel-sc-1suh43a-3 teamstyle__DesktopRecordWrapper-sc-1suh43a-4 gbRmLr')[0].innerText,
            HomeTeamLineup: HomeLineup,
            AwayTeamLineup: AwayLineup,
            HomeTeamLineupIDs: 



        }
        HomeLineup = [];
        AwayLineup = [];
        HomeLineupIDs = [];
        AwayLineupIDs = [];
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
    let LineupBoxes = BoxesRW.getElementsByClassName('lineup__player');
    console.log(LineupBoxes);
    index = 0;
    total = LineupBoxes.length;
    HomeLineup = [];
    AwayLineup = [];
    HomeLineupIDs = [];
    AwayLineupIDs = [];
    let LineupIndexAway = 0;
    let LineupIndexHome = 0;
    while(index < total){
        if(LineupIndexAway <= 8){
            AwayLineup[LineupIndexAway] = LineupBoxes[index].getElementsByTagName('a')[0].title;
            GetPlayerID(FullName)
            LineupIndexAway++;
        }
        if(index >= 9){
            HomeLineup[LineupIndexHome] = LineupBoxes[index].getElementsByTagName('a')[0].title;
            LineupIndexHome++;
        }
        index++;
    }
    return HomeLineup, AwayLineup;
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