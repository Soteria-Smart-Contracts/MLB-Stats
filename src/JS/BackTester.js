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
        let ValidData = true;
        let PitcherOneFIP = 0; 
        let PitcherTwoFIP = 0;
        try{ PitcherOneFIP = await GetPitcherFIPfromName(json[i][i][0]);}
        catch(err){}
        try{ PitcherTwoFIP = await GetPitcherFIPfromName(json[i][i][1]);}
        catch(err){}
        if(PitcherOneFIP == 0 || PitcherOneFIP == 'NaN' || PitcherTwoFIP == 0 || PitcherTwoFIP == 'NaN'){
            ValidData = false;
            errors++;
        }
        let Over = json[i][i][3];
        let AverageFIP = (PitcherOneFIP + PitcherTwoFIP) / 2;


        if(ValidData == true && AverageFIP <= 2.599){
                if(Over == 1){
                TwoFiveU[0]++;
                TwoFiveU[2]++;
                }
                else if(Over == 0){
                TwoFiveU[1]++;
                TwoFiveU[2]++;
                }
        }

        if(ValidData == true && AverageFIP > 2.599 && AverageFIP <= 2.699){
                if(Over == 1){
                TwoSix[0]++;
                TwoSix[2]++;
                }
                else if(Over == 0){
                TwoSix[1]++;
                TwoSix[2]++;
                }
        }

        if(ValidData == true && AverageFIP > 2.699 && AverageFIP <= 2.799){
                if(Over == 1){
                TwoSeven[0]++;
                TwoSeven[2]++;
                }
                else if(Over == 0){
                TwoSeven[1]++;
                TwoSeven[2]++;
                }
        }

        if(ValidData == true && AverageFIP > 2.799 && AverageFIP <= 2.899){
                if(Over == 1){
                TwoEight[0]++;
                TwoEight[2]++;
                }
                else if(Over == 0){
                TwoEight[1]++;
                TwoEight[2]++;
                }
        }

        if(ValidData == true && AverageFIP > 2.899 && AverageFIP <= 2.999){
                if(Over == 1){
                TwoNine[0]++;
                TwoNine[2]++;
                }
                else if(Over == 0){
                TwoNine[1]++;
                TwoNine[2]++;
                }
        }

        if(ValidData == true && AverageFIP > 2.999 && AverageFIP <= 3.099){
                if(Over == 1){
                ThreeZero[0]++;
                ThreeZero[2]++;
                }
                else if(Over == 0){
                ThreeZero[1]++;
                ThreeZero[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.099 && AverageFIP <= 3.199){
                if(Over == 1){
                ThreeOne[0]++;
                ThreeOne[2]++;
                }
                else if(Over == 0){
                ThreeOne[1]++;
                ThreeOne[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.199 && AverageFIP <= 3.299){
                if(Over == 1){      
                ThreeTwo[0]++;
                ThreeTwo[2]++;
                }
                else if(Over == 0){
                ThreeTwo[1]++;
                ThreeTwo[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.299 && AverageFIP <= 3.399){
                if(Over == 1){
                ThreeThree[0]++;
                ThreeThree[2]++;
                }
                else if(Over == 0){
                ThreeThree[1]++;
                ThreeThree[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.399 && AverageFIP <= 3.499){
                if(Over == 1){
                ThreeFour[0]++;
                ThreeFour[2]++;
                }
                else if(Over == 0){
                ThreeFour[1]++;
                ThreeFour[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.499 && AverageFIP <= 3.599){
                if(Over == 1){
                ThreeFive[0]++;
                ThreeFive[2]++;
                }
                else if(Over == 0){
                ThreeFive[1]++;
                ThreeFive[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.599 && AverageFIP <= 3.699){
                if(Over == 1){
                ThreeSix[0]++;
                ThreeSix[2]++;
                }
                else if(Over == 0){
                ThreeSix[1]++;
                ThreeSix[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.699 && AverageFIP <= 3.799){
                if(Over == 1){
                ThreeSeven[0]++;
                ThreeSeven[2]++;
                }
                else if(Over == 0){
                ThreeSeven[1]++;
                ThreeSeven[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.799 && AverageFIP <= 3.899){
                if(Over == 1){
                ThreeEight[0]++;
                ThreeEight[2]++;
                }
                else if(Over == 0){
                ThreeEight[1]++;
                ThreeEight[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.899 && AverageFIP <= 3.999){
                if(Over == 1){
                ThreeNine[0]++;
                ThreeNine[2]++;
                }
                else if(Over == 0){
                ThreeNine[1]++;
                ThreeNine[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 3.999 && AverageFIP <= 4.099){
                if(Over == 1){
                FourZero[0]++;
                FourZero[2]++;
                }
                else if(Over == 0){
                FourZero[1]++;
                FourZero[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.099 && AverageFIP <= 4.199){
                if(Over == 1){
                FourOne[0]++;
                FourOne[2]++;
                }
                else if(Over == 0){
                FourOne[1]++;
                FourOne[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.199 && AverageFIP <= 4.299){
                if(Over == 1){
                FourTwo[0]++;
                FourTwo[2]++;
                }
                else if(Over == 0){
                FourTwo[1]++;
                FourTwo[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.299 && AverageFIP <= 4.399){
                if(Over == 1){
                FourThree[0]++;
                FourThree[2]++;
                }
                else if(Over == 0){
                FourThree[1]++;
                FourThree[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.399 && AverageFIP <= 4.499){
                if(Over == 1){
                FourFour[0]++;
                FourFour[2]++;
                }
                else if(Over == 0){
                FourFour[1]++;
                FourFour[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.499 && AverageFIP <= 4.599){
                if(Over == 1){
                FourFive[0]++;
                FourFive[2]++;
                }
                else if(Over == 0){
                FourFive[1]++;
                FourFive[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.599 && AverageFIP <= 4.699){
                if(Over == 1){
                FourSix[0]++;
                FourSix[2]++;
                }
                else if(Over == 0){
                FourSix[1]++;
                FourSix[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.699 && AverageFIP <= 4.799){
                if(Over == 1){
                FourSeven[0]++;
                FourSeven[2]++;
                }
                else if(Over == 0){
                FourSeven[1]++;
                FourSeven[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.799 && AverageFIP <= 4.899){
                if(Over == 1){
                FourEight[0]++;
                FourEight[2]++;
                }
                else if(Over == 0){
                FourEight[1]++;
                FourEight[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.899 && AverageFIP <= 4.999){
                if(Over == 1){
                FourNine[0]++;
                FourNine[2]++;
                }
                else if(Over == 0){
                FourNine[1]++;
                FourNine[2]++;
                }
        }
        if (ValidData == true && AverageFIP > 4.999){
                if(Over == 1){
                FiveZeroO[0]++;
                FiveZeroO[2]++;
                }
                else if(Over == 0){
                FiveZeroO[1]++;
                FiveZeroO[2]++;
                }
        }
        console.log(PitcherOneFIP);
        console.log(PitcherTwoFIP);
    }
    console.log('TwoFiveUnder' + TwoFiveUnder);
    console.log('TwoSix' + TwoSix);
        console.log('TwoSeven' + TwoSeven);
        


}

