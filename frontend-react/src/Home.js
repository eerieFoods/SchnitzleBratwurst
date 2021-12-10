import React from 'react';
import { Button } from "react-bootstrap";
import EventCard from './Contents/Card';
import LoadingCard from './Contents/LoadingCard';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
import { NewEventPopup, DeleteAllPopup } from "./Contents/NewPopup";
import {WeatherGUI} from "./Contents/Weather"

export const ModalContext = {
    newEvent: false,
    editEvent: false,
    deleteEvent: false,
    deleteAllEvents: false,
    eventCanvas: false
};

// export function refreshMain(text) {
//     console.info("refresh amkl");
//     this.setState({ text: Math.random() });
// }

// const API = "localhost:8000/api/events"
// const bgColor = darkTheme.body
// const txtColor = darkTheme.text
// var event_title = "Mega wichtiges Event";
// var event_description = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.s Außerdem: BRABBELf kufbwakfbakfuhgbgkjbgnasginwekugsekgu be7hasklg jnbadpg8wepgoisjw nezwiuiuherg o gg glwejgöosuhas.lsakngiuesröbl-aiskngöioeli-fjwsgoiäeLAFJKn weg8923o0wrq9ij43n29oö rihf384woerisjf knmwpeasdk,mxc we8 9ü   23o9öwiedkhjk";
// var event_duration = "SS:MM";
// var event_date = "TT.MM.JJJJ";
var Theme = 'dark';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            isLoaded: false,
            error: null,
            events: [],
            text: "Initial Text"
        }

        // refreshMain = refreshMain.bind(this);
        // this.updateText1 = this.updateText1.bind(this);

        // const new_event = useState(false);
        // this.show_new_event = new_event[0];
        // this.setShow_new_event = new_event[1];
        // // const [show_new_event, setShow_new_event] = useState(false);
        // this.handleClose_new_event = () => this.setShow_new_event(false);
        // this.handleShow_new_event = () => this.setShow_new_event(true);
        // this.handleClose_new_event = () => this.setState({show_new_event: false});
        // this.handleShow_new_event = () => this.setState({show_new_event: true});

        // const [show_edit_event, setShow_edit_event] = useState(false);
        // const handleClose_edit_event = () => setShow_edit_event(false);
        // const handleShow_edit_event = () => setShow_edit_event(true);

        // const [show_delete_event, setShow_delete_event] = useState(false);
        // const handleClose_delete_event = () => setShow_delete_event(false);
        // const handleShow_delete_event = () => setShow_delete_event(true);

        // const delete_all_events = useState(false);
        // this.show_delete_all_events = delete_all_events[0];
        // this.setShow_delete_all_events = delete_all_events[1];
        // // const [show_delete_all_events, setShow_delete_all_events] = useState(false);
        // this.handleClose_delete_all_events = () => this.setShow_delete_all_events(false);
        // this.handleShow_delete_all_events = () => this.setShow_delete_all_events(true);
        // this.handleClose_delete_all_events = () => this.setState({show_delete_all_events: false});
        // this.handleShow_delete_all_events = () => this.setState({show_delete_all_events: true});

        // const [show_event_canvas, setShow_event_canvas] = useState(false);
        // const handleClose_event_canvas = () => setShow_event_canvas(false);
        // const handleShow_event_canvas = () => setShow_event_canvas(true);
    }

    makeApiCall() {
        // console.log("Api Call");
        fetch("http://localhost:8000/api/events")
            .then(res => res.json())
            .then(result => {
                if (result.error)
                    this.setState({ isLoaded: true, error: result.error });
                else {
                    this.setState({ isLoaded: true, events: result });
                }
            }).catch(err => console.error(err));
    }

    componentDidMount() {
        this.makeApiCall();
        // console.log("Mounted");
    }

    handleShowNewEvent() {
        ModalContext.newEvent = true;
        this.setState({});
    }

    toggleTheme(){
        if (Theme === 'dark'){
            Theme = 'light';
        }  
        else{
            Theme = 'dark';
        } 
        this.setState({});
    }
    
    handleShowDeleteAllEvents() {
        ModalContext.deleteAllEvents = true;
        this.setState({});
    }

    // updateText1 = (text) => {
    //     // window.location.reload(false);
    //     // fetch(setTimeout(() => window.location.reload(false), 500));
    //     new Promise((resolve) => setTimeout(resolve, 500))
    //         .then(() => {
    //             // window.location.reload(false);
    //             this.setState({});
    //         })
    // }

    render() {
        // console.log("Rendered")
        //Show x Event Cards
        this.items = []
        if (this.state.isLoaded) {
            // console.log("isLoaded");
            if (!this.state.error) {
                // console.log("No Error");
                for (const event of this.state.events) {
                    const datetime = event.date.split('-');
                    this.items.push(<EventCard id={event._id} event_title={event.title} event_description={event.message} event_duration={event.duration} event_date={datetime[1]} event_time={datetime[0]}/>);
                }
            }
        } else {
            this.items.push(<LoadingCard />);
            this.items.push(<LoadingCard />);
            this.items.push(<LoadingCard />);
            this.items.push(<LoadingCard />);
        }



        return (
            //Show x Event Cards

            <ThemeProvider theme={Theme === 'dark' ? darkTheme : lightTheme}>
                <GlobalStyles />
                <div className="mt-3">

                    {/*-----BUTTONS-----*/}
                    <Button variant="primary" onClick={this.handleShowNewEvent.bind(this)}>
                        Neues Event
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="primary" onClick={this.handleShowDeleteAllEvents.bind(this)}>
                        Alle Events löschen
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="primary" onClick={this.toggleTheme.bind(this)}>
                        Toggle Theme
                    </Button>
                    {/* &nbsp;&nbsp;
            <Button variant="secondary" onClick={handleShow_event_canvas}>
                Testknopp
            </Button>
            &nbsp;&nbsp;
            <Button variant="secondary" onClick={handleShow_delete_event}>
                Testknopp2
            </Button>
            &nbsp;&nbsp;
            <Button variant="secondary" onClick={handleShow_edit_event}>
                Testknopp3
            </Button>           */}


                    <hr />
                    {/*!!!WORK HERE!!!*/}
                    {/*   class="m-auto d-flex justify-content-between"*/}


                    <div class="d-flex justify-content-center flex-wrap" >
                        {this.items}
                    </div>

                    <NewEventPopup refresh={() => {this.makeApiCall(); this.props.refresh()}} />

                    <>
                        {/*-----EDIT EVENT POPUP-----*/}
                        {/* <Modal
                        show={show_edit_event}
                        onHide={handleClose_edit_event}
                        backdrop="static"
                        keyboard={false}

                    >
                        <Modal.Header style={{ backgroundColor: bgColor }}>
                            <Modal.Title>Event bearbeiten</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{ backgroundColor: bgColor }}>
                            <Form>
                                <Form.Group className="mb-3" controlId="inputEventTitle" style={{ backgroundColor: bgColor }}>
                                    <Form.Label>Titel</Form.Label>
                                    <Form.Control type="text" style={{ backgroundColor: bgColor, color: txtColor }} placeholder="Mega wichtiges Event!" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="inputEventDescription">
                                    <Form.Label>Beschreibung</Form.Label>
                                    <Form.Control as="textarea" style={{ height: '100px', backgroundColor: bgColor, color: txtColor }} placeholder="Ganz wichtige Beschreibung für mega wichtiges Event!" />
                                </Form.Group>


                                <Form className="mb-3 d-md-flex justify-content-between">
                                    <Form.Group className="mb-3" controlId="inputEventDate">
                                        <Form.Label>Datum</Form.Label>
                                        <Form.Control type="date" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputEventDate">
                                        <Form.Label>Zeit</Form.Label>
                                        <Form.Control type="time" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputEventDuration">
                                        <Form.Label>Dauer</Form.Label>
                                        <Form.Control type="time" defaultValue="00:00" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" />
                                    </Form.Group>

                                </Form>

                            </Form>
                        </Modal.Body>

                        <Modal.Footer style={{ backgroundColor: bgColor }}>
                            <Button variant="secondary" onClick={handleClose_edit_event}>
                                Abbrechen
                            </Button>
                            <Button variant="primary" onClick={handleClose_edit_event}>
                                Speichern
                            </Button>
                        </Modal.Footer>
                    </Modal> */}


                        {/*-----DELETE EVENT POPUP-----*/}
                        {/* <Modal
                        show={show_delete_event}
                        onHide={handleClose_delete_event}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header style={{ backgroundColor: bgColor }}>
                            <Modal.Title>Event löschen?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{ backgroundColor: bgColor }}>
                            <h4> <BsExclamationTriangle />  &nbsp;  Ganz ganz wirklich ernsthaft sicher löschen? </h4>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: bgColor }}>
                            <Button variant="success" onClick={handleClose_delete_event}>
                                Doch nich!
                            </Button>
                            <Button variant="danger" onClick={handleClose_delete_event}>
                                Jaaa!
                            </Button>
                        </Modal.Footer>
                    </Modal> */}

                        {/*-----DELETE ALL EVENTS POPUP-----*/}

                        <DeleteAllPopup />

                        {/* 

                    <Offcanvas show={show_event_canvas} onHide={handleClose_event_canvas} style={{ backgroundColor: bgColor }} >
                        <Offcanvas.Header closeButton closeVariant='white'>
                            <Offcanvas.Title><h3>{event_title}</h3></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body bg-color='dark'>
                            <Offcanvas.Title><h4> Am: {event_date}</h4><h5> für {event_duration}</h5> </Offcanvas.Title>
                            <hr />
                            {event_description}
                        </Offcanvas.Body>
                    </Offcanvas> */}
                    
                    </>
                    <hr />
                    <WeatherGUI />
                </div>
            </ThemeProvider>
        );
    }

}

export default Content;