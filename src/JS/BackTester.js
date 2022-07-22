let errors = 0;

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
    let ThreeOne = [0,0,0];
    let ThreeTwo = [0,0,0];
    let ThreeThree = [0,0,0];
    let ThreeFour = [0,0,0];
    let ThreeFive = [0,0,0];
    let ThreeSix = [0,0,0];
    let ThreeSeven = [0,0,0];
    let ThreeEight = [0,0,0];
    let ThreeNine = [0,0,0];
    let FourZero = [0,0,0];
    let FourOne = [0,0,0];
    let FourTwo = [0,0,0];
    let FourThree = [0,0,0];
    let FourFour = [0,0,0];
    let FourFive = [0,0,0];
    let FourSix = [0,0,0];
    let FourSeven = [0,0,0];
    let FourEight = [0,0,0];
    let FourNine = [0,0,0];
    let FiveZeroO = [0,0,0];

    let json = await GetJson();

    for(let i = 0; i < json.length; i++){
        PitcherOneFIP =  try {GetPitcherFIPfromName(json[i][i][0]);} catch(err){errors = errors + 1; console.log(errors);}
        PitcherTwoFIP = GetPitcherFIPfromName(json[i][i][1]);
        Over = json[i][i][3];
        console.log(PitcherOneFIP);
        console.log(PitcherTwoFIP);
    }


}

