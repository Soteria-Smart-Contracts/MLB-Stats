

async function ReadJson(){
    let request = await fetch("src/SeasonData.");
    let json= await request.json();
    return json[1];
}

