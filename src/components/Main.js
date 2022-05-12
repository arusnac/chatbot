import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import styles from './Main.module.css';
import Draggable from 'react-draggable';
import ChatHistory from './ChatHistory'
import Info from './Info'



const { Configuration, OpenAIApi } = require('openai');

const Main = (props) => {
    const nodeRef = React.useRef(null);
    //outputs holds the entire chat conversation in an array of objects
    const [outputs, setOutputs] = useState([{}]);
    //Maintains the text input by the user and clears after the send buttons is pressed
    const [inputText, setInputText] = useState('');
    //Handles the state of the chat history window
    const [showHistory, setShowHistory] = useState(false);
    //Handles the state of the error message
    const [showError, setShowError] = useState(false);
    //Takes a string from the verifyInput function to display and appropriate message
    const [errorMessage, setErrorMessage] = useState('');
    const [showInfo, setShowInfo] = useState(false)

    //ref to keep the chat window at the bottom
    const messagesEndRef = useRef(null);

    //Used in conjuction with the resetInput function to clear 
    //the text area after send is pressed
    const handleInput = (e) => {
        setInputText(e.target.value);
    }

    //Clears the textarea after send is pressed
    const resetInput = () => {
        setInputText('');
    }

    //Opens or closes the chat history window
    const showHistoryWindow = () => {
        setShowHistory(!showHistory)
    }

    const handleInfo = () => {
        setShowInfo(!showInfo);
    }

    //Function and useEffect to ensure the chat window stays on the bottom
    //when it begins to overflow
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    };


    useEffect(() => {
        scrollToBottom()
    }, [outputs]);

    //Simple input verification to check if the message string is empty
    //Or if it's a number, sends an appropriate error message
    const verifyInput = (message) => {
        if (message === '') {
            setShowError(true);
            setErrorMessage(`Don't send an empty message! Try asking a question you might ask a friend or acquaintance.
            For example: How are you today?`)
        } else if (!isNaN(message)) {
            setShowError(true);
            setErrorMessage(`Don't send just a number! Try asking a question you might ask a friend or acquaintance.
            For example: How are you today?`)
        }
        else {
            setShowError(false);
        }
    }

    //Called when the form is submitted
    //Take the event as a parameter and parses the form to get the message
    //to then pass to the OpenAI api. Take both the input and output and stores it
    //in the outputs state variable
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputData = new FormData(e.target);
        const formDataObj = Object.fromEntries(inputData.entries());

        verifyInput(formDataObj.textMessage);

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPEN_AI,
        });
        const openai = new OpenAIApi(configuration);
        openai.createCompletion("text-davinci-002", {

            prompt: `You: ${formDataObj.textMessage}`,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ['You:']
        })
            .then((response) => {
                let aiOutput = '';
                if (response.data.choices[0].text.includes('Me:')) {
                    aiOutput = response.data.choices[0].text.replace('Me:', '')
                } else { aiOutput = response.data.choices[0].text }
                setOutputs([...outputs, { input: `You: ${formDataObj.textMessage}`, output: `Friend: ${aiOutput}` }])
                resetInput();
            });
    }


    return (
        <div>
            <Container>
                {showError && <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                    <Alert.Heading>Input Error!</Alert.Heading>
                    {errorMessage}
                </Alert>}
                <Row>
                    <div className={styles.formContainerMain}>
                        <Draggable
                            nodeRef={nodeRef}
                            handle='#handle'>
                            <div ref={nodeRef} className={styles.formContainer}>
                                <div id='handle' className={styles.headerContainer}>
                                    <div className={styles.svg}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </div> <h6 className={styles.header}>OpenAI - Instant Message</h6>
                                    <div className={styles.windowButtons}>
                                        <button className={styles.window}>_</button>
                                        <button className={styles.window}>x</button>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className={styles.textAreaWrapper}>
                                            <div className={styles.textArea}>
                                                {outputs.map((output) => {
                                                    return (
                                                        <div key={output.input + output.output}>
                                                            <p style={{ color: 'blue' }}>{output.input}</p>
                                                            <p style={{ color: 'red' }}>{output.output}</p>
                                                        </div>
                                                    )
                                                })}
                                                <div ref={messagesEndRef} />
                                            </div>
                                        </div>
                                        <textarea
                                            placeholder='Send a question you might ask a friend! The more specific the better.'
                                            rows={3}
                                            name='textMessage'
                                            value={inputText}
                                            onChange={handleInput}
                                            className={styles.inputArea}
                                        />
                                        <div className={styles.sendContainer}>
                                            <button type="submit" className={styles.send}> Send</button>
                                            <div className={styles.radios}>
                                                <input type="checkbox"
                                                    className={styles.send}
                                                    value='Show Chat History' onClick={showHistoryWindow} />
                                                <label>&nbsp; Show Chat History</label>
                                            </div>
                                            <div className={styles.radios}>
                                                <input type="checkbox"
                                                    className={styles.send}
                                                    value='Show Chat History' onClick={handleInfo} />
                                                <label >&nbsp; Info</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Draggable>
                    </div>
                </Row>

                <Row>

                    {showHistory && <Col md={{ span: 6, offset: 3 }}> <ChatHistory outputs={outputs} /></Col>}

                    {showInfo && <Col md={{ span: 6, offset: 3 }}> <Info /></Col>}
                </Row>
            </Container >

        </div >
    )
}


export default Main;