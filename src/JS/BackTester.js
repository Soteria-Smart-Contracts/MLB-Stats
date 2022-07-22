let SeasonData = fetch("src/GL2021.xlsx");

function ReadJson(){
    let json = fetch("https://raw.githubusercontent.com/Soteria-Smart-Contracts/MLB-Stats/master/src/SeasonData2021.json?token=GHSAT0AAAAAABU6RIU65J5PTOMSWTHL7RE2YW26CAQ");
    return json[1];
}

