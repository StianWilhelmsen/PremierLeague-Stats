import axios from 'axios';
import { useEffect, useState } from 'react';
import LiveMatchStats from './liveMatchStats';
import './todaysFixtures.css'

function TodaysFixtures() {
    const [fixtures, setFixtures] = useState([]);
    const [selectedFixtureId, setSelectedFixtureId] = useState(null);



    useEffect(() => {
        const getTodaysFixtures = async () => {
            try {
                const response = await axios.request(options);
                const fixturesData = response.data.response;
                console.log(fixturesData)
                const fixturesWithTime = fixturesData.map(fixture => ({
                    ...fixture,
                    time: new Date(fixture.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                setFixtures(fixturesWithTime);
            } catch (error) {
                console.error(error);
            }
        }
        getTodaysFixtures();
    }, []);

    const selectFixture = (fixtureId) => {
        setSelectedFixtureId(fixtureId);
    };

    if(!fixtures.length) {
        return (<div>No Matches today</div>)
    }
    else {
        return (
            <div className="fixtures-container">
                {fixtures.map((fixtures, index) => (
                    <div className="fixture-line" onClick={() => selectFixture(fixtures.fixture.id)} key={index}>
                        {getMatchStarted(fixtures) ? (
                            <>
                                <div className='team-info'>
                                    <div className='homeTeam'>
                                        {fixtures.goals.home}
                                        <img src={fixtures.teams.home.logo} alt={fixtures.teams.home.name + " logo"} />
                                        {fixtures.teams.home.name}
                                    </div>
                                    <div className='awayTeam'>
                                        {fixtures.goals.away}
                                        <img src={fixtures.teams.away.logo} alt={fixtures.teams.away.name + " logo"} />
                                        {fixtures.teams.away.name}
                                    </div>
                                </div>
                                <div className='time'>
                                    {fixtures.fixture.status.elapsed}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='homeTeam'>
                                    <img src={fixtures.teams.home.logo} alt={fixtures.teams.home.name + " logo"} />
                                    {fixtures.teams.home.name}
                                </div>
                                <div className='start-time'>{fixtures.time}</div>
                                <div className='awayTeam'>
                                    <img src={fixtures.teams.away.logo} alt={fixtures.teams.away.name + " logo"} />
                                    {fixtures.teams.away.name}
                                </div>
                            </>
    
                        )}
                    </div>
                ))}
                    <LiveMatchStats fixtureId={selectedFixtureId} />
            </div>
        );
    }
}


const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: {
        date: '2024-01-20',
        league: '39',
        season: '2023'
    },
    headers: {
        'X-RapidAPI-Key': '70becc892emsh787217013a3d9e2p113298jsnc87fac87fab7',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};




function getDate() {
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month}-${day}`
}

const getMatchStarted = (fixture) => {
    const fixtureTime = new Date(fixture.fixture.date);
    const currentTime = new Date();
    return fixtureTime < currentTime;
}

export default TodaysFixtures;