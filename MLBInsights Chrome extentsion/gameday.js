
let is_split = false;
const infoBox = document.createElement('div');
infoBox.id = 'infoBox';
infoBox.style.border = '1px solid black';
infoBox.style.padding = '10px';
const reactFooter = document.getElementById('react-footer');
reactFooter.parentNode.insertBefore(infoBox, reactFooter);

// New function for head-to-head analysis
async function analyzeHeadToHeadHomeRuns(team1, team2) {
    let gamesFound = 0;
    let totalHR = 0;
    let totalHRF1 = 0;
    let totalHRF2 = 0;
    let ovhr = 0;
    let unhr = 0;
    let ov1p5 = 0;
    let un1p5 = 0;

    // Load the data into CSV format if not already done
    if (!is_split) {
        data = data.split("\n").map((row) => row.split(","));
        is_split = true;
    }

    // Loop through each game in the data
    for (const game of data) {
        const team1InGame = game[3] === team1 || game[5] === team1;
        const team2InGame = game[3] === team2 || game[5] === team2;

        if (team1InGame && team2InGame) {
            totalHR += Number(game[9]);

            if (game[3] === team1) {
                totalHRF1 += Number(game[6]);
                totalHRF2 += Number(game[7]);
            } else {
                totalHRF1 += Number(game[7]);
                totalHRF2 += Number(game[6]);
            }

            if (Number(game[9]) > 2.5) {
                ovhr++;
            } else {
                unhr++;
            }

            if (Number(game[9]) > 1.5) {
                ov1p5++;
            }
            else {
                un1p5++;
            }

            gamesFound++;
        }
    }

    // Calculate averages and percentages
    const averageHR = (totalHR / gamesFound).toFixed(4);
    const averageHRF1 = (totalHRF1 / gamesFound).toFixed(4);
    const averageHRF2 = (totalHRF2 / gamesFound).toFixed(4);
    const ovpercent = ((ovhr / gamesFound) * 100).toFixed(2);
    const unpercent = ((unhr / gamesFound) * 100).toFixed(2);
    const ov1p5percent = ((ov1p5 / gamesFound) * 100).toFixed(2);
    const un1p5percent = ((un1p5 / gamesFound) * 100).toFixed(2);
    const decimalOdds = (1 / (ovpercent / 100)).toFixed(2);
    const decimalOdds1p5 = (1 / (ov1p5percent / 100)).toFixed(2);
    const decimalOddsUnder = (1 / (unpercent / 100)).toFixed(2);
    const decimalOdds1p5Under = (1 / (un1p5percent / 100)).toFixed(2);

    console.log("------------------------------");
    console.log("Head-to-Head Home Run Information");
    console.log("------------------------------");

    console.log(`Total Games Played: ${gamesFound}`);
    console.log(`Total Home Runs: ${totalHR}`);
    console.log(`Total Home Runs for ${team1}: ${totalHRF1}`);
    console.log(`Total Home Runs for ${team2}: ${totalHRF2}`);
    console.log(`Average Home Runs: ${averageHR}`);
    console.log(`Average Home Runs for ${team1}: ${averageHRF1}`);
    console.log(`Average Home Runs for ${team2}: ${averageHRF2}`);

    console.log("--------------------------");
    console.log("Over Under 2.5 Information");
    console.log("--------------------------");

    console.log(`Games over 2.5 Home Runs: ${ovhr}`);
    console.log(`Games under 2.5 Home Runs: ${unhr}`);
    console.log(`Percentage of games over 2.5 HR: ${ovpercent}%`);
    console.log(`Percentage of games under 2.5 HR: ${unpercent}%`);

    console.log("--------------------------");
    console.log("Over Under 1.5 Information");
    console.log("--------------------------");

    console.log(`Games over 1.5 Home Runs: ${ov1p5}`);
    console.log(`Games under 1.5 Home Runs: ${un1p5}`);
    console.log(`Percentage of games over 1.5 HR: ${ov1p5percent}%`);
    console.log(`Percentage of games under 1.5 HR: ${un1p5percent}%`);

    console.log("------------------------------");
    console.log("Implied Odds");
    console.log("------------------------------");

    console.log(`Implied Odds for Over 2.5 HR: ${decimalOdds}x`);
    console.log(`Implied Odds for Over 1.5 HR: ${decimalOdds1p5}x`);
    console.log(`Implied Odds for Under 2.5 HR: ${decimalOddsUnder}x`);
    console.log(`Implied Odds for Under 1.5 HR: ${decimalOdds1p5Under}x`);

    infoBox.innerHTML = `
        <h2>Head-to-Head Home Run Stats</h2>
        <p>Total Games Played: ${gamesFound}</p>
        <p>Total Home Runs: ${totalHR}</p>
        <p>Total Home Runs for ${team1}: ${totalHRF1}</p>
        <p>Total Home Runs for ${team2}: ${totalHRF2}</p>
        <p>Average Home Runs: ${averageHR}</p>
        <p>Average Home Runs for ${team1}: ${averageHRF1}</p>
        <p>Average Home Runs for ${team2}: ${averageHRF2}</p>
        <h3>Over Under 2.5 Information</h3>
        <p>Games over 2.5 Home Runs: ${ovhr}</p>
        <p>Games under 2.5 Home Runs: ${unhr}</p>
        <p>Percentage of games over 2.5 HR: ${ovpercent}%</p>
        <p>Percentage of games under 2.5 HR: ${unpercent}%</p>
        <h3>Over Under 1.5 Information</h3>
        <p>Games over 1.5 Home Runs: ${ov1p5}</p>
        <p>Games under 1.5 Home Runs: ${un1p5}</p>
        <p>Percentage of games over 1.5 HR: ${ov1p5percent}%</p>
        <p>Percentage of games under 1.5 HR: ${un1p5percent}%</p>
        <h3>Implied Odds</h3>
        <p>Implied Odds for Over 2.5 HR: ${decimalOdds}x</p>
        <p>Implied Odds for Over 1.5 HR: ${decimalOdds1p5}x</p>
        <p>Implied Odds for Under 2.5 HR: ${decimalOddsUnder}x</p>
        <p>Implied Odds for Under 1.5 HR: ${decimalOdds1p5Under}x</p>
    `;
    
}

const playerElement = document.querySelector('imagestyle__Img-sc-xw1tzz-1 bCaaGr');
const playerName = playerElement.innerHTML;
alert(playerName);

const teamcodes = {
    "diamondbacks": "ARI",
    "braves": "ATL",
    "orioles": "BAL",
    "red": "BOS",
    "cubs": "CHN",
    "white": "CHA",
    "reds": "CIN",
    "guardians": "CLE",
    "rockies": "COL",
    "tigers": "DET",
    "astros": "HOU",
    "royals": "KCA",
    "angels": "ANA",
    "dodgers": "LAN",
    "marlins": "MIA",
    "brewers": "MIL",
    "twins": "MIN",
    "mets": "NYN",
    "yankees": "NYA",
    "athletics": "OAK",
    "phillies": "PHI",
    "pirates": "PIT",
    "padres": "SDN",
    "giants": "SFN",
    "mariners": "SEA",
    "cardinals": "SLN",
    "rays": "TBA",
    "rangers": "TEX",
    "blue": "TOR",
    "nationals": "WAS"
};

async function GetPitcherFIP(playerName) {
    // Split the CSV data by lines to get individual player records
    const playerRecords = csvData.split('\n');
    
    // Find the player's record by searching for their name
    const playerRecord = playerRecords.find(record => record.includes(playerName));

    
    if (!playerRecord) {
        return "Player not found";
    }

    // Split the player's record by commas to extract relevant data
    const playerFields = playerRecord.split(',');
    
    // Extract relevant statistics
    const HR = parseInt(playerFields[12]); // Home Runs allowed
    const BB = parseInt(playerFields[11]); // Walks allowed
    const HBP = 0; // Assuming Hit by Pitch is not provided in the data
    const K = parseInt(playerFields[10]);  // Strikeouts
    const IP = parseFloat(playerFields[7]); // Innings Pitched
    console.log(HR, BB, HBP, K, IP);
    
    // Calculate FIP using the formula: FIP = ((13*HR)+(3*(BB+HBP))-(2*K))/IP + FIP_constant
    const FIP_constant = 3.1; // Typical league-average constant for FIP
    const FIP = (((13 * HR) + (3 * (BB + HBP)) - (2 * K)) / IP + FIP_constant).toFixed(2);
    
    return FIP; // Return FIP rounded to 2 decimal places
}

function removeaccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//make a functiont hat returns a cool coloured screen in the console showint the following pitcher info:
//Name, Age, Team,record, FIP, ERA, HR/9IP,IP, HR
async function GetPitcherInfo(Name) {
    Name = removeaccents(Name);
    // Split the CSV data by lines to get individual player records
    const playerRecords = csvData.split('\n');
    
    // Find the player's record by searching for their name
    const playerRecord = playerRecords.find(record => record.includes(Name));

    if (!playerRecord) {
        return "Player not found";
    }
    
    // Split the player's record by commas to extract relevant data
    const playerFields = playerRecord.split(',');
    
    // Extract relevant statistics
    const age = playerFields[2];
    const team = playerFields[1];
    const wins = playerFields[13];
    const losses = playerFields[14];
    const IP = parseFloat(playerFields[7]);
    const HR = parseInt(playerFields[12]);
    const ERA = parseFloat(playerFields[18]);
    const HR_9IP = parseFloat(playerFields[20]);
    const FIP = await GetPitcherFIP(Name); // Assuming GetPitcherFIP is an async function

    // Construct an object with the player's information
    const playerInfo = {
        Name: Name,
        Age: age,
        Team: team,
        Record: `${wins}-${losses}`,
        FIP: FIP,
        ERA: ERA,
        "HR/9IP": HR_9IP,
        IP: IP,
        HR: HR
    };

    // Display player info in a formatted table
    const summaryBlock = document.getElementById('summary-block');
    const playerInfoTable = document.createElement('table');
    playerInfoTable.style.borderCollapse = 'collapse';
    playerInfoTable.style.margin = '20px';
    playerInfoTable.innerHTML = `
    <br>
    <br>
        <tr>
            <th style="border: 1px solid black; padding: 8px;">Name</th>
            <th style="border: 1px solid black; padding: 8px;">Age</th>
            <th style="border: 1px solid black; padding: 8px;">Team</th>
            <th style="border: 1px solid black; padding: 8px;">Record</th>
            <th style="border: 1px solid black; padding: 8px;">FIP</th>
            <th style="border: 1px solid black; padding: 8px;">ERA</th>
            <th style="border: 1px solid black; padding: 8px;">HR/9IP</th>
            <th style="border: 1px solid black; padding: 8px;">IP</th>
            <th style="border: 1px solid black; padding: 8px;">HR</th>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.Name}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.Age}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.Team}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.Record}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.FIP}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.ERA}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo["HR/9IP"]}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.IP}</td>
            <td style="border: 1px solid black; padding: 8px;">${playerInfo.HR}</td>
        </tr>
    `;
    summaryBlock.parentNode.insertBefore(playerInfoTable, summaryBlock);
    console.table(playerInfo);

    return playerInfo;
}


// Example usage:
const csvData = `
Player,Team,Age,G,GS,CG,SHO,IP,H,ER,K,BB,HR,W,L,SV,BS,HLD,ERA,WHIP,HR/9IP
Logan Webb,SF,27,33,33,2,1,216,201,78,194,31,20,11,13,0,0,0,3.25,1.07,0.83333
Zac Gallen,ARI,28,34,34,1,1,210,188,81,220,47,22,17,9,0,0,0,3.47,1.12,0.94286
Gerrit Cole,NYY,33,33,33,2,2,209,157,61,222,48,20,15,4,0,0,0,2.63,0.98,0.86124
Miles Mikolas,STL,35,35,35,0,0,201.1,226,107,137,39,26,9,13,0,0,0,4.78,1.32,1.16360
Chris Bassitt,TOR,35,33,33,1,1,200,176,80,186,59,28,16,8,0,0,0,3.6,1.18,1.26000
Framber Valdez,HOU,30,31,31,2,2,198,166,76,200,57,19,12,11,0,0,0,3.45,1.13,0.86364
Luis Castillo,SEA,31,33,33,0,0,197,160,73,219,56,28,14,9,0,0,0,3.34,1.1,1.27919
Mitch Keller,PIT,27,32,32,1,1,194.1,187,91,210,55,25,13,9,0,0,0,4.21,1.25,1.15920
Pablo Lopez,MIN,28,32,32,1,1,194,176,79,234,48,24,11,8,0,0,0,3.66,1.15,1.11340
Corbin Burnes,MIL,29,32,32,0,0,193.2,141,73,200,66,22,10,8,0,0,0,3.39,1.07,1.02484
Aaron Nola,PHI,30,32,32,0,0,193.2,178,96,202,45,32,12,9,0,0,0,4.46,1.15,1.49068
Kyle Gibson,BAL,36,33,33,0,0,192,198,101,157,55,23,15,9,0,0,0,4.73,1.32,1.07813
Zack Wheeler,PHI,33,32,32,0,0,192,168,77,212,39,20,13,6,0,0,0,3.61,1.08,0.93750
Logan Gilbert,SEA,26,32,32,1,1,190.2,169,79,189,36,29,13,7,0,0,0,3.73,1.08,1.37224
George Kirby,SEA,26,31,31,1,0,190.2,179,71,172,19,22,13,10,0,0,0,3.35,1.04,1.04101
Jose Berrios,TOR,29,32,32,0,0,189.2,173,77,184,52,25,11,12,0,0,0,3.65,1.19,1.18922
Spencer Strider,ATL,25,32,32,0,0,186.2,146,80,281,58,22,20,5,0,0,0,3.86,1.09,1.06337
Kevin Gausman,TOR,33,31,31,0,0,185,163,65,237,55,19,12,9,0,0,0,3.16,1.18,0.92432
Sandy Alcantara,MIA,28,28,28,3,1,184.2,176,85,151,48,22,7,12,0,0,0,4.14,1.21,1.07492
Sonny Gray,MIN,34,32,32,0,0,184,156,57,183,55,8,8,8,0,0,0,2.79,1.15,0.39130
Blake Snell,SD,31,32,32,0,0,180,115,45,234,99,15,14,9,0,0,0,2.25,1.19,0.75000
Patrick Corbin,WAS,34,32,32,0,0,180,210,104,124,57,33,10,15,0,0,0,5.2,1.48,1.65000
Jesus Luzardo,MIA,26,32,32,0,0,178.2,162,71,208,55,22,10,10,0,0,0,3.58,1.21,1.11111
Johan Oviedo,PIT,26,32,32,1,1,177.2,161,85,158,83,19,9,14,0,0,0,4.31,1.37,0.96501
Jordan Lyles,KC,33,31,31,3,0,177.2,176,124,120,45,39,6,17,0,0,0,6.28,1.24,1.98081
Zach Eflin,TB,29,31,31,0,0,177.2,158,69,186,24,19,16,8,0,0,0,3.5,1.02,0.96501
Merrill Kelly,ARI,35,30,30,0,0,177.2,143,65,187,69,20,12,8,0,0,0,3.29,1.19,1.01580
Dylan Cease,CWS,28,33,33,0,0,177,172,90,214,79,19,7,9,0,0,0,4.58,1.42,0.96610
Bryce Elder,ATL,24,31,31,0,0,174.2,160,74,128,63,19,12,4,0,0,0,3.81,1.28,0.98163
Justin Steele,CHC,28,30,30,0,0,173.1,167,59,176,36,14,16,5,0,0,0,3.06,1.17,0.72790
Dane Dunning,TEX,29,35,26,0,0,172.2,163,71,140,55,20,12,7,0,0,2,3.7,1.26,1.04530
Dean Kremer,BAL,28,32,32,0,0,172.2,171,79,157,55,27,13,5,0,0,0,4.12,1.31,1.41115
Taijuan Walker,PHI,31,31,31,0,0,172.2,155,84,138,71,20,15,6,0,0,0,4.38,1.31,1.04530
JP Sears,OAK,28,32,32,0,0,172.1,165,87,161,53,34,5,14,0,0,0,4.54,1.26,1.77804
Kyle Bradish,BAL,27,30,30,0,0,168.2,132,53,168,44,14,12,7,0,0,0,2.83,1.04,0.74911
Yusei Kikuchi,TOR,32,32,32,0,0,167.2,165,72,181,48,27,11,6,0,0,0,3.86,1.27,1.45335
Kodai Senga,NYM,31,29,29,0,0,166.1,126,55,202,77,17,12,7,0,0,0,2.98,1.22,0.92113
Freddy Peralta,MIL,27,30,30,0,0,165.2,131,71,210,54,26,12,10,0,0,0,3.86,1.12,1.41646
Charlie Morton,ATL,40,30,30,0,0,163.1,150,66,183,83,14,14,12,0,0,0,3.64,1.43,0.77253
Cristian Javier,HOU,27,31,31,0,0,162,143,82,159,62,25,10,5,0,0,0,4.56,1.27,1.38889
Joe Ryan,MIN,27,29,29,1,1,161.2,155,81,197,34,32,11,10,0,0,0,4.51,1.17,1.78660
Braxton Garrett,MIA,26,31,30,0,0,159.2,154,65,156,29,20,9,7,0,0,0,3.66,1.15,1.13065
Brady Singer,KC,27,29,29,0,0,159.2,182,98,133,49,20,8,11,0,0,0,5.52,1.45,1.13065
Josiah Gray,WAS,26,30,30,0,0,159,152,69,143,80,22,8,13,0,0,0,3.91,1.46,1.24528
Clarke Schmidt,NYY,28,33,32,0,0,159,169,82,149,46,24,9,9,0,0,0,4.64,1.35,1.35849
Jon Gray,TEX,32,29,29,1,0,157.1,149,72,142,54,22,9,8,0,0,0,4.12,1.29,1.26034
Brayan Bello,BOS,24,28,28,0,0,157,165,74,132,45,24,12,11,0,0,0,4.24,1.34,1.37580
Hunter Brown,HOU,25,31,29,0,0,155.2,157,88,178,55,26,11,13,0,0,0,5.09,1.36,1.50773
Kyle Freeland,COL,30,29,29,0,0,155.2,187,87,94,42,29,6,14,0,0,0,5.03,1.47,1.68170
Jameson Taillon,CHC,32,30,29,0,0,154.1,156,83,140,41,27,8,10,1,0,0,4.84,1.28,1.57690
Eduardo Rodriguez,DET,30,26,26,0,0,152.2,128,56,143,48,15,13,9,0,0,0,3.3,1.15,0.88699
Alex Cobb,SF,36,28,28,2,1,151.1,163,65,131,37,19,7,7,0,0,0,3.87,1.32,1.13170
Reid Detmers,LAA,24,28,28,0,0,148.2,141,74,168,60,19,4,10,0,0,0,4.48,1.35,1.15385
Andrew Heaney,TEX,32,34,28,0,0,147.1,143,68,151,60,23,10,6,0,1,2,4.15,1.38,1.40721
Seth Lugo,SD,34,26,26,0,0,146.1,140,58,140,36,19,8,7,0,0,0,3.57,1.2,1.17043
Graham Ashcraft,CIN,26,26,26,0,0,145.2,148,77,111,52,23,7,9,0,0,0,4.76,1.37,1.42562
Patrick Sandoval,LAA,27,28,28,0,0,144.2,145,66,128,74,12,7,13,0,0,0,4.11,1.51,0.74896
Trevor Williams,WAS,31,30,30,0,0,144.1,178,89,111,53,34,6,10,0,0,0,5.55,1.6,2.12353
Bailey Ober,MIN,28,26,26,0,0,144.1,125,55,146,29,22,8,6,0,0,0,3.43,1.07,1.37405
Ryne Nelson,ARI,26,29,27,0,0,144,159,85,96,46,24,8,8,0,0,0,5.31,1.42,1.50000
Nathan Eovaldi,TEX,34,25,25,2,1,144,117,58,132,47,15,12,5,0,0,0,3.63,1.14,0.93750
Nick Pivetta,BOS,31,38,16,0,0,142.2,110,64,183,50,23,10,9,1,1,2,4.04,1.12,1.45570
Drew Smyly,CHC,34,41,23,0,0,142.1,147,79,141,56,26,11,11,0,2,1,5,1.43,1.64673
Zack Greinke,KC,40,30,27,0,0,142.1,158,80,97,23,25,2,15,0,0,0,5.06,1.27,1.58339
Tanner Bibee,CLE,25,25,25,0,0,142,122,47,141,45,13,10,4,0,0,0,2.98,1.18,0.82394
Martin Perez,TEX,32,35,20,0,0,141.2,150,70,93,49,21,10,4,0,0,2,4.45,1.4,1.33853
Tyler Anderson,LAA,34,27,25,0,0,141,146,85,119,64,20,6,6,0,0,0,5.43,1.49,1.27660
Ken Waldichuk,OAK,26,35,22,0,0,141,149,84,132,71,24,4,9,1,0,0,5.36,1.56,1.53191
Austin Gomber,COL,30,27,27,0,0,139,164,85,87,43,26,9,9,0,0,0,5.5,1.49,1.68345
Kyle Hendricks,CHC,34,24,24,0,0,137,138,57,93,27,13,6,8,0,0,0,3.74,1.2,0.85401
Marcus Stroman,CHC,32,27,25,1,1,136.2,120,60,119,52,9,10,9,0,1,0,3.95,1.26,0.59471
Yu Darvish,SD,37,24,24,0,0,136.1,134,69,141,43,18,8,10,0,0,0,4.56,1.3,1.19030
MacKenzie Gore,WAS,25,27,27,0,0,136.1,134,67,151,57,27,7,10,0,0,0,4.42,1.4,1.78545
J.P. France,HOU,28,24,23,0,0,136.1,138,58,101,47,19,11,6,0,0,0,3.83,1.36,1.25643
Michael Wacha,SD,32,24,24,0,0,134.1,113,48,124,43,15,14,4,0,0,0,3.22,1.16,1.00671
Shohei Ohtani,LAA,29,135,23,1,1,132,85,46,167,55,18,10,5,0,0,0,3.14,1.06,1.22727
Clayton Kershaw,LAD,36,24,24,0,0,131.2,100,36,137,40,19,13,5,0,0,0,2.46,1.06,1.30335
Bryce Miller,SEA,25,25,25,0,0,131.1,124,63,119,26,18,8,7,0,0,0,4.32,1.14,1.23570
Mike Clevinger,CWS,33,24,24,2,0,131.1,121,55,110,40,16,9,9,0,0,0,3.77,1.23,1.09840
Michael Kopech,CWS,27,30,27,0,0,129.1,115,78,134,91,29,5,12,0,0,0,5.43,1.59,2.02169
Kutter Crawford,BOS,27,31,23,0,0,129.1,107,58,135,36,17,6,8,0,0,2,4.04,1.11,1.18513
Shane Bieber,CLE,28,21,21,1,0,128,124,54,107,34,14,6,6,0,0,0,3.8,1.23,0.98438
Griffin Canning,LAA,27,24,22,0,0,127,121,61,139,36,22,7,8,0,0,0,4.32,1.24,1.55906
Tylor Megill,NYM,28,25,25,0,0,126.1,141,66,105,58,18,9,8,0,0,0,4.7,1.58,1.28469
Logan Allen,CLE,25,24,24,0,0,125.1,127,53,119,48,16,7,8,0,0,0,3.81,1.4,1.15108
Ranger Suarez,PHI,28,22,22,0,0,125,129,58,119,48,13,4,6,0,0,0,4.18,1.42,0.93600
Colin Rea,MIL,33,26,22,0,0,124.2,110,63,110,38,23,6,6,0,0,0,4.55,1.19,1.66667
Bobby Miller,LAD,24,22,22,0,0,124.1,105,52,119,32,12,11,4,0,0,0,3.76,1.1,0.87027
Grayson Rodriguez,BAL,24,23,23,0,0,122,121,59,129,42,16,7,4,0,0,0,4.35,1.34,1.18033
Jake Irvin,WAS,27,24,24,0,0,121,118,62,99,54,20,3,7,0,0,0,4.61,1.42,1.48760
Jordan Montgomery,STL,31,21,21,0,0,121,116,46,108,35,12,6,9,0,0,0,3.42,1.25,0.89256
Lucas Giolito,CWS,29,21,21,0,0,121,106,51,131,42,20,6,6,0,0,0,3.79,1.22,1.48760
Wade Miley,MIL,37,23,23,0,0,120.1,99,42,79,38,16,9,4,0,0,0,3.14,1.14,1.19900
Tyler Glasnow,TB,30,21,21,0,0,120,93,47,162,37,13,10,7,0,0,0,3.53,1.08,0.97500
Lance Lynn,CWS,36,21,21,0,0,119.2,130,86,144,45,28,6,9,0,0,0,6.47,1.46,2.11409
Rich Hill,PIT,44,22,22,0,0,119,129,63,104,47,15,7,10,0,0,0,4.76,1.48,1.13445
Tyler Wells,BAL,29,25,20,0,0,118.2,83,48,117,34,25,7,6,1,0,0,3.64,0.99,1.90355
Sean Manaea,SF,32,37,10,0,0,117.2,104,58,128,42,14,7,6,1,0,1,4.44,1.24,1.07509
Julio Urias,LAD,27,21,21,0,0,117.1,112,60,117,24,24,11,8,0,0,0,4.6,1.16,1.84458
Brandon Williamson,CIN,25,23,23,0,0,117,111,58,98,39,18,5,5,0,0,0,4.46,1.28,1.38462
Shane McClanahan,TB,26,21,21,0,0,115,95,42,121,41,15,11,2,0,0,0,3.29,1.18,1.17391
Hunter Greene,CIN,24,22,22,0,0,112,111,60,152,48,19,4,7,0,0,0,4.82,1.42,1.52679
Adrian Houser,MIL,31,23,21,0,0,111.1,121,51,96,34,13,8,5,0,0,0,4.12,1.39,1.05311
David Peterson,NYM,28,27,21,1,0,111,124,62,128,50,16,3,8,0,0,1,5.03,1.57,1.29730
Nick Martinez,SD,33,63,9,0,0,110.1,99,42,106,40,12,6,4,1,6,15,3.43,1.26,0.98093
Jack Flaherty,STL,28,20,20,0,0,109.2,116,54,106,54,10,7,6,0,0,0,4.43,1.55,0.82418
Luis Medina,OAK,24,23,17,0,0,109.2,109,66,106,57,14,3,10,0,0,0,5.42,1.51,1.15385
Javier Assad,CHC,26,32,10,0,0,109.1,93,37,94,41,13,5,3,0,1,2,3.05,1.23,1.07241
Andrew Abbott,CIN,24,21,21,0,0,109.1,100,47,120,44,16,8,6,0,0,0,3.87,1.32,1.31989
Domingo German,NYY,31,20,19,1,1,108.2,83,55,114,34,20,5,7,0,0,0,4.56,1.08,1.66359
Max Scherzer,NYM,39,19,19,0,0,107.2,98,48,121,30,23,9,4,0,0,0,4.01,1.19,1.93097
Tanner Houck,BOS,27,21,21,0,0,106,104,59,99,41,14,6,10,0,0,0,5.01,1.37,1.18868
Joey Wentz,DET,26,25,19,0,0,105.2,131,81,98,47,25,3,13,0,0,0,6.9,1.68,2.13878
Michael Lorenzen,DET,32,18,18,0,0,105.2,89,42,83,27,11,5,7,0,0,0,3.58,1.1,0.94106
Steven Matz,STL,32,25,17,0,0,105,108,45,98,32,11,4,7,0,0,0,3.86,1.33,0.94286
Michael King,NYY,28,49,9,0,0,104.2,88,32,127,32,10,4,8,6,4,8,2.75,1.15,0.86372
Taj Bradley,TB,23,23,21,0,0,104.2,106,65,129,39,23,5,8,0,0,0,5.59,1.39,1.98656
Kenta Maeda,MIN,35,21,20,0,0,104.1,94,49,117,28,17,6,8,0,0,0,4.23,1.17,1.46974
Paul Blackburn,OAK,30,21,20,0,0,103.2,117,51,104,43,11,4,7,0,1,0,4.43,1.54,0.95930
Reese Olson,DET,24,21,18,0,0,103.2,83,46,103,33,14,5,7,0,0,1,3.99,1.12,1.22093
Tony Gonsolin,LAD,29,20,20,0,0,103,86,57,82,40,19,8,5,0,0,0,4.98,1.22,1.66019
Chris Sale,BOS,34,20,20,0,0,102.2,87,49,125,29,15,6,5,0,0,0,4.3,1.13,1.32094
Adam Wainwright,STL,42,21,21,0,0,101,151,83,55,41,20,5,11,0,0,0,7.4,1.9,1.78218
Cal Quantrill,CLE,29,19,19,0,0,99.2,111,58,58,35,11,4,7,0,0,0,5.24,1.46,0.99798
Edward Cabrera,MIA,25,22,20,0,0,99.2,78,47,118,66,11,7,7,0,0,0,4.24,1.44,0.99798
Anthony DeSclafani,SF,33,19,18,0,0,99.2,105,54,79,20,15,4,8,0,0,0,4.88,1.25,1.36089
Cristopher Sanchez,PHI,27,19,18,0,0,99.1,88,38,96,16,16,3,5,0,0,0,3.44,1.05,1.45308
Alex Wood,SF,33,29,12,0,0,97.2,98,47,74,42,9,5,5,0,0,1,4.33,1.43,0.83333
Joe Musgrove,SD,31,17,17,0,0,97.1,90,33,97,21,10,10,3,0,0,0,3.05,1.14,0.92688
Luke Weaver,CIN,30,21,21,0,0,97,125,74,85,34,24,2,4,0,0,0,6.87,1.64,2.22680
James Paxton,BOS,35,19,19,0,0,96,93,48,101,33,18,7,5,0,0,0,4.5,1.31,1.68750
Brandon Pfaadt,ARI,25,19,18,0,0,96,109,61,94,26,22,3,9,0,0,0,5.72,1.41,2.06250
Xzavion Curry,CLE,25,41,9,0,0,95,98,43,67,30,12,3,4,0,0,0,4.07,1.35,1.13684
Justin Verlander,NYM,41,16,16,0,0,94.1,77,33,81,31,9,6,5,0,0,0,3.15,1.14,0.86079
Eury Perez,MIA,20,19,19,0,0,91.1,72,32,108,31,15,5,6,0,0,0,3.15,1.13,1.48189
Jhony Brito,NYY,26,25,13,0,0,90.1,82,43,72,28,14,9,7,1,0,0,4.28,1.22,1.39845
Carlos Carrasco,NYM,37,20,20,0,0,90,115,68,66,38,18,3,8,0,0,0,6.8,1.7,1.80000
Jake Bird,COL,28,70,3,0,0,89.1,94,43,77,27,6,3,3,0,11,13,4.33,1.35,0.60606
Hayden Wesneski,CHC,26,34,11,0,0,89.1,82,46,83,32,20,3,5,0,1,2,4.63,1.28,2.02020
Luis Severino,NYY,30,19,18,0,0,89.1,113,66,79,34,23,4,8,0,0,0,6.65,1.65,2.32323
Ross Stripling,SF,34,22,11,0,0,89,104,53,70,16,20,0,5,0,0,0,5.36,1.35,2.02247
Tommy Henry,ARI,26,17,16,0,0,89,86,41,64,35,12,5,4,0,0,0,4.15,1.36,1.21348
Ben Lively,CIN,32,19,12,0,0,88.2,96,53,79,25,20,4,7,0,0,0,5.38,1.36,2.04082
Matt Strahm,PHI,32,56,10,0,0,87.2,68,32,108,21,11,9,5,2,3,11,3.29,1.02,1.13532
Bryan Woo,SEA,24,18,18,0,0,87.2,75,41,93,31,13,4,5,0,0,0,4.21,1.21,1.34174
Alek Manoah,TOR,26,19,19,0,0,87.1,93,57,79,59,15,3,9,0,0,0,5.87,1.74,1.54994
Connor Seabold,COL,28,27,13,0,0,87.1,116,73,67,28,19,1,7,0,0,0,7.52,1.65,1.96326
Peter Lambert,COL,26,25,11,0,0,87.1,93,52,71,28,18,3,7,0,0,0,5.36,1.39,1.85993
Zack Littell,TB,28,26,14,0,0,87,91,38,72,9,13,3,6,0,0,0,3.93,1.15,1.34483
Luis Ortiz,PIT,25,18,15,0,0,86.2,99,46,59,48,13,5,5,0,0,0,4.78,1.7,1.35731
Jakob Junis,SF,31,40,4,0,0,86,90,37,96,21,12,4,3,1,0,2,3.87,1.29,1.25581
Tyler Holton,DET,27,59,1,0,0,85.1,56,20,74,18,9,3,2,1,1,16,2.11,0.87,0.95182
Tristan Beck,SF,27,33,3,0,0,85,83,37,68,21,10,3,3,2,1,2,3.92,1.22,1.05882
Jesse Scholtens,CWS,29,26,11,0,0,85,100,50,58,30,15,1,9,1,0,1,5.29,1.53,1.58824
Josh Winckowski,BOS,25,60,1,0,0,84.1,89,27,82,31,9,4,4,3,4,18,2.88,1.42,0.96314
Touki Toussaint,CWS,27,19,15,0,0,83.1,66,46,83,52,10,4,6,0,0,0,4.97,1.42,1.08303
Zach Davies,ARI,31,18,18,0,0,82.1,98,64,72,39,10,2,5,0,0,0,7,1.66,1.09622
Jaime Barria,LAA,27,34,6,0,0,82.1,91,52,62,30,20,2,6,0,2,2,5.68,1.47,2.19245
Gavin Williams,CLE,24,16,16,0,0,82,66,30,81,37,8,3,5,0,0,0,3.29,1.26,0.87805
Dakota Hudson,STL,29,18,12,0,0,81.1,88,45,45,34,9,6,3,0,0,1,4.98,1.5,0.99877
Chase Anderson,COL,36,17,17,0,0,81.1,88,52,62,32,17,1,6,0,0,0,5.75,1.48,1.88656
Tarik Skubal,DET,27,15,15,0,0,80.1,58,25,102,14,4,7,3,0,0,0,2.8,0.9,0.44944
Brandon Bielak,HOU,27,15,13,0,0,80,86,34,62,36,12,5,6,0,0,0,3.83,1.53,1.35000
Michael Tonkin,ATL,34,45,0,0,0,80,64,38,75,23,13,7,3,1,3,2,4.28,1.09,1.46250
Ty Blach,COL,33,20,13,0,0,78,104,48,50,24,15,3,3,0,0,0,5.54,1.64,1.73077
Matt Manning,DET,26,15,15,0,0,78,60,31,50,21,11,5,4,0,0,0,3.58,1.04,1.26923
Tanner Scott,MIA,29,74,0,0,0,78,53,20,104,24,3,9,5,12,4,24,2.31,0.99,0.34615
Max Fried,ATL,30,14,14,1,1,77.2,70,22,80,18,7,8,1,0,0,0,2.55,1.13,0.81606
Cole Irvin,BAL,30,24,12,0,0,77.1,78,38,68,21,11,1,4,0,0,1,4.42,1.28,1.28405
Kyle Muller,OAK,26,21,13,0,0,77,112,65,56,39,16,1,5,0,1,0,7.6,1.96,1.87013
Aaron Civale,CLE,28,13,13,0,0,77,58,20,58,22,5,5,2,0,0,0,2.34,1.04,0.58442
Bryse Wilson,MIL,26,53,0,0,0,76.2,60,22,61,22,9,6,0,3,1,5,2.58,1.07,1.06299
Jose Quintana,NYM,35,13,13,0,0,75.2,75,30,60,24,5,3,6,0,0,0,3.57,1.31,0.59840
Ian Gibaut,CIN,30,74,0,0,0,75.2,69,28,69,28,8,8,4,3,6,23,3.33,1.28,0.95745
Justin Lawrence,COL,29,69,0,0,0,75,65,31,78,36,5,4,7,11,7,11,3.72,1.35,0.60000
Buck Farmer,CIN,33,71,0,0,0,75,58,35,70,29,11,4,5,3,6,9,4.2,1.16,1.32000
Alec Marsh,KC,25,17,8,0,0,74.1,77,47,85,39,16,3,9,0,0,0,5.69,1.56,1.94332
Tyler Rogers,SF,33,68,0,0,0,74,66,25,60,19,7,4,5,2,6,30,3.04,1.15,0.85135
Yennier Cano,BAL,30,72,0,0,0,72.2,60,17,65,13,4,1,4,8,6,31,2.11,1,0.49861
Emmanuel Clase,CLE,26,75,0,0,0,72.2,68,26,64,16,4,3,9,44,12,0,3.22,1.16,0.49861
Trevor Richards,TOR,30,56,3,0,0,72.2,63,40,105,35,13,2,1,0,2,11,4.95,1.35,1.62050
Julian Merryweather,CHC,32,69,0,0,0,72,58,27,98,36,8,5,1,2,2,17,3.38,1.31,1.00000
Bryan Abreu,HOU,26,72,0,0,0,72,44,14,100,31,6,3,2,5,4,24,1.75,1.04,0.75000
Garrett Whitlock,BOS,27,22,10,0,0,71.2,82,41,72,13,13,5,5,1,1,3,5.15,1.33,1.64326
Cole Ragans,KC,26,12,12,0,0,71.2,50,21,89,27,3,5,2,0,0,0,2.64,1.07,0.37921
Julio Teheran,MIL,33,14,11,0,0,71.2,68,35,50,13,13,3,5,0,0,0,4.4,1.13,1.64326
Matthew Boyd,DET,33,15,15,0,0,71,69,43,73,25,11,5,5,0,0,0,5.45,1.32,1.39437
Joel Payamps,MIL,29,69,0,0,0,70.2,57,20,77,17,8,7,5,3,3,28,2.55,1.05,1.02564
Matt Brash,SEA,25,78,0,0,0,70.2,65,24,107,29,3,9,4,4,5,25,3.06,1.33,0.38462
Bryan Hoeing,MIA,27,33,7,0,0,70.2,71,43,53,25,13,2,3,0,0,1,5.48,1.36,1.66667
Scott McGough,ARI,34,63,1,0,0,70.1,60,37,86,30,14,2,7,9,5,14,4.73,1.28,1.79743
Carlos Hernandez,KC,27,67,4,0,0,70,62,41,77,31,10,1,10,4,6,17,5.27,1.33,1.28571
Emilio Pagan,MIN,32,66,1,0,0,69.1,45,23,65,21,5,5,2,1,5,9,2.99,0.95,0.65123
Brent Suter,COL,34,57,2,0,0,69.1,65,26,55,25,3,4,3,0,3,7,3.38,1.3,0.39074
Kyle Finnegan,WAS,32,67,0,0,0,69.1,66,29,63,24,11,7,5,28,8,8,3.76,1.3,1.43271
Jason Foley,DET,28,70,0,0,0,69,65,20,55,15,2,3,3,7,2,28,2.61,1.16,0.26087
Craig Kimbrel,PHI,35,71,0,0,0,69,44,25,94,28,10,8,6,23,5,7,3.26,1.04,1.30435
Justin Topa,SEA,33,75,0,0,0,69,61,20,61,18,4,5,4,3,2,24,2.61,1.14,0.52174
Michael Grove,LAD,27,18,12,0,0,69,83,47,73,19,12,2,3,0,0,1,6.13,1.48,1.56522
Trevor Stephan,CLE,28,71,0,0,0,68.2,63,31,75,26,6,7,7,2,8,30,4.06,1.3,0.79179
Roansy Contreras,PIT,24,19,11,0,0,68.1,75,50,55,32,11,3,7,1,0,0,6.59,1.57,1.45374
Hector Neris,HOU,34,71,0,0,0,68.1,41,13,77,31,7,6,3,2,1,31,1.71,1.05,0.92511
Justin Verlander,HOU,41,11,11,0,0,68,62,25,63,14,9,7,3,0,0,0,3.31,1.12,1.19118
Louie Varland,MIN,26,17,10,0,0,68,66,35,71,17,16,4,3,0,0,2,4.63,1.22,2.11765
Andre Pallante,STL,25,62,0,0,0,68,76,36,43,30,6,4,1,0,5,13,4.76,1.56,0.79412
Camilo Doval,SF,26,69,0,0,0,67.2,51,22,87,26,3,6,6,39,8,0,2.93,1.14,0.40179
Jordan Montgomery,TEX,31,11,11,0,0,67.2,61,21,58,13,6,4,2,0,0,0,2.79,1.09,0.80357
Rafael Montero,HOU,33,68,0,0,0,67.1,74,38,79,29,11,3,3,1,5,10,5.08,1.53,1.47541
Eli Morgan,CLE,27,61,0,0,0,67.1,73,30,75,24,9,5,2,1,2,7,4.01,1.44,1.20715
Brusdar Graterol,LAD,25,68,1,0,0,67.1,53,9,48,12,3,4,2,7,1,19,1.2,0.97,0.40238
David Bednar,PIT,29,66,0,0,0,67.1,53,15,80,21,3,3,3,39,3,0,2,1.1,0.40238
Alexis Diaz,CIN,27,71,0,0,0,67.1,44,23,86,36,4,9,6,37,3,2,3.07,1.19,0.53651
Kevin Kelly,TB,26,57,0,0,0,67,53,23,56,15,2,5,2,1,1,11,3.09,1.01,0.26866
Brandon Woodruff,MIL,31,11,11,1,1,67,40,17,74,15,9,5,1,0,0,0,2.28,0.82,1.20896
Erik Swanson,TOR,30,69,0,0,0,66.2,52,22,75,21,8,4,2,4,2,29,2.97,1.1,1.08761
Gregory Santos,CWS,24,60,0,0,0,66.1,69,25,66,17,2,2,2,5,4,6,3.39,1.3,0.27231
Zack Thompson,STL,26,25,9,0,0,66.1,69,33,72,25,8,5,7,0,1,1,4.48,1.42,1.08926
Phil Maton,HOU,31,68,0,0,0,66,49,22,74,25,6,4,3,1,1,10,3,1.12,0.81818
Alex Lange,DET,28,67,0,0,0,66,43,27,79,45,6,7,5,26,6,6,3.68,1.33,0.81818
Yimi Garcia,TOR,33,73,0,0,0,66,67,30,79,15,8,3,4,3,4,19,4.09,1.24,1.09091
Fernando Cruz,CIN,34,58,2,0,0,66,52,36,98,28,6,1,2,0,0,8,4.91,1.21,0.81818
Enyel De Los Santos,CLE,28,70,0,0,0,65.2,50,24,62,25,4,5,2,0,3,16,3.29,1.14,0.55215
Griffin Jax,MIN,29,71,0,0,0,65.1,58,28,68,19,5,6,10,4,7,23,3.86,1.18,0.69124
Ryan Pressly,HOU,35,65,0,0,0,65.1,54,26,74,16,8,4,5,31,6,0,3.58,1.07,1.10599
Kevin Ginkel,ARI,30,60,0,0,0,65.1,41,18,70,23,3,9,1,4,2,8,2.48,0.98,0.41475
Miguel Castro,ARI,29,75,0,0,0,64.2,51,31,60,25,8,6,6,7,4,13,4.31,1.18,1.12150
A.J. Minter,ATL,30,70,0,0,0,64.2,56,27,82,21,6,3,6,10,3,21,3.76,1.19,0.84112
Alex Faedo,DET,28,15,12,0,0,64.2,48,32,58,20,12,2,5,0,0,1,4.45,1.05,1.68224
Mike Baumann,BAL,28,60,0,0,0,64.2,52,27,61,33,7,10,1,0,3,6,3.76,1.31,0.98131
Mark Leiter,CHC,33,69,0,0,0,64.1,48,25,77,24,7,1,3,4,4,28,3.5,1.12,0.98284
Carlos Rodon,NYY,31,14,14,0,0,64.1,65,49,64,28,15,3,8,0,0,0,6.85,1.45,2.10608
Hoby Milner,MIL,33,73,0,0,0,64.1,49,13,59,13,5,2,1,0,3,17,1.82,0.96,0.70203
Lance Lynn,LAD,36,11,11,0,0,64,59,31,47,22,16,7,2,0,0,0,4.36,1.27,2.25000
Adbert Alzolay,CHC,29,58,0,0,0,64,52,19,67,13,5,2,5,22,3,6,2.67,1.02,0.70313
Nestor Cortes,NYY,29,12,12,0,0,63.1,59,35,67,20,11,5,2,0,0,0,4.97,1.25,1.56894
Hogan Harris,OAK,27,14,6,0,0,63,67,50,56,28,10,3,6,0,0,0,7.14,1.51,1.42857
Clay Holmes,NYY,31,66,0,0,0,63,51,20,71,23,2,4,4,24,3,5,2.86,1.17,0.28571
Jose Urquidy,HOU,28,16,10,0,0,63,65,37,45,25,11,3,3,1,0,0,5.29,1.43,1.57143
Yonny Chirinos,TB,30,15,4,0,0,62.2,58,28,31,20,10,4,4,0,0,1,4.02,1.24,1.44695
Jhoan Duran,MIN,26,59,0,0,0,62.1,46,17,84,25,6,3,6,27,5,1,2.45,1.14,0.86957
Carlos Estevez,LAA,31,63,0,0,0,62.1,62,27,78,31,7,5,5,31,4,2,3.9,1.49,1.01449
Matthew Liberatore,STL,24,22,11,0,0,61.2,66,36,46,25,5,3,6,0,0,3,5.25,1.48,0.73529
Adam Ottavino,NYM,38,66,0,0,0,61.2,46,22,62,29,7,1,7,12,3,12,3.21,1.22,1.02941
Ryan Walker,SF,28,49,13,0,0,61.1,61,22,78,24,8,5,3,1,1,2,3.23,1.39,1.17840
Elvis Peguero,MIL,27,59,0,0,0,61.1,49,23,54,26,4,4,5,1,5,21,3.38,1.22,0.58920
Evan Phillips,LAD,29,62,0,0,0,61.1,38,14,66,13,6,2,4,24,3,6,2.05,0.83,0.88380
James Kaprielian,OAK,30,14,11,0,0,61,66,43,57,31,9,2,6,0,1,0,6.34,1.59,1.32787
Drew VerHagen,STL,33,60,0,0,0,61,52,27,60,26,9,5,1,0,1,14,3.98,1.28,1.32787
Lucas Sims,CIN,29,67,0,0,0,61,33,21,72,39,5,7,3,3,5,25,3.1,1.18,0.73770
Felix Bautista,BAL,28,56,0,0,0,61,30,10,110,26,4,8,2,33,6,1,1.48,0.92,0.59016
Tanner Banks,CWS,32,32,3,0,0,61,59,30,51,16,10,1,4,1,1,1,4.43,1.23,1.47541
Hunter Harvey,WAS,29,57,0,0,0,60.2,44,19,67,13,7,4,4,10,5,19,2.82,0.94,1.04651
Colin Poche,TB,30,66,0,0,0,60.2,42,15,61,24,4,12,3,1,4,22,2.23,1.09,0.59801
Caleb Ferguson,LAD,27,68,7,0,0,60.1,64,23,70,23,4,7,4,3,5,17,3.43,1.44,0.59900
Gregory Soto,PHI,29,69,0,0,0,60.1,47,31,65,22,6,3,4,3,3,24,4.62,1.14,0.89850
Chris Flexen,COL,29,12,12,0,0,60.1,74,42,45,19,14,2,4,0,0,0,6.27,1.54,2.09651
Kirby Yates,ATL,37,61,0,0,0,60.1,35,22,80,37,9,7,2,5,3,9,3.28,1.19,1.34775
Emmet Sheehan,LAD,24,13,11,0,0,60.1,46,33,64,26,11,4,1,1,0,0,4.92,1.19,1.64725
Nick Sandlin,CLE,27,61,0,0,0,60,38,25,66,24,12,5,5,0,1,10,3.75,1.03,1.80000
Luis Garcia,SD,37,61,0,0,0,59.2,59,27,53,24,6,2,3,0,3,10,4.07,1.39,0.91216
Brock Burke,TEX,27,53,0,0,0,59.2,64,29,52,9,13,5,3,0,2,12,4.37,1.22,1.97635
Jose Cisnero,DET,34,63,0,0,0,59.1,63,35,70,25,10,3,4,2,2,14,5.31,1.48,1.52284
Jordan Romano,TOR,30,59,0,0,0,59,48,19,72,24,6,5,7,36,4,2,2.9,1.22,0.91525
Taylor Clarke,KC,30,58,2,0,0,59,71,39,65,24,12,3,6,3,3,12,5.95,1.61,1.83051
Albert Abreu,NYY,28,45,0,0,0,59,52,31,61,35,9,2,2,0,0,3,4.73,1.47,1.37288
Collin McHugh,ATL,36,41,1,0,0,58.2,70,28,47,22,5,4,1,0,1,7,4.3,1.57,0.77320
Steven Okert,MIA,32,64,2,0,0,58.2,50,29,73,24,9,3,2,0,3,12,4.45,1.26,1.39175
Devin Williams,MIL,29,61,0,0,0,58.2,26,10,87,28,4,8,3,36,4,0,1.53,0.92,0.61856
Huascar Brazoban,MIA,34,50,0,0,0,58.2,53,27,65,31,5,5,2,0,3,13,4.14,1.43,0.77320
Aaron Bummer,CWS,30,61,0,0,0,58.1,53,44,78,36,4,5,5,0,3,15,6.79,1.53,0.61962
Dauri Moreta,PIT,27,55,0,0,0,58,39,24,76,24,4,5,2,1,2,5,3.72,1.09,0.62069
Ian Hamilton,NYY,28,39,3,0,0,58,45,17,69,26,2,3,2,2,0,5,2.64,1.22,0.31034
Andrew Nardi,MIA,25,63,0,0,0,57.1,45,17,73,21,7,8,1,3,1,17,2.67,1.15,1.10333
Will Smith,TEX,34,60,0,0,0,57.1,44,28,55,17,5,2,7,22,5,8,4.4,1.06,0.78809
Michael Fulmer,CHC,31,58,1,0,0,57,48,28,65,28,7,3,5,2,3,11,4.42,1.33,1.10526
Jose Leclerc,TEX,30,57,0,0,0,57,37,17,67,28,5,0,2,4,5,8,2.68,1.14,0.78947
A.J. Puk,MIA,28,58,0,0,0,56.2,54,25,78,13,10,7,5,15,8,2,3.97,1.18,1.60142
Josh Hader,SD,29,61,0,0,0,56.1,32,8,85,30,3,2,3,33,5,0,1.28,1.1,0.48128
Joe Jimenez,ATL,29,59,0,0,0,56.1,51,19,73,14,9,0,3,0,3,13,3.04,1.15,1.44385
Drew Smith,NYM,30,62,0,0,0,56.1,50,26,60,29,7,4,6,3,2,12,4.15,1.4,1.12299
Mason Englert,DET,24,31,1,0,0,56,67,34,41,17,12,4,3,0,3,3,5.46,1.5,1.92857
Colin Holderman,PIT,28,58,0,0,0,56,55,24,58,20,4,0,3,2,4,27,3.86,1.34,0.64286
Cody Bradford,TEX,26,20,8,0,0,56,56,33,51,12,11,4,3,0,0,0,5.3,1.21,1.76786
Kyle Nelson,ARI,27,68,2,0,0,56,59,26,67,14,12,7,4,0,4,11,4.18,1.3,1.92857
Raisel Iglesias,ATL,34,58,0,0,0,55.2,51,17,68,15,7,5,4,33,4,0,2.75,1.19,1.14130
Noah Syndergaard,LAD,31,12,12,0,0,55.1,71,44,38,9,12,1,4,0,0,0,7.16,1.45,1.96007
Corey Kluber,BOS,37,15,9,0,0,55,69,43,42,21,17,3,6,1,0,0,7.04,1.64,2.78182
Derek Law,CIN,33,54,3,0,0,55,50,22,45,26,6,4,6,2,1,3,3.6,1.38,0.98182
Lucas Erceg,OAK,28,50,0,0,0,55,51,29,68,36,1,4,4,0,2,11,4.75,1.58,0.16364
Giovanny Gallegos,STL,32,56,0,0,0,55,54,27,59,12,11,2,4,10,6,20,4.42,1.2,1.80000
Adrian Martinez,OAK,27,22,1,0,0,55,59,29,47,19,8,0,2,0,0,0,4.75,1.42,1.30909
Gabe Speier,SEA,28,69,0,0,0,54.2,47,23,64,11,7,2,2,1,0,17,3.79,1.06,1.16236
Brooks Raley,NYM,35,66,0,0,0,54.2,44,17,61,25,4,1,2,3,3,25,2.8,1.26,0.66421
Jordan Weems,WAS,31,51,0,0,0,54.2,38,22,60,28,9,5,1,0,3,7,3.62,1.21,1.49446
Jason Adam,TB,32,56,0,0,0,54.1,35,18,69,20,7,4,2,12,6,11,2.98,1.01,1.16451
Mason Thompson,WAS,26,51,0,0,0,54,62,33,44,22,4,4,4,1,3,10,5.5,1.56,0.66667
Wandy Peralta,NYY,32,63,0,0,0,54,36,17,51,30,7,4,2,4,3,18,2.83,1.22,1.16667
Chris Stratton,STL,33,42,0,0,0,53.2,45,25,59,17,4,1,1,1,1,4,4.19,1.16,0.67669
Alex Young,CIN,30,63,0,0,0,53.2,53,23,50,20,10,4,2,1,3,13,3.86,1.36,1.69173
Cionel Perez,BAL,27,65,0,0,0,53.1,56,21,44,27,2,4,2,3,0,11,3.54,1.56,0.33898
Tim Mayza,TOR,32,69,0,0,0,53.1,50,9,53,15,2,3,1,1,2,22,1.52,1.22,0.33898
Steven Wilson,SD,29,52,0,0,0,53,35,23,57,27,7,1,2,0,2,22,3.91,1.17,1.18868
Jared Shuster,ATL,25,11,11,0,0,52.2,53,34,30,26,7,4,3,0,0,0,5.81,1.5,1.20690
Chase Silseth,LAA,23,16,8,0,0,52.1,41,23,56,26,9,4,1,0,1,1,3.96,1.28,1.55470
Johnny Cueto,MIA,38,13,10,0,0,52.1,51,35,39,15,17,1,4,0,0,0,6.02,1.26,2.93666
Daniel Lynch,KC,27,9,9,0,0,52.1,50,27,34,16,9,3,4,0,0,0,4.64,1.26,1.55470
Josh Sborz,TEX,30,44,0,0,0,52.1,43,32,66,17,8,6,7,0,4,14,5.5,1.15,1.38196
Sam Hentges,CLE,27,56,0,0,0,52.1,53,21,56,18,2,3,2,0,2,15,3.61,1.36,0.34549
Jeff Hoffman,PHI,31,54,0,0,0,52.1,29,14,69,19,3,5,2,1,2,11,2.41,0.92,0.51823
Shawn Armstrong,TB,33,39,6,0,0,52,36,8,54,11,2,1,0,0,2,6,1.38,0.9,0.34615
Hyun Jin Ryu,TOR,37,11,11,0,0,52,53,20,38,14,9,3,3,0,0,0,3.46,1.29,1.55769
Ronel Blanco,HOU,30,17,7,0,0,52,49,26,52,28,12,2,1,0,0,0,4.5,1.48,2.07692
George Soriano,MIA,25,26,1,0,0,52,46,22,52,23,6,0,0,1,0,0,3.81,1.33,1.03846
Josh Fleming,TB,27,12,3,0,0,51.2,56,27,25,19,9,2,0,0,0,0,4.7,1.45,1.58203
Joan Adon,WAS,25,12,10,0,0,51.2,60,37,48,24,8,2,4,0,0,0,6.45,1.63,1.40625
Taylor Rogers,SF,33,60,0,0,0,51.2,39,22,64,25,6,6,4,2,0,12,3.83,1.24,1.05469
Danny Coulombe,BAL,34,61,0,0,0,51.1,45,16,58,12,4,5,3,2,3,21,2.81,1.11,0.70450
Chris Martin,BOS,37,55,0,0,0,51.1,45,6,46,8,2,4,1,3,1,23,1.05,1.03,0.35225
Tom Cosgrove,SD,27,54,0,0,0,51.1,31,10,44,19,3,1,2,1,0,7,1.75,0.97,0.52838
Ryan Yarbrough,KC,32,14,7,0,0,51,52,24,29,9,5,4,5,0,1,1,4.24,1.2,0.88235
Ryne Stanek,HOU,32,55,0,0,0,50.2,42,23,51,21,8,3,1,0,1,3,4.09,1.24,1.43426
Brennan Bernardino,BOS,32,55,6,0,0,50.2,48,18,58,18,4,2,1,0,0,4,3.2,1.3,0.71713
Osvaldo Bido,PIT,28,16,9,0,0,50.2,55,33,48,21,4,2,5,0,0,0,5.86,1.5,0.71713
Jose Hernandez,PIT,26,50,0,0,0,50.2,47,28,62,22,9,1,3,0,2,4,4.97,1.36,1.61355
Pedro Avila,SD,27,14,6,0,0,50.1,43,18,54,25,3,2,2,0,0,0,3.22,1.35,0.53892
Seranthony Dominguez,PHI,29,57,0,0,0,50,48,21,48,22,7,5,5,2,7,14,3.78,1.4,1.26000
Andres Machado,WAS,30,44,0,0,0,50,53,29,43,13,12,4,1,0,2,4,5.22,1.32,2.16000
Marco Gonzales,SEA,32,10,10,0,0,50,55,29,34,18,5,4,1,0,0,0,5.22,1.46,0.90000
Quinn Priester,PIT,23,10,8,0,0,50,58,43,36,27,12,3,3,0,0,0,7.74,1.7,2.16000
Alex Vesia,LAD,27,56,1,0,0,49.2,52,24,64,17,7,2,5,1,1,9,4.35,1.39,1.28049
Daniel Bard,COL,38,50,0,0,0,49.1,35,25,47,49,5,4,2,1,2,6,4.56,1.7,0.91650
Shintaro Fujinami,OAK,29,34,7,0,0,49.1,52,47,51,30,6,5,8,0,1,3,8.57,1.66,1.09980
Andres Munoz,SEA,25,52,0,0,0,49,40,16,67,22,2,4,7,13,3,14,2.94,1.27,0.36735
Aaron Loup,LAA,36,55,0,0,0,48.2,65,33,45,20,6,2,3,1,2,9,6.1,1.75,1.12033
Scott Alexander,SF,34,55,8,0,0,48.1,55,25,31,11,2,7,3,1,2,8,4.66,1.37,0.37422
Austin Pruitt,OAK,34,38,6,0,0,48.1,44,16,30,12,5,2,6,0,1,4,2.98,1.16,0.93555
Will Vest,DET,28,48,4,0,0,48.1,40,16,56,13,3,2,1,2,3,11,2.98,1.1,0.56133
Dustin May,LAD,26,9,9,0,0,48,29,14,34,16,1,4,1,0,0,0,2.63,0.94,0.18750
Yency Almonte,LAD,29,49,0,0,0,48,43,27,49,24,6,3,2,0,2,9,5.06,1.4,1.12500
Jake Woodford,STL,27,15,8,0,0,47.2,61,33,29,22,11,2,3,0,0,0,6.23,1.74,2.09746
Tayler Saucedo,SEA,30,52,0,0,0,47.2,41,19,43,23,2,3,2,1,1,3,3.59,1.34,0.38136
Chris Murphy,BOS,25,20,0,0,0,47.2,50,26,49,17,5,1,2,1,0,0,4.91,1.41,0.95339
Ron Marinaccio,NYY,28,45,0,0,0,47.1,35,21,56,27,6,4,5,2,3,7,3.99,1.31,1.14650
Michael Lorenzen,PHI,32,11,7,1,1,47.1,49,29,28,20,9,4,2,1,0,0,5.51,1.46,1.71975
Trevor May,OAK,34,49,0,0,0,46.2,35,17,40,29,4,4,4,21,3,1,3.28,1.37,0.77922
Brent Honeywell,SD,28,36,0,0,0,46.2,44,21,42,20,8,2,4,0,2,3,4.05,1.37,1.55844
Eric Lauer,MIL,28,10,9,0,0,46.2,54,34,43,24,16,4,6,0,0,0,6.56,1.67,3.11688
Joey Lucchesi,NYM,30,9,9,0,0,46.2,44,15,32,17,4,4,0,0,0,0,2.89,1.31,0.77922
John Schreiber,BOS,30,46,2,0,0,46.2,41,20,53,25,6,2,1,1,2,11,3.86,1.41,1.16883
Bryan Shaw,CWS,36,38,0,0,0,45.2,39,21,40,17,3,0,0,4,1,4,4.14,1.23,0.59735
Jake Diekman,TB,37,50,0,0,0,45.1,26,11,53,25,2,0,1,0,1,6,2.18,1.13,0.39911
Brad Keller,KC,28,11,9,0,0,45.1,42,23,31,45,3,3,4,0,0,0,4.57,1.92,0.59867
Aaron Civale,TB,28,10,10,0,0,45.1,51,27,58,11,7,2,3,0,0,0,5.36,1.37,1.39690
Pete Fairbanks,TB,30,49,0,0,0,45.1,26,13,68,20,3,2,4,25,4,2,2.58,1.01,0.59867
Bryan Baker,BAL,29,46,0,0,0,45,33,18,51,24,4,4,3,0,3,11,3.6,1.27,0.80000
Sam Long,OAK,28,40,1,0,0,45,49,28,32,21,5,0,1,2,0,5,5.6,1.56,1.00000
Max Scherzer,TEX,39,8,8,0,0,45,28,16,53,15,5,4,2,0,0,0,3.2,0.96,1.00000
Kenley Jansen,BOS,36,51,0,0,0,44.2,40,18,52,17,5,3,6,29,4,0,3.63,1.28,1.01810
Drew Rasmussen,TB,28,8,8,0,0,44.2,36,13,47,11,2,4,2,0,0,0,2.62,1.05,0.40724
Ryan Weathers,SD,24,12,10,0,0,44.2,55,31,29,17,9,1,6,0,0,1,6.25,1.61,1.83258
Tim Hill,SD,34,48,0,0,0,44.1,59,27,26,14,7,1,4,0,3,9,5.48,1.65,1.42857
Matt Moore,LAA,34,41,0,0,0,44,33,13,49,12,6,4,1,0,2,20,2.66,1.02,1.22727
Kendall Graveman,CWS,33,45,0,0,0,44,33,17,42,20,6,3,4,8,4,8,3.48,1.2,1.22727
Tyler Alexander,DET,29,25,1,0,0,44,44,22,44,5,8,2,1,0,0,1,4.5,1.11,1.63636
David Robertson,NYM,38,40,0,0,0,44,31,10,48,13,5,4,2,14,3,7,2.05,1,1.02273
Andre Jackson,PIT,27,12,7,0,0,43.2,30,21,41,19,6,1,3,0,0,1,4.33,1.12,1.25000
Ryan Feltner,COL,27,10,10,0,0,43.1,45,28,38,28,2,2,4,0,0,0,5.82,1.68,0.41763
Paul Sewald,SEA,33,45,0,0,0,43,30,14,60,14,5,3,1,21,3,0,2.93,1.02,1.04651
Seth Martinez,HOU,29,35,0,0,0,43,45,25,45,19,5,2,3,1,0,2,5.23,1.49,1.04651
Angel Zerpa,KC,24,15,3,0,0,42.2,46,23,36,8,7,3,3,0,1,2,4.85,1.27,1.49289
Nate Pearson,TOR,27,35,0,0,0,42.2,36,23,43,18,7,5,2,1,2,3,4.85,1.27,1.49289
Jalen Beeks,TB,30,30,8,0,0,42.1,42,28,47,21,4,2,3,1,1,2,5.95,1.49,0.85511
JT Chargois,MIA,33,46,5,0,0,42.1,35,17,35,18,3,1,0,1,3,4,3.61,1.25,0.64133
Jovani Moran,MIN,26,43,0,0,0,42.1,35,25,48,27,3,2,2,0,1,9,5.31,1.46,0.64133
Keaton Winn,SF,26,9,5,0,0,42.1,36,22,35,8,6,1,3,1,0,0,4.68,1.04,1.28266
Jose Butto,NYM,26,9,7,0,0,42,33,17,38,23,3,1,4,0,0,0,3.64,1.33,0.64286
Hunter Gaddis,CLE,25,11,7,0,0,42,41,21,24,14,6,2,1,0,0,0,4.5,1.31,1.28571
Ryan Pepiot,LAD,26,8,3,0,0,42,27,10,38,5,7,2,1,0,0,0,2.14,0.76,1.50000
Shelby Miller,LAD,33,36,1,0,0,42,19,8,42,19,3,3,0,1,0,3,1.71,0.9,0.64286
Reynaldo Lopez,CWS,30,43,0,0,0,42,33,20,52,22,7,2,5,4,5,10,4.29,1.31,1.50000
Phil Bickford,LAD,28,36,0,0,0,42,38,24,48,26,5,2,3,0,1,3,5.14,1.52,1.07143
Jose Soriano,LAA,25,38,0,0,0,42,33,17,56,23,4,1,3,0,1,15,3.64,1.33,0.85714
Chris Flexen,SEA,29,17,4,0,0,42,59,36,29,19,11,0,4,0,0,0,7.71,1.86,2.35714
Jordan Hicks,STL,27,40,0,0,0,41.2,39,17,59,24,2,1,6,8,3,6,3.67,1.51,0.43689
Jose Cuas,KC,29,45,1,0,0,41.2,46,21,52,21,6,3,0,0,2,4,4.54,1.61,1.31068
Matt Waldron,SD,27,8,6,0,0,41.1,39,20,31,12,9,1,3,0,0,0,4.35,1.23,1.97080
Jose Alvarado,PHI,28,42,0,0,0,41.1,30,8,64,18,3,0,2,10,2,11,1.74,1.16,0.65693
Chasen Shreve,DET,33,47,0,0,0,41.1,45,22,42,12,6,1,2,0,5,12,4.79,1.38,1.31387
Tommy Kahnle,NYY,34,42,0,0,0,40.2,26,12,48,19,5,1,3,2,2,14,2.66,1.11,1.11940
Nick Ramirez,NYY,34,32,0,0,0,40.2,41,12,28,9,1,1,2,1,1,2,2.66,1.23,0.22388
Jose Ruiz,ARI,29,34,1,0,0,40.2,44,20,36,17,7,2,1,0,2,1,4.43,1.5,1.56716
Brendan White,DET,25,33,2,0,0,40.2,40,23,44,15,4,2,3,0,0,1,5.09,1.35,0.89552
Drey Jameson,ARI,26,15,3,0,0,40.2,40,15,37,18,6,3,1,1,0,1,3.32,1.43,1.34328
Michael Rucker,CHC,29,35,0,0,0,40.1,39,22,40,19,6,2,1,0,0,0,4.91,1.44,1.34663
Ryan Borucki,PIT,29,38,2,0,0,40.1,26,11,33,4,4,4,0,0,0,9,2.45,0.74,0.89776
Bailey Falter,PHI,26,8,7,0,0,40.1,50,23,28,8,7,0,7,0,0,0,5.13,1.44,1.57107
Bailey Falter,PIT,26,10,7,0,0,40.1,44,25,32,12,10,2,2,0,0,0,5.58,1.39,2.24439
Dylan Floro,MIA,33,43,0,0,0,39.2,48,20,41,11,2,3,5,7,2,9,4.54,1.49,0.45918
Andrew Vasquez,PHI,30,30,0,0,0,39.2,35,10,34,14,4,2,1,0,0,0,2.27,1.24,0.91837
Yunior Marte,PHI,29,40,0,0,0,39.1,47,22,38,17,6,1,1,2,2,2,5.03,1.63,1.38107
Andrew Wantz,LAA,28,27,3,0,0,39.1,28,17,33,15,4,2,0,0,3,4,3.89,1.09,0.92072
Cory Abbott,WAS,28,22,0,0,0,39.1,48,29,40,19,9,1,2,0,0,0,6.64,1.7,2.07161
James Karinchak,CLE,28,44,0,0,0,39,24,14,52,28,6,2,5,0,2,13,3.23,1.33,1.38462
Joe Mantiply,ARI,33,35,3,0,0,39,35,20,28,9,4,2,2,0,0,1,4.62,1.13,0.92308
Pierce Johnson,COL,32,43,0,0,0,39,47,26,58,25,7,1,5,13,2,4,6,1.85,1.61538
Dylan Covey,PHI,32,28,1,0,0,39,43,16,27,16,3,1,3,0,1,1,3.69,1.51,0.69231
Ryan Brasier,LAD,36,39,0,0,0,38.2,18,3,38,10,1,2,0,1,1,9,0.7,0.72,0.23560
Matt Koch,COL,33,39,1,0,0,38.2,41,22,27,9,7,3,2,0,1,6,5.12,1.29,1.64921
Ryan Yarbrough,LAD,32,11,2,0,0,38.2,44,21,38,5,8,4,2,2,0,0,4.89,1.27,1.88482
Scott Barlow,KC,31,38,0,0,0,38.2,38,23,47,22,3,2,4,13,3,0,5.35,1.55,0.70681
John Brebbia,SF,33,40,10,0,0,38.1,31,17,47,14,6,3,5,0,1,6,3.99,1.17,1.41732
Chad Kuhl,WAS,31,16,5,0,0,38.1,47,36,31,28,8,0,4,1,1,0,8.45,1.96,1.88976
Robert Stephenson,TB,31,42,0,0,0,38.1,18,10,60,8,5,3,1,1,4,9,2.35,0.68,1.18110
Dallas Keuchel,MIN,36,10,6,0,0,37.2,45,25,25,18,3,2,1,0,0,0,5.97,1.67,0.72581
Jeff Brigham,NYM,32,37,0,0,0,37.2,26,22,42,18,9,1,3,0,2,5,5.26,1.17,2.17742
Sam Moll,OAK,32,45,1,0,0,37.2,34,19,46,19,1,0,3,1,2,6,4.54,1.41,0.24194
Jimmy Lambert,CWS,29,35,1,0,0,37.2,41,22,41,20,10,2,3,1,0,3,5.26,1.62,2.41935
Randy Vasquez,NYY,25,11,5,0,0,37.2,30,12,33,18,5,2,2,0,0,0,2.87,1.27,1.20968
Vince Velasquez,PIT,31,8,8,0,0,37.1,35,16,37,14,4,4,4,0,0,0,3.86,1.31,0.97035
JoJo Romero,STL,27,27,0,0,0,36.2,29,15,42,10,1,4,2,3,2,3,3.68,1.06,0.24862
Ryan Helsley,STL,29,33,0,0,0,36.2,22,10,52,17,1,3,4,14,5,2,2.45,1.06,0.24862
Keynan Middleton,CWS,30,39,0,0,0,36.1,33,16,47,16,7,2,2,2,2,5,3.96,1.35,1.74515
Bowden Francis,TOR,27,20,0,0,0,36.1,22,7,35,8,5,1,0,1,0,0,1.73,0.83,1.24654
Carmen Mlodzinski,PIT,25,35,1,0,0,36,28,9,34,18,3,3,3,1,1,11,2.25,1.28,0.75000
Grant Anderson,TEX,26,26,0,0,0,35.2,38,20,30,14,5,2,1,0,4,5,5.05,1.46,1.27841
Peter Strzelecki,MIL,29,36,0,0,0,35.2,32,18,37,10,3,3,5,0,1,14,4.54,1.18,0.76705
Brad Hand,COL,34,40,0,0,0,35.2,35,18,41,16,4,3,1,0,0,3,4.54,1.43,1.02273
Austin Cox,KC,27,24,3,0,0,35.2,28,18,33,17,2,0,1,1,0,5,4.54,1.26,0.51136
Jorge Lopez,MIN,31,37,0,0,0,35.1,34,20,27,11,7,4,2,3,4,6,5.09,1.27,1.79487
Nick Anderson,ATL,33,35,0,0,0,35.1,30,12,36,9,3,4,0,1,2,15,3.06,1.1,0.76923
Thaddeus Ward,WAS,27,26,0,0,0,35.1,29,25,30,28,7,0,0,0,0,0,6.37,1.61,1.79487
Grant Hartwig,NYM,26,28,0,0,0,35.1,34,19,30,15,3,5,2,0,0,2,4.84,1.39,0.76923
Karl Kauffmann,COL,26,11,3,0,0,35,42,32,16,16,5,2,5,0,0,0,8.23,1.66,1.28571
Beau Brieske,DET,25,25,1,0,0,35,36,14,31,12,4,2,3,2,0,4,3.6,1.37,1.02857
Peyton Battenfield,CLE,26,7,6,0,0,34.2,34,20,27,12,7,0,5,0,0,0,5.19,1.33,1.84211
Jordan Wicks,CHC,24,7,7,0,0,34.2,33,17,24,11,5,4,1,0,0,0,4.41,1.27,1.31579
Josh Winder,MIN,27,19,0,0,0,34.2,35,16,28,14,3,2,1,1,0,1,4.15,1.41,0.78947
Kyle Harrison,SF,22,7,7,0,0,34.2,29,16,35,11,8,1,1,0,0,0,4.15,1.15,2.10526
Jesse Chavez,ATL,40,36,1,0,0,34.2,26,6,39,12,2,1,0,1,2,13,1.56,1.1,0.52632
Jack Flaherty,BAL,28,9,7,0,0,34.2,46,26,42,12,7,1,3,0,0,1,6.75,1.67,1.84211
Trevor Megill,MIL,30,31,2,0,0,34.2,35,14,52,12,2,1,0,0,1,4,3.63,1.36,0.52632
Austin Voth,BAL,31,25,0,0,0,34.2,39,20,34,15,6,1,2,0,1,5,5.19,1.56,1.57895
Andrew Chafin,ARI,33,43,0,0,0,34.1,31,16,49,18,3,2,3,8,4,12,4.19,1.43,0.79179
Nick Lodolo,CIN,26,7,7,0,0,34.1,50,24,47,10,10,2,1,0,0,0,6.29,1.75,2.63930
Yohan Ramirez,PIT,28,26,0,0,0,34.1,34,14,31,14,3,1,0,0,1,3,3.67,1.4,0.79179
Dylan Dodd,ATL,25,7,7,0,0,34.1,53,29,15,12,9,2,2,0,0,0,7.6,1.89,2.37537
Jose Ferrer,WAS,24,39,0,0,0,34,37,19,25,13,4,3,0,0,1,5,5.03,1.47,1.05882
Gavin Hollowell,COL,26,26,0,0,0,33.2,31,22,32,18,8,2,0,1,1,2,5.88,1.46,2.16867
Victor Gonzalez,LAD,28,34,1,0,0,33.2,27,15,30,10,2,3,3,0,0,4,4.01,1.1,0.54217
Jose Suarez,LAA,26,11,7,0,0,33.2,46,31,28,20,10,1,3,0,0,0,8.29,1.96,2.71084
Drew Rom,STL,24,8,8,0,0,33.2,51,30,32,19,7,1,4,0,0,0,8.02,2.08,1.89759
Chris Devenski,LAA,33,29,0,0,0,33.2,31,19,33,9,5,3,2,0,3,10,5.08,1.19,1.35542
Erasmo Ramirez,TB,33,15,2,0,0,33.1,46,24,30,7,7,1,0,0,0,0,6.48,1.59,1.90332
Luke Jackson,SF,32,33,0,0,0,33.1,26,11,43,15,3,2,2,0,2,4,2.97,1.23,0.81571
Noah Syndergaard,CLE,31,6,6,0,0,33.1,33,20,18,10,10,1,2,0,0,0,5.4,1.29,2.71903
Mason Miller,OAK,25,10,6,0,0,33.1,24,14,38,16,2,0,3,0,0,1,3.78,1.2,0.54381
Cooper Criswell,TB,27,10,0,0,0,33,40,21,27,11,6,1,1,0,0,0,5.73,1.55,1.63636
Kenny Rosenberg,LAA,28,7,3,0,0,33,35,14,29,14,3,2,2,0,0,0,3.82,1.48,0.81818
Lucas Giolito,LAA,29,6,6,0,0,32.2,33,25,34,15,10,1,5,0,0,0,6.89,1.47,2.79503
Jimmy Cordero,NYY,32,31,1,0,0,32.2,25,14,34,10,2,3,2,0,1,8,3.86,1.07,0.55901
Michael Soroka,ATL,26,7,6,0,0,32.1,36,23,29,12,9,2,2,0,0,0,6.4,1.48,2.52336
Allan Winans,ATL,28,6,6,0,0,32.1,37,19,34,8,5,1,2,0,0,0,5.29,1.39,1.40187
Genesis Cabrera,STL,27,32,0,0,0,32,32,18,38,18,6,1,1,0,2,4,5.06,1.56,1.68750
Tucker Davidson,LAA,28,18,0,0,0,31.2,44,23,31,11,2,1,1,2,0,0,6.54,1.74,0.57692
Jonathan Hernandez,TEX,27,33,0,0,0,31.2,35,19,34,15,4,1,2,0,4,10,5.4,1.58,1.15385
Carl Edwards,WAS,32,32,0,0,0,31.2,31,13,24,17,1,1,3,2,2,13,3.69,1.52,0.28846
Robert Garcia,WAS,27,24,0,0,0,31.2,25,13,33,11,3,2,2,0,0,4,3.69,1.14,0.86538
Daniel Duarte,CIN,27,31,0,0,0,31.2,24,13,23,20,5,3,0,1,0,3,3.69,1.39,1.44231
Jacob Webb,LAA,30,29,0,0,0,31.2,23,14,34,20,6,1,1,1,1,6,3.98,1.36,1.73077
Luis Frias,ARI,25,29,0,0,0,31,30,14,26,17,3,1,0,0,1,1,4.06,1.52,0.87097
Gavin Stone,LAD,25,8,4,0,0,31,46,31,22,13,8,1,1,1,0,0,9,1.9,2.32258
Spencer Turnbull,DET,31,7,7,0,0,31,37,25,24,15,5,1,4,0,0,0,7.26,1.68,1.45161
Kyle Wright,ATL,28,9,7,0,0,31,40,24,34,17,5,1,3,0,0,0,6.97,1.84,1.45161
Dominic Leone,NYM,32,31,0,0,0,30.2,27,15,33,11,7,1,3,0,0,2,4.4,1.24,2.08609
Lucas Giolito,CLE,29,6,6,0,0,30.2,30,24,39,16,11,1,4,0,0,0,7.04,1.5,3.27815
Caleb Thielbar,MIN,37,36,0,0,0,30.2,23,11,36,6,7,3,1,0,1,14,3.23,0.95,2.08609
Richard Bleier,BOS,36,27,0,0,0,30.2,37,18,16,5,5,1,0,0,1,2,5.28,1.37,1.49007
Abner Uribe,MIL,23,32,0,0,0,30.2,16,6,39,20,0,1,0,1,1,8,1.76,1.17,0.00000
Jacob deGrom,TEX,35,6,6,0,0,30.1,19,9,45,4,2,2,0,0,0,0,2.67,0.76,0.59801
Noah Davis,COL,26,8,6,0,0,30,43,29,26,15,6,0,4,0,0,0,8.7,1.93,1.80000
Jay Jackson,TOR,36,25,0,0,0,29.2,18,7,27,9,4,3,1,0,0,1,2.12,0.91,1.23288
Shintaro Fujinami,BAL,29,30,0,0,0,29.2,21,16,32,15,3,2,0,2,3,2,4.85,1.21,0.92466
Mauricio Llovera,BOS,27,25,0,0,0,29.2,32,18,24,13,2,1,3,0,1,0,5.46,1.52,0.61644
Scott Barlow,SD,31,25,0,0,0,29.1,23,10,32,12,1,0,2,0,0,7,3.07,1.19,0.30928
Aroldis Chapman,KC,36,31,0,0,0,29.1,16,8,53,20,0,4,2,2,2,8,2.45,1.23,0.00000
Aroldis Chapman,TEX,36,30,0,0,0,29,21,12,50,16,4,2,3,4,3,6,3.72,1.28,1.24138
Connor Brogdon,PHI,29,27,1,0,0,29,29,13,26,13,5,2,1,0,0,3,4.03,1.45,1.55172
Jimmy Herget,LAA,30,29,1,0,0,29,33,15,26,8,7,2,4,0,3,6,4.66,1.41,2.17241
Sean Hjelle,SF,26,15,0,0,0,29,38,21,31,13,3,2,1,0,1,0,6.52,1.76,0.93103
Nick Wittgren,KC,32,27,0,0,0,29,30,16,18,11,2,1,0,0,1,2,4.97,1.41,0.62069
Angel Perdomo,PIT,29,30,0,0,0,29,21,12,44,11,3,3,2,0,0,5,3.72,1.1,0.93103
Chris Stratton,TEX,33,22,0,0,0,29,24,11,22,8,4,1,0,0,1,3,3.41,1.1,1.24138
Joe Kelly,CWS,35,31,0,0,0,29,26,16,41,12,3,1,5,1,6,11,4.97,1.31,0.93103
Trevor Gott,NYM,31,34,0,0,0,29,30,14,30,11,2,0,2,1,4,3,4.34,1.41,0.62069
Trevor Gott,SEA,31,30,0,0,0,29,33,13,32,8,2,0,3,0,2,7,4.03,1.41,0.62069
Keegan Thompson,CHC,29,19,0,0,0,28.2,20,15,26,19,2,2,2,1,0,3,4.71,1.36,0.63830
Isaiah Campbell,SEA,26,27,0,0,0,28.2,22,9,33,13,2,4,1,1,0,2,2.83,1.22,0.63830
Daniel Palencia,CHC,24,27,0,0,0,28.1,22,14,33,14,3,5,3,0,1,2,4.45,1.27,0.96085
Joe La Sorsa,WAS,25,23,0,0,0,28.1,29,15,25,6,3,1,0,0,0,2,4.76,1.24,0.96085
Jackson Kowar,KC,27,23,0,0,0,28,34,20,29,20,4,2,0,0,0,0,6.43,1.93,1.28571
Brock Stewart,MIN,32,28,0,0,0,27.2,19,2,39,11,1,2,0,1,2,8,0.65,1.08,0.33088
Andrew Suarez,STL,31,13,0,0,0,27.2,33,22,17,15,7,0,0,0,0,0,7.16,1.73,2.31618
Robert Suarez,SD,33,26,0,0,0,27.2,15,13,24,10,4,4,3,0,3,9,4.23,0.9,1.32353
Tim Herrin,CLE,27,23,0,0,0,27.2,29,17,32,12,3,1,1,0,1,1,5.53,1.48,0.99265
Rich Hill,SD,44,10,5,0,0,27.1,36,25,25,11,8,1,4,0,1,0,8.23,1.72,2.65683
Casey Lawrence,STL,36,15,0,0,0,27.1,32,20,20,10,7,1,0,0,0,4,6.59,1.54,2.32472
Slade Cecconi,ARI,24,7,4,0,0,27,27,13,20,4,4,0,1,0,0,0,4.33,1.15,1.33333
Luis Garcia,HOU,27,6,6,0,0,27,25,12,31,10,3,2,2,0,0,0,4,1.3,1.00000
Zach Neal,OAK,35,14,2,0,0,27,30,20,25,14,8,1,1,0,0,0,6.67,1.63,2.66667
Erasmo Ramirez,WAS,33,23,0,0,0,27,36,19,13,6,4,2,3,0,1,2,6.33,1.56,1.33333
Ray Kerr,SD,29,22,0,0,0,27,25,13,35,9,5,1,1,0,1,0,4.33,1.26,1.66667
Joe Jacques,BOS,29,23,1,0,0,26.2,32,15,20,10,2,2,1,1,0,0,5.06,1.58,0.68702
Mike Mayers,KC,32,6,2,0,0,26.1,34,18,17,10,4,1,2,0,0,0,6.15,1.67,1.37931
Jose Urena,CWS,32,5,5,0,0,26.1,23,12,20,8,4,0,3,0,0,0,4.1,1.18,1.37931
Trent Thornton,SEA,30,23,1,0,0,26,23,6,21,5,5,1,2,0,1,2,2.08,1.08,1.73077
Luis Cessa,CIN,31,7,6,0,0,26,46,26,11,12,3,1,4,0,0,0,9,2.23,1.03846
Tyler Mahle,MIN,29,5,5,0,0,25.2,22,9,28,5,5,1,2,0,0,0,3.16,1.05,1.78571
Dinelson Lamet,COL,31,16,4,0,0,25.2,38,33,31,22,6,1,4,0,2,1,11.57,2.34,2.14286
Stephen Nogosek,NYM,29,13,0,0,0,25.2,28,16,25,14,6,0,1,0,0,0,5.61,1.64,2.14286
Brent Headrick,MIN,26,14,0,0,0,25.2,27,18,30,10,7,3,0,1,1,0,6.31,1.44,2.50000
Calvin Faucher,TB,28,17,4,0,0,25.2,31,20,25,12,4,1,1,0,0,1,7.01,1.68,1.42857
AJ Smith-Shawver,ATL,21,6,5,0,0,25.1,17,12,20,11,7,1,0,0,0,0,4.26,1.11,2.50996
Phil Bickford,NYM,28,25,0,0,0,25.1,21,13,28,13,3,3,2,1,0,1,4.62,1.34,1.07570
Sam Moll,CIN,32,25,0,0,0,24.2,13,2,22,11,1,2,0,0,1,2,0.73,0.97,0.37190
Andrew Bellatti,PHI,32,27,0,0,0,24.2,25,14,25,12,4,1,0,0,0,2,5.11,1.5,1.48760
Matt Carasiti,COL,32,16,0,0,0,24.1,28,17,16,11,3,1,0,1,0,3,6.29,1.6,1.12033
Amir Garrett,KC,31,27,0,0,0,24.1,22,9,28,20,4,0,1,0,0,0,3.33,1.73,1.49378
Duane Underwood,PIT,29,20,0,0,0,24.1,24,14,14,11,3,1,0,2,0,4,5.18,1.44,1.12033
Jordan Balazovic,MIN,25,18,0,0,0,24.1,26,12,17,12,5,1,0,0,0,2,4.44,1.56,1.86722
Cole Ragans,TEX,26,17,0,0,0,24.1,20,16,24,14,4,2,3,0,0,3,5.92,1.4,1.49378
Justin Bruihl,LAD,26,20,0,0,0,24.1,24,11,19,8,2,1,0,0,0,1,4.07,1.32,0.74689
Yerry De Los Santos,PIT,26,22,0,0,0,24.1,17,9,18,13,1,1,1,0,0,3,3.33,1.23,0.37344
Kevin Herget,CIN,32,14,0,0,0,24.1,26,14,13,6,4,1,2,1,0,0,5.18,1.32,1.49378
Amos Willingham,WAS,25,18,0,0,0,24.1,35,18,15,9,8,0,2,0,0,0,6.66,1.81,2.98755
Colin Selby,PIT,26,21,5,0,0,24,29,24,30,15,4,2,2,0,3,2,9,1.83,1.50000
Jordan Hicks,TOR,27,25,0,0,0,24,18,7,22,8,2,2,3,4,0,7,2.63,1.08,0.75000
Keegan Akin,BAL,28,24,1,0,0,23.2,35,18,27,7,2,2,2,0,0,3,6.85,1.77,0.77586
Genesis Cabrera,TOR,27,29,0,0,0,23.2,17,7,20,6,2,1,0,0,1,6,2.66,0.97,0.77586
John Means,BAL,30,4,4,0,0,23.2,13,7,10,4,4,1,2,0,0,0,2.66,0.72,1.55172
Tommy Doyle,COL,27,15,0,0,0,23.2,23,18,18,13,5,0,1,0,2,0,6.85,1.52,1.93966
Pierce Johnson,ATL,32,24,0,0,0,23.2,16,2,32,5,3,1,1,0,1,8,0.76,0.89,1.16379
Jose Cuas,CHC,29,27,1,0,0,23.2,17,8,19,14,2,0,2,1,1,6,3.04,1.31,0.77586
Dylan Lee,ATL,29,24,1,0,0,23.2,24,11,24,8,4,1,0,0,0,6,4.18,1.35,1.55172
Bryce Jarvis,ARI,26,11,1,0,0,23.2,14,8,12,9,3,2,1,0,0,0,3.04,0.97,1.16379
Tommy Hunter,NYM,37,14,0,0,0,23.2,28,18,20,5,6,0,1,0,0,1,6.85,1.39,2.32759
Dany Jimenez,OAK,30,25,1,0,0,23.1,11,9,21,14,3,0,2,1,1,7,3.47,1.07,1.16883
James McArthur,KC,27,18,2,0,0,23.1,20,12,23,2,2,1,0,4,0,2,4.63,0.94,0.77922
Richard Lovelady,OAK,28,27,0,0,0,23.1,15,12,24,10,3,0,3,0,2,4,4.63,1.07,1.16883
Kaleb Ort,BOS,32,21,2,0,0,23,27,16,24,9,6,1,2,0,0,1,6.26,1.57,2.34783
Brandon Walter,BOS,27,9,0,0,0,23,32,16,16,7,3,0,0,1,0,0,6.26,1.7,1.17391
Devin Smeltzer,MIA,28,9,1,0,0,22.1,29,16,16,4,7,0,1,0,0,0,6.45,1.48,2.85068
Yonny Chirinos,ATL,30,5,5,0,0,22.1,33,23,22,7,5,1,1,0,0,0,9.27,1.79,2.03620
Thomas Hatch,PIT,29,12,2,0,0,22.1,23,10,16,7,2,1,1,0,1,3,4.03,1.34,0.81448
Kendall Graveman,HOU,33,23,0,0,0,22.1,18,6,24,16,3,2,2,0,0,5,2.42,1.52,1.22172
Jacob Webb,BAL,30,25,0,0,0,22,16,8,23,10,0,0,0,0,0,6,3.27,1.18,0.00000
Cole Sands,MIN,26,15,0,0,0,21.2,20,9,21,13,4,0,0,0,0,0,3.74,1.52,1.69811
Matt Barnes,MIA,33,24,1,0,0,21.1,25,13,20,10,2,1,0,0,1,3,5.48,1.64,0.85308
Zach Plesac,CLE,29,5,5,0,0,21.1,37,18,14,5,3,1,1,0,0,0,7.59,1.97,1.27962
Cody Bolton,PIT,25,16,0,0,0,21.1,30,15,22,15,3,1,0,0,0,1,6.33,2.11,1.27962
David Robertson,MIA,38,22,0,0,0,21.1,22,12,30,12,2,2,4,4,3,3,5.06,1.59,0.85308
Ryan Brasier,BOS,36,20,0,0,0,21,24,17,18,9,2,1,0,1,0,1,7.29,1.57,0.85714
Rob Zastryzny,PIT,32,21,1,0,0,20.2,24,11,15,13,1,1,0,0,1,2,4.79,1.79,0.44554
Adam Cimber,TOR,33,22,0,0,0,20.2,25,17,12,7,6,0,2,1,1,1,7.4,1.55,2.67327
Connor Phillips,CIN,22,5,5,0,0,20.2,18,16,26,13,5,1,1,0,0,0,6.97,1.5,2.22772
Drew Carlton,SD,28,11,0,0,0,20.2,18,10,18,6,2,2,1,0,2,0,4.35,1.16,0.89109
Collin Snider,KC,28,20,1,0,0,20.1,24,11,11,13,3,0,0,1,1,3,4.87,1.82,1.34328
Darius Vines,ATL,25,5,2,0,0,20.1,15,9,14,7,3,1,0,0,0,0,3.98,1.08,1.34328
Max Castillo,KC,24,7,0,0,0,20.1,20,10,10,9,2,0,1,0,0,0,4.43,1.43,0.89552
German Marquez,COL,29,4,4,0,0,20,19,11,17,3,4,2,2,0,0,0,4.95,1.1,1.80000
Josh Staumont,KC,30,21,1,0,0,20,16,12,24,13,1,0,0,0,0,1,5.4,1.45,0.45000
Anthony Bass,TOR,36,22,0,0,0,20,19,11,19,9,3,0,0,0,0,1,4.95,1.4,1.35000
Brad Boxberger,CHC,35,22,0,0,0,20,15,11,17,11,3,0,1,2,0,1,4.95,1.3,1.35000
Greg Weissert,NYY,29,17,0,0,0,20,21,9,22,8,3,0,0,0,0,2,4.05,1.45,1.35000
Sawyer Gipson-Long,DET,26,4,4,0,0,20,14,6,26,8,2,1,0,0,0,0,2.7,1.1,0.90000
Jackson Rutledge,WAS,24,4,4,0,0,20,24,15,12,6,4,1,1,0,0,0,6.75,1.5,1.80000
Lane Ramsey,CWS,27,21,0,0,0,20,25,13,18,9,1,1,0,0,0,3,5.85,1.7,0.45000
Sammy Peralta,CWS,25,16,0,0,0,20,19,9,18,11,2,2,0,0,0,0,4.05,1.5,0.90000
Adam Oller,OAK,29,9,1,0,0,19.2,29,22,13,12,5,1,1,0,0,0,10.07,2.08,2.34375
John Curtiss,NYM,30,15,0,0,0,19.2,17,10,16,8,3,0,0,0,1,2,4.58,1.27,1.40625
Tucker Davidson,KC,28,20,1,0,0,19.2,20,11,15,8,4,0,1,0,0,2,5.03,1.42,1.87500
Denyi Reyes,NYM,27,9,3,0,0,19.2,25,17,17,8,3,0,2,0,0,1,7.78,1.68,1.40625
DL Hall,BAL,25,18,0,0,0,19.1,18,7,23,5,2,3,0,0,1,2,3.26,1.19,0.94241
Hobie Harris,WAS,30,16,0,0,0,19.1,21,11,9,13,2,0,0,0,0,0,5.12,1.76,0.94241
Nick Mears,COL,27,16,0,0,0,19.1,14,8,21,14,1,0,1,0,0,1,3.72,1.45,0.47120
Luis Ortiz,PHI,28,14,0,0,0,19,23,7,16,5,1,0,0,1,0,0,3.32,1.47,0.47368
Ben Heller,ATL,32,19,0,0,0,18.2,16,8,16,11,2,0,0,0,1,4,3.86,1.45,0.98901
John King,STL,29,20,0,0,0,18.2,19,3,10,6,1,1,0,0,1,10,1.45,1.34,0.49451
John King,TEX,29,15,0,0,0,18.2,26,12,10,4,1,1,1,0,1,2,5.79,1.61,0.49451
Justin Garza,BOS,30,17,1,0,0,18.1,22,15,17,12,3,0,2,0,0,0,7.36,1.85,1.49171
Dylan Coleman,KC,27,23,1,0,0,18.1,18,18,21,19,3,0,2,0,1,5,8.84,2.02,1.49171
Jose Urena,COL,32,5,5,0,0,18.1,27,20,9,14,9,0,4,0,0,0,9.82,2.24,4.47514
Drew Rucinski,OAK,35,4,4,0,0,18,27,18,6,14,5,0,4,0,0,0,9,2.28,2.50000
Brad Hand,ATL,34,20,0,0,0,18,19,15,18,6,2,2,2,1,2,2,7.5,1.39,1.00000
Brett Kennedy,CIN,29,5,2,0,0,18,19,13,9,7,1,1,0,0,0,0,6.5,1.44,0.50000
Trevor Rogers,MIA,26,4,4,0,0,18,16,8,19,6,2,1,2,0,0,0,4,1.22,1.00000
Zach Jackson,OAK,29,19,0,0,0,18,18,5,23,10,1,2,1,1,1,1,2.5,1.56,0.50000
Paul Sewald,ARI,33,20,0,0,0,17.2,16,7,20,10,3,0,1,13,2,0,3.57,1.47,1.56977
Luis Patino,CWS,24,7,1,0,0,17.2,16,7,13,12,1,0,1,0,0,0,3.57,1.58,0.52326
Jonathan Loaisiga,NYY,29,17,0,0,0,17.2,14,6,6,1,2,0,2,0,0,5,3.06,0.85,1.04651
Domingo Tapia,SD,32,15,0,0,0,17.2,13,7,14,12,2,0,1,1,0,1,3.57,1.42,1.04651
Andre Jackson,LAD,27,7,0,0,0,17.2,22,13,16,3,5,0,0,2,0,0,6.62,1.42,2.61628
Ryan Thompson,TB,31,18,0,0,0,17.2,14,12,12,7,2,1,2,0,2,4,6.11,1.19,1.04651
Josh Taylor,KC,31,17,1,0,0,17.2,22,16,26,9,4,1,3,0,2,0,8.15,1.75,2.09302
Tyler Gilbert,ARI,30,11,0,0,0,17.1,21,10,19,5,2,0,2,0,0,0,5.19,1.5,1.05263
Jose De Leon,MIN,31,12,1,0,0,17.1,16,9,17,5,2,0,1,0,0,0,4.67,1.21,1.05263
Austin Adams,ARI,32,24,0,0,0,17.1,16,11,22,8,1,0,1,0,1,7,5.71,1.38,0.52632
Jorge Alcala,MIN,28,11,0,0,0,17.1,14,12,16,10,5,0,1,0,1,2,6.23,1.38,2.63158
Dylan Floro,MIN,33,19,0,0,0,17,22,10,17,6,1,2,1,0,1,0,5.29,1.65,0.52941
Trey Wingenter,DET,29,17,0,0,0,17,16,11,22,7,2,1,0,0,0,0,5.82,1.35,1.05882
Andrew Chafin,MIL,33,20,0,0,0,17,14,11,14,10,3,1,1,0,1,2,5.82,1.41,1.58824
Reed Garrett,NYM,31,9,0,0,0,17,15,11,16,6,3,1,0,0,0,0,5.82,1.24,1.58824
Sam Bachman,LAA,24,11,0,0,0,17,17,6,14,11,0,1,2,1,1,2,3.18,1.65,0.00000
Francisco Perez,OAK,26,17,1,0,0,16.2,17,11,14,8,0,1,2,0,1,0,5.94,1.5,0.00000
Madison Bumgarner,ARI,34,4,4,0,0,16.2,25,19,10,15,4,0,3,0,0,0,10.26,2.4,2.22222
Michael Kelly,CLE,31,14,0,0,0,16.2,13,7,16,9,0,1,0,0,0,0,3.78,1.32,0.00000
Lyon Richardson,CIN,24,4,4,0,0,16.2,17,16,12,15,6,0,2,0,0,0,8.64,1.92,3.33333
Tyler Kinley,COL,33,18,0,0,0,16.1,21,11,17,6,3,0,4,5,2,1,6.06,1.65,1.67702
Ian Kennedy,TEX,39,16,0,0,0,16.1,16,13,21,7,4,0,1,0,1,0,7.16,1.41,2.23602
Joe Boyle,OAK,24,3,3,0,0,16,8,3,15,5,1,2,0,0,0,0,1.69,0.81,0.56250
Kris Bubic,KC,26,3,3,0,0,16,19,7,16,2,1,0,2,0,0,0,3.94,1.31,0.56250
Jeffrey Springs,TB,31,3,3,0,0,16,4,1,24,4,1,2,0,0,0,0,0.56,0.5,0.56250
Triston McKenzie,CLE,26,4,4,0,0,16,12,9,16,13,1,0,3,0,0,0,5.06,1.56,0.56250
Garrett Hill,DET,28,9,0,0,0,15.2,19,16,14,14,4,0,0,1,0,1,9.19,2.11,2.36842
Ty Adcock,SEA,27,12,0,0,0,15.2,11,6,11,0,4,0,0,0,0,0,3.45,0.7,2.36842
Trevor Kelley,TB,30,10,3,0,0,15.1,16,10,11,6,4,0,1,0,0,1,5.87,1.43,2.38411
James Naile,STL,31,10,0,0,0,15.1,27,15,7,9,1,0,0,0,0,1,8.8,2.35,0.59603
Jonathan Heasley,KC,27,12,0,0,0,15,17,12,9,2,5,0,0,0,1,1,7.2,1.27,3.00000
Angel Felipe,OAK,26,14,0,0,0,15,6,7,19,13,0,1,1,0,1,5,4.2,1.27,0.00000
Sean Newcomb,OAK,30,7,2,0,0,15,8,5,17,9,1,1,1,0,0,1,3,1.13,0.60000
Freddy Tarnok,OAK,25,5,1,0,0,14.2,11,8,14,11,4,1,1,0,0,0,4.91,1.5,2.53521
Nick Vespi,BAL,28,9,0,0,0,14.2,16,7,9,2,2,1,0,0,0,0,4.3,1.23,1.26761
Parker Mushinski,HOU,28,14,0,0,0,14.2,19,9,15,4,5,0,0,0,0,1,5.52,1.57,3.16901
Oliver Ortega,MIN,27,10,0,0,0,14.2,11,7,14,7,2,0,1,0,0,1,4.3,1.23,1.26761
Ryan Weber,NYY,33,8,0,0,0,14.1,17,5,7,1,2,1,0,1,0,1,3.14,1.26,1.27660
Keynan Middleton,NYY,30,12,0,0,0,14.1,7,3,17,7,1,0,0,0,0,0,1.88,0.98,0.63830
Robert Stephenson,PIT,31,18,0,0,0,14,12,8,17,8,3,0,3,0,1,6,5.14,1.43,1.92857
Miguel Diaz,DET,29,12,3,0,0,14,8,1,16,5,0,1,0,0,0,2,0.64,0.93,0.00000
Reiver Sanmartin,CIN,27,14,0,0,0,14,17,11,13,10,2,1,0,0,0,1,7.07,1.93,1.28571
Penn Murfee,SEA,29,16,0,0,0,14,5,2,16,10,1,1,2,0,1,1,1.29,1.07,0.64286
Eduard Bazardo,SEA,28,9,0,0,0,13.2,9,4,14,4,2,0,0,0,0,0,2.63,0.95,1.36364
Brandon Hughes,CHC,28,17,0,0,0,13.2,14,11,17,8,2,0,3,0,2,1,7.24,1.61,1.36364
Yerry Rodriguez,TEX,26,13,1,0,0,13.2,20,12,15,6,1,0,1,0,1,0,7.9,1.9,0.68182
Chad Smith,OAK,28,10,0,0,0,13.2,15,10,9,7,2,1,2,0,0,0,6.59,1.61,1.36364
Jimmy Yacabonis,NYM,32,7,0,0,0,13.2,14,10,11,6,2,2,1,0,0,0,6.59,1.46,1.36364
Zach Pop,TOR,27,15,0,0,0,13.2,11,10,14,6,4,1,1,0,0,1,6.59,1.24,2.72727
Jacob Barnes,STL,33,13,0,0,0,13.2,18,9,8,3,1,0,1,0,0,0,5.93,1.54,0.68182
Lucas Luetge,ATL,37,12,0,0,0,13.2,17,11,14,7,2,1,0,0,1,0,7.24,1.76,1.36364
Luke Weaver,NYY,30,3,3,0,0,13.1,14,5,16,3,3,1,1,0,0,0,3.38,1.28,2.06107
Luke Weaver,SEA,30,5,1,0,0,13.1,16,9,8,3,2,0,1,0,0,0,6.08,1.43,1.37405
Peter Solomon,ARI,27,5,0,0,0,13.1,17,18,6,11,2,0,0,0,0,0,12.15,2.1,1.37405
Bruce Zimmermann,BAL,29,7,0,0,0,13.1,17,7,14,0,3,2,0,0,0,0,4.73,1.28,2.06107
Ryan Weathers,MIA,24,3,2,0,0,13,13,11,14,12,3,0,2,0,0,0,7.62,1.92,2.07692
Dominic Leone,LAA,32,11,0,0,0,13,15,8,11,9,2,0,0,1,0,1,5.54,1.85,1.38462
Reynaldo Lopez,LAA,30,13,0,0,0,13,12,4,19,8,1,0,2,2,1,4,2.77,1.54,0.69231
Ryan Thompson,ARI,31,13,0,0,0,13,6,1,9,1,1,0,0,1,1,4,0.69,0.54,0.69231
Carson Spiers,CIN,26,4,2,0,0,13,18,10,12,7,1,0,1,1,0,0,6.92,1.92,0.69231
Garrett Crochet,CWS,24,13,0,0,0,12.2,12,5,12,13,1,0,2,0,1,0,3.55,1.97,0.73770
Casey Legumina,CIN,26,11,0,0,0,12.2,16,8,11,9,3,1,0,0,0,1,5.68,1.97,2.21311
Steven Cruz,KC,24,10,4,0,0,12.2,11,7,15,11,1,0,0,0,0,0,4.97,1.74,0.73770
Daniel Norris,CLE,30,7,0,0,0,12.2,10,8,11,12,3,0,0,0,0,0,5.68,1.74,2.21311
Jeurys Familia,OAK,34,14,0,0,0,12.2,13,9,9,13,2,0,1,2,2,1,6.39,2.05,1.47541
Mitch White,TOR,29,10,0,0,0,12.2,15,10,13,7,2,0,1,0,0,0,7.11,1.74,1.47541
Davis Daniel,LAA,26,3,0,0,0,12.1,7,3,9,9,1,1,1,0,0,0,2.19,1.3,0.74380
Spencer Patton,OAK,36,12,0,0,0,12.1,13,7,7,6,3,0,0,0,0,2,5.11,1.54,2.23140
Kolby Allard,ATL,26,4,3,0,0,12.1,16,9,13,4,2,0,1,0,0,0,6.57,1.62,1.48760
Eduardo Salazar,CIN,25,8,0,0,0,12.1,16,11,5,5,0,1,0,0,0,0,8.03,1.7,0.00000
Jacob Lopez,TB,26,4,1,0,0,12.1,14,6,8,2,0,1,0,1,0,0,4.38,1.3,0.00000
Emerson Hancock,SEA,24,3,3,0,0,12,13,6,6,3,1,0,0,0,0,0,4.5,1.33,0.75000
Hunter Stratton,PIT,27,8,0,0,0,12,9,3,10,3,2,0,0,0,1,0,2.25,1,1.50000
Kody Funderburk,MIN,27,11,0,0,0,12,6,1,19,5,1,2,0,0,0,1,0.75,0.92,0.75000
Nick Robertson,BOS,25,9,1,0,0,12,13,8,13,5,2,0,0,0,0,0,6,1.5,1.50000
Jorge Lopez,BAL,31,12,0,0,0,12,13,7,14,2,4,0,0,0,0,3,5.25,1.25,3.00000
Chad Green,TOR,32,12,0,0,0,12,12,7,16,4,1,3,0,0,0,2,5.25,1.33,0.75000
Jackson Stephens,ATL,29,5,0,0,0,12,13,4,11,5,1,0,0,0,0,0,3,1.5,0.75000
Garrett Cleavinger,TB,29,15,0,0,0,12,6,4,14,6,2,1,0,0,2,0,3,1,1.50000
Andrew Kittredge,TB,34,14,0,0,0,11.2,12,4,10,2,1,2,0,1,0,1,3.09,1.2,0.80357
Jorge Lopez,MIA,31,12,0,0,0,11.2,20,12,8,9,1,2,0,0,0,1,9.26,2.49,0.80357
Kirby Snead,OAK,29,15,0,0,0,11.2,14,6,9,6,1,1,2,0,3,7,4.63,1.71,0.80357
Gus Varland,LAD,27,8,0,0,0,11.2,12,4,14,8,0,1,1,0,0,0,3.09,1.71,0.00000
J.C. Mejia,MIL,27,9,0,0,0,11.1,15,7,13,3,2,1,0,0,1,1,5.56,1.59,1.62162
Jake Diekman,CWS,37,13,0,0,0,11.1,11,10,11,13,1,0,1,0,1,2,7.94,2.12,0.81081
Chase De Jong,PIT,30,6,0,0,0,11.1,18,17,7,6,6,0,0,0,0,0,13.5,2.12,4.86486
Anthony Kay,CHC,29,13,0,0,0,11.1,12,8,8,8,1,0,0,0,1,0,6.35,1.76,0.81081
Nabil Crismatt,SD,29,7,0,0,0,11,17,12,9,7,3,0,1,0,0,0,9.82,2.18,2.45455
Juan Then,SEA,24,9,0,0,0,11,14,6,5,2,3,0,0,0,0,0,4.91,1.45,2.45455
Javy Guerra,TB,28,9,2,0,0,11,7,5,9,13,1,0,0,0,0,0,4.09,1.82,0.81818
Reynaldo Lopez,CLE,30,12,0,0,0,11,5,0,12,4,0,1,0,0,0,8,0,0.82,0.00000
Joely Rodriguez,BOS,32,11,0,0,0,11,13,8,14,6,2,0,0,0,0,0,6.55,1.73,1.63636
Zach Logue,DET,27,3,0,0,0,11,13,9,10,2,3,0,0,0,0,0,7.36,1.36,2.45455
Connor Overton,CIN,30,3,3,0,0,11,19,14,9,7,3,0,1,0,0,0,11.45,2.36,2.45455
Declan Cronin,CWS,26,9,0,0,0,11,11,11,8,7,3,0,1,0,0,1,9,1.64,2.45455
Glenn Otto,TEX,28,6,0,0,0,10.2,14,12,11,6,6,0,0,0,0,1,10.13,1.88,5.29412
Jeremiah Estrada,CHC,25,12,0,0,0,10.2,12,8,13,12,4,0,0,0,0,1,6.75,2.25,3.52941
Dennis Santana,NYM,27,9,0,0,0,10.2,10,7,12,7,2,1,0,0,0,2,5.91,1.59,1.76471
Dominic Leone,SEA,32,9,0,0,0,10.1,7,5,10,8,5,0,0,0,0,0,4.35,1.45,4.45545
Joe Kelly,LAD,35,11,0,0,0,10.1,3,2,19,6,0,1,0,0,0,2,1.74,0.87,0.00000
Matt Bush,MIL,38,12,0,0,0,10.1,11,11,10,6,5,0,2,1,3,1,9.58,1.65,4.45545
Andrew Saalfrank,ARI,26,10,0,0,0,10.1,7,0,6,4,0,0,0,0,0,3,0,1.06,0.00000
Nick Robertson,LAD,25,9,0,0,0,10.1,17,7,13,4,1,0,1,0,1,1,6.1,2.03,0.89109
Levi Stoudt,CIN,26,4,2,0,0,10.1,16,11,9,8,1,0,1,0,0,0,9.58,2.32,0.89109
Justin Martinez,ARI,22,10,0,0,0,10,13,14,14,11,2,0,0,1,0,0,12.6,2.4,1.80000
Joey Estes,OAK,22,2,2,0,0,10,12,8,7,2,4,0,1,0,0,0,7.2,1.4,3.60000
Ben Joyce,LAA,23,12,0,0,0,10,9,6,10,9,1,1,1,0,0,4,5.4,1.8,0.90000
Josh Walker,NYM,29,14,0,0,0,10,12,9,12,6,2,0,1,0,0,1,8.1,1.8,1.80000
Carson Fulmer,LAA,30,3,1,0,0,10,6,3,6,4,1,1,1,0,0,0,2.7,1,0.90000
Wil Crowe,PIT,29,5,0,0,0,9.2,9,5,9,9,1,0,1,1,1,0,4.66,1.86,0.97826
Joe Barlow,TEX,28,13,0,0,0,9.2,13,5,6,2,2,1,1,0,0,0,4.66,1.55,1.95652
Joel Kuhnel,HOU,29,7,0,0,0,9.2,10,5,3,3,2,0,0,0,0,0,4.66,1.34,1.95652
Gerardo Reyes,LAA,30,8,0,0,0,9.2,11,8,10,6,2,0,0,0,0,0,7.45,1.76,1.95652
Zack Kelly,BOS,29,8,0,0,0,9.1,7,4,6,8,0,0,0,0,0,0,3.86,1.61,0.00000
Jake Cousins,MIL,29,9,0,0,0,9.1,10,5,7,10,1,0,0,0,0,0,4.82,2.14,0.98901
Jose Marte,LAA,27,10,0,0,0,9.1,14,9,7,7,3,0,0,0,1,1,8.68,2.25,2.96703
Deivi Garcia,CWS,24,6,0,0,0,9.1,5,3,7,8,1,0,1,0,0,0,2.89,1.39,0.98901
Tyson Miller,MIL,28,7,0,0,0,9.1,9,6,7,3,2,0,0,0,0,0,5.79,1.29,1.97802
Domingo Acevedo,OAK,29,9,0,0,0,9.1,16,11,7,2,2,0,0,0,2,2,10.61,1.93,1.97802
Adrian Morejon,SD,25,8,1,0,0,9,14,7,8,5,1,0,0,0,0,0,7,2.11,1.00000
Matt Festa,SEA,31,8,0,0,0,9,4,4,13,12,1,0,0,0,0,1,4,1.78,1.00000
Tommy Milone,SEA,37,2,2,0,0,9,7,2,3,6,1,0,1,0,0,0,2,1.44,1.00000
Logan Gillaspie,BAL,26,11,0,0,0,9,14,6,8,5,2,0,1,0,2,2,6,2.11,2.00000
Jose Quijada,LAA,28,10,0,0,0,9,8,6,8,3,0,0,1,4,1,5,6,1.22,0.00000
Shawn Dubin,HOU,28,3,1,0,0,9,12,7,11,3,1,0,0,0,0,0,7,1.67,1.00000
Victor Vodnik,COL,24,6,0,0,0,8.2,15,8,12,3,0,1,0,0,0,0,8.31,2.08,0.00000
Rico Garcia,OAK,30,7,0,0,0,8.2,13,8,6,5,4,0,0,0,0,1,8.31,2.08,4.39024
Andrew Vasquez,DET,30,12,0,0,0,8.2,11,8,9,9,0,0,0,0,0,2,8.31,2.31,0.00000
Gus Varland,MIL,27,8,0,0,0,8.2,15,11,6,8,3,0,0,0,0,1,11.42,2.65,3.29268
Edgar Navarro,CWS,26,8,0,0,0,8.2,11,7,9,2,2,0,0,0,0,0,7.27,1.5,2.19512
Zack Weiss,BOS,31,6,0,0,0,8.2,3,2,8,4,2,0,0,0,0,0,2.08,0.81,2.19512
Ryan Tepera,LAA,36,10,0,0,0,8.2,15,7,10,3,2,2,2,0,2,2,7.27,2.08,2.19512
Chris Devenski,TB,33,9,0,0,0,8.2,5,2,9,2,1,3,2,0,2,0,2.08,0.81,1.09756
Diego Castillo,SEA,30,8,0,0,0,8.2,7,6,7,7,2,0,0,0,0,1,6.23,1.62,2.19512
Bryan Hudson,LAD,26,6,0,0,0,8.2,12,7,7,4,1,0,0,0,0,0,7.27,1.85,1.09756
Colten Brewer,NYY,31,3,0,0,0,8.1,6,4,4,3,3,0,0,0,0,0,4.32,1.08,3.33333
Javy Guerra,MIL,28,8,0,0,0,8.1,10,8,5,9,1,0,0,0,0,0,8.64,2.28,1.11111
Danny Young,ATL,29,8,0,0,0,8.1,7,1,11,2,0,0,0,0,0,0,1.08,1.08,0.00000
Cody Morris,CLE,27,6,0,0,0,8,10,6,9,6,3,0,0,0,0,1,6.75,2,3.37500
Anthony Misiewicz,ARI,29,7,0,0,0,8,11,5,6,3,1,1,0,0,0,0,5.63,1.75,1.12500
Wander Suero,LAD,32,5,0,0,0,8,6,7,9,5,2,1,0,0,0,0,7.88,1.38,2.25000
Tayler Scott,OAK,31,8,1,0,0,8,11,3,7,2,2,0,0,0,1,0,3.38,1.63,2.25000
Kyle Barraclough,BOS,33,3,0,0,0,7.2,14,11,4,6,3,1,1,0,0,0,12.91,2.61,3.75000
Taylor Hearn,KC,29,8,0,0,0,7.2,12,7,8,2,2,0,0,0,0,1,8.22,1.83,2.50000
Antonio Senzatela,COL,29,2,2,0,0,7.2,7,4,4,2,3,0,1,0,0,0,4.7,1.17,3.75000
Sean Reid-Foley,NYM,28,8,0,0,0,7.2,4,3,16,6,0,0,1,0,0,3,3.52,1.3,0.00000
Archie Bradley,MIA,31,4,0,0,0,7.1,13,9,7,3,2,0,0,0,0,0,11.05,2.18,2.53521
Silvino Bracho,CIN,31,5,0,0,0,7.1,5,3,6,6,0,0,0,0,0,0,3.68,1.5,0.00000
Janson Junk,MIL,28,2,1,0,0,7.1,8,4,5,2,1,0,1,0,0,0,4.91,1.36,1.26761
Evan Justice,COL,25,9,0,0,0,7.1,14,7,7,8,0,0,0,0,0,0,8.59,3,0.00000
Jhonathan Diaz,LAA,27,4,1,0,0,7,13,8,4,7,0,0,0,0,0,0,10.29,2.86,0.00000
Jeff Lindgren,MIA,27,3,0,0,0,7,4,4,1,4,0,0,0,0,0,0,5.14,1.14,0.00000
Taylor Hearn,TEX,29,4,0,0,0,7,9,8,7,4,1,0,0,0,0,0,10.29,1.86,1.28571
Alan Busenitz,CIN,33,6,0,0,0,7,8,2,5,1,0,0,0,0,0,0,2.57,1.29,0.00000
Anthony Banda,WAS,30,10,0,0,0,7,9,5,6,5,1,0,0,0,0,0,6.43,2,1.28571
Sam Coonrod,NYM,31,10,0,0,0,6.2,5,7,6,8,0,0,0,0,0,1,9.45,1.95,0.00000
Matt Gage,HOU,31,5,0,0,0,6.2,6,2,8,3,1,0,0,0,0,0,2.7,1.35,1.45161
Easton McGee,SEA,26,1,1,0,0,6.2,1,0,2,1,0,0,0,0,0,0,0,0.3,0.00000
Ryan Sherriff,BOS,33,5,0,0,0,6.2,6,2,5,2,0,0,0,0,0,1,2.7,1.2,0.00000
Luke Little,CHC,23,7,0,0,0,6.2,5,0,12,4,0,0,0,0,0,0,0,1.35,0.00000
Easton Lucas,OAK,27,6,0,0,0,6.2,10,6,7,4,1,0,0,0,0,0,8.1,2.1,1.45161
Brooks Kriske,KC,30,4,0,0,0,6.2,3,3,6,4,2,0,0,0,0,0,4.05,1.05,2.90323
Devin Sweet,OAK,27,5,0,0,0,6.2,8,8,5,5,3,1,0,0,0,0,10.8,1.95,4.35484
Bennett Sousa,HOU,28,5,0,0,0,6.1,1,0,8,0,0,0,0,0,0,0,0,0.16,0.00000
Jacob Latz,TEX,27,3,0,0,0,6.1,1,0,5,3,0,0,0,0,0,0,0,0.63,0.00000
Enmanuel De Jesus,MIA,27,2,0,0,0,6.1,9,8,5,4,0,0,0,0,0,0,11.37,2.05,0.00000
Fernando Abad,COL,38,6,0,0,0,6.1,11,3,2,3,2,1,0,0,0,0,4.26,2.21,2.95082
Thomas Hatch,TOR,29,6,0,0,0,6.1,10,3,10,5,0,0,0,0,0,0,4.26,2.37,0.00000
Tayler Scott,LAD,31,6,0,0,0,6,6,6,8,4,0,0,0,0,1,0,9,1.67,0.00000
J.B. Bukauskas,MIL,27,5,0,0,0,6,4,0,6,1,0,0,0,0,0,0,0,0.83,0.00000
Zach Muckenhirn,NYM,29,3,0,0,0,6,11,4,3,2,0,0,0,0,0,0,6,2.17,0.00000
Reiss Knehr,SD,27,4,1,0,0,5.2,10,10,4,5,3,0,1,0,0,0,15.88,2.65,5.19231
Garrett Acton,OAK,25,6,0,0,0,5.2,9,8,5,5,3,0,0,0,0,0,12.71,2.47,5.19231
Tejay Antone,CIN,30,5,1,0,0,5.2,3,1,7,2,0,0,0,0,0,1,1.59,0.88,0.00000
Brent Honeywell,CWS,28,4,0,0,0,5.2,9,7,3,3,2,0,0,0,0,1,11.12,2.12,3.46154
Deivi Garcia,NYY,24,2,0,0,0,5.2,4,1,3,4,1,0,0,1,0,0,1.59,1.41,1.73077
Trent Thornton,TOR,30,4,0,0,0,5.1,7,1,5,1,0,0,0,0,0,0,1.69,1.5,0.00000
Nick Nelson,PHI,28,1,0,0,0,5.1,2,1,3,2,1,1,0,0,0,0,1.69,0.75,1.76471
Mauricio Llovera,SF,27,5,0,0,0,5.1,4,1,5,2,1,1,0,0,0,0,1.69,1.13,1.76471
Zack Weiss,LAA,31,6,0,0,0,5.1,6,3,7,2,2,1,0,0,0,0,5.06,1.5,3.52941
Zach McAllister,NYY,36,7,0,0,0,5.1,9,6,5,2,2,0,0,0,0,2,10.13,2.06,3.52941
Kyle Nicolas,PIT,25,4,0,0,0,5.1,7,7,7,4,1,0,0,0,0,0,11.81,2.06,1.76471
Cole Sulser,ARI,34,4,0,0,0,5.1,5,4,4,3,2,0,0,0,0,0,6.75,1.5,3.52941
Caleb Kilian,CHC,26,3,1,0,0,5.1,13,10,5,2,0,0,1,0,0,0,16.88,2.81,0.00000
Kolton Ingram,LAA,27,5,0,0,0,5.1,8,5,7,5,2,0,0,0,0,0,8.44,2.44,3.52941
Jackson Wolf,SD,24,1,1,0,0,5,6,3,1,1,0,1,0,0,0,0,5.4,1.4,0.00000
Darren McCaughan,SEA,28,3,0,0,0,5,7,3,10,3,1,0,0,0,0,0,5.4,2,1.80000
Packy Naughton,STL,27,4,0,0,0,5,2,0,5,1,0,0,0,0,0,0,0,0.6,0.00000
Liam Hendriks,CWS,35,5,0,0,0,5,4,3,3,1,1,2,0,1,0,0,5.4,1,1.80000
Chase Anderson,TB,36,2,0,0,0,5,2,0,2,1,0,0,0,1,0,0,0,0.6,0.00000
Joey Krehbiel,BAL,31,6,0,0,0,5,2,1,5,2,1,1,0,0,0,0,1.8,0.8,1.80000
Brenan Hanifee,DET,25,3,0,0,0,5,8,3,3,0,1,0,0,0,0,0,5.4,1.6,1.80000
Chris Paddack,MIN,28,2,0,0,0,5,6,3,8,1,1,1,0,0,0,0,5.4,1.4,1.80000
Simeon Woods Richardson,MIN,23,1,0,0,0,4.2,7,5,5,3,1,0,0,0,0,0,9.64,2.14,2.14286
Dereck Rodriguez,ATL,31,3,0,0,0,4.2,8,8,1,4,2,0,0,0,0,0,15.43,2.57,4.28571
Adam Kolarek,NYM,35,4,0,0,0,4.2,1,0,5,1,0,0,0,0,0,0,0,0.43,0.00000
Matt Moore,CLE,34,5,0,0,0,4.2,9,2,8,2,1,0,0,0,1,1,3.86,2.36,2.14286
Carlos Vargas,ARI,24,5,0,0,0,4.2,5,3,7,4,2,0,0,0,0,0,5.79,1.93,4.28571
Nicholas Padilla,CWS,27,3,0,0,0,4.2,9,3,6,1,1,0,1,0,0,0,5.79,2.14,2.14286
Spenser Watkins,OAK,31,1,1,0,0,4.1,7,5,4,2,2,0,1,0,0,0,10.38,2.08,4.39024
Joe La Sorsa,TB,25,2,0,0,0,4.1,3,1,3,3,0,0,0,0,0,0,2.08,1.38,0.00000
Braden Bristo,DET,29,2,0,0,0,4,5,2,1,3,0,0,0,0,0,0,4.5,2,0.00000
Geoff Hartlieb,MIA,30,2,0,0,0,4,2,1,3,3,1,0,0,0,0,0,2.25,1.25,2.25000
Ethan Small,MIL,27,2,0,0,0,4,9,5,6,2,1,0,0,1,0,0,11.25,2.75,2.25000
John McMillon,KC,26,4,0,0,0,4,1,1,8,0,1,0,0,0,0,0,2.25,0.25,2.25000
Yohan Ramirez,CWS,28,5,0,0,0,4,5,4,4,3,0,0,0,0,0,0,9,2,0.00000
Matt Moore,MIA,34,4,0,0,0,4,4,0,3,1,0,1,0,0,0,1,0,1.25,0.00000
Dylan Covey,LAD,32,1,0,0,0,4,5,2,3,1,2,0,0,0,0,0,4.5,1.5,4.50000
Mychal Givens,BAL,33,6,0,0,0,4,4,5,2,6,0,0,1,0,1,1,11.25,2.5,0.00000
Paolo Espino,WAS,37,3,0,0,0,4,14,11,3,3,1,0,0,0,0,0,24.75,4.25,2.25000
Matt Krook,NYY,29,4,0,0,0,4,8,11,3,6,1,0,0,0,0,0,24.75,3.5,2.25000
Owen White,TEX,24,2,0,0,0,4,5,5,4,2,2,0,1,0,0,0,11.25,1.75,4.50000
Luis Patino,TB,24,2,0,0,0,4,5,4,5,2,2,0,0,0,0,0,9,1.75,4.50000
Wes Parsons,TOR,31,1,1,0,0,4,10,9,3,3,2,0,1,0,0,0,20.25,3.25,4.50000
Tyson Miller,LAD,28,2,0,0,0,4,4,2,3,1,0,0,0,0,0,0,4.5,1.25,0.00000
Matt Dermody,BOS,33,1,1,0,0,4,4,3,1,1,2,0,1,0,0,0,6.75,1.25,4.50000
Zack Burdi,TB,29,3,0,0,0,4,6,5,5,2,0,0,0,0,0,0,11.25,2,0.00000
Matt Bowman,NYY,32,3,0,0,0,4,6,4,3,2,1,0,0,0,0,1,9,2,2.25000
Michael Plassmeyer,PHI,27,1,1,0,0,3.2,8,9,4,0,3,0,1,0,0,0,22.09,2.18,8.43750
Tayler Scott,BOS,31,4,1,0,0,3.2,6,2,2,4,1,0,0,0,0,0,4.91,2.73,2.81250
Chi Chi Gonzalez,MIA,32,3,0,0,0,3.2,7,3,3,1,1,0,0,0,0,0,7.36,2.18,2.81250
Touki Toussaint,CLE,27,1,1,0,0,3.2,3,2,2,5,0,0,1,0,0,0,4.91,2.18,0.00000
Jose Ruiz,CWS,29,4,0,0,0,3.2,8,9,3,4,3,0,0,0,0,0,22.09,3.27,8.43750
Daysbel Hernandez,ATL,27,4,0,0,0,3.2,6,3,6,3,1,1,0,0,0,0,7.36,2.45,2.81250
Vinny Nittoli,NYM,33,3,0,0,0,3.2,4,1,3,0,0,0,0,0,0,0,2.45,1.09,0.00000
Justin Bruihl,COL,26,7,0,0,0,3.2,4,6,3,3,0,0,0,0,0,0,14.73,1.91,0.00000
McKinley Moore,PHI,25,3,0,0,0,3.1,5,7,2,5,1,0,0,0,0,0,18.9,3,2.90323
Clayton Andrews,MIL,27,4,0,0,0,3.1,10,10,4,2,3,0,1,0,0,1,27,3.6,8.70968
Joel Kuhnel,CIN,29,2,0,0,0,3.1,6,3,0,2,0,0,0,0,0,0,8.1,2.4,0.00000
Robbie Ray,SEA,32,1,1,0,0,3.1,4,3,3,5,0,0,1,0,0,0,8.1,2.7,0.00000
Tony Santillan,CIN,26,3,0,0,0,3.1,4,1,1,5,0,1,0,0,0,0,2.7,2.7,0.00000
Chasen Shreve,CIN,33,3,0,0,0,3.1,1,1,3,2,1,0,0,0,0,0,2.7,0.9,2.90323
Elvin Rodriguez,TB,25,1,0,0,0,3.1,0,0,5,0,0,0,0,0,0,0,0,0,0.00000
Spencer Howard,TEX,27,3,0,0,0,3.1,4,4,2,3,1,0,0,0,0,0,10.8,2.1,2.90323
Anthony Kay,NYM,29,3,0,0,0,3.1,1,2,3,1,1,0,0,0,0,0,5.4,0.6,2.90323
Thyago Vieira,MIL,30,2,0,0,0,3,0,0,2,1,0,0,1,0,0,0,0,0.33,0.00000
Zack Littell,BOS,28,2,0,0,0,3,3,3,2,3,0,0,0,0,0,0,9,2,0.00000
Jonathan Bowlan,KC,27,2,1,0,0,3,5,1,3,0,1,0,1,0,0,0,3,1.67,3.00000
Edwin Uceta,NYM,26,1,0,0,0,3,0,0,3,2,0,0,0,0,0,0,0,0.67,0.00000
Daniel Castano,MIA,29,2,0,0,0,3,7,7,4,3,2,0,0,0,0,0,21,3.33,6.00000
Jake Wong,CIN,27,1,0,0,0,3,6,3,0,3,0,0,0,0,0,0,9,3,0.00000
Nick Burdi,CHC,31,3,0,0,0,3,3,3,4,3,0,0,0,0,0,0,9,2,0.00000
Sean Nolin,MIA,34,1,0,0,0,3,7,6,2,2,2,0,0,0,0,0,18,3,6.00000
Alex Colome,CWS,35,4,0,0,0,3,2,2,2,3,1,0,1,0,1,0,6,1.67,3.00000
Shane Greene,CHC,35,2,0,0,0,3,2,0,3,2,0,0,0,0,0,0,0,1.33,0.00000
Jose Rodriguez,SEA,28,1,0,0,0,3,3,3,1,1,0,0,0,0,0,0,9,1.33,0.00000
Victor Mederos,LAA,22,3,0,0,0,3,5,3,3,3,0,0,0,0,0,0,9,2.67,0.00000
Rico Garcia,WAS,30,3,0,0,0,3,6,4,4,1,1,0,0,0,0,0,12,2.33,3.00000
Orion Kerkering,PHI,22,3,0,0,0,3,3,1,6,2,0,1,0,0,0,1,3,1.67,0.00000
Braden Bristo,TB,29,1,0,0,0,3,0,0,4,1,0,0,0,1,0,0,0,0.33,0.00000
Nick Hernandez,SD,29,2,0,0,0,3,3,4,5,4,1,0,0,0,0,0,12,2.33,3.00000
Alek Jacob,SD,25,3,0,0,0,3,0,0,5,1,0,0,0,0,0,0,0,0.33,0.00000
Daniel Hudson,LAD,37,3,0,0,0,3,2,0,5,3,0,0,0,1,0,1,0,1.67,0.00000
Reed Garrett,BAL,31,2,0,0,0,2.2,7,3,0,1,0,0,0,0,0,0,10.13,3,0.00000
Bennett Sousa,MIL,28,2,0,0,0,2.2,5,4,2,2,1,0,0,0,0,0,13.5,2.63,4.09091
Anthony Misiewicz,NYY,29,3,0,0,0,2.2,2,1,2,3,0,1,0,0,1,1,3.38,1.88,0.00000
Michael Mariot,CIN,35,1,0,0,0,2.2,4,1,2,1,1,0,0,0,0,0,3.38,1.88,4.09091
Thomas Pannone,MIL,29,1,0,0,0,2.2,5,2,4,1,0,0,0,0,0,1,6.75,2.25,0.00000
Randy Wynne,CIN,31,1,0,0,0,2.1,3,1,0,1,0,0,1,0,0,0,3.86,1.71,0.00000
Cole Waites,SF,25,3,0,0,0,2.1,6,4,2,2,0,0,0,0,0,0,15.43,3.43,0.00000
Caleb Boushley,MIL,30,1,0,0,0,2.1,1,1,5,2,1,1,0,0,1,0,3.86,1.29,4.28571
Anthony Veneziano,KC,26,2,0,0,0,2.1,2,0,1,2,0,0,0,0,1,0,0,1.71,0.00000
Eduard Bazardo,BAL,28,3,0,0,0,2.1,6,4,1,0,0,0,0,0,0,0,15.43,2.57,0.00000
Guillermo Zuniga,STL,25,2,0,0,0,2,2,1,4,0,0,0,0,0,0,0,4.5,1,0.00000
Jose Lopez,TB,25,1,0,0,0,2,3,1,2,1,0,0,0,0,0,0,4.5,2,0.00000
Devin Sweet,SEA,27,2,0,0,0,2,2,2,1,1,1,0,0,0,0,0,9,1.5,4.50000
Yoendrys Gomez,NYY,24,1,0,0,0,2,1,0,4,0,0,0,0,0,0,0,0,0.5,0.00000
Nabil Crismatt,ARI,29,1,0,0,0,2,2,0,3,0,0,0,1,0,0,0,0,1,0.00000
Tyson Miller,NYM,28,1,0,0,0,2,0,0,0,2,0,1,0,0,0,0,0,1,0.00000
Alex Speas,TEX,26,3,0,0,0,2,2,3,4,5,0,0,2,0,1,1,13.5,3.5,0.00000
Dinelson Lamet,BOS,31,1,0,0,0,2,4,3,1,1,1,0,0,0,0,0,13.5,2.5,4.50000
Konnor Pilkington,CLE,26,1,0,0,0,2,1,0,2,1,0,0,0,0,0,0,0,1,0.00000
Kyle Hurt,LAD,25,1,0,0,0,2,0,0,3,0,0,0,0,0,0,0,0,0,0.00000
Tyler Duffey,CHC,33,1,0,0,0,2,1,1,3,0,1,0,0,0,0,0,4.5,0.5,4.50000
Jake Faria,BOS,30,1,0,0,0,2,4,5,3,4,0,0,0,0,0,0,22.5,4,0.00000
Ryan Tepera,STL,36,2,0,0,0,2,3,2,1,1,1,0,0,0,0,2,9,2,4.50000
T.J. McFarland,NYM,34,3,0,0,0,1.2,4,1,2,1,0,0,1,0,0,0,5.4,3,0.00000
Yacksel Rios,OAK,30,3,0,0,0,1.2,3,7,2,6,1,0,0,0,0,0,37.8,5.4,7.50000
Prelander Berroa,SEA,23,2,0,0,0,1.2,0,0,3,3,0,0,0,0,0,1,0,1.8,0.00000
Tyler Cyr,LAD,30,2,0,0,0,1.2,1,0,2,0,0,0,0,0,0,0,0,0.6,0.00000
Austin Warren,LAA,28,2,0,0,0,1.2,2,1,2,0,1,1,0,0,0,0,5.4,1.2,7.50000
Kyle Leahy,STL,26,3,0,0,0,1.2,4,4,2,5,1,0,1,0,1,0,21.6,5.4,7.50000
Kelvin Caceres,LAA,24,2,0,0,0,1.1,2,1,1,2,0,0,0,0,0,0,6.75,3,0.00000
Peter Strzelecki,ARI,29,1,0,0,0,1.1,1,0,0,2,0,0,0,0,0,0,0,2.25,0.00000
Reyes Moronta,LAA,31,2,0,0,0,1.1,4,1,2,3,1,0,0,0,0,0,6.75,5.25,8.18182
Heath Hembree,TB,35,1,0,0,0,1.1,0,0,2,1,0,0,0,0,0,0,0,0.75,0.00000
Frankie Montas,NYY,31,1,0,0,0,1.1,2,0,1,1,0,1,0,0,0,0,0,2.25,0.00000
Adam Kolarek,LAD,35,1,0,0,0,1.1,1,0,2,0,0,0,0,0,0,0,0,0.75,0.00000
J.B. Bukauskas,SEA,27,1,0,0,0,1,2,1,1,2,0,0,0,0,1,0,9,4,0.00000
Tanner Rainey,WAS,31,1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,2,0.00000
Alec Mills,CIN,32,1,0,0,0,1,4,2,0,1,1,0,0,0,0,0,18,5,9.00000
Erich Uelmen,PHI,27,1,0,0,0,1,3,4,1,2,0,0,0,0,0,0,36,5,0.00000
Ryder Ryan,SEA,28,1,0,0,0,1,0,0,2,1,0,0,0,0,0,0,0,1,0.00000
Blair Calvo,COL,28,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0.00000
Ricky Karcher,CIN,26,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0.00000
Jose Espada,SD,27,1,0,0,0,1,0,0,2,2,0,0,0,0,0,0,0,2,0.00000
Chris Vallimont,BAL,27,1,0,0,0,0.2,1,0,1,0,0,0,0,0,0,0,0,1.5,0.00000
Dereck Rodriguez,MIN,31,1,0,0,0,0.2,1,1,0,1,0,0,0,0,0,0,13.5,3,0.00000
Johan Quezada,MIA,29,1,0,0,0,0.2,1,3,0,5,0,0,0,0,0,0,40.5,9,0.00000
Jake Reed,LAD,31,1,0,0,0,0.2,5,6,1,1,1,0,0,0,0,0,81,9,45.00000
Alex Claudio,MIL,32,1,0,0,0,0.1,2,0,0,0,0,0,0,0,0,0,0,6,0.00000
Jose Castillo,SD,28,1,0,0,0,0.1,2,4,0,2,0,0,0,0,0,0,108,12,0.00000
Riley Pint,COL,26,1,0,0,0,0.1,1,1,0,3,0,0,0,0,0,0,27,12,0.00000
Taylor Hearn,ATL,29,1,0,0,0,0.1,2,4,0,2,1,0,0,0,0,0,108,12,90.00000
Hector Perez,TB,27,1,0,0,0,0.1,3,1,0,1,0,0,0,0,0,0,27,12,0.00000
Hagen Danner,TOR,25,1,0,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0.00000
Anthony Misiewicz,DET,29,1,0,0,0,0.1,4,3,0,0,1,0,0,0,0,0,81,12,90.00000
Robert Garcia,MIA,27,1,0,0,0,0.1,1,0,0,1,0,0,0,0,0,0,0,6,0.00000
    `;

let data = `Date,Game Type,,Away,,Home,HR Away,HR Home,,HR Total,,
20230330,0,Thu,MIL,NL,CHN,0,0,,0,,
20230330,0,Thu,PIT,NL,CIN,1,1,,2,,
20230330,0,Thu,ARI,NL,LAN,0,1,,1,,
20230330,0,Thu,NYN,NL,MIA,0,1,,1,,
20230330,0,Thu,COL,NL,SDN,3,0,,3,,11
20230330,0,Thu,TOR,AL,SLN,0,2,,2,,
20230330,0,Thu,ATL,NL,WAS,0,0,,0,,#N/A
20230330,0,Thu,BAL,AL,BOS,2,0,,2,,
20230330,0,Thu,CHA,AL,HOU,1,1,,2,,
20230330,0,Thu,MIN,AL,KCA,0,0,,0,,
20230330,0,Thu,SFN,NL,NYA,0,2,,2,,
20230330,0,Thu,ANA,AL,OAK,0,0,,0,,
20230330,0,Thu,CLE,AL,SEA,0,1,,1,,
20230330,0,Thu,DET,AL,TBA,0,2,,2,,
20230330,0,Thu,PHI,NL,TEX,1,2,,3,,
20230331,0,Fri,ARI,NL,LAN,1,1,,2,,
20230331,0,Fri,NYN,NL,MIA,1,2,,3,,
20230331,0,Fri,COL,NL,SDN,1,0,,1,,
20230331,0,Fri,CHA,AL,HOU,0,1,,1,,
20230331,0,Fri,CLE,AL,SEA,0,0,,0,,
20230401,0,Sat,MIL,NL,CHN,0,1,,1,,
20230401,0,Sat,PIT,NL,CIN,0,3,,3,,
20230401,0,Sat,ARI,NL,LAN,1,4,,5,,
20230401,0,Sat,NYN,NL,MIA,1,1,,2,,
20230401,0,Sat,COL,NL,SDN,1,1,,2,,
20230401,0,Sat,TOR,AL,SLN,0,0,,0,,
20230401,0,Sat,ATL,NL,WAS,4,1,,5,,
20230401,0,Sat,BAL,AL,BOS,3,4,,7,,
20230401,0,Sat,CHA,AL,HOU,2,0,,2,,
20230401,0,Sat,MIN,AL,KCA,0,0,,0,,
20230401,0,Sat,SFN,NL,NYA,2,2,,4,,
20230401,0,Sat,ANA,AL,OAK,1,1,,2,,
20230401,0,Sat,CLE,AL,SEA,2,0,,2,,
20230401,0,Sat,DET,AL,TBA,0,1,,1,,
20230401,0,Sat,PHI,NL,TEX,0,3,,3,,
20230402,0,Sun,MIL,NL,CHN,0,2,,2,,
20230402,0,Sun,PIT,NL,CIN,1,2,,3,,
20230402,0,Sun,ARI,NL,LAN,0,1,,1,,
20230402,0,Sun,NYN,NL,MIA,1,0,,1,,
20230402,0,Sun,COL,NL,SDN,1,2,,3,,
20230402,0,Sun,TOR,AL,SLN,0,4,,4,,
20230402,0,Sun,ATL,NL,WAS,0,0,,0,,
20230402,0,Sun,BAL,AL,BOS,2,1,,3,,
20230402,0,Sun,CHA,AL,HOU,2,0,,2,,
20230402,0,Sun,MIN,AL,KCA,2,2,,4,,
20230402,0,Sun,SFN,NL,NYA,0,3,,3,,
20230402,0,Sun,ANA,AL,OAK,3,0,,3,,
20230402,0,Sun,CLE,AL,SEA,1,1,,2,,
20230402,0,Sun,DET,AL,TBA,1,1,,2,,
20230402,0,Sun,PHI,NL,TEX,0,1,,1,,
20230403,0,Mon,CHN,NL,CIN,1,1,,2,,
20230403,0,Mon,COL,NL,LAN,0,3,,3,,
20230403,0,Mon,MIN,AL,MIA,4,0,,4,,
20230403,0,Mon,NYN,NL,MIL,0,2,,2,,
20230403,0,Mon,ARI,NL,SDN,2,3,,5,,
20230403,0,Mon,ATL,NL,SLN,3,1,,4,,
20230403,0,Mon,TBA,AL,WAS,3,1,,4,,
20230403,0,Mon,PIT,NL,BOS,3,3,,6,,
20230403,0,Mon,SFN,NL,CHA,7,1,,8,,
20230403,0,Mon,DET,AL,HOU,2,1,,3,,
20230403,0,Mon,TOR,AL,KCA,1,1,,2,,
20230403,0,Mon,PHI,NL,NYA,0,2,,2,,
20230403,0,Mon,CLE,AL,OAK,1,3,,4,,
20230403,0,Mon,ANA,AL,SEA,2,0,,2,,
20230403,0,Mon,BAL,AL,TEX,2,0,,2,,
20230404,0,Tue,CHN,NL,CIN,0,3,,3,,
20230404,0,Tue,COL,NL,LAN,0,3,,3,,
20230404,0,Tue,MIN,AL,MIA,0,1,,1,,
20230404,0,Tue,NYN,NL,MIL,0,5,,5,,
20230404,0,Tue,ARI,NL,SDN,0,3,,3,,
20230404,0,Tue,ATL,NL,SLN,2,0,,2,,
20230404,0,Tue,TBA,AL,WAS,4,0,,4,,
20230404,0,Tue,PIT,NL,BOS,2,0,,2,,
20230404,0,Tue,DET,AL,HOU,1,1,,2,,
20230404,0,Tue,TOR,AL,KCA,1,1,,2,,
20230404,0,Tue,PHI,NL,NYA,2,1,,3,,
20230404,0,Tue,CLE,AL,OAK,1,0,,1,,
20230404,0,Tue,ANA,AL,SEA,0,4,,4,,
20230404,0,Tue,BAL,AL,TEX,2,2,,4,,
20230405,0,Wed,MIN,AL,MIA,0,2,,2,,
20230405,0,Wed,NYN,NL,MIL,2,2,,4,,
20230405,0,Wed,ATL,NL,SLN,1,1,,2,,
20230405,0,Wed,TBA,AL,WAS,2,0,,2,,
20230405,0,Wed,PIT,NL,BOS,1,0,,1,,
20230405,0,Wed,SFN,NL,CHA,1,0,,1,,
20230405,0,Wed,DET,AL,HOU,0,3,,3,,
20230405,0,Wed,TOR,AL,KCA,1,0,,1,,
20230405,0,Wed,PHI,NL,NYA,1,1,,2,,
20230405,0,Wed,CLE,AL,OAK,0,2,,2,,
20230405,0,Wed,ANA,AL,SEA,1,0,,1,,
20230405,0,Wed,BAL,AL,TEX,0,1,,1,,
20230406,0,Thu,LAN,NL,ARI,1,0,,1,,
20230406,0,Thu,SDN,NL,ATL,2,1,,3,,
20230406,0,Thu,WAS,NL,COL,0,0,,0,,
20230406,0,Thu,SFN,NL,CHA,5,0,,5,,
20230406,0,Thu,BOS,AL,DET,2,1,,3,,
20230406,0,Thu,TOR,AL,KCA,2,1,,3,,
20230407,0,Fri,LAN,NL,ARI,2,2,,4,,
20230407,0,Fri,SDN,NL,ATL,0,1,,1,,
20230407,0,Fri,TEX,AL,CHN,0,0,,0,,
20230407,0,Fri,WAS,NL,COL,2,1,,3,,
20230407,0,Fri,SLN,NL,MIL,0,1,,1,,
20230407,0,Fri,MIA,NL,NYN,1,3,,4,,
20230407,0,Fri,CIN,NL,PHI,0,2,,2,,
20230407,0,Fri,CHA,AL,PIT,4,2,,6,,
20230407,0,Fri,KCA,AL,SFN,2,0,,2,,
20230407,0,Fri,TOR,AL,ANA,1,1,,2,,
20230407,0,Fri,NYA,AL,BAL,1,0,,1,,
20230407,0,Fri,SEA,AL,CLE,1,0,,1,,
20230407,0,Fri,HOU,AL,MIN,0,0,,0,,
20230407,0,Fri,OAK,AL,TBA,2,5,,7,,
20230408,0,Sat,LAN,NL,ARI,2,2,,4,,
20230408,0,Sat,SDN,NL,ATL,1,0,,1,,
20230408,0,Sat,TEX,AL,CHN,0,2,,2,,
20230408,0,Sat,WAS,NL,COL,1,1,,2,,
20230408,0,Sat,SLN,NL,MIL,2,0,,2,,
20230408,0,Sat,MIA,NL,NYN,1,2,,3,,
20230408,0,Sat,CIN,NL,PHI,1,0,,1,,
20230408,0,Sat,CHA,AL,PIT,0,1,,1,,
20230408,0,Sat,KCA,AL,SFN,3,1,,4,,
20230408,0,Sat,TOR,AL,ANA,3,3,,6,,
20230408,0,Sat,NYA,AL,BAL,1,0,,1,,
20230408,0,Sat,SEA,AL,CLE,0,0,,0,,
20230408,0,Sat,BOS,AL,DET,4,0,,4,,
20230408,0,Sat,HOU,AL,MIN,2,2,,4,,
20230408,0,Sat,OAK,AL,TBA,0,3,,3,,
20230409,0,Sun,LAN,NL,ARI,0,0,,0,,
20230409,0,Sun,SDN,NL,ATL,3,0,,3,,
20230409,0,Sun,TEX,AL,CHN,0,1,,1,,
20230409,0,Sun,WAS,NL,COL,0,2,,2,,
20230409,0,Sun,SLN,NL,MIL,0,2,,2,,
20230409,0,Sun,MIA,NL,NYN,2,0,,2,,
20230409,0,Sun,CIN,NL,PHI,0,1,,1,,
20230409,0,Sun,CHA,AL,PIT,0,0,,0,,
20230409,0,Sun,KCA,AL,SFN,0,1,,1,,
20230409,0,Sun,TOR,AL,ANA,1,4,,5,,
20230409,0,Sun,NYA,AL,BAL,3,1,,4,,
20230409,0,Sun,SEA,AL,CLE,1,0,,1,,
20230409,0,Sun,BOS,AL,DET,1,0,,1,,
20230409,0,Sun,HOU,AL,MIN,1,0,,1,,
20230409,0,Sun,OAK,AL,TBA,0,3,,3,,
20230410,0,Mon,MIL,NL,ARI,0,1,,1,,
20230410,0,Mon,CIN,NL,ATL,0,1,,1,,
20230410,0,Mon,SEA,AL,CHN,1,0,,1,,
20230410,0,Mon,SLN,NL,COL,0,0,,0,,
20230410,0,Mon,SDN,NL,NYN,0,0,,0,,
20230410,0,Mon,MIA,NL,PHI,1,3,,4,,
20230410,0,Mon,HOU,AL,PIT,0,1,,1,,
20230410,0,Mon,LAN,NL,SFN,3,1,,4,,
20230410,0,Mon,WAS,NL,ANA,0,1,,1,,
20230410,0,Mon,OAK,AL,BAL,0,3,,3,,
20230410,0,Mon,NYA,AL,CLE,0,0,,0,,
20230410,0,Mon,CHA,AL,MIN,1,0,,1,,
20230410,0,Mon,BOS,AL,TBA,0,1,,1,,
20230410,0,Mon,KCA,AL,TEX,1,3,,4,,
20230411,0,Tue,MIL,NL,ARI,3,0,,3,,
20230411,0,Tue,CIN,NL,ATL,1,2,,3,,
20230411,0,Tue,SEA,AL,CHN,2,2,,4,,
20230411,0,Tue,SLN,NL,COL,3,3,,6,,
20230411,0,Tue,SDN,NL,NYN,1,0,,1,,
20230411,0,Tue,MIA,NL,PHI,2,1,,3,,
20230411,0,Tue,HOU,AL,PIT,2,3,,5,,
20230411,0,Tue,LAN,NL,SFN,0,2,,2,,
20230411,0,Tue,WAS,NL,ANA,0,1,,1,,
20230411,0,Tue,OAK,AL,BAL,1,3,,4,,
20230411,0,Tue,NYA,AL,CLE,1,0,,1,,
20230411,0,Tue,CHA,AL,MIN,1,2,,3,,
20230411,0,Tue,BOS,AL,TBA,0,4,,4,,
20230411,0,Tue,KCA,AL,TEX,0,1,,1,,
20230411,0,Tue,DET,AL,TOR,1,5,,6,,
20230412,0,Wed,MIL,NL,ARI,0,2,,2,,
20230412,0,Wed,CIN,NL,ATL,0,1,,1,,
20230412,0,Wed,SEA,AL,CHN,2,1,,3,,
20230412,0,Wed,SLN,NL,COL,3,1,,4,,
20230412,0,Wed,SDN,NL,NYN,1,2,,3,,
20230412,0,Wed,MIA,NL,PHI,1,0,,1,,
20230412,0,Wed,HOU,AL,PIT,2,0,,2,,
20230412,0,Wed,LAN,NL,SFN,3,1,,4,,
20230412,0,Wed,WAS,NL,ANA,0,0,,0,,
20230412,0,Wed,OAK,AL,BAL,2,0,,2,,
20230412,0,Wed,NYA,AL,CLE,1,1,,2,,
20230412,0,Wed,CHA,AL,MIN,1,0,,1,,
20230412,0,Wed,BOS,AL,TBA,1,1,,2,,
20230412,0,Wed,KCA,AL,TEX,1,1,,2,,
20230412,0,Wed,DET,AL,TOR,2,0,,2,,
20230413,0,Thu,PHI,NL,CIN,1,0,,1,,
20230413,0,Thu,MIL,NL,SDN,2,2,,4,,
20230413,0,Thu,PIT,NL,SLN,2,0,,2,,
20230413,0,Thu,OAK,AL,BAL,2,2,,4,,
20230413,0,Thu,MIN,AL,NYA,4,2,,6,,
20230413,0,Thu,BOS,AL,TBA,1,2,,3,,
20230413,0,Thu,DET,AL,TOR,0,0,,0,,
20230414,0,Fri,PHI,NL,CIN,1,0,,1,,
20230414,0,Fri,CHN,NL,LAN,5,2,,7,,
20230414,0,Fri,ARI,NL,MIA,0,0,,0,,
20230414,0,Fri,MIL,NL,SDN,3,1,,4,,
20230414,0,Fri,PIT,NL,SLN,0,0,,0,,
20230414,0,Fri,CLE,AL,WAS,1,1,,2,,
20230414,0,Fri,ANA,AL,BOS,0,1,,1,,
20230414,0,Fri,BAL,AL,CHA,0,1,,1,,
20230414,0,Fri,SFN,NL,DET,2,1,,3,,
20230414,0,Fri,TEX,AL,HOU,1,2,,3,,
20230414,0,Fri,ATL,NL,KCA,5,0,,5,,
20230414,0,Fri,MIN,AL,NYA,2,3,,5,,
20230414,0,Fri,NYN,NL,OAK,1,3,,4,,
20230414,0,Fri,COL,NL,SEA,1,1,,2,,
20230414,0,Fri,TBA,AL,TOR,2,1,,3,,
20230415,0,Sat,PHI,NL,CIN,0,2,,2,,
20230415,0,Sat,CHN,NL,LAN,1,0,,1,,
20230415,0,Sat,ARI,NL,MIA,0,1,,1,,
20230415,0,Sat,MIL,NL,SDN,0,2,,2,,
20230415,0,Sat,PIT,NL,SLN,2,0,,2,,
20230415,0,Sat,CLE,AL,WAS,1,0,,1,,
20230415,0,Sat,ANA,AL,BOS,1,2,,3,,
20230415,0,Sat,BAL,AL,CHA,2,1,,3,,
20230415,0,Sat,SFN,NL,DET,2,1,,3,,
20230415,0,Sat,TEX,AL,HOU,0,0,,0,,
20230415,0,Sat,ATL,NL,KCA,1,0,,1,,
20230415,0,Sat,MIN,AL,NYA,0,2,,2,,
20230415,0,Sat,NYN,NL,OAK,2,0,,2,,
20230415,0,Sat,COL,NL,SEA,0,1,,1,,
20230415,0,Sat,TBA,AL,TOR,1,0,,1,,
20230416,0,Sun,PHI,NL,CIN,2,0,,2,,
20230416,0,Sun,CHN,NL,LAN,2,1,,3,,
20230416,0,Sun,ARI,NL,MIA,1,0,,1,,
20230416,0,Sun,MIL,NL,SDN,0,0,,0,,
20230416,0,Sun,PIT,NL,SLN,0,1,,1,,
20230416,0,Sun,CLE,AL,WAS,0,2,,2,,
20230416,0,Sun,ANA,AL,BOS,0,1,,1,,
20230416,0,Sun,BAL,AL,CHA,0,2,,2,,
20230416,0,Sun,TEX,AL,HOU,1,0,,1,,
20230416,0,Sun,ATL,NL,KCA,1,1,,2,,
20230416,0,Sun,MIN,AL,NYA,0,1,,1,,
20230416,0,Sun,NYN,NL,OAK,3,0,,3,,
20230416,0,Sun,COL,NL,SEA,0,0,,0,,
20230416,0,Sun,TBA,AL,TOR,1,0,,1,,
20230417,0,Mon,TBA,AL,CIN,1,1,,2,,
20230417,0,Mon,PIT,NL,COL,2,1,,3,,
20230417,0,Mon,NYN,NL,LAN,1,3,,4,,
20230417,0,Mon,SFN,NL,MIA,0,1,,1,,
20230417,0,Mon,ATL,NL,SDN,1,0,,1,,
20230417,0,Mon,ARI,NL,SLN,2,1,,3,,
20230417,0,Mon,ANA,AL,BOS,1,0,,1,,
20230417,0,Mon,TOR,AL,HOU,2,2,,4,,
20230417,0,Mon,TEX,AL,KCA,2,0,,2,,
20230417,0,Mon,CHN,NL,OAK,2,0,,2,,
20230417,0,Mon,MIL,NL,SEA,1,2,,3,,
20230418,0,Tue,TBA,AL,CIN,4,0,,4,,
20230418,0,Tue,PIT,NL,COL,2,1,,3,,
20230418,0,Tue,NYN,NL,LAN,0,2,,2,,
20230418,0,Tue,SFN,NL,MIA,1,1,,2,,
20230418,0,Tue,ATL,NL,SDN,3,0,,3,,
20230418,0,Tue,ARI,NL,SLN,1,3,,4,,
20230418,0,Tue,BAL,AL,WAS,0,0,,0,,
20230418,0,Tue,MIN,AL,BOS,1,0,,1,,
20230418,1,Tue,PHI,NL,CHA,1,0,,1,,
20230418,2,Tue,PHI,NL,CHA,0,1,,1,,
20230418,1,Tue,CLE,AL,DET,1,1,,2,,
20230418,2,Tue,CLE,AL,DET,0,1,,1,,
20230418,0,Tue,TOR,AL,HOU,2,0,,2,,
20230418,0,Tue,TEX,AL,KCA,2,0,,2,,
20230418,0,Tue,ANA,AL,NYA,1,0,,1,,
20230418,0,Tue,CHN,NL,OAK,0,0,,0,,
20230418,0,Tue,MIL,NL,SEA,2,0,,2,,
20230419,0,Wed,TBA,AL,CIN,1,0,,1,,
20230419,0,Wed,PIT,NL,COL,2,0,,2,,
20230419,0,Wed,NYN,NL,LAN,1,1,,2,,
20230419,0,Wed,SFN,NL,MIA,2,0,,2,,
20230419,0,Wed,ATL,NL,SDN,0,1,,1,,
20230419,0,Wed,ARI,NL,SLN,2,2,,4,,
20230419,0,Wed,BAL,AL,WAS,1,0,,1,,
20230419,0,Wed,MIN,AL,BOS,3,1,,4,,
20230419,0,Wed,PHI,NL,CHA,2,1,,3,,
20230419,0,Wed,CLE,AL,DET,1,2,,3,,
20230419,0,Wed,TOR,AL,HOU,0,1,,1,,
20230419,0,Wed,TEX,AL,KCA,1,1,,2,,
20230419,0,Wed,ANA,AL,NYA,0,1,,1,,
20230419,0,Wed,CHN,NL,OAK,1,0,,1,,
20230419,0,Wed,MIL,NL,SEA,0,1,,1,,
20230420,0,Thu,SDN,NL,ARI,2,0,,2,,
20230420,0,Thu,LAN,NL,CHN,3,1,,4,,
20230420,0,Thu,COL,NL,PHI,1,0,,1,,
20230420,0,Thu,CIN,NL,PIT,0,2,,2,,
20230420,0,Thu,NYN,NL,SFN,3,2,,5,,
20230420,0,Thu,MIN,AL,BOS,1,2,,3,,
20230420,0,Thu,ANA,AL,NYA,0,0,,0,,
20230421,0,Fri,SDN,NL,ARI,0,0,,0,,
20230421,0,Fri,HOU,AL,ATL,1,0,,1,,
20230421,0,Fri,LAN,NL,CHN,0,4,,4,,
20230421,0,Fri,BOS,AL,MIL,1,1,,2,,
20230421,0,Fri,COL,NL,PHI,1,1,,2,,
20230421,0,Fri,CIN,NL,PIT,0,0,,0,,
20230421,0,Fri,NYN,NL,SFN,1,0,,1,,
20230421,0,Fri,KCA,AL,ANA,0,1,,1,,
20230421,0,Fri,DET,AL,BAL,0,1,,1,,
20230421,0,Fri,WAS,NL,MIN,1,1,,2,,
20230421,0,Fri,TOR,AL,NYA,2,1,,3,,
20230421,0,Fri,SLN,NL,SEA,0,1,,1,,
20230421,0,Fri,CHA,AL,TBA,1,3,,4,,
20230421,0,Fri,OAK,AL,TEX,2,1,,3,,
20230422,0,Sat,SDN,NL,ARI,1,1,,2,,
20230422,0,Sat,HOU,AL,ATL,2,2,,4,,
20230422,0,Sat,LAN,NL,CHN,4,1,,5,,
20230422,0,Sat,BOS,AL,MIL,2,1,,3,,
20230422,0,Sat,COL,NL,PHI,0,3,,3,,
20230422,0,Sat,CIN,NL,PIT,0,0,,0,,
20230422,0,Sat,NYN,NL,SFN,1,2,,3,,
20230422,0,Sat,KCA,AL,ANA,0,4,,4,,
20230422,0,Sat,DET,AL,BAL,1,1,,2,,
20230422,1,Sat,MIA,NL,CLE,1,0,,1,,
20230422,2,Sat,MIA,NL,CLE,0,0,,0,,
20230422,0,Sat,WAS,NL,MIN,1,1,,2,,
20230422,0,Sat,TOR,AL,NYA,1,1,,2,,
20230422,0,Sat,SLN,NL,SEA,1,2,,3,,
20230422,0,Sat,CHA,AL,TBA,3,1,,4,,
20230422,0,Sat,OAK,AL,TEX,1,4,,5,,
20230423,0,Sun,SDN,NL,ARI,1,3,,4,,
20230423,0,Sun,HOU,AL,ATL,0,1,,1,,
20230423,0,Sun,LAN,NL,CHN,3,1,,4,,
20230423,0,Sun,BOS,AL,MIL,3,2,,5,,
20230423,0,Sun,COL,NL,PHI,0,4,,4,,
20230423,0,Sun,CIN,NL,PIT,0,0,,0,,
20230423,0,Sun,NYN,NL,SFN,1,1,,2,,
20230423,0,Sun,KCA,AL,ANA,3,3,,6,,
20230423,0,Sun,DET,AL,BAL,0,0,,0,,
20230423,0,Sun,MIA,NL,CLE,2,2,,4,,
20230423,0,Sun,WAS,NL,MIN,0,2,,2,,
20230423,0,Sun,TOR,AL,NYA,2,1,,3,,
20230423,0,Sun,SLN,NL,SEA,3,1,,4,,
20230423,0,Sun,CHA,AL,TBA,0,2,,2,,
20230423,0,Sun,OAK,AL,TEX,1,1,,2,,
20230424,0,Mon,KCA,AL,ARI,1,0,,1,,
20230424,0,Mon,MIA,NL,ATL,0,5,,5,,
20230424,0,Mon,TEX,AL,CIN,2,0,,2,,
20230424,0,Mon,DET,AL,MIL,1,2,,3,,
20230424,0,Mon,SLN,NL,SFN,0,1,,1,,
20230424,0,Mon,OAK,AL,ANA,5,3,,8,,
20230424,0,Mon,BOS,AL,BAL,2,0,,2,,
20230424,0,Mon,COL,NL,CLE,1,0,,1,,
20230424,0,Mon,NYA,AL,MIN,0,1,,1,,
20230424,0,Mon,HOU,AL,TBA,2,0,,2,,
20230424,0,Mon,CHA,AL,TOR,0,1,,1,,
20230425,0,Tue,KCA,AL,ARI,0,0,,0,,
20230425,0,Tue,MIA,NL,ATL,2,3,,5,,
20230425,0,Tue,SDN,NL,CHN,0,1,,1,,
20230425,0,Tue,TEX,AL,CIN,3,0,,3,,
20230425,0,Tue,DET,AL,MIL,1,1,,2,,
20230425,0,Tue,WAS,NL,NYN,1,0,,1,,
20230425,0,Tue,SEA,AL,PHI,2,1,,3,,
20230425,0,Tue,LAN,NL,PIT,1,1,,2,,
20230425,0,Tue,SLN,NL,SFN,1,2,,3,,
20230425,0,Tue,OAK,AL,ANA,1,0,,1,,
20230425,0,Tue,BOS,AL,BAL,1,3,,4,,
20230425,0,Tue,COL,NL,CLE,1,0,,1,,
20230425,0,Tue,NYA,AL,MIN,0,2,,2,,
20230425,0,Tue,HOU,AL,TBA,0,0,,0,,
20230425,0,Tue,CHA,AL,TOR,0,2,,2,,
20230426,0,Wed,KCA,AL,ARI,0,0,,0,,
20230426,0,Wed,MIA,NL,ATL,3,2,,5,,
20230426,0,Wed,SDN,NL,CHN,0,1,,1,,
20230426,0,Wed,TEX,AL,CIN,0,1,,1,,
20230426,0,Wed,DET,AL,MIL,0,2,,2,,
20230426,0,Wed,WAS,NL,NYN,1,0,,1,,
20230426,0,Wed,SEA,AL,PHI,2,1,,3,,
20230426,0,Wed,LAN,NL,PIT,1,0,,1,,
20230426,0,Wed,SLN,NL,SFN,2,2,,4,,
20230426,0,Wed,OAK,AL,ANA,1,3,,4,,
20230426,0,Wed,BOS,AL,BAL,1,0,,1,,
20230426,0,Wed,COL,NL,CLE,0,1,,1,,
20230426,0,Wed,NYA,AL,MIN,1,3,,4,,
20230426,0,Wed,HOU,AL,TBA,0,0,,0,,
20230426,0,Wed,CHA,AL,TOR,0,1,,1,,
20230427,0,Thu,MIA,NL,ATL,0,0,,0,,
20230427,0,Thu,SDN,NL,CHN,1,3,,4,,
20230427,0,Thu,WAS,NL,NYN,2,1,,3,,
20230427,0,Thu,SEA,AL,PHI,0,0,,0,,
20230427,0,Thu,LAN,NL,PIT,0,2,,2,,
20230427,0,Thu,SLN,NL,SFN,2,0,,2,,
20230427,0,Thu,OAK,AL,ANA,2,1,,3,,
20230427,0,Thu,TBA,AL,CHA,3,1,,4,,
20230427,0,Thu,BAL,AL,DET,1,0,,1,,
20230427,0,Thu,KCA,AL,MIN,1,2,,3,,
20230427,0,Thu,NYA,AL,TEX,3,0,,3,,
20230428,0,Fri,ARI,NL,COL,1,0,,1,,
20230428,0,Fri,SLN,NL,LAN,0,2,,2,,
20230428,0,Fri,CHN,NL,MIA,1,0,,1,,
20230428,0,Fri,ANA,AL,MIL,0,1,,1,,
20230428,0,Fri,ATL,NL,NYN,1,0,,1,,
20230428,0,Fri,CLE,AL,BOS,2,0,,2,,
20230428,0,Fri,TBA,AL,CHA,1,2,,3,,
20230428,0,Fri,PHI,NL,HOU,1,1,,2,,
20230428,0,Fri,KCA,AL,MIN,1,3,,4,,
20230428,0,Fri,CIN,NL,OAK,1,2,,3,,
20230428,0,Fri,NYA,AL,TEX,0,1,,1,,
20230428,0,Fri,SEA,AL,TOR,1,1,,2,,
20230429,0,Sat,ARI,NL,COL,2,0,,2,,
20230429,0,Sat,SLN,NL,LAN,0,0,,0,,
20230429,0,Sat,CHN,NL,MIA,2,0,,2,,
20230429,0,Sat,ANA,AL,MIL,2,0,,2,,
20230429,0,Sat,SFN,NL,SDN,5,6,,11,,
20230429,1,Sat,PIT,NL,WAS,2,0,,2,,
20230429,2,Sat,PIT,NL,WAS,2,1,,3,,
20230429,0,Sat,CLE,AL,BOS,2,1,,3,,
20230429,0,Sat,TBA,AL,CHA,5,0,,5,,
20230429,1,Sat,BAL,AL,DET,2,1,,3,,
20230429,2,Sat,BAL,AL,DET,1,1,,2,,
20230429,0,Sat,PHI,NL,HOU,2,1,,3,,
20230429,0,Sat,KCA,AL,MIN,0,1,,1,,
20230429,0,Sat,CIN,NL,OAK,1,0,,1,,
20230429,0,Sat,NYA,AL,TEX,0,1,,1,,
20230429,0,Sat,SEA,AL,TOR,0,0,,0,,
20230430,0,Sun,ARI,NL,COL,1,1,,2,,
20230430,0,Sun,SLN,NL,LAN,0,0,,0,,
20230430,0,Sun,CHN,NL,MIA,1,0,,1,,
20230430,0,Sun,ANA,AL,MIL,2,0,,2,,
20230430,0,Sun,SFN,NL,SDN,3,1,,4,,
20230430,0,Sun,PIT,NL,WAS,0,0,,0,,
20230430,0,Sun,CLE,AL,BOS,0,2,,2,,
20230430,0,Sun,TBA,AL,CHA,4,2,,6,,
20230430,0,Sun,BAL,AL,DET,2,1,,3,,
20230430,0,Sun,PHI,NL,HOU,2,1,,3,,
20230430,0,Sun,KCA,AL,MIN,0,1,,1,,
20230430,0,Sun,CIN,NL,OAK,1,2,,3,,
20230430,0,Sun,NYA,AL,TEX,0,4,,4,,
20230430,0,Sun,SEA,AL,TOR,4,1,,5,,
20230501,0,Mon,PHI,NL,LAN,1,4,,5,,
20230501,1,Mon,ATL,NL,NYN,4,3,,7,,
20230501,2,Mon,ATL,NL,NYN,0,1,,1,,
20230501,0,Mon,CIN,NL,SDN,1,1,,2,,
20230501,0,Mon,CHN,NL,WAS,2,1,,3,,
20230501,0,Mon,TOR,AL,BOS,1,3,,4,,
20230501,0,Mon,SFN,NL,HOU,2,0,,2,,
20230501,0,Mon,CLE,AL,NYA,0,1,,1,,
20230502,0,Tue,MIL,NL,COL,0,2,,2,,
20230502,0,Tue,PHI,NL,LAN,1,1,,2,,
20230502,0,Tue,ATL,NL,MIA,1,0,,1,,
20230502,0,Tue,CIN,NL,SDN,0,0,,0,,
20230502,0,Tue,ANA,AL,SLN,1,0,,1,,
20230502,0,Tue,CHN,NL,WAS,1,0,,1,,
20230502,0,Tue,TOR,AL,BOS,1,4,,5,,
20230502,0,Tue,MIN,AL,CHA,1,1,,2,,
20230502,0,Tue,SFN,NL,HOU,0,0,,0,,
20230502,0,Tue,BAL,AL,KCA,2,4,,6,,
20230502,0,Tue,CLE,AL,NYA,0,2,,2,,
20230502,0,Tue,SEA,AL,OAK,1,0,,1,,
20230502,0,Tue,PIT,NL,TBA,0,1,,1,,
20230502,0,Tue,ARI,NL,TEX,2,1,,3,,
20230503,0,Wed,MIL,NL,COL,0,2,,2,,
20230503,0,Wed,PHI,NL,LAN,0,2,,2,,
20230503,0,Wed,ATL,NL,MIA,6,1,,7,,
20230503,0,Wed,CIN,NL,SDN,1,1,,2,,
20230503,0,Wed,ANA,AL,SLN,3,2,,5,,
20230503,0,Wed,CHN,NL,WAS,0,0,,0,,
20230503,0,Wed,TOR,AL,BOS,2,0,,2,,
20230503,0,Wed,MIN,AL,CHA,1,1,,2,,
20230503,1,Wed,NYN,NL,DET,3,2,,5,,
20230503,2,Wed,NYN,NL,DET,0,2,,2,,
20230503,0,Wed,SFN,NL,HOU,1,1,,2,,
20230503,0,Wed,BAL,AL,KCA,0,1,,1,,
20230503,0,Wed,CLE,AL,NYA,0,2,,2,,
20230503,0,Wed,SEA,AL,OAK,2,0,,2,,
20230503,0,Wed,PIT,NL,TBA,1,2,,3,,
20230503,0,Wed,ARI,NL,TEX,4,4,,8,,
20230504,0,Thu,MIL,NL,COL,3,0,,3,,
20230504,0,Thu,ATL,NL,MIA,2,1,,3,,
20230504,0,Thu,ANA,AL,SLN,1,1,,2,,
20230504,0,Thu,CHN,NL,WAS,0,2,,2,,
20230504,0,Thu,TOR,AL,BOS,1,2,,3,,
20230504,0,Thu,MIN,AL,CHA,2,1,,3,,
20230504,0,Thu,NYN,NL,DET,0,2,,2,,
20230504,0,Thu,BAL,AL,KCA,2,3,,5,,
20230504,0,Thu,SEA,AL,OAK,1,1,,2,,
20230504,0,Thu,PIT,NL,TBA,0,3,,3,,
20230505,0,Fri,WAS,NL,ARI,1,1,,2,,
20230505,0,Fri,BAL,AL,ATL,3,1,,4,,
20230505,0,Fri,MIA,NL,CHN,0,1,,1,,
20230505,0,Fri,CHA,AL,CIN,2,1,,3,,
20230505,0,Fri,COL,NL,NYN,0,1,,1,,
20230505,0,Fri,BOS,AL,PHI,0,0,,0,,
20230505,0,Fri,TOR,AL,PIT,1,0,,1,,
20230505,0,Fri,LAN,NL,SDN,0,2,,2,,
20230505,0,Fri,MIL,NL,SFN,0,2,,2,,
20230505,0,Fri,DET,AL,SLN,1,1,,2,,
20230505,0,Fri,TEX,AL,ANA,0,0,,0,,
20230505,0,Fri,MIN,AL,CLE,1,0,,1,,
20230505,0,Fri,OAK,AL,KCA,2,1,,3,,
20230505,0,Fri,HOU,AL,SEA,2,0,,2,,
20230505,0,Fri,NYA,AL,TBA,1,2,,3,,
20230506,0,Sat,WAS,NL,ARI,2,2,,4,,
20230506,0,Sat,BAL,AL,ATL,0,2,,2,,
20230506,0,Sat,MIA,NL,CHN,1,0,,1,,
20230506,0,Sat,CHA,AL,CIN,2,1,,3,,
20230506,0,Sat,COL,NL,NYN,1,0,,1,,
20230506,0,Sat,BOS,AL,PHI,0,2,,2,,
20230506,0,Sat,TOR,AL,PIT,0,1,,1,,
20230506,0,Sat,LAN,NL,SDN,1,0,,1,,
20230506,0,Sat,MIL,NL,SFN,0,2,,2,,
20230506,0,Sat,DET,AL,SLN,0,2,,2,,
20230506,0,Sat,TEX,AL,ANA,0,1,,1,,
20230506,0,Sat,MIN,AL,CLE,2,1,,3,,
20230506,0,Sat,OAK,AL,KCA,1,2,,3,,
20230506,0,Sat,HOU,AL,SEA,0,0,,0,,
20230506,0,Sat,NYA,AL,TBA,0,0,,0,,
20230507,0,Sun,WAS,NL,ARI,1,3,,4,,
20230507,0,Sun,BAL,AL,ATL,0,1,,1,,
20230507,0,Sun,MIA,NL,CHN,1,0,,1,,
20230507,0,Sun,CHA,AL,CIN,2,4,,6,,
20230507,0,Sun,COL,NL,NYN,3,1,,4,,
20230507,0,Sun,BOS,AL,PHI,1,1,,2,,
20230507,0,Sun,TOR,AL,PIT,3,0,,3,,
20230507,0,Sun,LAN,NL,SDN,2,0,,2,,
20230507,0,Sun,MIL,NL,SFN,2,1,,3,,
20230507,0,Sun,DET,AL,SLN,2,4,,6,,
20230507,0,Sun,TEX,AL,ANA,3,2,,5,,
20230507,0,Sun,MIN,AL,CLE,0,0,,0,,
20230507,0,Sun,OAK,AL,KCA,0,1,,1,,
20230507,0,Sun,HOU,AL,SEA,0,1,,1,,
20230507,0,Sun,NYA,AL,TBA,2,2,,4,,
20230508,0,Mon,MIA,NL,ARI,0,1,,1,,
20230508,0,Mon,SLN,NL,CHN,0,0,,0,,
20230508,0,Mon,LAN,NL,MIL,1,2,,3,,
20230508,0,Mon,COL,NL,PIT,0,1,,1,,
20230508,0,Mon,WAS,NL,SFN,0,1,,1,,
20230508,0,Mon,HOU,AL,ANA,1,1,,2,,
20230508,0,Mon,TBA,AL,BAL,2,0,,2,,
20230508,0,Mon,DET,AL,CLE,1,1,,2,,
20230508,0,Mon,CHA,AL,KCA,1,1,,2,,
20230508,0,Mon,OAK,AL,NYA,0,4,,4,,
20230508,0,Mon,TEX,AL,SEA,0,1,,1,,
20230509,0,Tue,MIA,NL,ARI,2,1,,3,,
20230509,0,Tue,BOS,AL,ATL,1,1,,2,,
20230509,0,Tue,SLN,NL,CHN,3,2,,5,,
20230509,0,Tue,NYN,NL,CIN,4,0,,4,,
20230509,0,Tue,LAN,NL,MIL,3,2,,5,,
20230509,0,Tue,TOR,AL,PHI,1,1,,2,,
20230509,0,Tue,COL,NL,PIT,2,0,,2,,
20230509,0,Tue,WAS,NL,SFN,0,1,,1,,
20230509,0,Tue,HOU,AL,ANA,1,1,,2,,
20230509,0,Tue,TBA,AL,BAL,2,1,,3,,
20230509,0,Tue,DET,AL,CLE,0,0,,0,,
20230509,0,Tue,CHA,AL,KCA,2,1,,3,,
20230509,0,Tue,SDN,NL,MIN,1,0,,1,,
20230509,0,Tue,OAK,AL,NYA,3,2,,5,,
20230509,0,Tue,TEX,AL,SEA,0,1,,1,,
20230510,0,Wed,MIA,NL,ARI,1,0,,1,,
20230510,0,Wed,BOS,AL,ATL,1,1,,2,,
20230510,0,Wed,SLN,NL,CHN,0,2,,2,,
20230510,0,Wed,NYN,NL,CIN,1,0,,1,,
20230510,0,Wed,LAN,NL,MIL,3,1,,4,,
20230510,0,Wed,TOR,AL,PHI,1,0,,1,,
20230510,0,Wed,COL,NL,PIT,0,2,,2,,
20230510,0,Wed,WAS,NL,SFN,2,2,,4,,
20230510,0,Wed,HOU,AL,ANA,1,2,,3,,
20230510,0,Wed,TBA,AL,BAL,0,0,,0,,
20230510,0,Wed,DET,AL,CLE,0,0,,0,,
20230510,0,Wed,CHA,AL,KCA,0,3,,3,,
20230510,0,Wed,SDN,NL,MIN,1,1,,2,,
20230510,0,Wed,OAK,AL,NYA,3,3,,6,,
20230510,0,Wed,TEX,AL,SEA,1,0,,1,,
20230511,0,Thu,SFN,NL,ARI,1,0,,1,,
20230511,0,Thu,NYN,NL,CIN,0,1,,1,,
20230511,0,Thu,CHA,AL,KCA,0,1,,1,,
20230511,0,Thu,SDN,NL,MIN,2,1,,3,,
20230511,0,Thu,TBA,AL,NYA,1,0,,1,,
20230511,0,Thu,TEX,AL,OAK,1,0,,1,,
20230512,0,Fri,SFN,NL,ARI,2,2,,4,,
20230512,0,Fri,PHI,NL,COL,2,0,,2,,
20230512,0,Fri,SDN,NL,LAN,0,2,,2,,
20230512,0,Fri,CIN,NL,MIA,3,2,,5,,
20230512,0,Fri,KCA,AL,MIL,1,1,,2,,
20230512,0,Fri,NYN,NL,WAS,0,0,,0,,
20230512,0,Fri,PIT,NL,BAL,1,1,,2,,
20230512,0,Fri,SLN,NL,BOS,3,2,,5,,
20230512,0,Fri,HOU,AL,CHA,1,1,,2,,
20230512,0,Fri,ANA,AL,CLE,0,1,,1,,
20230512,0,Fri,SEA,AL,DET,1,1,,2,,
20230512,0,Fri,CHN,NL,MIN,1,0,,1,,
20230512,0,Fri,TBA,AL,NYA,3,3,,6,,
20230512,0,Fri,TEX,AL,OAK,1,4,,5,,
20230512,0,Fri,ATL,NL,TOR,0,1,,1,,
20230513,0,Sat,SFN,NL,ARI,0,1,,1,,
20230513,0,Sat,PHI,NL,COL,1,0,,1,,
20230513,0,Sat,SDN,NL,LAN,2,1,,3,,
20230513,0,Sat,CIN,NL,MIA,1,2,,3,,
20230513,0,Sat,KCA,AL,MIL,1,2,,3,,
20230513,0,Sat,NYN,NL,WAS,0,1,,1,,
20230513,0,Sat,PIT,NL,BAL,0,2,,2,,
20230513,0,Sat,SLN,NL,BOS,1,0,,1,,
20230513,0,Sat,HOU,AL,CHA,0,1,,1,,
20230513,0,Sat,ANA,AL,CLE,2,2,,4,,
20230513,0,Sat,SEA,AL,DET,2,0,,2,,
20230513,0,Sat,CHN,NL,MIN,0,5,,5,,
20230513,0,Sat,TBA,AL,NYA,1,3,,4,,
20230513,0,Sat,TEX,AL,OAK,2,0,,2,,
20230513,0,Sat,ATL,NL,TOR,1,0,,1,,
20230514,0,Sun,SFN,NL,ARI,1,0,,1,,
20230514,0,Sun,PHI,NL,COL,0,1,,1,,
20230514,0,Sun,SDN,NL,LAN,0,1,,1,,
20230514,0,Sun,CIN,NL,MIA,0,0,,0,,
20230514,0,Sun,KCA,AL,MIL,3,3,,6,,
20230514,0,Sun,NYN,NL,WAS,0,0,,0,,
20230514,0,Sun,PIT,NL,BAL,0,0,,0,,
20230514,0,Sun,SLN,NL,BOS,3,0,,3,,
20230514,0,Sun,HOU,AL,CHA,1,2,,3,,
20230514,0,Sun,ANA,AL,CLE,0,1,,1,,
20230514,0,Sun,SEA,AL,DET,0,0,,0,,
20230514,0,Sun,CHN,NL,MIN,2,3,,5,,
20230514,0,Sun,TBA,AL,NYA,1,3,,4,,
20230514,0,Sun,TEX,AL,OAK,2,1,,3,,
20230514,0,Sun,ATL,NL,TOR,3,1,,4,,
20230515,0,Mon,CIN,NL,COL,0,3,,3,,
20230515,0,Mon,MIN,AL,LAN,2,3,,5,,
20230515,0,Mon,KCA,AL,SDN,0,0,,0,,
20230515,0,Mon,PHI,NL,SFN,1,1,,2,,
20230515,0,Mon,MIL,NL,SLN,0,4,,4,,
20230515,0,Mon,NYN,NL,WAS,0,1,,1,,
20230515,0,Mon,ANA,AL,BAL,2,3,,5,,
20230515,0,Mon,SEA,AL,BOS,3,0,,3,,
20230515,0,Mon,CHN,NL,HOU,1,1,,2,,
20230515,0,Mon,ARI,NL,OAK,2,1,,3,,
20230515,0,Mon,ATL,NL,TEX,5,0,,5,,
20230515,0,Mon,NYA,AL,TOR,3,0,,3,,
20230516,0,Tue,CIN,NL,COL,1,1,,2,,
20230516,0,Tue,MIN,AL,LAN,1,0,,1,,
20230516,0,Tue,WAS,NL,MIA,1,1,,2,,
20230516,0,Tue,TBA,AL,NYN,3,3,,6,,
20230516,0,Tue,KCA,AL,SDN,0,0,,0,,
20230516,0,Tue,PHI,NL,SFN,1,0,,1,,
20230516,0,Tue,MIL,NL,SLN,2,1,,3,,
20230516,0,Tue,ANA,AL,BAL,1,2,,3,,
20230516,0,Tue,SEA,AL,BOS,1,3,,4,,
20230516,0,Tue,CLE,AL,CHA,0,3,,3,,
20230516,0,Tue,PIT,NL,DET,0,0,,0,,
20230516,0,Tue,CHN,NL,HOU,2,0,,2,,
20230516,0,Tue,ARI,NL,OAK,2,3,,5,,
20230516,0,Tue,ATL,NL,TEX,2,2,,4,,
20230516,0,Tue,NYA,AL,TOR,2,1,,3,,
20230517,0,Wed,CIN,NL,COL,1,0,,1,,
20230517,0,Wed,MIN,AL,LAN,2,1,,3,,
20230517,0,Wed,WAS,NL,MIA,1,1,,2,,
20230517,0,Wed,TBA,AL,NYN,2,3,,5,,
20230517,0,Wed,KCA,AL,SDN,1,1,,2,,
20230517,0,Wed,PHI,NL,SFN,1,0,,1,,
20230517,0,Wed,MIL,NL,SLN,0,1,,1,,
20230517,0,Wed,ANA,AL,BAL,1,1,,2,,
20230517,0,Wed,SEA,AL,BOS,0,1,,1,,
20230517,0,Wed,CLE,AL,CHA,0,3,,3,,
20230517,0,Wed,PIT,NL,DET,1,0,,1,,
20230517,0,Wed,CHN,NL,HOU,3,2,,5,,
20230517,0,Wed,ARI,NL,OAK,2,1,,3,,
20230517,0,Wed,ATL,NL,TEX,3,2,,5,,
20230517,0,Wed,NYA,AL,TOR,0,1,,1,,
20230518,0,Thu,WAS,NL,MIA,1,1,,2,,
20230518,0,Thu,TBA,AL,NYN,1,1,,2,,
20230518,0,Thu,LAN,NL,SLN,2,7,,9,,
20230518,0,Thu,ANA,AL,BAL,2,2,,4,,
20230518,0,Thu,CLE,AL,CHA,1,0,,1,,
20230518,0,Thu,NYA,AL,TOR,2,1,,3,,
20230519,0,Fri,SEA,AL,ATL,0,1,,1,,
20230519,0,Fri,NYA,AL,CIN,2,0,,2,,
20230519,0,Fri,CLE,AL,NYN,2,3,,5,,
20230519,0,Fri,CHN,NL,PHI,1,0,,1,,
20230519,0,Fri,ARI,NL,PIT,1,1,,2,,
20230519,0,Fri,BOS,AL,SDN,2,1,,3,,
20230519,0,Fri,MIA,NL,SFN,1,0,,1,,
20230519,0,Fri,LAN,NL,SLN,1,0,,1,,
20230519,0,Fri,DET,AL,WAS,4,2,,6,,
20230519,0,Fri,MIN,AL,ANA,1,0,,1,,
20230519,0,Fri,KCA,AL,CHA,0,0,,0,,
20230519,0,Fri,OAK,AL,HOU,0,1,,1,,
20230519,0,Fri,MIL,NL,TBA,0,0,,0,,
20230519,0,Fri,COL,NL,TEX,0,1,,1,,
20230519,0,Fri,BAL,AL,TOR,3,0,,3,,
20230520,0,Sat,SEA,AL,ATL,1,1,,2,,
20230520,0,Sat,NYA,AL,CIN,2,1,,3,,
20230520,0,Sat,CHN,NL,PHI,2,2,,4,,
20230520,0,Sat,ARI,NL,PIT,2,0,,2,,
20230520,0,Sat,BOS,AL,SDN,1,2,,3,,
20230520,0,Sat,MIA,NL,SFN,0,0,,0,,
20230520,0,Sat,LAN,NL,SLN,1,1,,2,,
20230520,0,Sat,DET,AL,WAS,1,1,,2,,
20230520,0,Sat,MIN,AL,ANA,1,1,,2,,
20230520,0,Sat,KCA,AL,CHA,1,0,,1,,
20230520,0,Sat,OAK,AL,HOU,0,1,,1,,
20230520,0,Sat,MIL,NL,TBA,2,3,,5,,
20230520,0,Sat,COL,NL,TEX,0,2,,2,,
20230520,0,Sat,BAL,AL,TOR,2,2,,4,,
20230521,0,Sun,SEA,AL,ATL,2,1,,3,,
20230521,0,Sun,NYA,AL,CIN,2,0,,2,,
20230521,1,Sun,CLE,AL,NYN,1,2,,3,,
20230521,2,Sun,CLE,AL,NYN,1,1,,2,,
20230521,0,Sun,CHN,NL,PHI,1,1,,2,,
20230521,0,Sun,ARI,NL,PIT,1,0,,1,,
20230521,0,Sun,BOS,AL,SDN,0,1,,1,,
20230521,0,Sun,MIA,NL,SFN,2,2,,4,,
20230521,0,Sun,LAN,NL,SLN,0,1,,1,,
20230521,0,Sun,DET,AL,WAS,1,2,,3,,
20230521,0,Sun,MIN,AL,ANA,1,0,,1,,
20230521,0,Sun,KCA,AL,CHA,1,1,,2,,
20230521,0,Sun,OAK,AL,HOU,0,0,,0,,
20230521,0,Sun,MIL,NL,TBA,3,1,,4,,
20230521,0,Sun,COL,NL,TEX,0,3,,3,,
20230521,0,Sun,BAL,AL,TOR,0,1,,1,,
20230522,0,Mon,LAN,NL,ATL,3,1,,4,,
20230522,0,Mon,SLN,NL,CIN,1,1,,2,,
20230522,0,Mon,MIA,NL,COL,0,1,,1,,
20230522,0,Mon,HOU,AL,MIL,5,1,,6,,
20230522,0,Mon,ARI,NL,PHI,2,2,,4,,
20230522,0,Mon,TEX,AL,PIT,1,1,,2,,
20230522,0,Mon,BOS,AL,ANA,0,1,,1,,
20230522,0,Mon,CHA,AL,CLE,0,1,,1,,
20230522,0,Mon,DET,AL,KCA,1,3,,4,,
20230522,0,Mon,SFN,NL,MIN,1,1,,2,,
20230522,0,Mon,OAK,AL,SEA,0,2,,2,,
20230522,0,Mon,TOR,AL,TBA,2,3,,5,,
20230523,0,Tue,LAN,NL,ATL,2,0,,2,,
20230523,0,Tue,NYN,NL,CHN,1,3,,4,,
20230523,0,Tue,SLN,NL,CIN,2,1,,3,,
20230523,0,Tue,MIA,NL,COL,2,0,,2,,
20230523,0,Tue,HOU,AL,MIL,0,2,,2,,
20230523,0,Tue,ARI,NL,PHI,1,0,,1,,
20230523,0,Tue,TEX,AL,PIT,1,0,,1,,
20230523,0,Tue,SDN,NL,WAS,4,2,,6,,
20230523,0,Tue,BOS,AL,ANA,0,3,,3,,
20230523,0,Tue,CHA,AL,CLE,1,1,,2,,
20230523,0,Tue,DET,AL,KCA,0,0,,0,,
20230523,0,Tue,SFN,NL,MIN,1,2,,3,,
20230523,0,Tue,BAL,AL,NYA,2,2,,4,,
20230523,0,Tue,OAK,AL,SEA,0,2,,2,,
20230523,0,Tue,TOR,AL,TBA,4,1,,5,,
20230524,0,Wed,LAN,NL,ATL,1,2,,3,,
20230524,0,Wed,NYN,NL,CHN,1,1,,2,,
20230524,0,Wed,SLN,NL,CIN,2,1,,3,,
20230524,0,Wed,MIA,NL,COL,2,1,,3,,
20230524,0,Wed,HOU,AL,MIL,0,3,,3,,
20230524,0,Wed,ARI,NL,PHI,1,1,,2,,
20230524,0,Wed,TEX,AL,PIT,1,0,,1,,
20230524,0,Wed,SDN,NL,WAS,2,0,,2,,
20230524,0,Wed,BOS,AL,ANA,1,3,,4,,
20230524,0,Wed,CHA,AL,CLE,0,0,,0,,
20230524,0,Wed,DET,AL,KCA,2,0,,2,,
20230524,0,Wed,SFN,NL,MIN,0,2,,2,,
20230524,0,Wed,BAL,AL,NYA,2,3,,5,,
20230524,0,Wed,OAK,AL,SEA,0,1,,1,,
20230524,0,Wed,TOR,AL,TBA,1,2,,3,,
20230525,0,Thu,PHI,NL,ATL,2,3,,5,,
20230525,0,Thu,NYN,NL,CHN,1,1,,2,,
20230525,0,Thu,SLN,NL,CIN,0,0,,0,,
20230525,0,Thu,MIA,NL,COL,2,1,,3,,
20230525,0,Thu,SFN,NL,MIL,1,0,,1,,
20230525,0,Thu,SDN,NL,WAS,2,0,,2,,
20230525,0,Thu,CHA,AL,DET,1,1,,2,,
20230525,0,Thu,BAL,AL,NYA,0,0,,0,,
20230525,0,Thu,OAK,AL,SEA,1,2,,3,,
20230525,0,Thu,TOR,AL,TBA,0,0,,0,,
20230526,0,Fri,BOS,AL,ARI,1,0,,1,,
20230526,0,Fri,PHI,NL,ATL,0,2,,2,,
20230526,0,Fri,CIN,NL,CHN,0,0,,0,,
20230526,0,Fri,NYN,NL,COL,1,2,,3,,
20230526,0,Fri,SFN,NL,MIL,3,0,,3,,
20230526,0,Fri,MIA,NL,ANA,2,1,,3,,
20230526,0,Fri,TEX,AL,BAL,3,1,,4,,
20230526,0,Fri,SLN,NL,CLE,0,0,,0,,
20230526,0,Fri,CHA,AL,DET,1,0,,1,,
20230526,0,Fri,WAS,NL,KCA,2,2,,4,,
20230526,0,Fri,TOR,AL,MIN,2,0,,2,,
20230526,0,Fri,SDN,NL,NYA,2,0,,2,,
20230526,0,Fri,HOU,AL,OAK,0,1,,1,,
20230526,0,Fri,PIT,NL,SEA,7,2,,9,,
20230526,0,Fri,LAN,NL,TBA,0,2,,2,,
20230527,0,Sat,BOS,AL,ARI,0,1,,1,,
20230527,0,Sat,PHI,NL,ATL,0,1,,1,,
20230527,0,Sat,CIN,NL,CHN,2,0,,2,,
20230527,0,Sat,NYN,NL,COL,2,1,,3,,
20230527,0,Sat,SFN,NL,MIL,1,0,,1,,
20230527,0,Sat,MIA,NL,ANA,1,1,,2,,
20230527,0,Sat,TEX,AL,BAL,0,1,,1,,
20230527,0,Sat,SLN,NL,CLE,1,0,,1,,
20230527,0,Sat,CHA,AL,DET,0,2,,2,,
20230527,0,Sat,WAS,NL,KCA,0,1,,1,,
20230527,0,Sat,TOR,AL,MIN,3,4,,7,,
20230527,0,Sat,SDN,NL,NYA,1,1,,2,,
20230527,0,Sat,HOU,AL,OAK,1,0,,1,,
20230527,0,Sat,PIT,NL,SEA,0,0,,0,,
20230527,0,Sat,LAN,NL,TBA,2,1,,3,,
20230528,0,Sun,BOS,AL,ARI,1,2,,3,,
20230528,0,Sun,PHI,NL,ATL,2,3,,5,,
20230528,0,Sun,CIN,NL,CHN,1,2,,3,,
20230528,0,Sun,NYN,NL,COL,2,2,,4,,
20230528,0,Sun,SFN,NL,MIL,2,1,,3,,
20230528,0,Sun,MIA,NL,ANA,1,0,,1,,
20230528,0,Sun,TEX,AL,BAL,0,0,,0,,
20230528,0,Sun,SLN,NL,CLE,3,0,,3,,
20230528,0,Sun,CHA,AL,DET,1,1,,2,,
20230528,0,Sun,WAS,NL,KCA,0,2,,2,,
20230528,0,Sun,TOR,AL,MIN,0,0,,0,,
20230528,0,Sun,SDN,NL,NYA,2,2,,4,,
20230528,0,Sun,HOU,AL,OAK,7,1,,8,,
20230528,0,Sun,PIT,NL,SEA,0,3,,3,,
20230528,0,Sun,LAN,NL,TBA,5,1,,6,,
20230529,0,Mon,COL,NL,ARI,1,2,,3,,
20230529,0,Mon,TBA,AL,CHN,0,0,,0,,
20230529,0,Mon,WAS,NL,LAN,0,1,,1,,
20230529,0,Mon,PIT,NL,SFN,2,2,,4,,
20230529,0,Mon,KCA,AL,SLN,2,0,,2,,
20230529,0,Mon,CLE,AL,BAL,0,0,,0,,
20230529,0,Mon,ANA,AL,CHA,2,3,,5,,
20230529,0,Mon,TEX,AL,DET,1,0,,1,,
20230529,0,Mon,MIN,AL,HOU,2,1,,3,,
20230529,0,Mon,ATL,NL,OAK,1,1,,2,,
20230529,0,Mon,NYA,AL,SEA,3,1,,4,,
20230530,0,Tue,COL,NL,ARI,1,3,,4,,
20230530,0,Tue,TBA,AL,CHN,0,1,,1,,
20230530,0,Tue,WAS,NL,LAN,1,3,,4,,
20230530,0,Tue,SDN,NL,MIA,0,1,,1,,
20230530,0,Tue,PHI,NL,NYN,0,1,,1,,
20230530,0,Tue,PIT,NL,SFN,1,0,,1,,
20230530,0,Tue,KCA,AL,SLN,0,0,,0,,
20230530,0,Tue,CLE,AL,BAL,0,0,,0,,
20230530,0,Tue,CIN,NL,BOS,1,0,,1,,
20230530,0,Tue,ANA,AL,CHA,2,1,,3,,
20230530,0,Tue,TEX,AL,DET,1,2,,3,,
20230530,0,Tue,MIN,AL,HOU,0,2,,2,,
20230530,0,Tue,ATL,NL,OAK,1,0,,1,,
20230530,0,Tue,NYA,AL,SEA,3,0,,3,,
20230530,0,Tue,MIL,NL,TOR,1,0,,1,,
20230531,0,Wed,COL,NL,ARI,0,1,,1,,
20230531,0,Wed,TBA,AL,CHN,2,0,,2,,
20230531,0,Wed,WAS,NL,LAN,5,3,,8,,
20230531,0,Wed,SDN,NL,MIA,1,0,,1,,
20230531,0,Wed,PHI,NL,NYN,1,1,,2,,
20230531,0,Wed,PIT,NL,SFN,0,0,,0,,
20230531,0,Wed,CLE,AL,BAL,3,1,,4,,
20230531,0,Wed,CIN,NL,BOS,1,2,,3,,
20230531,0,Wed,ANA,AL,CHA,5,1,,6,,
20230531,0,Wed,TEX,AL,DET,0,0,,0,,
20230531,0,Wed,MIN,AL,HOU,0,2,,2,,
20230531,0,Wed,ATL,NL,OAK,1,0,,1,,
20230531,0,Wed,NYA,AL,SEA,0,0,,0,,
20230531,0,Wed,MIL,NL,TOR,1,0,,1,,
20230601,0,Thu,COL,NL,ARI,1,0,,1,,
20230601,0,Thu,SDN,NL,MIA,1,0,,1,,
20230601,0,Thu,PHI,NL,NYN,0,1,,1,,
20230601,0,Thu,CIN,NL,BOS,0,2,,2,,
20230601,0,Thu,ANA,AL,HOU,1,0,,1,,
20230601,0,Thu,CLE,AL,MIN,0,2,,2,,
20230601,0,Thu,MIL,NL,TOR,0,2,,2,,
20230602,0,Fri,ATL,NL,ARI,2,0,,2,,
20230602,0,Fri,MIL,NL,CIN,1,1,,2,,
20230602,0,Fri,NYA,AL,LAN,3,4,,7,,
20230602,0,Fri,OAK,AL,MIA,0,1,,1,,
20230602,0,Fri,TOR,AL,NYN,2,0,,2,,
20230602,0,Fri,SLN,NL,PIT,2,2,,4,,
20230602,0,Fri,CHN,NL,SDN,1,0,,1,,
20230602,0,Fri,BAL,AL,SFN,1,1,,2,,
20230602,0,Fri,PHI,NL,WAS,2,1,,3,,
20230602,0,Fri,DET,AL,CHA,0,0,,0,,
20230602,0,Fri,ANA,AL,HOU,0,2,,2,,
20230602,0,Fri,COL,NL,KCA,1,2,,3,,
20230602,0,Fri,CLE,AL,MIN,0,0,,0,,
20230602,0,Fri,SEA,AL,TEX,0,0,,0,,
20230603,0,Sat,ATL,NL,ARI,1,1,,2,,
20230603,0,Sat,MIL,NL,CIN,2,1,,3,,
20230603,0,Sat,NYA,AL,LAN,4,0,,4,,
20230603,0,Sat,OAK,AL,MIA,0,0,,0,,
20230603,0,Sat,TOR,AL,NYN,0,0,,0,,
20230603,0,Sat,SLN,NL,PIT,2,1,,3,,
20230603,0,Sat,CHN,NL,SDN,0,2,,2,,
20230603,0,Sat,BAL,AL,SFN,0,0,,0,,
20230603,0,Sat,PHI,NL,WAS,1,0,,1,,
20230603,1,Sat,TBA,AL,BOS,0,0,,0,,
20230603,2,Sat,TBA,AL,BOS,0,0,,0,,
20230603,0,Sat,DET,AL,CHA,0,0,,0,,
20230603,0,Sat,ANA,AL,HOU,1,2,,3,,
20230603,0,Sat,COL,NL,KCA,0,1,,1,,
20230603,0,Sat,CLE,AL,MIN,2,1,,3,,
20230603,0,Sat,SEA,AL,TEX,0,4,,4,,
20230604,0,Sun,ATL,NL,ARI,2,2,,4,,
20230604,0,Sun,MIL,NL,CIN,2,1,,3,,
20230604,0,Sun,NYA,AL,LAN,1,1,,2,,
20230604,0,Sun,OAK,AL,MIA,0,1,,1,,
20230604,0,Sun,TOR,AL,NYN,2,4,,6,,
20230604,0,Sun,SLN,NL,PIT,1,0,,1,,
20230604,0,Sun,CHN,NL,SDN,3,0,,3,,
20230604,0,Sun,BAL,AL,SFN,1,1,,2,,
20230604,0,Sun,PHI,NL,WAS,5,1,,6,,
20230604,0,Sun,TBA,AL,BOS,0,0,,0,,
20230604,0,Sun,DET,AL,CHA,1,1,,2,,
20230604,0,Sun,ANA,AL,HOU,1,1,,2,,
20230604,0,Sun,COL,NL,KCA,0,1,,1,,
20230604,0,Sun,CLE,AL,MIN,0,1,,1,,
20230604,0,Sun,SEA,AL,TEX,0,2,,2,,
20230605,0,Mon,MIL,NL,CIN,0,2,,2,,
20230605,0,Mon,KCA,AL,MIA,1,1,,2,,
20230605,0,Mon,DET,AL,PHI,1,2,,3,,
20230605,0,Mon,OAK,AL,PIT,0,0,,0,,
20230605,0,Mon,CHN,NL,SDN,0,1,,1,,
20230605,0,Mon,TBA,AL,BOS,0,1,,1,,
20230605,0,Mon,SLN,NL,TEX,0,0,,0,,
20230605,0,Mon,HOU,AL,TOR,4,2,,6,,
20230606,0,Tue,NYN,NL,ATL,2,1,,3,,
20230606,0,Tue,LAN,NL,CIN,2,0,,2,,
20230606,0,Tue,SFN,NL,COL,0,0,,0,,
20230606,0,Tue,KCA,AL,MIA,0,1,,1,,
20230606,0,Tue,BAL,AL,MIL,2,0,,2,,
20230606,0,Tue,DET,AL,PHI,0,1,,1,,
20230606,0,Tue,OAK,AL,PIT,4,0,,4,,
20230606,0,Tue,SEA,AL,SDN,2,0,,2,,
20230606,0,Tue,ARI,NL,WAS,1,2,,3,,
20230606,0,Tue,CHN,NL,ANA,0,2,,2,,
20230606,0,Tue,BOS,AL,CLE,0,0,,0,,
20230606,0,Tue,CHA,AL,NYA,2,1,,3,,
20230606,0,Tue,MIN,AL,TBA,0,2,,2,,
20230606,0,Tue,SLN,NL,TEX,3,2,,5,,
20230606,0,Tue,HOU,AL,TOR,1,3,,4,,
20230607,0,Wed,NYN,NL,ATL,2,2,,4,,
20230607,0,Wed,LAN,NL,CIN,3,3,,6,,
20230607,0,Wed,SFN,NL,COL,0,1,,1,,
20230607,0,Wed,KCA,AL,MIA,0,1,,1,,
20230607,0,Wed,BAL,AL,MIL,0,3,,3,,
20230607,0,Wed,OAK,AL,PIT,1,1,,2,,
20230607,0,Wed,SEA,AL,SDN,0,1,,1,,
20230607,0,Wed,ARI,NL,WAS,1,0,,1,,
20230607,0,Wed,CHN,NL,ANA,0,2,,2,,
20230607,0,Wed,BOS,AL,CLE,0,0,,0,,
20230607,0,Wed,MIN,AL,TBA,0,2,,2,,
20230607,0,Wed,SLN,NL,TEX,1,0,,1,,
20230607,0,Wed,HOU,AL,TOR,1,2,,3,,
20230608,0,Thu,NYN,NL,ATL,3,5,,8,,
20230608,0,Thu,LAN,NL,CIN,1,0,,1,,
20230608,0,Thu,SFN,NL,COL,2,0,,2,,
20230608,0,Thu,BAL,AL,MIL,2,0,,2,,
20230608,0,Thu,DET,AL,PHI,0,0,,0,,
20230608,0,Thu,CHN,NL,ANA,0,1,,1,,
20230608,0,Thu,BOS,AL,CLE,1,4,,5,,
20230608,1,Thu,CHA,AL,NYA,4,1,,5,,
20230608,2,Thu,CHA,AL,NYA,0,2,,2,,
20230608,0,Thu,MIN,AL,TBA,2,1,,3,,
20230608,0,Thu,HOU,AL,TOR,1,0,,1,,
20230609,0,Fri,WAS,NL,ATL,0,0,,0,,
20230609,0,Fri,SDN,NL,COL,5,1,,6,,
20230609,0,Fri,OAK,AL,MIL,0,0,,0,,
20230609,0,Fri,LAN,NL,PHI,2,1,,3,,
20230609,0,Fri,NYN,NL,PIT,1,2,,3,,
20230609,0,Fri,CHN,NL,SFN,0,0,,0,,
20230609,0,Fri,CIN,NL,SLN,0,3,,3,,
20230609,0,Fri,SEA,AL,ANA,2,2,,4,,
20230609,0,Fri,KCA,AL,BAL,0,1,,1,,
20230609,0,Fri,MIA,NL,CHA,1,1,,2,,
20230609,0,Fri,HOU,AL,CLE,1,1,,2,,
20230609,0,Fri,ARI,NL,DET,2,3,,5,,
20230609,0,Fri,BOS,AL,NYA,2,1,,3,,
20230609,0,Fri,TEX,AL,TBA,3,2,,5,,
20230609,0,Fri,MIN,AL,TOR,1,0,,1,,
20230610,0,Sat,WAS,NL,ATL,1,2,,3,,
20230610,0,Sat,SDN,NL,COL,0,1,,1,,
20230610,0,Sat,OAK,AL,MIL,0,1,,1,,
20230610,0,Sat,LAN,NL,PHI,2,0,,2,,
20230610,0,Sat,NYN,NL,PIT,1,0,,1,,
20230610,0,Sat,CHN,NL,SFN,2,0,,2,,
20230610,0,Sat,CIN,NL,SLN,0,2,,2,,
20230610,0,Sat,SEA,AL,ANA,1,1,,2,,
20230610,0,Sat,KCA,AL,BAL,0,2,,2,,
20230610,0,Sat,MIA,NL,CHA,0,1,,1,,
20230610,0,Sat,HOU,AL,CLE,1,0,,1,,
20230610,0,Sat,ARI,NL,DET,2,0,,2,,
20230610,0,Sat,BOS,AL,NYA,1,2,,3,,
20230610,0,Sat,TEX,AL,TBA,1,1,,2,,
20230610,0,Sat,MIN,AL,TOR,3,0,,3,,
20230611,0,Sun,WAS,NL,ATL,2,1,,3,,
20230611,0,Sun,SDN,NL,COL,1,4,,5,,
20230611,0,Sun,OAK,AL,MIL,3,1,,4,,
20230611,0,Sun,LAN,NL,PHI,2,1,,3,,
20230611,0,Sun,NYN,NL,PIT,1,1,,2,,
20230611,0,Sun,CHN,NL,SFN,0,4,,4,,
20230611,0,Sun,CIN,NL,SLN,1,0,,1,,
20230611,0,Sun,SEA,AL,ANA,2,3,,5,,
20230611,0,Sun,KCA,AL,BAL,1,2,,3,,
20230611,0,Sun,MIA,NL,CHA,4,1,,5,,
20230611,0,Sun,HOU,AL,CLE,0,2,,2,,
20230611,0,Sun,ARI,NL,DET,1,1,,2,,
20230611,0,Sun,BOS,AL,NYA,1,0,,1,,
20230611,0,Sun,TEX,AL,TBA,1,1,,2,,
20230611,0,Sun,MIN,AL,TOR,1,2,,3,,
20230612,0,Mon,PHI,NL,ARI,1,1,,2,,
20230612,0,Mon,SFN,NL,SLN,0,2,,2,,
20230612,0,Mon,COL,NL,BOS,0,1,,1,,
20230612,0,Mon,ATL,NL,DET,1,2,,3,,
20230612,0,Mon,CIN,NL,KCA,1,1,,2,,
20230612,0,Mon,TBA,AL,OAK,1,0,,1,,
20230612,0,Mon,MIA,NL,SEA,1,3,,4,,
20230612,0,Mon,ANA,AL,TEX,3,1,,4,,
20230613,0,Tue,PHI,NL,ARI,2,1,,3,,
20230613,0,Tue,PIT,NL,CHN,2,2,,4,,
20230613,0,Tue,CHA,AL,LAN,0,2,,2,,
20230613,0,Tue,NYA,AL,NYN,2,1,,3,,
20230613,0,Tue,CLE,AL,SDN,1,2,,3,,
20230613,0,Tue,SFN,NL,SLN,2,0,,2,,
20230613,0,Tue,TOR,AL,BAL,1,4,,5,,
20230613,0,Tue,COL,NL,BOS,0,2,,2,,
20230613,0,Tue,WAS,NL,HOU,0,4,,4,,
20230613,0,Tue,CIN,NL,KCA,0,1,,1,,
20230613,0,Tue,MIL,NL,MIN,1,3,,4,,
20230613,0,Tue,TBA,AL,OAK,0,0,,0,,
20230613,0,Tue,MIA,NL,SEA,1,3,,4,,
20230613,0,Tue,ANA,AL,TEX,2,2,,4,,
20230614,0,Wed,PHI,NL,ARI,1,1,,2,,
20230614,0,Wed,PIT,NL,CHN,3,0,,3,,
20230614,0,Wed,CHA,AL,LAN,3,0,,3,,
20230614,0,Wed,NYA,AL,NYN,0,0,,0,,
20230614,0,Wed,CLE,AL,SDN,0,4,,4,,
20230614,0,Wed,SFN,NL,SLN,1,1,,2,,
20230614,0,Wed,TOR,AL,BAL,1,0,,1,,
20230614,0,Wed,COL,NL,BOS,0,0,,0,,
20230614,1,Wed,ATL,NL,DET,2,3,,5,,
20230614,2,Wed,ATL,NL,DET,3,3,,6,,
20230614,0,Wed,WAS,NL,HOU,0,2,,2,,
20230614,0,Wed,CIN,NL,KCA,4,0,,4,,
20230614,0,Wed,MIL,NL,MIN,2,0,,2,,
20230614,0,Wed,TBA,AL,OAK,0,1,,1,,
20230614,0,Wed,MIA,NL,SEA,1,0,,1,,
20230614,0,Wed,ANA,AL,TEX,1,3,,4,,
20230615,0,Thu,PHI,NL,ARI,1,1,,2,,
20230615,0,Thu,COL,NL,ATL,2,1,,3,,
20230615,0,Thu,PIT,NL,CHN,0,0,,0,,
20230615,0,Thu,CHA,AL,LAN,4,1,,5,,
20230615,0,Thu,CLE,AL,SDN,1,1,,2,,
20230615,0,Thu,TOR,AL,BAL,2,2,,4,,
20230615,0,Thu,WAS,NL,HOU,1,0,,1,,
20230615,0,Thu,DET,AL,MIN,0,1,,1,,
20230615,0,Thu,TBA,AL,OAK,2,0,,2,,
20230615,0,Thu,ANA,AL,TEX,3,0,,3,,
20230616,0,Fri,CLE,AL,ARI,1,0,,1,,
20230616,0,Fri,COL,NL,ATL,0,3,,3,,
20230616,0,Fri,BAL,AL,CHN,0,3,,3,,
20230616,0,Fri,SFN,NL,LAN,1,0,,1,,
20230616,0,Fri,PIT,NL,MIL,1,1,,2,,
20230616,0,Fri,SLN,NL,NYN,1,1,,2,,
20230616,0,Fri,TBA,AL,SDN,2,1,,3,,
20230616,0,Fri,MIA,NL,WAS,1,1,,2,,
20230616,0,Fri,NYA,AL,BOS,1,2,,3,,
20230616,0,Fri,CIN,NL,HOU,1,0,,1,,
20230616,0,Fri,ANA,AL,KCA,0,0,,0,,
20230616,0,Fri,DET,AL,MIN,3,1,,4,,
20230616,0,Fri,PHI,NL,OAK,3,0,,3,,
20230616,0,Fri,CHA,AL,SEA,2,1,,3,,
20230616,0,Fri,TOR,AL,TEX,1,1,,2,,
20230617,0,Sat,CLE,AL,ARI,1,4,,5,,
20230617,0,Sat,COL,NL,ATL,1,4,,5,,
20230617,0,Sat,BAL,AL,CHN,1,0,,1,,
20230617,0,Sat,SFN,NL,LAN,2,0,,2,,
20230617,0,Sat,PIT,NL,MIL,0,2,,2,,
20230617,0,Sat,SLN,NL,NYN,2,2,,4,,
20230617,0,Sat,TBA,AL,SDN,0,0,,0,,
20230617,0,Sat,MIA,NL,WAS,0,0,,0,,
20230617,0,Sat,CIN,NL,HOU,1,2,,3,,
20230617,0,Sat,ANA,AL,KCA,4,1,,5,,
20230617,0,Sat,DET,AL,MIN,0,0,,0,,
20230617,0,Sat,PHI,NL,OAK,0,1,,1,,
20230617,0,Sat,CHA,AL,SEA,1,1,,2,,
20230617,0,Sat,TOR,AL,TEX,1,3,,4,,
20230618,0,Sun,CLE,AL,ARI,0,1,,1,,
20230618,0,Sun,COL,NL,ATL,2,4,,6,,
20230618,0,Sun,BAL,AL,CHN,1,2,,3,,
20230618,0,Sun,SFN,NL,LAN,0,0,,0,,
20230618,0,Sun,PIT,NL,MIL,1,0,,1,,
20230618,0,Sun,SLN,NL,NYN,4,2,,6,,
20230618,0,Sun,TBA,AL,SDN,0,0,,0,,
20230618,0,Sun,MIA,NL,WAS,0,1,,1,,
20230618,1,Sun,NYA,AL,BOS,1,0,,1,,
20230618,2,Sun,NYA,AL,BOS,0,0,,0,,
20230618,0,Sun,CIN,NL,HOU,3,1,,4,,
20230618,0,Sun,ANA,AL,KCA,3,0,,3,,
20230618,0,Sun,DET,AL,MIN,2,0,,2,,
20230618,0,Sun,PHI,NL,OAK,1,1,,2,,
20230618,0,Sun,CHA,AL,SEA,0,0,,0,,
20230618,0,Sun,TOR,AL,TEX,0,2,,2,,
20230619,0,Mon,COL,NL,CIN,1,3,,4,,
20230619,0,Mon,TOR,AL,MIA,0,1,,1,,
20230619,0,Mon,ARI,NL,MIL,2,0,,2,,
20230619,0,Mon,CHN,NL,PIT,0,0,,0,,
20230619,0,Mon,SDN,NL,SFN,2,3,,5,,
20230619,0,Mon,SLN,NL,WAS,2,0,,2,,
20230619,0,Mon,TEX,AL,CHA,1,2,,3,,
20230619,0,Mon,KCA,AL,DET,2,1,,3,,
20230619,0,Mon,NYN,NL,HOU,2,1,,3,,
20230619,0,Mon,BOS,AL,MIN,1,1,,2,,
20230620,0,Tue,COL,NL,CIN,3,3,,6,,
20230620,0,Tue,TOR,AL,MIA,0,0,,0,,
20230620,0,Tue,ARI,NL,MIL,1,1,,2,,
20230620,0,Tue,ATL,NL,PHI,2,0,,2,,
20230620,0,Tue,CHN,NL,PIT,2,0,,2,,
20230620,0,Tue,SDN,NL,SFN,1,1,,2,,
20230620,0,Tue,SLN,NL,WAS,3,0,,3,,
20230620,0,Tue,LAN,NL,ANA,0,0,,0,,
20230620,0,Tue,TEX,AL,CHA,1,2,,3,,
20230620,0,Tue,OAK,AL,CLE,1,0,,1,,
20230620,0,Tue,KCA,AL,DET,0,0,,0,,
20230620,0,Tue,NYN,NL,HOU,0,1,,1,,
20230620,0,Tue,BOS,AL,MIN,3,3,,6,,
20230620,0,Tue,SEA,AL,NYA,0,1,,1,,
20230620,0,Tue,BAL,AL,TBA,3,0,,3,,
20230621,0,Wed,COL,NL,CIN,3,1,,4,,
20230621,0,Wed,TOR,AL,MIA,1,0,,1,,
20230621,0,Wed,ARI,NL,MIL,0,1,,1,,
20230621,0,Wed,CHN,NL,PIT,1,0,,1,,
20230621,0,Wed,SDN,NL,SFN,0,0,,0,,
20230621,0,Wed,SLN,NL,WAS,0,1,,1,,
20230621,0,Wed,LAN,NL,ANA,2,0,,2,,
20230621,0,Wed,TEX,AL,CHA,2,1,,3,,
20230621,0,Wed,OAK,AL,CLE,1,1,,2,,
20230621,0,Wed,KCA,AL,DET,0,1,,1,,
20230621,0,Wed,NYN,NL,HOU,1,2,,3,,
20230621,0,Wed,BOS,AL,MIN,1,1,,2,,
20230621,0,Wed,SEA,AL,NYA,1,3,,4,,
20230621,0,Wed,BAL,AL,TBA,2,2,,4,,
20230622,0,Thu,PIT,NL,MIA,2,1,,3,,
20230622,0,Thu,ATL,NL,PHI,1,0,,1,,
20230622,0,Thu,SDN,NL,SFN,3,0,,3,,
20230622,0,Thu,ARI,NL,WAS,1,2,,3,,
20230622,0,Thu,OAK,AL,CLE,0,1,,1,,
20230622,0,Thu,BOS,AL,MIN,0,3,,3,,
20230622,0,Thu,SEA,AL,NYA,4,1,,5,,
20230622,0,Thu,KCA,AL,TBA,1,1,,2,,
20230623,0,Fri,ATL,NL,CIN,5,4,,9,,
20230623,0,Fri,ANA,AL,COL,2,2,,4,,
20230623,0,Fri,HOU,AL,LAN,2,1,,3,,
20230623,0,Fri,PIT,NL,MIA,0,0,,0,,
20230623,0,Fri,NYN,NL,PHI,1,0,,1,,
20230623,0,Fri,WAS,NL,SDN,1,3,,4,,
20230623,0,Fri,ARI,NL,SFN,1,1,,2,,
20230623,0,Fri,SEA,AL,BAL,2,1,,3,,
20230623,0,Fri,BOS,AL,CHA,1,0,,1,,
20230623,0,Fri,MIL,NL,CLE,2,1,,3,,
20230623,0,Fri,MIN,AL,DET,2,0,,2,,
20230623,0,Fri,TEX,AL,NYA,1,0,,1,,
20230623,0,Fri,KCA,AL,TBA,2,1,,3,,
20230623,0,Fri,OAK,AL,TOR,2,1,,3,,
20230624,0,Sat,ATL,NL,CIN,4,4,,8,,
20230624,0,Sat,ANA,AL,COL,5,1,,6,,
20230624,0,Sat,HOU,AL,LAN,1,3,,4,,
20230624,0,Sat,PIT,NL,MIA,0,1,,1,,
20230624,0,Sat,NYN,NL,PHI,1,1,,2,,
20230624,0,Sat,WAS,NL,SDN,2,0,,2,,
20230624,0,Sat,ARI,NL,SFN,1,1,,2,,
20230624,0,Sat,CHN,NL,SLN,3,0,,3,,
20230624,0,Sat,SEA,AL,BAL,4,3,,7,,
20230624,0,Sat,BOS,AL,CHA,1,4,,5,,
20230624,0,Sat,MIL,NL,CLE,0,0,,0,,
20230624,0,Sat,MIN,AL,DET,2,0,,2,,
20230624,0,Sat,TEX,AL,NYA,0,1,,1,,
20230624,0,Sat,KCA,AL,TBA,3,1,,4,,
20230624,0,Sat,OAK,AL,TOR,1,2,,3,,
20230625,0,Sun,ATL,NL,CIN,1,1,,2,,
20230625,0,Sun,ANA,AL,COL,0,1,,1,,
20230625,0,Sun,HOU,AL,LAN,2,2,,4,,
20230625,0,Sun,PIT,NL,MIA,0,1,,1,,
20230625,0,Sun,NYN,NL,PHI,2,1,,3,,
20230625,0,Sun,WAS,NL,SDN,1,1,,2,,
20230625,0,Sun,ARI,NL,SFN,1,0,,1,,
20230625,0,Sun,CHN,NL,SLN,0,0,,0,,
20230625,0,Sun,SEA,AL,BAL,1,1,,2,,
20230625,0,Sun,BOS,AL,CHA,0,2,,2,,
20230625,0,Sun,MIL,NL,CLE,0,1,,1,,
20230625,0,Sun,MIN,AL,DET,1,0,,1,,
20230625,0,Sun,TEX,AL,NYA,1,0,,1,,
20230625,0,Sun,KCA,AL,TBA,0,1,,1,,
20230625,0,Sun,OAK,AL,TOR,1,2,,3,,
20230626,0,Mon,MIN,AL,ATL,1,2,,3,,
20230626,0,Mon,MIL,NL,NYN,1,0,,1,,
20230626,0,Mon,CHA,AL,ANA,1,1,,2,,
20230626,0,Mon,CIN,NL,BAL,1,0,,1,,
20230626,0,Mon,WAS,NL,SEA,2,2,,4,,
20230626,0,Mon,DET,AL,TEX,2,2,,4,,
20230627,0,Tue,TBA,AL,ARI,1,4,,5,,
20230627,0,Tue,MIN,AL,ATL,0,5,,5,,
20230627,0,Tue,PHI,NL,CHN,2,0,,2,,
20230627,0,Tue,LAN,NL,COL,2,0,,2,,
20230627,0,Tue,MIL,NL,NYN,0,4,,4,,
20230627,0,Tue,SDN,NL,PIT,0,3,,3,,
20230627,0,Tue,HOU,AL,SLN,1,1,,2,,
20230627,0,Tue,CHA,AL,ANA,0,2,,2,,
20230627,0,Tue,CIN,NL,BAL,2,0,,2,,
20230627,0,Tue,MIA,NL,BOS,2,0,,2,,
20230627,0,Tue,CLE,AL,KCA,0,0,,0,,
20230627,0,Tue,NYA,AL,OAK,1,1,,2,,
20230627,0,Tue,WAS,NL,SEA,1,1,,2,,
20230627,0,Tue,DET,AL,TEX,1,2,,3,,
20230627,0,Tue,SFN,NL,TOR,0,0,,0,,
20230628,0,Wed,TBA,AL,ARI,0,0,,0,,
20230628,0,Wed,MIN,AL,ATL,0,1,,1,,
20230628,0,Wed,PHI,NL,CHN,3,2,,5,,
20230628,0,Wed,LAN,NL,COL,1,0,,1,,
20230628,0,Wed,MIL,NL,NYN,0,1,,1,,
20230628,0,Wed,SDN,NL,PIT,0,1,,1,,
20230628,0,Wed,HOU,AL,SLN,2,3,,5,,
20230628,0,Wed,CHA,AL,ANA,4,2,,6,,
20230628,0,Wed,CIN,NL,BAL,1,1,,2,,
20230628,0,Wed,MIA,NL,BOS,2,1,,3,,
20230628,0,Wed,CLE,AL,KCA,3,0,,3,,
20230628,0,Wed,NYA,AL,OAK,1,0,,1,,
20230628,0,Wed,WAS,NL,SEA,0,1,,1,,
20230628,0,Wed,DET,AL,TEX,1,3,,4,,
20230628,0,Wed,SFN,NL,TOR,1,0,,1,,
20230629,0,Thu,TBA,AL,ARI,1,1,,2,,
20230629,0,Thu,PHI,NL,CHN,1,0,,1,,
20230629,0,Thu,LAN,NL,COL,1,0,,1,,
20230629,0,Thu,MIL,NL,NYN,1,2,,3,,
20230629,0,Thu,SDN,NL,PIT,2,0,,2,,
20230629,0,Thu,HOU,AL,SLN,2,0,,2,,
20230629,0,Thu,CHA,AL,ANA,0,4,,4,,
20230629,0,Thu,MIA,NL,BOS,1,0,,1,,
20230629,0,Thu,CLE,AL,KCA,0,0,,0,,
20230629,0,Thu,NYA,AL,OAK,2,0,,2,,
20230629,0,Thu,DET,AL,TEX,2,2,,4,,
20230629,0,Thu,SFN,NL,TOR,0,1,,1,,
20230630,0,Fri,MIA,NL,ATL,2,6,,8,,
20230630,0,Fri,CLE,AL,CHN,1,2,,3,,
20230630,0,Fri,SDN,NL,CIN,1,3,,4,,
20230630,0,Fri,DET,AL,COL,1,1,,2,,
20230630,0,Fri,SFN,NL,NYN,2,1,,3,,
20230630,0,Fri,WAS,NL,PHI,1,0,,1,,
20230630,0,Fri,MIL,NL,PIT,0,2,,2,,
20230630,0,Fri,ARI,NL,ANA,1,1,,2,,
20230630,0,Fri,MIN,AL,BAL,3,1,,4,,
20230630,0,Fri,LAN,NL,KCA,2,0,,2,,
20230630,0,Fri,CHA,AL,OAK,1,1,,2,,
20230630,0,Fri,TBA,AL,SEA,3,1,,4,,
20230630,0,Fri,HOU,AL,TEX,1,2,,3,,
20230630,0,Fri,BOS,AL,TOR,3,0,,3,,
20230701,0,Sat,MIA,NL,ATL,0,2,,2,,
20230701,0,Sat,CLE,AL,CHN,0,0,,0,,
20230701,0,Sat,SDN,NL,CIN,3,1,,4,,
20230701,0,Sat,DET,AL,COL,1,0,,1,,
20230701,0,Sat,SFN,NL,NYN,0,3,,3,,
20230701,0,Sat,WAS,NL,PHI,1,4,,5,,
20230701,0,Sat,MIL,NL,PIT,2,1,,3,,
20230701,1,Sat,NYA,AL,SLN,1,2,,3,,
20230701,2,Sat,NYA,AL,SLN,0,1,,1,,
20230701,0,Sat,ARI,NL,ANA,0,1,,1,,
20230701,0,Sat,MIN,AL,BAL,1,0,,1,,
20230701,0,Sat,LAN,NL,KCA,0,0,,0,,
20230701,0,Sat,CHA,AL,OAK,1,1,,2,,
20230701,0,Sat,TBA,AL,SEA,1,1,,2,,
20230701,0,Sat,HOU,AL,TEX,1,0,,1,,
20230701,0,Sat,BOS,AL,TOR,2,3,,5,,
20230702,0,Sun,MIA,NL,ATL,0,3,,3,,
20230702,0,Sun,CLE,AL,CHN,1,1,,2,,
20230702,0,Sun,SDN,NL,CIN,2,2,,4,,
20230702,0,Sun,DET,AL,COL,5,2,,7,,
20230702,0,Sun,SFN,NL,NYN,1,2,,3,,
20230702,0,Sun,WAS,NL,PHI,2,2,,4,,
20230702,0,Sun,MIL,NL,PIT,1,1,,2,,
20230702,0,Sun,NYA,AL,SLN,0,1,,1,,
20230702,0,Sun,ARI,NL,ANA,1,3,,4,,
20230702,0,Sun,MIN,AL,BAL,0,0,,0,,
20230702,0,Sun,LAN,NL,KCA,0,0,,0,,
20230702,0,Sun,CHA,AL,OAK,1,1,,2,,
20230702,0,Sun,TBA,AL,SEA,2,2,,4,,
20230702,0,Sun,HOU,AL,TEX,1,1,,2,,
20230702,0,Sun,BOS,AL,TOR,1,2,,3,,
20230703,0,Mon,PIT,NL,LAN,0,1,,1,,
20230703,0,Mon,SLN,NL,MIA,1,0,,1,,
20230703,0,Mon,CHN,NL,MIL,0,0,,0,,
20230703,0,Mon,ANA,AL,SDN,1,1,,2,,
20230703,0,Mon,SEA,AL,SFN,0,2,,2,,
20230703,0,Mon,CIN,NL,WAS,1,1,,2,,
20230703,0,Mon,ATL,NL,CLE,3,0,,3,,
20230703,0,Mon,KCA,AL,MIN,2,1,,3,,
20230703,0,Mon,BAL,AL,NYA,0,3,,3,,
20230703,0,Mon,HOU,AL,TEX,4,3,,7,,
20230704,0,Tue,NYN,NL,ARI,3,3,,6,,
20230704,0,Tue,PIT,NL,LAN,1,4,,5,,
20230704,0,Tue,SLN,NL,MIA,0,2,,2,,
20230704,0,Tue,CHN,NL,MIL,1,0,,1,,
20230704,0,Tue,ANA,AL,SDN,1,2,,3,,
20230704,0,Tue,SEA,AL,SFN,2,0,,2,,
20230704,0,Tue,CIN,NL,WAS,3,0,,3,,
20230704,0,Tue,TEX,AL,BOS,1,0,,1,,
20230704,0,Tue,TOR,AL,CHA,1,1,,2,,
20230704,0,Tue,ATL,NL,CLE,2,1,,3,,
20230704,0,Tue,OAK,AL,DET,0,0,,0,,
20230704,0,Tue,COL,NL,HOU,1,1,,2,,
20230704,0,Tue,KCA,AL,MIN,1,3,,4,,
20230704,0,Tue,BAL,AL,NYA,2,2,,4,,
20230704,0,Tue,PHI,NL,TBA,0,1,,1,,
20230705,0,Wed,NYN,NL,ARI,1,1,,2,,
20230705,0,Wed,PIT,NL,LAN,2,2,,4,,
20230705,0,Wed,SLN,NL,MIA,2,1,,3,,
20230705,0,Wed,CHN,NL,MIL,0,1,,1,,
20230705,0,Wed,ANA,AL,SDN,1,1,,2,,
20230705,0,Wed,SEA,AL,SFN,0,0,,0,,
20230705,0,Wed,CIN,NL,WAS,2,0,,2,,
20230705,0,Wed,TEX,AL,BOS,1,0,,1,,
20230705,0,Wed,ATL,NL,CLE,3,0,,3,,
20230705,0,Wed,OAK,AL,DET,3,0,,3,,
20230705,0,Wed,COL,NL,HOU,2,3,,5,,
20230705,0,Wed,KCA,AL,MIN,0,2,,2,,
20230705,0,Wed,BAL,AL,NYA,1,2,,3,,
20230705,0,Wed,PHI,NL,TBA,2,1,,3,,
20230706,0,Thu,NYN,NL,ARI,3,0,,3,,
20230706,0,Thu,PIT,NL,LAN,0,2,,2,,
20230706,0,Thu,SLN,NL,MIA,1,0,,1,,
20230706,0,Thu,CHN,NL,MIL,2,2,,4,,
20230706,0,Thu,CIN,NL,WAS,1,1,,2,,
20230706,0,Thu,TEX,AL,BOS,1,0,,1,,
20230706,1,Thu,TOR,AL,CHA,0,0,,0,,
20230706,2,Thu,TOR,AL,CHA,3,1,,4,,
20230706,0,Thu,KCA,AL,CLE,0,3,,3,,
20230706,0,Thu,OAK,AL,DET,0,1,,1,,
20230706,0,Thu,SEA,AL,HOU,3,0,,3,,
20230706,0,Thu,BAL,AL,NYA,2,0,,2,,
20230706,0,Thu,PHI,NL,TBA,1,1,,2,,
20230707,0,Fri,PIT,NL,ARI,0,1,,1,,
20230707,0,Fri,ANA,AL,LAN,2,5,,7,,
20230707,0,Fri,PHI,NL,MIA,2,1,,3,,
20230707,0,Fri,CIN,NL,MIL,1,2,,3,,
20230707,0,Fri,NYN,NL,SDN,1,1,,2,,
20230707,0,Fri,COL,NL,SFN,2,1,,3,,
20230707,0,Fri,TEX,AL,WAS,2,2,,4,,
20230707,0,Fri,OAK,AL,BOS,1,0,,1,,
20230707,0,Fri,SLN,NL,CHA,2,2,,4,,
20230707,0,Fri,KCA,AL,CLE,0,1,,1,,
20230707,0,Fri,TOR,AL,DET,2,0,,2,,
20230707,0,Fri,SEA,AL,HOU,1,0,,1,,
20230707,0,Fri,BAL,AL,MIN,0,0,,0,,
20230707,0,Fri,CHN,NL,NYA,1,0,,1,,
20230707,0,Fri,ATL,NL,TBA,1,1,,2,,
20230708,0,Sat,PIT,NL,ARI,0,1,,1,,
20230708,0,Sat,ANA,AL,LAN,1,5,,6,,
20230708,0,Sat,PHI,NL,MIA,1,1,,2,,
20230708,0,Sat,CIN,NL,MIL,2,2,,4,,
20230708,0,Sat,NYN,NL,SDN,1,1,,2,,
20230708,0,Sat,COL,NL,SFN,1,2,,3,,
20230708,0,Sat,TEX,AL,WAS,2,3,,5,,
20230708,0,Sat,OAK,AL,BOS,2,2,,4,,
20230708,0,Sat,SLN,NL,CHA,1,0,,1,,
20230708,0,Sat,KCA,AL,CLE,1,0,,1,,
20230708,0,Sat,TOR,AL,DET,0,0,,0,,
20230708,0,Sat,SEA,AL,HOU,0,1,,1,,
20230708,0,Sat,BAL,AL,MIN,0,0,,0,,
20230708,0,Sat,CHN,NL,NYA,1,3,,4,,
20230708,0,Sat,ATL,NL,TBA,1,0,,1,,
20230709,0,Sun,PIT,NL,ARI,1,1,,2,,
20230709,0,Sun,PHI,NL,MIA,1,3,,4,,
20230709,0,Sun,CIN,NL,MIL,0,0,,0,,
20230709,0,Sun,NYN,NL,SDN,0,2,,2,,
20230709,0,Sun,COL,NL,SFN,0,1,,1,,
20230709,0,Sun,TEX,AL,WAS,0,3,,3,,
20230709,0,Sun,OAK,AL,BOS,1,2,,3,,
20230709,0,Sun,SLN,NL,CHA,1,0,,1,,
20230709,0,Sun,KCA,AL,CLE,1,0,,1,,
20230709,0,Sun,TOR,AL,DET,1,1,,2,,
20230709,0,Sun,SEA,AL,HOU,0,1,,1,,
20230709,0,Sun,BAL,AL,MIN,6,1,,7,,
20230709,0,Sun,CHN,NL,NYA,1,2,,3,,
20230709,0,Sun,ATL,NL,TBA,1,2,,3,,
20230714,0,Fri,CHA,AL,ATL,0,1,,1,,
20230714,0,Fri,BOS,AL,CHN,6,2,,8,,
20230714,0,Fri,MIL,NL,CIN,0,0,,0,,
20230714,0,Fri,NYA,AL,COL,1,3,,4,,
20230714,0,Fri,LAN,NL,NYN,1,0,,1,,
20230714,0,Fri,SDN,NL,PHI,4,1,,5,,
20230714,0,Fri,SFN,NL,PIT,0,1,,1,,
20230714,0,Fri,WAS,NL,SLN,0,3,,3,,
20230714,0,Fri,HOU,AL,ANA,0,1,,1,,
20230714,0,Fri,MIA,NL,BAL,1,3,,4,,
20230714,0,Fri,MIN,AL,OAK,1,0,,1,,
20230714,0,Fri,DET,AL,SEA,3,1,,4,,
20230714,0,Fri,CLE,AL,TEX,2,4,,6,,
20230714,0,Fri,ARI,NL,TOR,1,1,,2,,
20230715,0,Sat,CHA,AL,ATL,1,3,,4,,
20230715,0,Sat,BOS,AL,CHN,1,2,,3,,
20230715,0,Sat,MIL,NL,CIN,3,0,,3,,
20230715,0,Sat,NYA,AL,COL,1,1,,2,,
20230715,0,Sat,LAN,NL,NYN,1,1,,2,,
20230715,1,Sat,SDN,NL,PHI,2,1,,3,,
20230715,2,Sat,SDN,NL,PHI,0,2,,2,,
20230715,0,Sat,SFN,NL,PIT,1,1,,2,,
20230715,0,Sat,WAS,NL,SLN,2,2,,4,,
20230715,0,Sat,HOU,AL,ANA,2,4,,6,,
20230715,0,Sat,MIA,NL,BAL,0,1,,1,,
20230715,1,Sat,TBA,AL,KCA,3,1,,4,,
20230715,2,Sat,TBA,AL,KCA,0,0,,0,,
20230715,0,Sat,MIN,AL,OAK,2,2,,4,,
20230715,0,Sat,DET,AL,SEA,2,0,,2,,
20230715,0,Sat,CLE,AL,TEX,0,0,,0,,
20230715,0,Sat,ARI,NL,TOR,0,2,,2,,
20230716,0,Sun,CHA,AL,ATL,2,0,,2,,
20230716,0,Sun,BOS,AL,CHN,3,0,,3,,
20230716,0,Sun,MIL,NL,CIN,1,1,,2,,
20230716,0,Sun,NYA,AL,COL,0,4,,4,,
20230716,0,Sun,LAN,NL,NYN,0,0,,0,,
20230716,0,Sun,SDN,NL,PHI,2,2,,4,,
20230716,0,Sun,SFN,NL,PIT,0,0,,0,,
20230716,0,Sun,WAS,NL,SLN,1,2,,3,,
20230716,0,Sun,HOU,AL,ANA,5,2,,7,,
20230716,0,Sun,MIA,NL,BAL,0,1,,1,,
20230716,0,Sun,TBA,AL,KCA,2,3,,5,,
20230716,0,Sun,MIN,AL,OAK,2,1,,3,,
20230716,0,Sun,DET,AL,SEA,0,1,,1,,
20230716,0,Sun,CLE,AL,TEX,2,1,,3,,
20230716,0,Sun,ARI,NL,TOR,0,0,,0,,
20230717,0,Mon,WAS,NL,CHN,2,2,,4,,
20230717,0,Mon,SFN,NL,CIN,2,2,,4,,
20230717,0,Mon,CLE,AL,PIT,3,0,,3,,
20230717,0,Mon,MIA,NL,SLN,2,0,,2,,
20230717,0,Mon,NYA,AL,ANA,0,2,,2,,
20230717,0,Mon,LAN,NL,BAL,1,1,,2,,
20230717,0,Mon,DET,AL,KCA,0,0,,0,,
20230717,0,Mon,BOS,AL,OAK,0,0,,0,,
20230717,0,Mon,MIN,AL,SEA,2,1,,3,,
20230717,0,Mon,TBA,AL,TEX,1,1,,2,,
20230718,0,Tue,ARI,NL,ATL,3,3,,6,,
20230718,0,Tue,WAS,NL,CHN,1,2,,3,,
20230718,0,Tue,SFN,NL,CIN,2,4,,6,,
20230718,0,Tue,HOU,AL,COL,0,2,,2,,
20230718,0,Tue,CHA,AL,NYN,1,4,,5,,
20230718,0,Tue,MIL,NL,PHI,0,1,,1,,
20230718,0,Tue,CLE,AL,PIT,3,1,,4,,
20230718,0,Tue,MIA,NL,SLN,0,2,,2,,
20230718,0,Tue,NYA,AL,ANA,1,1,,2,,
20230718,0,Tue,LAN,NL,BAL,1,0,,1,,
20230718,0,Tue,DET,AL,KCA,2,0,,2,,
20230718,0,Tue,BOS,AL,OAK,0,2,,2,,
20230718,0,Tue,MIN,AL,SEA,4,1,,5,,
20230718,0,Tue,TBA,AL,TEX,2,2,,4,,
20230718,0,Tue,SDN,NL,TOR,4,0,,4,,
20230719,0,Wed,ARI,NL,ATL,0,2,,2,,
20230719,0,Wed,WAS,NL,CHN,1,2,,3,,
20230719,0,Wed,SFN,NL,CIN,1,1,,2,,
20230719,0,Wed,HOU,AL,COL,1,1,,2,,
20230719,0,Wed,CHA,AL,NYN,1,1,,2,,
20230719,0,Wed,MIL,NL,PHI,0,1,,1,,
20230719,0,Wed,CLE,AL,PIT,1,0,,1,,
20230719,0,Wed,MIA,NL,SLN,1,1,,2,,
20230719,0,Wed,NYA,AL,ANA,2,2,,4,,
20230719,0,Wed,LAN,NL,BAL,2,1,,3,,
20230719,0,Wed,DET,AL,KCA,1,0,,1,,
20230719,0,Wed,BOS,AL,OAK,1,3,,4,,
20230719,0,Wed,MIN,AL,SEA,3,2,,5,,
20230719,0,Wed,TBA,AL,TEX,1,2,,3,,
20230719,0,Wed,SDN,NL,TOR,0,0,,0,,
20230720,0,Thu,ARI,NL,ATL,3,4,,7,,
20230720,0,Thu,SLN,NL,CHN,2,0,,2,,
20230720,0,Thu,SFN,NL,CIN,1,1,,2,,
20230720,0,Thu,CHA,AL,NYN,0,1,,1,,
20230720,0,Thu,MIL,NL,PHI,1,0,,1,,
20230720,0,Thu,DET,AL,KCA,0,0,,0,,
20230720,0,Thu,HOU,AL,OAK,1,0,,1,,
20230720,0,Thu,MIN,AL,SEA,0,2,,2,,
20230720,0,Thu,BAL,AL,TBA,0,0,,0,,
20230720,0,Thu,SDN,NL,TOR,0,2,,2,,
20230721,0,Fri,SLN,NL,CHN,0,2,,2,,
20230721,0,Fri,ARI,NL,CIN,3,1,,4,,
20230721,0,Fri,COL,NL,MIA,3,0,,3,,
20230721,0,Fri,ATL,NL,MIL,2,1,,3,,
20230721,0,Fri,SFN,NL,WAS,2,2,,4,,
20230721,0,Fri,PIT,NL,ANA,4,4,,8,,
20230721,0,Fri,NYN,NL,BOS,2,0,,2,,
20230721,0,Fri,PHI,NL,CLE,2,0,,2,,
20230721,0,Fri,SDN,NL,DET,2,2,,4,,
20230721,0,Fri,CHA,AL,MIN,2,4,,6,,
20230721,0,Fri,KCA,AL,NYA,2,3,,5,,
20230721,0,Fri,HOU,AL,OAK,4,0,,4,,
20230721,0,Fri,TOR,AL,SEA,1,0,,1,,
20230721,0,Fri,BAL,AL,TBA,0,2,,2,,
20230721,0,Fri,LAN,NL,TEX,1,2,,3,,
20230722,0,Sat,SLN,NL,CHN,2,0,,2,,
20230722,0,Sat,ARI,NL,CIN,1,3,,4,,
20230722,0,Sat,COL,NL,MIA,1,0,,1,,
20230722,0,Sat,ATL,NL,MIL,1,0,,1,,
20230722,0,Sat,SFN,NL,WAS,0,1,,1,,
20230722,0,Sat,PIT,NL,ANA,1,0,,1,,
20230722,0,Sat,NYN,NL,BOS,0,5,,5,,
20230722,0,Sat,PHI,NL,CLE,0,0,,0,,
20230722,0,Sat,SDN,NL,DET,3,0,,3,,
20230722,0,Sat,CHA,AL,MIN,0,0,,0,,
20230722,0,Sat,KCA,AL,NYA,1,2,,3,,
20230722,0,Sat,HOU,AL,OAK,1,2,,3,,
20230722,0,Sat,TOR,AL,SEA,3,4,,7,,
20230722,0,Sat,BAL,AL,TBA,0,0,,0,,
20230722,0,Sat,LAN,NL,TEX,5,1,,6,,
20230723,0,Sun,SLN,NL,CHN,0,1,,1,,
20230723,0,Sun,ARI,NL,CIN,1,2,,3,,
20230723,0,Sun,COL,NL,MIA,2,0,,2,,
20230723,0,Sun,ATL,NL,MIL,2,1,,3,,
20230723,0,Sun,SFN,NL,WAS,1,1,,2,,
20230723,0,Sun,PIT,NL,ANA,1,4,,5,,
20230723,0,Sun,NYN,NL,BOS,0,1,,1,,
20230723,0,Sun,PHI,NL,CLE,0,3,,3,,
20230723,0,Sun,SDN,NL,DET,0,2,,2,,
20230723,0,Sun,CHA,AL,MIN,2,0,,2,,
20230723,0,Sun,KCA,AL,NYA,4,2,,6,,
20230723,0,Sun,HOU,AL,OAK,2,1,,3,,
20230723,0,Sun,TOR,AL,SEA,2,1,,3,,
20230723,0,Sun,BAL,AL,TBA,2,1,,3,,
20230723,0,Sun,LAN,NL,TEX,1,0,,1,,
20230724,0,Mon,SLN,NL,ARI,2,1,,3,,
20230724,0,Mon,TOR,AL,LAN,1,2,,3,,
20230724,0,Mon,CIN,NL,MIL,1,1,,2,,
20230724,0,Mon,BAL,AL,PHI,2,0,,2,,
20230724,0,Mon,PIT,NL,SDN,4,2,,6,,
20230724,0,Mon,COL,NL,WAS,1,1,,2,,
20230724,0,Mon,KCA,AL,CLE,2,0,,2,,
20230724,0,Mon,SFN,NL,DET,1,1,,2,,
20230724,0,Mon,TEX,AL,HOU,2,1,,3,,
20230724,0,Mon,SEA,AL,MIN,2,0,,2,,
20230725,0,Tue,SLN,NL,ARI,0,0,,0,,
20230725,0,Tue,TOR,AL,LAN,1,2,,3,,
20230725,0,Tue,CIN,NL,MIL,1,1,,2,,
20230725,0,Tue,BAL,AL,PHI,1,1,,2,,
20230725,0,Tue,PIT,NL,SDN,0,3,,3,,
20230725,0,Tue,OAK,AL,SFN,0,0,,0,,
20230725,0,Tue,COL,NL,WAS,1,2,,3,,
20230725,0,Tue,ATL,NL,BOS,0,1,,1,,
20230725,0,Tue,CHN,NL,CHA,4,0,,4,,
20230725,0,Tue,KCA,AL,CLE,0,2,,2,,
20230725,0,Tue,ANA,AL,DET,0,1,,1,,
20230725,0,Tue,TEX,AL,HOU,1,2,,3,,
20230725,0,Tue,SEA,AL,MIN,3,2,,5,,
20230725,0,Tue,NYN,NL,NYA,3,0,,3,,
20230725,0,Tue,MIA,NL,TBA,0,1,,1,,
20230726,0,Wed,SLN,NL,ARI,5,2,,7,,
20230726,0,Wed,TOR,AL,LAN,2,0,,2,,
20230726,0,Wed,CIN,NL,MIL,0,1,,1,,
20230726,0,Wed,BAL,AL,PHI,1,1,,2,,
20230726,0,Wed,PIT,NL,SDN,3,0,,3,,
20230726,0,Wed,OAK,AL,SFN,0,2,,2,,
20230726,0,Wed,COL,NL,WAS,3,0,,3,,
20230726,0,Wed,ATL,NL,BOS,1,3,,4,,
20230726,0,Wed,CHN,NL,CHA,2,1,,3,,
20230726,0,Wed,KCA,AL,CLE,1,3,,4,,
20230726,0,Wed,TEX,AL,HOU,4,2,,6,,
20230726,0,Wed,SEA,AL,MIN,3,4,,7,,
20230726,0,Wed,NYN,NL,NYA,0,0,,0,,
20230726,0,Wed,MIA,NL,TBA,1,0,,1,,
20230727,0,Thu,WAS,NL,NYN,0,0,,0,,
20230727,0,Thu,CHN,NL,SLN,1,2,,3,,
20230727,0,Thu,CLE,AL,CHA,0,2,,2,,
20230727,1,Thu,ANA,AL,DET,2,0,,2,,
20230727,2,Thu,ANA,AL,DET,4,0,,4,,
20230728,0,Fri,SEA,AL,ARI,0,0,,0,,
20230728,0,Fri,MIL,NL,ATL,1,3,,4,,
20230728,0,Fri,OAK,AL,COL,2,1,,3,,
20230728,0,Fri,CIN,NL,LAN,2,0,,2,,
20230728,0,Fri,DET,AL,MIA,0,1,,1,,
20230728,0,Fri,WAS,NL,NYN,1,2,,3,,
20230728,0,Fri,PHI,NL,PIT,1,0,,1,,
20230728,0,Fri,TEX,AL,SDN,0,1,,1,,
20230728,0,Fri,BOS,AL,SFN,1,1,,2,,
20230728,0,Fri,CHN,NL,SLN,1,2,,3,,
20230728,0,Fri,NYA,AL,BAL,0,1,,1,,
20230728,0,Fri,CLE,AL,CHA,0,2,,2,,
20230728,0,Fri,TBA,AL,HOU,1,1,,2,,
20230728,0,Fri,MIN,AL,KCA,0,2,,2,,
20230728,0,Fri,ANA,AL,TOR,1,3,,4,,
20230729,0,Sat,SEA,AL,ARI,1,0,,1,,
20230729,0,Sat,MIL,NL,ATL,1,4,,5,,
20230729,0,Sat,OAK,AL,COL,2,1,,3,,
20230729,0,Sat,CIN,NL,LAN,0,2,,2,,
20230729,0,Sat,DET,AL,MIA,2,0,,2,,
20230729,0,Sat,WAS,NL,NYN,0,4,,4,,
20230729,0,Sat,PHI,NL,PIT,0,1,,1,,
20230729,0,Sat,TEX,AL,SDN,0,0,,0,,
20230729,0,Sat,BOS,AL,SFN,0,1,,1,,
20230729,0,Sat,CHN,NL,SLN,2,0,,2,,
20230729,0,Sat,NYA,AL,BAL,3,1,,4,,
20230729,0,Sat,CLE,AL,CHA,0,2,,2,,
20230729,0,Sat,TBA,AL,HOU,3,5,,8,,
20230729,0,Sat,MIN,AL,KCA,1,2,,3,,
20230729,0,Sat,ANA,AL,TOR,0,3,,3,,
20230730,0,Sun,SEA,AL,ARI,1,0,,1,,
20230730,0,Sun,MIL,NL,ATL,2,4,,6,,
20230730,0,Sun,OAK,AL,COL,0,0,,0,,
20230730,0,Sun,CIN,NL,LAN,3,0,,3,,
20230730,0,Sun,DET,AL,MIA,0,2,,2,,
20230730,0,Sun,WAS,NL,NYN,0,1,,1,,
20230730,0,Sun,PHI,NL,PIT,1,2,,3,,
20230730,0,Sun,TEX,AL,SDN,0,2,,2,,
20230730,0,Sun,BOS,AL,SFN,2,0,,2,,
20230730,0,Sun,CHN,NL,SLN,0,0,,0,,
20230730,0,Sun,NYA,AL,BAL,1,1,,2,,
20230730,0,Sun,CLE,AL,CHA,3,0,,3,,
20230730,0,Sun,TBA,AL,HOU,1,0,,1,,
20230730,0,Sun,MIN,AL,KCA,1,1,,2,,
20230730,0,Sun,ANA,AL,TOR,1,0,,1,,
20230731,0,Mon,ANA,AL,ATL,3,1,,4,,
20230731,0,Mon,CIN,NL,CHN,0,1,,1,,
20230731,0,Mon,SDN,NL,COL,1,1,,2,,
20230731,0,Mon,PHI,NL,MIA,0,1,,1,,
20230731,0,Mon,ARI,NL,SFN,0,1,,1,,
20230731,0,Mon,MIL,NL,WAS,1,1,,2,,
20230731,0,Mon,CLE,AL,HOU,0,1,,1,,
20230731,0,Mon,TBA,AL,NYA,4,1,,5,,
20230731,0,Mon,BOS,AL,SEA,0,2,,2,,
20230731,0,Mon,BAL,AL,TOR,1,1,,2,,
20230801,0,Tue,ANA,AL,ATL,0,3,,3,,
20230801,0,Tue,CIN,NL,CHN,1,7,,8,,
20230801,0,Tue,SDN,NL,COL,2,1,,3,,
20230801,0,Tue,OAK,AL,LAN,3,1,,4,,
20230801,0,Tue,PHI,NL,MIA,1,0,,1,,
20230801,0,Tue,DET,AL,PIT,0,1,,1,,
20230801,0,Tue,ARI,NL,SFN,3,2,,5,,
20230801,0,Tue,MIN,AL,SLN,0,1,,1,,
20230801,0,Tue,MIL,NL,WAS,0,0,,0,,
20230801,0,Tue,CLE,AL,HOU,0,0,,0,,
20230801,0,Tue,NYN,NL,KCA,2,0,,2,,
20230801,0,Tue,TBA,AL,NYA,2,0,,2,,
20230801,0,Tue,BOS,AL,SEA,2,1,,3,,
20230801,0,Tue,CHA,AL,TEX,0,2,,2,,
20230801,0,Tue,BAL,AL,TOR,2,2,,4,,
20230802,0,Wed,ANA,AL,ATL,0,3,,3,,
20230802,0,Wed,CIN,NL,CHN,4,5,,9,,
20230802,0,Wed,SDN,NL,COL,5,0,,5,,
20230802,0,Wed,OAK,AL,LAN,1,4,,5,,
20230802,0,Wed,PHI,NL,MIA,1,3,,4,,
20230802,0,Wed,DET,AL,PIT,2,0,,2,,
20230802,0,Wed,ARI,NL,SFN,0,0,,0,,
20230802,0,Wed,MIN,AL,SLN,1,4,,5,,
20230802,0,Wed,MIL,NL,WAS,1,0,,1,,
20230802,0,Wed,CLE,AL,HOU,0,2,,2,,
20230802,0,Wed,NYN,NL,KCA,0,1,,1,,
20230802,0,Wed,TBA,AL,NYA,1,2,,3,,
20230802,0,Wed,BOS,AL,SEA,1,1,,2,,
20230802,0,Wed,CHA,AL,TEX,1,3,,4,,
20230802,0,Wed,BAL,AL,TOR,0,0,,0,,
20230803,0,Thu,CIN,NL,CHN,2,0,,2,,
20230803,0,Thu,OAK,AL,LAN,2,1,,3,,
20230803,0,Thu,PHI,NL,MIA,1,1,,2,,
20230803,0,Thu,PIT,NL,MIL,0,2,,2,,
20230803,0,Thu,ARI,NL,SFN,0,1,,1,,
20230803,0,Thu,MIN,AL,SLN,2,1,,3,,
20230803,0,Thu,SEA,AL,ANA,2,1,,3,,
20230803,0,Thu,NYN,NL,KCA,1,2,,3,,
20230803,0,Thu,HOU,AL,NYA,1,2,,3,,
20230803,0,Thu,CHA,AL,TEX,0,2,,2,,
20230803,0,Thu,BAL,AL,TOR,0,0,,0,,
20230804,0,Fri,ATL,NL,CHN,3,0,,3,,
20230804,0,Fri,WAS,NL,CIN,3,3,,6,,
20230804,0,Fri,PIT,NL,MIL,4,1,,5,,
20230804,0,Fri,KCA,AL,PHI,2,1,,3,,
20230804,0,Fri,LAN,NL,SDN,1,1,,2,,
20230804,0,Fri,COL,NL,SLN,0,3,,3,,
20230804,0,Fri,SEA,AL,ANA,4,3,,7,,
20230804,0,Fri,NYN,NL,BAL,0,1,,1,,
20230804,0,Fri,TOR,AL,BOS,5,2,,7,,
20230804,0,Fri,CHA,AL,CLE,0,1,,1,,
20230804,0,Fri,TBA,AL,DET,1,0,,1,,
20230804,0,Fri,ARI,NL,MIN,1,3,,4,,
20230804,0,Fri,HOU,AL,NYA,2,3,,5,,
20230804,0,Fri,MIA,NL,TEX,1,3,,4,,
20230805,0,Sat,ATL,NL,CHN,2,3,,5,,
20230805,0,Sat,WAS,NL,CIN,0,1,,1,,
20230805,0,Sat,PIT,NL,MIL,0,0,,0,,
20230805,0,Sat,KCA,AL,PHI,2,3,,5,,
20230805,0,Sat,LAN,NL,SDN,1,1,,2,,
20230805,0,Sat,COL,NL,SLN,1,1,,2,,
20230805,0,Sat,SEA,AL,ANA,0,1,,1,,
20230805,0,Sat,NYN,NL,BAL,1,2,,3,,
20230805,0,Sat,TOR,AL,BOS,1,1,,2,,
20230805,0,Sat,CHA,AL,CLE,4,0,,4,,
20230805,0,Sat,TBA,AL,DET,0,1,,1,,
20230805,0,Sat,ARI,NL,MIN,1,4,,5,,
20230805,0,Sat,HOU,AL,NYA,1,2,,3,,
20230805,0,Sat,SFN,NL,OAK,0,1,,1,,
20230805,0,Sat,MIA,NL,TEX,2,3,,5,,
20230806,0,Sun,ATL,NL,CHN,1,0,,1,,
20230806,0,Sun,WAS,NL,CIN,2,2,,4,,
20230806,0,Sun,PIT,NL,MIL,3,0,,3,,
20230806,0,Sun,KCA,AL,PHI,1,3,,4,,
20230806,0,Sun,LAN,NL,SDN,3,2,,5,,
20230806,0,Sun,COL,NL,SLN,0,0,,0,,
20230806,0,Sun,SEA,AL,ANA,2,1,,3,,
20230806,0,Sun,NYN,NL,BAL,0,0,,0,,
20230806,0,Sun,TOR,AL,BOS,1,1,,2,,
20230806,0,Sun,CHA,AL,CLE,0,1,,1,,
20230806,0,Sun,TBA,AL,DET,3,1,,4,,
20230806,0,Sun,ARI,NL,MIN,1,2,,3,,
20230806,0,Sun,HOU,AL,NYA,4,1,,5,,
20230806,0,Sun,SFN,NL,OAK,0,2,,2,,
20230806,0,Sun,MIA,NL,TEX,0,4,,4,,
20230807,0,Mon,MIA,NL,CIN,2,2,,4,,
20230807,0,Mon,COL,NL,MIL,1,3,,4,,
20230807,0,Mon,CHN,NL,NYN,0,3,,3,,
20230807,0,Mon,ATL,NL,PIT,1,1,,2,,
20230807,0,Mon,LAN,NL,SDN,2,2,,4,,
20230807,0,Mon,SFN,NL,ANA,1,0,,1,,
20230807,0,Mon,KCA,AL,BOS,0,1,,1,,
20230807,0,Mon,NYA,AL,CHA,0,1,,1,,
20230807,0,Mon,TOR,AL,CLE,1,0,,1,,
20230807,0,Mon,MIN,AL,DET,2,1,,3,,
20230807,0,Mon,TEX,AL,OAK,0,0,,0,,
20230808,0,Tue,LAN,NL,ARI,0,0,,0,,
20230808,0,Tue,MIA,NL,CIN,1,0,,1,,
20230808,0,Tue,COL,NL,MIL,3,2,,5,,
20230808,0,Tue,CHN,NL,NYN,2,1,,3,,
20230808,1,Tue,WAS,NL,PHI,2,4,,6,,
20230808,2,Tue,WAS,NL,PHI,3,1,,4,,
20230808,0,Tue,ATL,NL,PIT,2,4,,6,,
20230808,0,Tue,SFN,NL,ANA,1,1,,2,,
20230808,0,Tue,HOU,AL,BAL,1,2,,3,,
20230808,0,Tue,KCA,AL,BOS,3,1,,4,,
20230808,0,Tue,NYA,AL,CHA,2,1,,3,,
20230808,0,Tue,TOR,AL,CLE,0,0,,0,,
20230808,0,Tue,MIN,AL,DET,0,1,,1,,
20230808,0,Tue,TEX,AL,OAK,1,1,,2,,
20230808,0,Tue,SDN,NL,SEA,0,0,,0,,
20230808,0,Tue,SLN,NL,TBA,2,1,,3,,
20230809,0,Wed,LAN,NL,ARI,0,0,,0,,
20230809,0,Wed,MIA,NL,CIN,3,2,,5,,
20230809,0,Wed,COL,NL,MIL,1,2,,3,,
20230809,0,Wed,CHN,NL,NYN,2,2,,4,,
20230809,0,Wed,WAS,NL,PHI,0,3,,3,,
20230809,0,Wed,ATL,NL,PIT,0,1,,1,,
20230809,0,Wed,SFN,NL,ANA,0,1,,1,,
20230809,0,Wed,HOU,AL,BAL,1,1,,2,,
20230809,0,Wed,KCA,AL,BOS,3,1,,4,,
20230809,0,Wed,NYA,AL,CHA,1,1,,2,,
20230809,0,Wed,TOR,AL,CLE,1,0,,1,,
20230809,0,Wed,MIN,AL,DET,2,2,,4,,
20230809,0,Wed,TEX,AL,OAK,0,1,,1,,
20230809,0,Wed,SDN,NL,SEA,0,1,,1,,
20230809,0,Wed,SLN,NL,TBA,1,3,,4,,
20230810,0,Thu,COL,NL,LAN,1,1,,2,,
20230810,0,Thu,WAS,NL,PHI,0,3,,3,,
20230810,0,Thu,ATL,NL,PIT,2,0,,2,,
20230810,0,Thu,HOU,AL,BAL,2,2,,4,,
20230810,0,Thu,KCA,AL,BOS,0,0,,0,,
20230810,0,Thu,TOR,AL,CLE,0,0,,0,,
20230810,0,Thu,MIN,AL,DET,0,1,,1,,
20230810,0,Thu,SLN,NL,TBA,2,0,,2,,
20230811,0,Fri,SDN,NL,ARI,2,2,,4,,
20230811,0,Fri,COL,NL,LAN,0,0,,0,,
20230811,0,Fri,NYA,AL,MIA,2,1,,3,,
20230811,0,Fri,ATL,NL,NYN,1,0,,1,,
20230811,0,Fri,MIN,AL,PHI,2,3,,5,,
20230811,0,Fri,CIN,NL,PIT,1,1,,2,,
20230811,0,Fri,TEX,AL,SFN,2,0,,2,,
20230811,0,Fri,OAK,AL,WAS,0,3,,3,,
20230811,0,Fri,DET,AL,BOS,1,1,,2,,
20230811,0,Fri,MIL,NL,CHA,1,1,,2,,
20230811,0,Fri,ANA,AL,HOU,1,2,,3,,
20230811,0,Fri,SLN,NL,KCA,2,3,,5,,
20230811,0,Fri,BAL,AL,SEA,1,3,,4,,
20230811,0,Fri,CLE,AL,TBA,1,2,,3,,
20230811,0,Fri,CHN,NL,TOR,2,1,,3,,
20230812,0,Sat,SDN,NL,ARI,0,1,,1,,
20230812,0,Sat,COL,NL,LAN,1,3,,4,,
20230812,0,Sat,NYA,AL,MIA,0,1,,1,,
20230812,1,Sat,ATL,NL,NYN,6,1,,7,,
20230812,2,Sat,ATL,NL,NYN,1,0,,1,,
20230812,0,Sat,MIN,AL,PHI,4,0,,4,,
20230812,0,Sat,TEX,AL,SFN,1,2,,3,,
20230812,0,Sat,OAK,AL,WAS,2,1,,3,,
20230812,0,Sat,DET,AL,BOS,4,1,,5,,
20230812,0,Sat,MIL,NL,CHA,0,1,,1,,
20230812,0,Sat,ANA,AL,HOU,1,1,,2,,
20230812,0,Sat,SLN,NL,KCA,2,1,,3,,
20230812,0,Sat,BAL,AL,SEA,0,0,,0,,
20230812,0,Sat,CLE,AL,TBA,0,1,,1,,
20230812,0,Sat,CHN,NL,TOR,1,1,,2,,
20230813,0,Sun,SDN,NL,ARI,0,2,,2,,
20230813,0,Sun,COL,NL,LAN,1,1,,2,,
20230813,0,Sun,NYA,AL,MIA,2,0,,2,,
20230813,0,Sun,ATL,NL,NYN,2,0,,2,,
20230813,0,Sun,MIN,AL,PHI,1,0,,1,,
20230813,1,Sun,CIN,NL,PIT,0,1,,1,,
20230813,2,Sun,CIN,NL,PIT,1,3,,4,,
20230813,0,Sun,TEX,AL,SFN,0,2,,2,,
20230813,0,Sun,OAK,AL,WAS,3,0,,3,,
20230813,0,Sun,DET,AL,BOS,1,2,,3,,
20230813,0,Sun,MIL,NL,CHA,1,0,,1,,
20230813,0,Sun,ANA,AL,HOU,1,0,,1,,
20230813,0,Sun,BAL,AL,SEA,1,1,,2,,
20230813,0,Sun,CLE,AL,TBA,2,0,,2,,
20230813,0,Sun,CHN,NL,TOR,1,1,,2,,
20230814,0,Mon,NYA,AL,ATL,0,2,,2,,
20230814,0,Mon,ARI,NL,COL,1,2,,3,,
20230814,0,Mon,HOU,AL,MIA,0,3,,3,,
20230814,0,Mon,PIT,NL,NYN,0,3,,3,,
20230814,0,Mon,BAL,AL,SDN,1,1,,2,,
20230814,0,Mon,TBA,AL,SFN,1,0,,1,,
20230814,0,Mon,OAK,AL,SLN,1,1,,2,,
20230814,0,Mon,SEA,AL,KCA,0,2,,2,,
20230814,0,Mon,ANA,AL,TEX,0,2,,2,,
20230815,0,Tue,NYA,AL,ATL,0,2,,2,,
20230815,0,Tue,CHA,AL,CHN,1,2,,3,,
20230815,0,Tue,CLE,AL,CIN,0,0,,0,,
20230815,0,Tue,ARI,NL,COL,1,1,,2,,
20230815,0,Tue,MIL,NL,LAN,1,0,,1,,
20230815,0,Tue,HOU,AL,MIA,3,1,,4,,
20230815,0,Tue,PIT,NL,NYN,1,3,,4,,
20230815,0,Tue,BAL,AL,SDN,1,1,,2,,
20230815,0,Tue,TBA,AL,SFN,0,2,,2,,
20230815,0,Tue,OAK,AL,SLN,1,3,,4,,
20230815,0,Tue,BOS,AL,WAS,1,0,,1,,
20230815,0,Tue,SEA,AL,KCA,4,1,,5,,
20230815,0,Tue,DET,AL,MIN,2,1,,3,,
20230815,0,Tue,ANA,AL,TEX,1,2,,3,,
20230815,0,Tue,PHI,NL,TOR,0,0,,0,,
20230816,0,Wed,NYA,AL,ATL,0,1,,1,,
20230816,0,Wed,CHA,AL,CHN,1,2,,3,,
20230816,0,Wed,CLE,AL,CIN,1,2,,3,,
20230816,0,Wed,ARI,NL,COL,2,2,,4,,
20230816,0,Wed,MIL,NL,LAN,1,2,,3,,
20230816,0,Wed,HOU,AL,MIA,3,0,,3,,
20230816,0,Wed,PIT,NL,NYN,1,3,,4,,
20230816,0,Wed,BAL,AL,SDN,1,1,,2,,
20230816,0,Wed,TBA,AL,SFN,3,0,,3,,
20230816,0,Wed,OAK,AL,SLN,1,0,,1,,
20230816,0,Wed,BOS,AL,WAS,1,4,,5,,
20230816,0,Wed,SEA,AL,KCA,1,1,,2,,
20230816,0,Wed,DET,AL,MIN,4,2,,6,,
20230816,0,Wed,ANA,AL,TEX,2,0,,2,,
20230816,0,Wed,PHI,NL,TOR,3,1,,4,,
20230817,0,Thu,MIL,NL,LAN,0,1,,1,,
20230817,0,Thu,ARI,NL,SDN,2,0,,2,,
20230817,0,Thu,NYN,NL,SLN,2,1,,3,,
20230817,0,Thu,BOS,AL,WAS,3,0,,3,,
20230817,0,Thu,SEA,AL,KCA,2,1,,3,,
20230818,0,Fri,SFN,NL,ATL,0,0,,0,,
20230818,0,Fri,KCA,AL,CHN,1,0,,1,,
20230818,0,Fri,TOR,AL,CIN,0,1,,1,,
20230818,0,Fri,CHA,AL,COL,1,3,,4,,
20230818,0,Fri,MIA,NL,LAN,5,3,,8,,
20230818,0,Fri,ARI,NL,SDN,0,1,,1,,
20230818,0,Fri,NYN,NL,SLN,2,0,,2,,
20230818,0,Fri,PHI,NL,WAS,2,1,,3,,
20230818,0,Fri,TBA,AL,ANA,0,1,,1,,
20230818,1,Fri,DET,AL,CLE,2,0,,2,,
20230818,2,Fri,DET,AL,CLE,0,0,,0,,
20230818,0,Fri,SEA,AL,HOU,2,0,,2,,
20230818,0,Fri,PIT,NL,MIN,0,1,,1,,
20230818,0,Fri,BOS,AL,NYA,1,1,,2,,
20230818,0,Fri,BAL,AL,OAK,1,0,,1,,
20230818,0,Fri,MIL,NL,TEX,1,2,,3,,
20230819,0,Sat,SFN,NL,ATL,1,2,,3,,
20230819,0,Sat,KCA,AL,CHN,0,2,,2,,
20230819,0,Sat,TOR,AL,CIN,1,1,,2,,
20230819,0,Sat,CHA,AL,COL,1,1,,2,,
20230819,1,Sat,MIA,NL,LAN,0,0,,0,,
20230819,2,Sat,MIA,NL,LAN,1,2,,3,,
20230819,1,Sat,ARI,NL,SDN,1,3,,4,,
20230819,2,Sat,ARI,NL,SDN,1,1,,2,,
20230819,0,Sat,NYN,NL,SLN,3,1,,4,,
20230819,0,Sat,PHI,NL,WAS,5,0,,5,,
20230819,1,Sat,TBA,AL,ANA,3,1,,4,,
20230819,2,Sat,TBA,AL,ANA,3,2,,5,,
20230819,0,Sat,DET,AL,CLE,2,1,,3,,
20230819,0,Sat,SEA,AL,HOU,3,3,,6,,
20230819,0,Sat,PIT,NL,MIN,1,0,,1,,
20230819,0,Sat,BOS,AL,NYA,3,1,,4,,
20230819,0,Sat,BAL,AL,OAK,2,2,,4,,
20230819,0,Sat,MIL,NL,TEX,2,0,,2,,
20230820,0,Sun,SFN,NL,ATL,2,1,,3,,
20230820,0,Sun,KCA,AL,CHN,0,2,,2,,
20230820,0,Sun,TOR,AL,CIN,5,1,,6,,
20230820,0,Sun,CHA,AL,COL,2,1,,3,,
20230820,0,Sun,NYN,NL,SLN,1,1,,2,,
20230820,0,Sun,PHI,NL,WAS,1,0,,1,,
20230820,0,Sun,DET,AL,CLE,2,0,,2,,
20230820,0,Sun,SEA,AL,HOU,1,0,,1,,
20230820,0,Sun,PIT,NL,MIN,0,0,,0,,
20230820,0,Sun,BOS,AL,NYA,2,3,,5,,
20230820,0,Sun,BAL,AL,OAK,3,1,,4,,
20230820,0,Sun,MIL,NL,TEX,0,1,,1,,
20230821,0,Mon,TEX,AL,ARI,1,1,,2,,
20230821,0,Mon,NYN,NL,ATL,3,2,,5,,
20230821,0,Mon,SFN,NL,PHI,2,4,,6,,
20230821,0,Mon,SLN,NL,PIT,1,1,,2,,
20230821,0,Mon,MIA,NL,SDN,1,2,,3,,
20230821,0,Mon,SEA,AL,CHA,4,0,,4,,
20230821,0,Mon,CHN,NL,DET,1,2,,3,,
20230821,0,Mon,BOS,AL,HOU,1,3,,4,,
20230821,0,Mon,KCA,AL,OAK,1,4,,5,,
20230822,0,Tue,TEX,AL,ARI,1,0,,1,,
20230822,0,Tue,NYN,NL,ATL,1,2,,3,,
20230822,0,Tue,MIN,AL,MIL,1,1,,2,,
20230822,0,Tue,SFN,NL,PHI,0,1,,1,,
20230822,0,Tue,SLN,NL,PIT,1,1,,2,,
20230822,0,Tue,MIA,NL,SDN,1,0,,1,,
20230822,0,Tue,CIN,NL,ANA,1,3,,4,,
20230822,0,Tue,TOR,AL,BAL,2,0,,2,,
20230822,0,Tue,SEA,AL,CHA,1,1,,2,,
20230822,0,Tue,LAN,NL,CLE,1,2,,3,,
20230822,0,Tue,CHN,NL,DET,2,2,,4,,
20230822,0,Tue,BOS,AL,HOU,1,1,,2,,
20230822,0,Tue,WAS,NL,NYA,2,1,,3,,
20230822,0,Tue,KCA,AL,OAK,0,1,,1,,
20230822,0,Tue,COL,NL,TBA,1,1,,2,,
20230823,0,Wed,NYN,NL,ATL,0,1,,1,,
20230823,0,Wed,MIN,AL,MIL,3,3,,6,,
20230823,0,Wed,SFN,NL,PHI,2,3,,5,,
20230823,0,Wed,SLN,NL,PIT,0,1,,1,,
20230823,0,Wed,MIA,NL,SDN,0,1,,1,,
20230823,1,Wed,CIN,NL,ANA,1,1,,2,,
20230823,2,Wed,CIN,NL,ANA,2,0,,2,,
20230823,0,Wed,TOR,AL,BAL,0,2,,2,,
20230823,0,Wed,SEA,AL,CHA,0,1,,1,,
20230823,0,Wed,LAN,NL,CLE,0,1,,1,,
20230823,0,Wed,CHN,NL,DET,0,1,,1,,
20230823,0,Wed,BOS,AL,HOU,1,1,,2,,
20230823,0,Wed,WAS,NL,NYA,1,4,,5,,
20230823,0,Wed,KCA,AL,OAK,2,0,,2,,
20230823,0,Wed,COL,NL,TBA,1,2,,3,,
20230824,0,Thu,CIN,NL,ARI,1,1,,2,,
20230824,0,Thu,CHN,NL,PIT,0,1,,1,,
20230824,0,Thu,TOR,AL,BAL,1,2,,3,,
20230824,0,Thu,OAK,AL,CHA,5,3,,8,,
20230824,0,Thu,LAN,NL,CLE,2,1,,3,,
20230824,0,Thu,BOS,AL,HOU,3,0,,3,,
20230824,0,Thu,TEX,AL,MIN,3,5,,8,,
20230824,0,Thu,WAS,NL,NYA,2,3,,5,,
20230824,0,Thu,COL,NL,TBA,1,3,,4,,
20230825,0,Fri,CIN,NL,ARI,3,0,,3,,
20230825,0,Fri,WAS,NL,MIA,1,0,,1,,
20230825,0,Fri,SDN,NL,MIL,2,1,,3,,
20230825,0,Fri,ANA,AL,NYN,0,1,,1,,
20230825,0,Fri,SLN,NL,PHI,1,2,,3,,
20230825,0,Fri,CHN,NL,PIT,1,0,,1,,
20230825,0,Fri,ATL,NL,SFN,1,0,,1,,
20230825,0,Fri,COL,NL,BAL,1,3,,4,,
20230825,0,Fri,LAN,NL,BOS,0,2,,2,,
20230825,0,Fri,OAK,AL,CHA,2,2,,4,,
20230825,0,Fri,HOU,AL,DET,0,1,,1,,
20230825,0,Fri,TEX,AL,MIN,1,3,,4,,
20230825,0,Fri,KCA,AL,SEA,1,1,,2,,
20230825,0,Fri,NYA,AL,TBA,2,1,,3,,
20230825,0,Fri,CLE,AL,TOR,3,2,,5,,
20230826,0,Sat,CIN,NL,ARI,1,1,,2,,
20230826,0,Sat,WAS,NL,MIA,0,2,,2,,
20230826,0,Sat,SDN,NL,MIL,2,0,,2,,
20230826,0,Sat,ANA,AL,NYN,1,1,,2,,
20230826,0,Sat,SLN,NL,PHI,1,3,,4,,
20230826,0,Sat,CHN,NL,PIT,0,1,,1,,
20230826,0,Sat,ATL,NL,SFN,2,1,,3,,
20230826,0,Sat,COL,NL,BAL,0,0,,0,,
20230826,0,Sat,LAN,NL,BOS,1,3,,4,,
20230826,0,Sat,OAK,AL,CHA,0,3,,3,,
20230826,0,Sat,HOU,AL,DET,1,0,,1,,
20230826,0,Sat,TEX,AL,MIN,2,1,,3,,
20230826,0,Sat,KCA,AL,SEA,1,7,,8,,
20230826,0,Sat,NYA,AL,TBA,0,0,,0,,
20230826,0,Sat,CLE,AL,TOR,2,1,,3,,
20230827,0,Sun,CIN,NL,ARI,0,1,,1,,
20230827,0,Sun,WAS,NL,MIA,0,1,,1,,
20230827,0,Sun,SDN,NL,MIL,2,1,,3,,
20230827,0,Sun,ANA,AL,NYN,1,0,,1,,
20230827,0,Sun,SLN,NL,PHI,0,1,,1,,
20230827,0,Sun,CHN,NL,PIT,1,0,,1,,
20230827,0,Sun,ATL,NL,SFN,1,1,,2,,
20230827,0,Sun,COL,NL,BAL,1,2,,3,,
20230827,0,Sun,LAN,NL,BOS,2,3,,5,,
20230827,0,Sun,OAK,AL,CHA,0,0,,0,,
20230827,0,Sun,HOU,AL,DET,4,2,,6,,
20230827,0,Sun,TEX,AL,MIN,2,1,,3,,
20230827,0,Sun,KCA,AL,SEA,1,2,,3,,
20230827,0,Sun,NYA,AL,TBA,3,1,,4,,
20230827,0,Sun,CLE,AL,TOR,2,3,,5,,
20230828,0,Mon,MIL,NL,CHN,2,2,,4,,
20230828,0,Mon,ATL,NL,COL,2,1,,3,,
20230828,0,Mon,ARI,NL,LAN,1,4,,5,,
20230828,0,Mon,TEX,AL,NYN,0,2,,2,,
20230828,0,Mon,ANA,AL,PHI,0,3,,3,,
20230828,0,Mon,CIN,NL,SFN,0,0,,0,,
20230828,0,Mon,SDN,NL,SLN,0,1,,1,,
20230828,0,Mon,CHA,AL,BAL,0,1,,1,,
20230828,0,Mon,HOU,AL,BOS,3,1,,4,,
20230828,0,Mon,NYA,AL,DET,2,1,,3,,
20230828,0,Mon,PIT,NL,KCA,0,0,,0,,
20230828,0,Mon,CLE,AL,MIN,1,3,,4,,
20230828,0,Mon,OAK,AL,SEA,0,2,,2,,
20230828,0,Mon,WAS,NL,TOR,0,1,,1,,
20230829,0,Tue,MIL,NL,CHN,0,0,,0,,
20230829,0,Tue,ATL,NL,COL,1,0,,1,,
20230829,0,Tue,ARI,NL,LAN,1,2,,3,,
20230829,0,Tue,TBA,AL,MIA,3,1,,4,,
20230829,0,Tue,TEX,AL,NYN,1,1,,2,,
20230829,0,Tue,ANA,AL,PHI,3,5,,8,,
20230829,0,Tue,CIN,NL,SFN,0,1,,1,,
20230829,0,Tue,SDN,NL,SLN,1,2,,3,,
20230829,0,Tue,CHA,AL,BAL,1,0,,1,,
20230829,0,Tue,HOU,AL,BOS,2,1,,3,,
20230829,0,Tue,NYA,AL,DET,3,0,,3,,
20230829,0,Tue,PIT,NL,KCA,2,0,,2,,
20230829,0,Tue,CLE,AL,MIN,1,2,,3,,
20230829,0,Tue,OAK,AL,SEA,2,0,,2,,
20230829,0,Tue,WAS,NL,TOR,2,1,,3,,
20230830,0,Wed,MIL,NL,CHN,0,0,,0,,
20230830,0,Wed,ATL,NL,COL,3,1,,4,,
20230830,0,Wed,ARI,NL,LAN,0,2,,2,,
20230830,0,Wed,TBA,AL,MIA,0,0,,0,,
20230830,0,Wed,TEX,AL,NYN,1,3,,4,,
20230830,0,Wed,ANA,AL,PHI,2,2,,4,,
20230830,0,Wed,CIN,NL,SFN,1,0,,1,,
20230830,0,Wed,SDN,NL,SLN,0,2,,2,,
20230830,0,Wed,CHA,AL,BAL,3,1,,4,,
20230830,0,Wed,HOU,AL,BOS,0,0,,0,,
20230830,0,Wed,NYA,AL,DET,3,2,,5,,
20230830,0,Wed,PIT,NL,KCA,2,1,,3,,
20230830,0,Wed,CLE,AL,MIN,1,0,,1,,
20230830,0,Wed,OAK,AL,SEA,1,1,,2,,
20230830,0,Wed,WAS,NL,TOR,0,0,,0,,
20230831,0,Thu,ATL,NL,LAN,3,4,,7,,
20230831,0,Thu,SFN,NL,SDN,1,0,,1,,
20230831,0,Thu,MIA,NL,WAS,2,0,,2,,
20230831,0,Thu,NYA,AL,DET,1,1,,2,,
20230901,0,Fri,BAL,AL,ARI,0,2,,2,,
20230901,1,Fri,CHN,NL,CIN,3,0,,3,,
20230901,2,Fri,CHN,NL,CIN,1,1,,2,,
20230901,0,Fri,TOR,AL,COL,3,2,,5,,
20230901,0,Fri,ATL,NL,LAN,3,1,,4,,
20230901,0,Fri,PHI,NL,MIL,2,1,,3,,
20230901,0,Fri,SEA,AL,NYN,1,1,,2,,
20230901,0,Fri,SFN,NL,SDN,1,2,,3,,
20230901,0,Fri,PIT,NL,SLN,0,1,,1,,
20230901,0,Fri,MIA,NL,WAS,1,3,,4,,
20230901,0,Fri,DET,AL,CHA,0,0,,0,,
20230901,0,Fri,TBA,AL,CLE,0,0,,0,,
20230901,0,Fri,NYA,AL,HOU,4,1,,5,,
20230901,0,Fri,BOS,AL,KCA,1,4,,5,,
20230901,0,Fri,ANA,AL,OAK,1,1,,2,,
20230901,0,Fri,MIN,AL,TEX,3,1,,4,,
20230902,0,Sat,BAL,AL,ARI,2,1,,3,,
20230902,0,Sat,CHN,NL,CIN,1,0,,1,,
20230902,0,Sat,TOR,AL,COL,1,0,,1,,
20230902,0,Sat,ATL,NL,LAN,2,0,,2,,
20230902,0,Sat,PHI,NL,MIL,3,1,,4,,
20230902,0,Sat,SEA,AL,NYN,3,3,,6,,
20230902,0,Sat,SFN,NL,SDN,0,4,,4,,
20230902,0,Sat,PIT,NL,SLN,1,3,,4,,
20230902,0,Sat,MIA,NL,WAS,4,2,,6,,
20230902,0,Sat,DET,AL,CHA,1,0,,1,,
20230902,0,Sat,TBA,AL,CLE,3,1,,4,,
20230902,0,Sat,NYA,AL,HOU,1,2,,3,,
20230902,0,Sat,BOS,AL,KCA,1,1,,2,,
20230902,0,Sat,ANA,AL,OAK,0,1,,1,,
20230902,0,Sat,MIN,AL,TEX,1,2,,3,,
20230903,0,Sun,BAL,AL,ARI,0,3,,3,,
20230903,0,Sun,CHN,NL,CIN,2,3,,5,,
20230903,0,Sun,TOR,AL,COL,2,0,,2,,
20230903,0,Sun,ATL,NL,LAN,1,0,,1,,
20230903,0,Sun,PHI,NL,MIL,2,2,,4,,
20230903,0,Sun,SEA,AL,NYN,2,3,,5,,
20230903,0,Sun,SFN,NL,SDN,0,2,,2,,
20230903,0,Sun,PIT,NL,SLN,1,1,,2,,
20230903,0,Sun,MIA,NL,WAS,1,1,,2,,
20230903,0,Sun,DET,AL,CHA,1,0,,1,,
20230903,0,Sun,TBA,AL,CLE,1,0,,1,,
20230903,0,Sun,NYA,AL,HOU,2,0,,2,,
20230903,0,Sun,BOS,AL,KCA,2,0,,2,,
20230903,0,Sun,ANA,AL,OAK,2,2,,4,,
20230903,0,Sun,MIN,AL,TEX,1,3,,4,,
20230904,0,Mon,COL,NL,ARI,0,0,,0,,
20230904,0,Mon,SFN,NL,CHN,0,1,,1,,
20230904,0,Mon,SEA,AL,CIN,2,1,,3,,
20230904,0,Mon,MIL,NL,PIT,0,2,,2,,
20230904,0,Mon,PHI,NL,SDN,3,1,,4,,
20230904,0,Mon,BAL,AL,ANA,1,2,,3,,
20230904,0,Mon,MIN,AL,CLE,6,1,,7,,
20230904,0,Mon,CHA,AL,KCA,0,3,,3,,
20230904,0,Mon,TOR,AL,OAK,0,4,,4,,
20230904,0,Mon,BOS,AL,TBA,2,0,,2,,
20230904,0,Mon,HOU,AL,TEX,5,4,,9,,
20230905,0,Tue,COL,NL,ARI,0,0,,0,,
20230905,0,Tue,SLN,NL,ATL,4,4,,8,,
20230905,0,Tue,SFN,NL,CHN,4,2,,6,,
20230905,0,Tue,SEA,AL,CIN,3,3,,6,,
20230905,0,Tue,LAN,NL,MIA,1,4,,5,,
20230905,0,Tue,MIL,NL,PIT,0,1,,1,,
20230905,0,Tue,PHI,NL,SDN,0,1,,1,,
20230905,0,Tue,NYN,NL,WAS,5,0,,5,,
20230905,0,Tue,BAL,AL,ANA,0,0,,0,,
20230905,0,Tue,MIN,AL,CLE,1,1,,2,,
20230905,0,Tue,CHA,AL,KCA,3,3,,6,,
20230905,0,Tue,DET,AL,NYA,0,2,,2,,
20230905,0,Tue,TOR,AL,OAK,0,0,,0,,
20230905,0,Tue,BOS,AL,TBA,1,2,,3,,
20230905,0,Tue,HOU,AL,TEX,6,0,,6,,
20230906,0,Wed,COL,NL,ARI,0,2,,2,,
20230906,0,Wed,SLN,NL,ATL,4,2,,6,,
20230906,0,Wed,SFN,NL,CHN,0,2,,2,,
20230906,0,Wed,SEA,AL,CIN,3,1,,4,,
20230906,0,Wed,LAN,NL,MIA,2,3,,5,,
20230906,0,Wed,MIL,NL,PIT,1,1,,2,,
20230906,0,Wed,PHI,NL,SDN,2,0,,2,,
20230906,0,Wed,NYN,NL,WAS,0,0,,0,,
20230906,0,Wed,BAL,AL,ANA,2,1,,3,,
20230906,0,Wed,MIN,AL,CLE,0,0,,0,,
20230906,0,Wed,CHA,AL,KCA,3,2,,5,,
20230906,0,Wed,DET,AL,NYA,0,1,,1,,
20230906,0,Wed,TOR,AL,OAK,1,2,,3,,
20230906,0,Wed,BOS,AL,TBA,0,2,,2,,
20230906,0,Wed,HOU,AL,TEX,5,2,,7,,
20230907,0,Thu,SLN,NL,ATL,0,5,,5,,
20230907,0,Thu,ARI,NL,CHN,3,0,,3,,
20230907,0,Thu,LAN,NL,MIA,1,0,,1,,
20230907,0,Thu,CLE,AL,ANA,0,0,,0,,
20230907,0,Thu,DET,AL,NYA,3,1,,4,,
20230907,0,Thu,SEA,AL,TBA,0,0,,0,,
20230908,0,Fri,PIT,NL,ATL,1,2,,3,,
20230908,0,Fri,ARI,NL,CHN,0,0,,0,,
20230908,0,Fri,SLN,NL,CIN,1,2,,3,,
20230908,0,Fri,MIA,NL,PHI,2,1,,3,,
20230908,0,Fri,COL,NL,SFN,2,4,,6,,
20230908,0,Fri,LAN,NL,WAS,3,2,,5,,
20230908,0,Fri,CLE,AL,ANA,0,1,,1,,
20230908,0,Fri,BAL,AL,BOS,2,1,,3,,
20230908,0,Fri,CHA,AL,DET,1,0,,1,,
20230908,0,Fri,SDN,NL,HOU,2,0,,2,,
20230908,0,Fri,NYN,NL,MIN,0,1,,1,,
20230908,0,Fri,MIL,NL,NYA,1,1,,2,,
20230908,0,Fri,SEA,AL,TBA,3,3,,6,,
20230908,0,Fri,OAK,AL,TEX,2,1,,3,,
20230908,0,Fri,KCA,AL,TOR,1,0,,1,,
20230909,0,Sat,PIT,NL,ATL,2,1,,3,,
20230909,0,Sat,ARI,NL,CHN,0,0,,0,,
20230909,0,Sat,SLN,NL,CIN,1,0,,1,,
20230909,0,Sat,MIA,NL,PHI,1,1,,2,,
20230909,0,Sat,COL,NL,SFN,0,1,,1,,
20230909,0,Sat,LAN,NL,WAS,1,1,,2,,
20230909,0,Sat,CLE,AL,ANA,2,4,,6,,
20230909,0,Sat,BAL,AL,BOS,5,1,,6,,
20230909,0,Sat,CHA,AL,DET,0,1,,1,,
20230909,0,Sat,SDN,NL,HOU,1,1,,2,,
20230909,0,Sat,NYN,NL,MIN,3,1,,4,,
20230909,0,Sat,MIL,NL,NYA,1,0,,1,,
20230909,0,Sat,SEA,AL,TBA,1,1,,2,,
20230909,0,Sat,OAK,AL,TEX,1,0,,1,,
20230909,0,Sat,KCA,AL,TOR,1,2,,3,,
20230910,0,Sun,PIT,NL,ATL,0,0,,0,,
20230910,0,Sun,ARI,NL,CHN,0,3,,3,,
20230910,0,Sun,SLN,NL,CIN,0,4,,4,,
20230910,0,Sun,MIA,NL,PHI,1,2,,3,,
20230910,0,Sun,COL,NL,SFN,0,3,,3,,
20230910,0,Sun,LAN,NL,WAS,1,0,,1,,
20230910,0,Sun,CLE,AL,ANA,1,0,,1,,
20230910,0,Sun,BAL,AL,BOS,0,1,,1,,
20230910,0,Sun,CHA,AL,DET,0,0,,0,,
20230910,0,Sun,SDN,NL,HOU,2,1,,3,,
20230910,0,Sun,NYN,NL,MIN,0,0,,0,,
20230910,0,Sun,MIL,NL,NYA,0,1,,1,,
20230910,0,Sun,SEA,AL,TBA,0,0,,0,,
20230910,0,Sun,OAK,AL,TEX,1,3,,4,,
20230910,0,Sun,KCA,AL,TOR,0,1,,1,,
20230911,0,Mon,CHN,NL,COL,1,0,,1,,
20230911,0,Mon,SDN,NL,LAN,4,2,,6,,
20230911,0,Mon,MIA,NL,MIL,0,1,,1,,
20230911,0,Mon,ARI,NL,NYN,1,1,,2,,
20230911,1,Mon,ATL,NL,PHI,2,2,,4,,
20230911,2,Mon,ATL,NL,PHI,3,1,,4,,
20230911,0,Mon,WAS,NL,PIT,3,0,,3,,
20230911,0,Mon,CLE,AL,SFN,1,1,,2,,
20230911,0,Mon,SLN,NL,BAL,0,2,,2,,
20230911,0,Mon,OAK,AL,HOU,3,0,,3,,
20230911,0,Mon,TBA,AL,MIN,2,2,,4,,
20230911,0,Mon,ANA,AL,SEA,3,2,,5,,
20230911,0,Mon,TEX,AL,TOR,2,1,,3,,
20230912,0,Tue,CHN,NL,COL,1,1,,2,,
20230912,0,Tue,SDN,NL,LAN,1,2,,3,,
20230912,0,Tue,MIA,NL,MIL,1,1,,2,,
20230912,0,Tue,ARI,NL,NYN,0,3,,3,,
20230912,0,Tue,ATL,NL,PHI,3,4,,7,,
20230912,0,Tue,WAS,NL,PIT,0,1,,1,,
20230912,0,Tue,CLE,AL,SFN,0,1,,1,,
20230912,0,Tue,SLN,NL,BAL,3,0,,3,,
20230912,1,Tue,NYA,AL,BOS,0,1,,1,,
20230912,2,Tue,NYA,AL,BOS,0,1,,1,,
20230912,1,Tue,KCA,AL,CHA,0,0,,0,,
20230912,2,Tue,KCA,AL,CHA,1,1,,2,,
20230912,0,Tue,CIN,NL,DET,0,1,,1,,
20230912,0,Tue,OAK,AL,HOU,2,0,,2,,
20230912,0,Tue,TBA,AL,MIN,1,2,,3,,
20230912,0,Tue,ANA,AL,SEA,0,1,,1,,
20230912,0,Tue,TEX,AL,TOR,1,1,,2,,
20230913,0,Wed,CHN,NL,COL,0,4,,4,,
20230913,0,Wed,SDN,NL,LAN,2,1,,3,,
20230913,0,Wed,MIA,NL,MIL,0,0,,0,,
20230913,0,Wed,ARI,NL,NYN,0,1,,1,,
20230913,0,Wed,ATL,NL,PHI,1,0,,1,,
20230913,0,Wed,WAS,NL,PIT,2,1,,3,,
20230913,0,Wed,CLE,AL,SFN,1,1,,2,,
20230913,0,Wed,SLN,NL,BAL,1,0,,1,,
20230913,0,Wed,KCA,AL,CHA,1,0,,1,,
20230913,0,Wed,CIN,NL,DET,0,1,,1,,
20230913,0,Wed,OAK,AL,HOU,0,3,,3,,
20230913,0,Wed,TBA,AL,MIN,1,2,,3,,
20230913,0,Wed,ANA,AL,SEA,1,0,,1,,
20230913,0,Wed,TEX,AL,TOR,3,0,,3,,
20230914,0,Thu,MIA,NL,MIL,0,0,,0,,
20230914,0,Thu,ARI,NL,NYN,0,2,,2,,
20230914,0,Thu,WAS,NL,PIT,0,2,,2,,
20230914,0,Thu,TBA,AL,BAL,1,2,,3,,
20230914,1,Thu,NYA,AL,BOS,0,2,,2,,
20230914,2,Thu,NYA,AL,BOS,2,1,,3,,
20230914,0,Thu,MIN,AL,CHA,3,1,,4,,
20230914,0,Thu,CIN,NL,DET,2,2,,4,,
20230914,0,Thu,TEX,AL,TOR,2,1,,3,,
20230915,0,Fri,CHN,NL,ARI,3,2,,5,,
20230915,0,Fri,SFN,NL,COL,0,0,,0,,
20230915,0,Fri,ATL,NL,MIA,1,2,,3,,
20230915,0,Fri,WAS,NL,MIL,1,3,,4,,
20230915,0,Fri,CIN,NL,NYN,2,1,,3,,
20230915,0,Fri,NYA,AL,PIT,0,0,,0,,
20230915,0,Fri,PHI,NL,SLN,1,0,,1,,
20230915,0,Fri,DET,AL,ANA,2,2,,4,,
20230915,0,Fri,TBA,AL,BAL,2,1,,3,,
20230915,0,Fri,MIN,AL,CHA,1,1,,2,,
20230915,0,Fri,TEX,AL,CLE,1,3,,4,,
20230915,0,Fri,HOU,AL,KCA,1,3,,4,,
20230915,0,Fri,SDN,NL,OAK,2,2,,4,,
20230915,0,Fri,LAN,NL,SEA,2,1,,3,,
20230915,0,Fri,BOS,AL,TOR,0,1,,1,,
20230916,0,Sat,CHN,NL,ARI,0,0,,0,,
20230916,1,Sat,SFN,NL,COL,1,0,,1,,
20230916,2,Sat,SFN,NL,COL,0,0,,0,,
20230916,0,Sat,ATL,NL,MIA,4,4,,8,,
20230916,0,Sat,WAS,NL,MIL,1,2,,3,,
20230916,0,Sat,CIN,NL,NYN,1,0,,1,,
20230916,0,Sat,NYA,AL,PIT,2,1,,3,,
20230916,0,Sat,PHI,NL,SLN,1,0,,1,,
20230916,0,Sat,DET,AL,ANA,1,3,,4,,
20230916,0,Sat,TBA,AL,BAL,0,1,,1,,
20230916,0,Sat,MIN,AL,CHA,0,2,,2,,
20230916,0,Sat,TEX,AL,CLE,0,0,,0,,
20230916,0,Sat,HOU,AL,KCA,2,1,,3,,
20230916,0,Sat,SDN,NL,OAK,0,1,,1,,
20230916,0,Sat,LAN,NL,SEA,0,0,,0,,
20230916,0,Sat,BOS,AL,TOR,1,1,,2,,
20230917,0,Sun,CHN,NL,ARI,0,1,,1,,
20230917,0,Sun,SFN,NL,COL,1,2,,3,,
20230917,0,Sun,ATL,NL,MIA,1,4,,5,,
20230917,0,Sun,WAS,NL,MIL,1,0,,1,,
20230917,0,Sun,CIN,NL,NYN,2,0,,2,,
20230917,0,Sun,NYA,AL,PIT,1,1,,2,,
20230917,0,Sun,PHI,NL,SLN,1,2,,3,,
20230917,0,Sun,DET,AL,ANA,2,1,,3,,
20230917,0,Sun,TBA,AL,BAL,3,1,,4,,
20230917,0,Sun,MIN,AL,CHA,2,0,,2,,
20230917,0,Sun,TEX,AL,CLE,0,1,,1,,
20230917,0,Sun,HOU,AL,KCA,2,0,,2,,
20230917,0,Sun,SDN,NL,OAK,2,1,,3,,
20230917,0,Sun,LAN,NL,SEA,3,0,,3,,
20230917,0,Sun,BOS,AL,TOR,1,1,,2,,
20230918,0,Mon,PHI,NL,ATL,5,1,,6,,
20230918,0,Mon,MIN,AL,CIN,2,1,,3,,
20230918,0,Mon,DET,AL,LAN,1,3,,4,,
20230918,0,Mon,NYN,NL,MIA,1,0,,1,,
20230918,0,Mon,COL,NL,SDN,1,3,,4,,
20230918,0,Mon,MIL,NL,SLN,0,1,,1,,
20230918,0,Mon,CHA,AL,WAS,1,1,,2,,
20230918,0,Mon,BAL,AL,HOU,1,2,,3,,
20230918,0,Mon,CLE,AL,KCA,1,1,,2,,
20230918,0,Mon,SEA,AL,OAK,1,0,,1,,
20230918,0,Mon,BOS,AL,TEX,0,1,,1,,
20230919,0,Tue,SFN,NL,ARI,1,0,,1,,
20230919,0,Tue,PHI,NL,ATL,1,2,,3,,
20230919,0,Tue,PIT,NL,CHN,1,4,,5,,
20230919,0,Tue,MIN,AL,CIN,2,0,,2,,
20230919,0,Tue,DET,AL,LAN,2,1,,3,,
20230919,0,Tue,NYN,NL,MIA,0,0,,0,,
20230919,0,Tue,COL,NL,SDN,0,1,,1,,
20230919,0,Tue,MIL,NL,SLN,1,1,,2,,
20230919,0,Tue,CHA,AL,WAS,2,1,,3,,
20230919,0,Tue,BAL,AL,HOU,4,3,,7,,
20230919,0,Tue,CLE,AL,KCA,1,1,,2,,
20230919,0,Tue,TOR,AL,NYA,3,0,,3,,
20230919,0,Tue,SEA,AL,OAK,1,0,,1,,
20230919,0,Tue,ANA,AL,TBA,2,1,,3,,
20230919,0,Tue,BOS,AL,TEX,0,1,,1,,
20230920,0,Wed,SFN,NL,ARI,1,2,,3,,
20230920,0,Wed,PHI,NL,ATL,2,0,,2,,
20230920,0,Wed,PIT,NL,CHN,3,2,,5,,
20230920,0,Wed,MIN,AL,CIN,1,1,,2,,
20230920,0,Wed,DET,AL,LAN,0,1,,1,,
20230920,0,Wed,NYN,NL,MIA,4,1,,5,,
20230920,0,Wed,COL,NL,SDN,1,0,,1,,
20230920,0,Wed,MIL,NL,SLN,3,0,,3,,
20230920,0,Wed,CHA,AL,WAS,0,3,,3,,
20230920,0,Wed,BAL,AL,HOU,0,0,,0,,
20230920,0,Wed,CLE,AL,KCA,0,1,,1,,
20230920,0,Wed,TOR,AL,NYA,0,1,,1,,
20230920,0,Wed,SEA,AL,OAK,3,2,,5,,
20230920,0,Wed,ANA,AL,TBA,2,0,,2,,
20230920,0,Wed,BOS,AL,TEX,2,4,,6,,
20230921,0,Thu,PIT,NL,CHN,1,1,,2,,
20230921,0,Thu,SFN,NL,LAN,1,1,,2,,
20230921,0,Thu,NYN,NL,PHI,1,2,,3,,
20230921,0,Thu,MIL,NL,SLN,2,0,,2,,
20230921,0,Thu,ATL,NL,WAS,2,1,,3,,
20230921,0,Thu,BAL,AL,CLE,0,0,,0,,
20230921,0,Thu,TOR,AL,NYA,0,1,,1,,
20230921,0,Thu,DET,AL,OAK,0,1,,1,,
20230921,0,Thu,ANA,AL,TBA,1,0,,1,,
20230922,0,Fri,COL,NL,CHN,0,2,,2,,
20230922,0,Fri,PIT,NL,CIN,4,1,,5,,
20230922,0,Fri,SFN,NL,LAN,3,0,,3,,
20230922,0,Fri,MIL,NL,MIA,3,1,,4,,
20230922,0,Fri,NYN,NL,PHI,2,1,,3,,
20230922,0,Fri,SLN,NL,SDN,1,2,,3,,
20230922,0,Fri,ATL,NL,WAS,3,0,,3,,
20230922,0,Fri,CHA,AL,BOS,0,0,,0,,
20230922,0,Fri,BAL,AL,CLE,0,0,,0,,
20230922,0,Fri,KCA,AL,HOU,0,2,,2,,
20230922,0,Fri,ANA,AL,MIN,2,1,,3,,
20230922,0,Fri,ARI,NL,NYA,1,3,,4,,
20230922,0,Fri,DET,AL,OAK,1,2,,3,,
20230922,0,Fri,TOR,AL,TBA,1,1,,2,,
20230922,0,Fri,SEA,AL,TEX,1,2,,3,,
20230923,0,Sat,COL,NL,CHN,0,1,,1,,
20230923,0,Sat,PIT,NL,CIN,1,3,,4,,
20230923,0,Sat,SFN,NL,LAN,0,1,,1,,
20230923,0,Sat,MIL,NL,MIA,1,1,,2,,
20230923,0,Sat,NYN,NL,PHI,0,2,,2,,
20230923,0,Sat,SLN,NL,SDN,0,0,,0,,
20230923,0,Sat,CHA,AL,BOS,1,0,,1,,
20230923,0,Sat,BAL,AL,CLE,0,1,,1,,
20230923,0,Sat,KCA,AL,HOU,0,1,,1,,
20230923,0,Sat,ANA,AL,MIN,1,0,,1,,
20230923,0,Sat,DET,AL,OAK,0,1,,1,,
20230923,0,Sat,TOR,AL,TBA,0,3,,3,,
20230923,0,Sat,SEA,AL,TEX,0,0,,0,,
20230924,0,Sun,COL,NL,CHN,2,1,,3,,
20230924,0,Sun,PIT,NL,CIN,1,2,,3,,
20230924,0,Sun,SFN,NL,LAN,1,1,,2,,
20230924,0,Sun,MIL,NL,MIA,0,3,,3,,
20230924,0,Sun,NYN,NL,PHI,1,1,,2,,
20230924,0,Sun,SLN,NL,SDN,1,2,,3,,
20230924,1,Sun,ATL,NL,WAS,1,0,,1,,
20230924,2,Sun,ATL,NL,WAS,2,2,,4,,
20230924,0,Sun,CHA,AL,BOS,0,2,,2,,
20230924,0,Sun,BAL,AL,CLE,0,0,,0,,
20230924,0,Sun,KCA,AL,HOU,4,1,,5,,
20230924,0,Sun,ANA,AL,MIN,0,3,,3,,
20230924,0,Sun,ARI,NL,NYA,0,0,,0,,
20230924,0,Sun,DET,AL,OAK,0,0,,0,,
20230924,0,Sun,TOR,AL,TBA,4,1,,5,,
20230924,0,Sun,SEA,AL,TEX,2,6,,8,,
20230925,0,Mon,SDN,NL,SFN,0,0,,0,,
20230925,0,Mon,TEX,AL,ANA,4,1,,5,,
20230925,0,Mon,ARI,NL,NYA,0,2,,2,,
20230925,0,Mon,HOU,AL,SEA,2,0,,2,,
20230926,0,Tue,CHN,NL,ATL,0,2,,2,,
20230926,1,Tue,LAN,NL,COL,0,1,,1,,
20230926,2,Tue,LAN,NL,COL,1,1,,2,,
20230926,0,Tue,SLN,NL,MIL,1,0,,1,,
20230926,0,Tue,PIT,NL,PHI,2,1,,3,,
20230926,0,Tue,SDN,NL,SFN,2,0,,2,,
20230926,0,Tue,TEX,AL,ANA,1,1,,2,,
20230926,0,Tue,WAS,NL,BAL,0,1,,1,,
20230926,0,Tue,TBA,AL,BOS,1,1,,2,,
20230926,0,Tue,ARI,NL,CHA,3,1,,4,,
20230926,0,Tue,CIN,NL,CLE,5,3,,8,,
20230926,0,Tue,KCA,AL,DET,0,2,,2,,
20230926,0,Tue,OAK,AL,MIN,1,2,,3,,
20230926,0,Tue,HOU,AL,SEA,0,1,,1,,
20230926,0,Tue,NYA,AL,TOR,1,0,,1,,
20230927,0,Wed,CHN,NL,ATL,2,2,,4,,
20230927,0,Wed,LAN,NL,COL,2,2,,4,,
20230927,0,Wed,SLN,NL,MIL,0,0,,0,,
20230927,1,Wed,MIA,NL,NYN,0,3,,3,,
20230927,2,Wed,MIA,NL,NYN,2,2,,4,,
20230927,0,Wed,PIT,NL,PHI,0,3,,3,,
20230927,0,Wed,SDN,NL,SFN,1,1,,2,,
20230927,0,Wed,TEX,AL,ANA,3,0,,3,,
20230927,0,Wed,WAS,NL,BAL,0,1,,1,,
20230927,0,Wed,TBA,AL,BOS,2,0,,2,,
20230927,0,Wed,ARI,NL,CHA,0,0,,0,,
20230927,0,Wed,CIN,NL,CLE,0,0,,0,,
20230927,0,Wed,KCA,AL,DET,0,3,,3,,
20230927,0,Wed,OAK,AL,MIN,0,2,,2,,
20230927,0,Wed,HOU,AL,SEA,3,1,,4,,
20230927,0,Wed,NYA,AL,TOR,2,0,,2,,
20230928,0,Thu,CHN,NL,ATL,0,1,,1,,
20230928,0,Thu,LAN,NL,COL,2,3,,5,,
20230928,0,Thu,SLN,NL,MIL,0,0,,0,,
20230928,0,Thu,MIA,NL,NYN,0,0,,0,,
20230928,0,Thu,PIT,NL,PHI,0,1,,1,,
20230928,0,Thu,BOS,AL,BAL,0,1,,1,,
20230928,0,Thu,ARI,NL,CHA,0,2,,2,,
20230928,0,Thu,KCA,AL,DET,1,1,,2,,
20230928,0,Thu,OAK,AL,MIN,1,0,,1,,
20230928,0,Thu,TEX,AL,SEA,2,1,,3,,
20230928,0,Thu,NYA,AL,TOR,0,3,,3,,
20230929,0,Fri,HOU,AL,ARI,0,0,,0,,
20230929,0,Fri,WAS,NL,ATL,5,0,,5,,
20230929,0,Fri,MIN,AL,COL,3,3,,6,,
20230929,0,Fri,CHN,NL,MIL,2,0,,2,,
20230929,0,Fri,MIA,NL,PIT,0,0,,0,,
20230929,0,Fri,LAN,NL,SFN,3,1,,4,,
20230929,0,Fri,CIN,NL,SLN,6,1,,7,,
20230929,0,Fri,OAK,AL,ANA,0,1,,1,,
20230929,0,Fri,BOS,AL,BAL,1,0,,1,,
20230929,0,Fri,SDN,NL,CHA,0,2,,2,,
20230929,0,Fri,CLE,AL,DET,2,2,,4,,
20230929,0,Fri,NYA,AL,KCA,1,2,,3,,
20230929,0,Fri,TEX,AL,SEA,0,3,,3,,
20230929,0,Fri,TBA,AL,TOR,1,3,,4,,
20230930,0,Sat,HOU,AL,ARI,0,0,,0,,
20230930,0,Sat,WAS,NL,ATL,0,1,,1,,
20230930,0,Sat,MIN,AL,COL,4,3,,7,,
20230930,0,Sat,CHN,NL,MIL,3,2,,5,,
20230930,1,Sat,PHI,NL,NYN,0,1,,1,,
20230930,2,Sat,PHI,NL,NYN,1,3,,4,,
20230930,0,Sat,MIA,NL,PIT,1,0,,1,,
20230930,0,Sat,LAN,NL,SFN,0,1,,1,,
20230930,0,Sat,CIN,NL,SLN,2,1,,3,,
20230930,0,Sat,OAK,AL,ANA,2,1,,3,,
20230930,0,Sat,BOS,AL,BAL,0,0,,0,,
20230930,0,Sat,SDN,NL,CHA,0,1,,1,,
20230930,0,Sat,CLE,AL,DET,0,0,,0,,
20230930,0,Sat,NYA,AL,KCA,0,1,,1,,
20230930,0,Sat,TEX,AL,SEA,0,1,,1,,
20230930,0,Sat,TBA,AL,TOR,1,1,,2,,
20231001,0,Sun,HOU,AL,ARI,2,0,,2,,
20231001,0,Sun,WAS,NL,ATL,0,2,,2,,
20231001,0,Sun,MIN,AL,COL,0,2,,2,,
20231001,0,Sun,CHN,NL,MIL,0,1,,1,,
20231001,0,Sun,PHI,NL,NYN,2,1,,3,,
20231001,0,Sun,MIA,NL,PIT,0,0,,0,,
20231001,0,Sun,LAN,NL,SFN,1,2,,3,,
20231001,0,Sun,CIN,NL,SLN,1,0,,1,,
20231001,0,Sun,OAK,AL,ANA,1,3,,4,,
20231001,0,Sun,BOS,AL,BAL,0,0,,0,,
20231001,0,Sun,SDN,NL,CHA,0,0,,0,,
20231001,0,Sun,CLE,AL,DET,1,1,,2,,
20231001,0,Sun,NYA,AL,KCA,0,3,,3,,
20231001,0,Sun,TEX,AL,SEA,0,0,,0,,
20231001,0,Sun,TBA,AL,TOR,3,1,,4,,`

currenthref = window.location.href;


if(window.location.href.indexOf("preview") > -1) {
    //get the 3 letter team codes for each team using the url and matching its contents to the teamcodes object (example link: https://www.mlb.com/gameday/red-sox-vs-mets/2024/03/30/745850/preview)
    //wait 3 seconds for the page to load
    window.addEventListener('load', function () {
        let team1 = teamcodes[window.location.href.split("/")[4].split("-")[0]];
        let team2;
        //if team 1 is red or white, get the second team name from the 3
        if(team1 == "BOS" || team1 == "CHA" || team1 == "TOR") {
            team2 = teamcodes[window.location.href.split("/")[4].split("-")[3]];
        }
        else{
            team2 = teamcodes[window.location.href.split("/")[4].split("-")[2]];
        }
        analyzeHeadToHeadHomeRuns(team1, team2);
      });
      //if the url changes and still contains preview, do it again and delete the old event listener, and infobox
}

setInterval(function() {
    if(window.location.href != currenthref) {
        infoBox.innerHTML = "";
        currenthref = window.location.href;
        let team1 = teamcodes[window.location.href.split("/")[4].split("-")[0]];
        let team2;
        if(team1 == "BOS" || team1 == "CHA" || team1 == "TOR") {
            team2 = teamcodes[window.location.href.split("/")[4].split("-")[3]];
        }
        else{
            team2 = teamcodes[window.location.href.split("/")[4].split("-")[2]];
        }
        analyzeHeadToHeadHomeRuns(team1, team2);
    }
    console.log("checking");
}, 100);