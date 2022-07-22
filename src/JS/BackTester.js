

async function ReadJson(){
    let request = await fetch("src/SeasonData2021.json");
    let json= await request.json();
    console.log(json[1].());
    return json;
}

