

async function ReadJson(){
    let request = await fetch("src/SeasonData2021.json");
    let json= await request.json();
    currentarray = json[1];
    console.log(currentarray[1][1]);
    return json;
}

