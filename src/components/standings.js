import axios from 'axios';
import { useEffect, useState } from 'react';
import './standings.css'

function LeagueTable() {
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchStanding = async () => {
            try {
                const response = await axios.request(options);
                const standingsData = response.data.response[0].league.standings[0];
                setStandings(standingsData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        //fetchStanding();
    }, []);

    return (
        <div className="standing-container">
            {standings.map((team, index) => (
                <div className="standings-line" key={index}>
                    {team.rank} - <img src={team.team.logo} alt={team.team.name + " logo"} /> - {team.team.name} - {team.points}
                </div>
            ))}
            </div>
    );
}

const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
    params: {
        season: '2023',
        league: '39'
    },
    headers: {
        'X-RapidAPI-Key': '70becc892emsh787217013a3d9e2p113298jsnc87fac87fab7',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

export default LeagueTable;
