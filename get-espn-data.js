const { Client } = require('espn-fantasy-football-api/node');
const { getName } = require('./player-mapping');
require('dotenv').config();

const leagueId = process.env.espn_leagueid;
const espnS2 = process.env.espn_espnS2;
const SWID = process.env.espn_swid;
const seasonId = process.env.espn_seasonid;

const myClient = new Client({ leagueId });


myClient.setCookies({ espnS2, SWID });

async function getEspnData() {
    const getScores = await myClient.getBoxscoreForWeek({
        seasonId,
        matchupPeriodId: 4,
        scoringPeriodId: 4
    });
    const matchupData = createEmbedFields(getScores);
    const embedded = embedData(matchupData);
    return embedded;
}

function createEmbedFields(boxScore) {
    const matchupArrayData = boxScore.map(scores => {
        const awayTeamId = getName(scores.awayTeamId.toString());
        const homeTeamId = getName(scores.homeTeamId.toString());
        const awayPoints = scores.awayScore.toString();
        const homePoints = scores.homeScore.toString();
        return [
            {
                name: awayTeamId,
                value: awayPoints,
                inline: true
            },
            {
                name: homeTeamId,
                value: homePoints,
                inline: true
            },
            {
                name: '\u200B',
                value: '\u200B'
            }
        ]
    })
        .flat();
    return matchupArrayData;
}

function embedData(teamData) {
    const fflEmbed = {
        color: 0x0099ff,
        title: 'Current Scores',
        fields: teamData,
        timestamp: new Date(),
    };
    return { embeds: [fflEmbed] }
}

module.exports = {
    getEspnData,
    embedData
};


