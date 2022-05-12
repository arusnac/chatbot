import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './Info.module.css';

//Card with instructions for the application plus additional information
const Info = () => {

    return (
        <div className={styles.infoContainer}>
            <Card bg='light' style={{ width: '24rem' }}>
                <Card.Body>


                    <h6>How to use the chat:</h6>
                    <p>Type any question you like, the more specific the better the answer you'll recieve.
                        To emulate a conversation with a friend type in a question you might typically ask
                        a friend. Hit send when you're ready.
                    </p> <hr />
                    <h6>Not all the buttons work:</h6>
                    <p>I know. That's something I'll add next! <u>You can drag them though (excluding this window)!</u>
                    </p><hr />
                    <h6>Why did I style it like this:</h6>
                    <p>I was feeling a little nostalgic and I thought
                        it was simply a fun idea!
                    </p><hr />
                    <h6>What I would do to improve:</h6>
                    <p>With more time I'd probably pass the whole conversation to OpenAI so that
                        the chat is more realistic and potentially useful. Something else it could use is additional
                        error handling, right now it only checks if the input is empty or contains only a number.
                        One final thing I'd also add is more UI elements so that the 'window buttons' can function
                        like I did on my portfolio website which
                        can be viewed below. You'll notice a similar theme.
                    </p>

                    <Card.Link
                        href="https://arusnac.github.io/"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Portfolio Site
                    </Card.Link>

                </Card.Body>
            </Card>
        </div >
    );
}

export default Info;

