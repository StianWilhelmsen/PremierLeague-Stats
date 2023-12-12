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
            } catch (error) {
                console.error(error);
            }
        };

        //fetchStanding();
    }, []);

    return (
        <div className="standing-container">
            
            <div className='info-grid'>
                <div className='stats-title'>MP</div>
                <div className='stats-title'>W</div>
                <div className='stats-title'>D</div>
                <div className='stats-title'>L</div>
                <div className='stats-title'>GD</div>
                <div className='stats-title'>P</div>
            </div>
            {standings.map((team, index) => (
                <div className="standings-line" key={index}>
                    <div className='left-aligned'>
                        <div className='left-info'>{team.rank}</div>
                        <div className='left-info'><img src={team.team.logo} alt={team.team.name + " logo"}/></div>
                        <div className='left-info' id='team-name-div'>{team.team.name}</div>

                    </div>
                    <div className='right-aligned'>
                        <div className='right-info'>{team.all.played}</div>
                        <div className='right-info'>{team.all.win}</div>
                        <div className='right-info'>{team.all.draw}</div>
                        <div className='right-info'>{team.all.lose}</div>
                        <div className='right-info'>{team.goalsDiff}</div>
                        <div className='right-info'>{team.points}</div>
                    </div>
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
