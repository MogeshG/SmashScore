const generateMatchPairing = (teams, type) => {
  function generateRoundRobinSchedule(teams) {
    const rounds = [];
    const numTeams = teams.length;

    if (numTeams % 2 !== 0) {
      teams.push("Bye");
    }

    const totalRounds = teams.length - 1;
    const halfSize = teams.length / 2;

    let scheduleTeams = [...teams.slice(1)];

    for (let round = 0; round < totalRounds; round++) {
      const matches = [];

      const team1 = teams[0];
      const team2 = scheduleTeams[scheduleTeams.length - 1];
      if (team1 !== "Bye" && team2 !== "Bye") {
        matches.push({ team1, team2 });
      }

      for (let i = 0; i < halfSize - 1; i++) {
        const team1 = scheduleTeams[i];
        const team2 = scheduleTeams[scheduleTeams.length - 2 - i];
        if (team1 !== "Bye" && team2 !== "Bye") {
          matches.push({ team1, team2 });
        }
      }

      rounds.push(matches);

      scheduleTeams = [
        scheduleTeams[scheduleTeams.length - 1],
        ...scheduleTeams.slice(0, scheduleTeams.length - 1),
      ];
    }

    return rounds;
  }

  if (type === 1) {
    const allRounds = generateRoundRobinSchedule(teams);
    console.log(allRounds);
    return allRounds;
  }

  return [];
};

export default generateMatchPairing;
