let SeasonData = fetch("src/GL2021.xlsx");

function ReadJson(){
    let json = fetch("src/SeasonData.json");
    return json[1];
}

