

function ReadJson(){
    let json = fetch("src/SeasonData2021.json");
    return json[1];
}

