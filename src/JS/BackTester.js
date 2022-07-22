

async function GetJson(){
    let request = await fetch("src/SeasonData2021.json");
    let json= await request.json();
    return json;
}

async function BackTestSeason(){
    let TwoFiveU = [0,0,0];
    let TwoSix = [0,0,0];
    let TwoSeven = [0,0,0];
    let TwoEight = [0,0,0];
    let TwoNine = [0,0,0];
    let ThreeZero = [0,0,0];
    
}

