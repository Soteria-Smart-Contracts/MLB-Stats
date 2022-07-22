let SeasonData = fetch("src/GL2021.xlsx");

function ReadJson(){
    let json = fetch("src/SeasonData2021.json");
    return json[1];
}

