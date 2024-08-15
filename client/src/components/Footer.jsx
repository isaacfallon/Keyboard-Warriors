import React from "react";
import { useState } from 'react';
import Modal from 'react-modal';

export default function Footer() {
    Modal.setAppElement('#root');
    const [showModal, setShowModal] = useState(false);

    return (
        <footer className="footer">
            <div className="footerElements"></div>
            <ul>
                <li className="footerElement"><a href="https://isaacfallon.com/" target="_blank" rel="noreferrer">Made by Isaac Fallon</a></li>
                <li className="footerElement"><a href="https://github.com/isaacfallon/Project-3-Keyboard-Warriors" target="_blank" rel="noreferrer">Project GitHub</a></li>
                <li className="footerElement" onClick={() => setShowModal(true)}>v1.0</li>
                <Modal
                    className="Modal"
                    overlayClassName="Overlay"
                    isOpen={showModal}>
                    <button onClick={() => setShowModal(false)}> Close Modal</button>
                    <h3>Additions in the works:</h3>
                    
                        <p>- Dark mode</p>
                        <p>- Leaderboards</p>
                        <p>- User profile customisations</p>
                  
                </Modal>
            </ul>
        </footer>
    )
};