import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LiveMatchStats({ fixtureId }) {
    const [fixtureData, setFixtureData] = useState(null);

    useEffect(() => {
        if (fixtureId) {
            getFixtureData(fixtureId);
        }
    }, [fixtureId]);

    const getFixtureData = async (id) => {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
            params: { id: id },
            headers: {
                'X-RapidAPI-Key': '70becc892emsh787217013a3d9e2p113298jsnc87fac87fab7',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setFixtureData(response.data);
            console.log(fixtureData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            bruh
        </div>
    );
}

export default LiveMatchStats;
