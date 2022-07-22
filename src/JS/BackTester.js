

async function ReadJson(){
    let request = await fetch("src/SeasonData2021.json");
    let json= await request.json();
    return json[1];
}

