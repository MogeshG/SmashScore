const generateMatchPairing = (teams, type) => {
//     console.log(type)
//   if (type == 1) {
    function generateRoundRobinSchedule(teams) {
      const rounds = [];
      const numTeams = teams.length;

      // If odd number of teams, add a dummy team (Bye) for even pairing
      if (numTeams % 2 !== 0) {
        teams.push("Bye");
      }

      const totalRounds = teams.length - 1;
      const halfSize = teams.length / 2;

      let scheduleTeams = [...teams];

      for (let round = 0; round < totalRounds; round++) {
        const matches = [];

        for (let i = 0; i < halfSize; i++) {
          const team1 = scheduleTeams[i];
          const team2 = scheduleTeams[scheduleTeams.length - 1 - i];

          if (team1 !== "Bye" && team2 !== "Bye") {
            matches.push({ team1, team2 });
          }
        }

        rounds.push(matches);

        scheduleTeams = [
          scheduleTeams[0],
          ...scheduleTeams.slice(1, scheduleTeams.length - 1).reverse(),
          scheduleTeams[scheduleTeams.length - 1],
        ];
      }

      return rounds;
    }

    const allRounds = generateRoundRobinSchedule(teams);

    console.log(allRounds)
    return allRounds;
//   }
};

export default generateMatchPairing;
