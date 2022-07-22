

async function ReadJson(){
    let request = await fetch("src/s");
    let json= await request.json();
    return json[1];
}

