import axios from 'axios';
import { useEffect, useState } from 'react';

function TodaysFixtures() {
    const [fixtures, setFixtures] = useState([]);

    useEffect(() => {
        const getTodaysFixtures = async() => {
            try {
                const response = await axios.request(options);
                const fixturesData = response.data.response;
                const fixturesWithTime = fixturesData.map(fixture => ({
                    ...fixture,
                    time: new Date(fixture.fixture.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                }));
                setFixtures(fixturesWithTime);
            } catch (error) {
                console.error(error);
            }
        }
        //getTodaysFixtures();
    }, []);


    return(
        <div className="fixtures-container">
            {fixtures.map((fixtures, index) => (
                <div className="fixture-line" key={index}>
                    {fixtures.teams.home.name} {fixtures.time} {fixtures.teams.away.name}
                </div>
            ))}
        </div>
    );
}


const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  params: {
    date: '2023-12-16',
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

export default TodaysFixtures;