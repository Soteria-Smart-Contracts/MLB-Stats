async function analyzeHomeRuns(data, teamToIndex) {
    let teamFound = false;
    let gamesFound = 0;
    let totalHR = 0;
    let totalHRF = 0;
    let totalHRA = 0;
    let ovhr = 0;
    let unhr = 0;
  
    // Loop through each game in the data
    for (const game of data) {
      if (game[0] === teamToIndex || game[2] === teamToIndex) {
        totalHR += game[8]; // Assuming home runs are at index 8
        if (game[0] === teamToIndex) {
          totalHRF += game[5]; // Assuming home runs for at index 5
          totalHRA += game[6]; // Assuming home runs against at index 6
        } else {
          totalHRF += game[6];
          totalHRA += game[5];
        }
        if (game[8] > 1.5) {
          ovhr++;
        } else {
          unhr++;
        }
        teamFound = true;
        gamesFound++;
      }
    }
  
    // Calculate averages and percentages
    const averageHR = (totalHR / gamesFound).toFixed(4);
    const averageHRF = (totalHRF / gamesFound).toFixed(4);
    const averageHRA = (totalHRA / gamesFound).toFixed(4);
    const ovpercent = ((ovhr / gamesFound) * 100).toFixed(2);
    const unpercent = ((unhr / gamesFound) * 100).toFixed(2);
  
    return {
      teamFound,
      gamesFound,
      totalHR,
      totalHRF,
      totalHRA,
      averageHR,
      averageHRF,
      averageHRA,
      ovhr,
      unhr,
      ovpercent,
      unpercent,
    };
  }
  
  // Example usage: (replace 'data' with your actual data)
  const data = [
    // ... game data arrays
  ];
  
  analyzeHomeRuns(data, TeamToIndex)
    .then((results) => {
      if (!results.teamFound) {
        console.log(`No teams found for index ${TeamToIndex}`);
        return;
      }
      // Print results using destructuring
      const {
        gamesFound,
        totalHR,
        totalHRF,
        totalHRA,
        averageHR,
        averageHRF,
        averageHRA,
        ovhr,
        unhr,
        ovpercent,
        unpercent,
      } = results;
  
      console.log("------------------------------");
      console.log("General Home Run  Information");
      console.log("------------------------------");
  
      console.log(`Total Games Played: ${gamesFound}`);
      console.log(`Total Home Runs: ${totalHR}`);
      console.log(`Total Home Runs for: ${totalHRF}`);
      console.log(`Total Home Runs against: ${totalHRA}`);
      console.log(`Average Home Runs: ${averageHR}`);
      console.log(`Average Home Runs for: ${averageHRF}`);
      console.log(`Average Home Runs against: ${averageHRA}`);
  
      console.log("--------------------------");
      console.log("Over Under 2.5 Information");
      console.log("--------------------------");
  
      console.log(`Games over 2.5 Home Runs:${ovhr}`);
      console.log(`Games under 2.5 Home Runs:${unhr}`);
      console.log(`Percentage of games over 2.5HR: ${ovpercent}%`);
      console.log(`Percentage of games under 2.5HR: ${unpercent}%`);
    })
    .catch((error) => {
      console.error("Error analyzing home run data:", error);
    });
  

const data = 