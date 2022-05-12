import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import styles from './ChatHistory.module.css';
import headerStyles from './Main.module.css';
import Draggable from 'react-draggable';

const ChatHistory = ({ outputs }, props) => {
    const messagesStartRef = useRef(null);
    const nodeRef = React.useRef(null);

    //Keep the windows focus on the top of the window
    const scrollToTop = () => {
        messagesStartRef.current?.scrollIntoView({ behavior: 'smooth' })
    };

    useEffect(() => {
        scrollToTop()
    }, [outputs]);


    return (
        <Container>
            <Draggable handle='#handle' nodeRef={nodeRef}>
                <div ref={nodeRef} className={headerStyles.formContainer}>
                    <div id='handle' className={headerStyles.headerContainer}>
                        <div className={headerStyles.svg}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </div> <h6 className={headerStyles.header}>  Chat History - Newest to Oldest</h6>
                    </div>
                    <div >

                        <div className={styles.chatHistoryInnerContainer}>

                            {outputs.map((output, index) => {
                                return (
                                    <div key={index}>
                                        <p style={{ color: 'blue' }}>{output.input}</p>
                                        <p style={{ color: 'red' }}>{output.output}</p>
                                    </div>
                                )
                            })}
                            <div ref={messagesStartRef} />
                        </div>
                    </div>
                </div>
            </Draggable>
        </Container>
    )
}

export default ChatHistory;