let csvData = `Year,Team,Game,Opponent,Home,Away,Runs_For,Runs_Against,Win,Loss,Home_Runs
2021,TeamA,1,TeamB,Away,Home,5,3,1,0,2
2021,TeamA,2,TeamC,Away,Home,4,6,0,1,1
2021,TeamA,3,TeamD,Home,Away,3,7,0,1,0
2021,TeamA,4,TeamE,Away,Home,6,2,1,0,3
2021,TeamA,5,TeamF,Home,Away,7,4,1,0,1
2021,TeamA,6,TeamG,Away,Home,2,1,1,0,0
2021,TeamA,7,TeamH,Home,Away,8,5,1,0,2
2021,TeamB,1,TeamA,Home,Away,3,5,0,1,1
2021,TeamB,2,TeamC,Home,Away,6,7,0,1,3
2021,TeamB,3,TeamD,Away,Home,2,6,0,1,0
2021,TeamB,4,TeamE,Home,Away,4,3,1,0,1
2021,TeamB,5,TeamF,Away,Home,5,4,1,0,2
2021,TeamB,6,TeamG,Home,Away,7,1,1,0,3
2021,TeamB,7,TeamH,Away,Home,4,8,0,1,1`;

function calculateHeadToHead(team1, team2) {
    let team1Stats = {
        gamesPlayed: 0,
        totalRunsFor: 0,
        totalRunsAgainst: 0,
        totalHomeRuns: 0,
        overTwoPointFive: 0,
        underTwoPointFive: 0
    };

    let team2Stats = {
        gamesPlayed: 0,
        totalRunsFor: 0,
        totalRunsAgainst: 0,
        totalHomeRuns: 0,
        overTwoPointFive: 0,
        underTwoPointFive: 0
    };

    const rows = csvData.split('\n');
    for (const row of rows) {
        const [year, team, game, opponent, home
