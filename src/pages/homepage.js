import Standings from '../components/standings'
import Fixtures from '../components/todaysFixtures'
import LiveMatchStats from '../components/liveMatchStats';
import './homepage.css'

function Homepage() {
    return (
        <div className='container'>
            <div className='standings'>
                <Standings/>
            </div>
            <div className='fixtures'>
                <Fixtures/>
            </div>
            <div className='live-match-stats'>    
                <LiveMatchStats/>
            </div>
        </div>
    );
}

export default Homepage;