import "./App.css"; 
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import { BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Container } from "react-bootstrap";

const software_version = "2021.12.6.9"
const event_description_on_card_length = 100


export default function App() {
    
    return (

        <Router>
            <div>
                <Navigation />
                <Container>
                    <Switch>
                        <Router path="/about">
                            <About />
                        </Router>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Container>
            </div>
        </Router>
       
    );
    
}


export { software_version, event_description_on_card_length};
