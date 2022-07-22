

function ReadJson(){
    let json = fetch("https://github.com/Soteria-Smart-Contracts/MLB-Stats/blob/master/src/SeasonData2021.json").json();
    return json;
}

