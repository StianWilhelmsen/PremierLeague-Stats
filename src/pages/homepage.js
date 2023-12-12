import Standings from '../components/standings'
import Fixtures from '../components/todaysFixtures'
import './homepage.css'

function Homepage() {
    return (
        <div>
            <h2>Live Premier League Stats</h2>
            <Standings/>
            <Fixtures/>
        </div>
    );
}

export default Homepage;