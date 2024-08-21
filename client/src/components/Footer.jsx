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
                <li className="footerElement" onClick={() => setShowModal(true)}>v1.1</li>
                <Modal
                    className="Modal"
                    overlayClassName="Overlay"
                    isOpen={showModal}>
                    <button onClick={() => setShowModal(false)}>Close</button>
                    <div className="modalContent">
                        <h3>Version 1.1 Patch Notes (21/08/24):</h3>

                        <p>- Various fixes to smooth out the UX on smaller screens</p>
                        <p>- Added modal with results after each test and a prompt to either sign up or view profile depending on whether the user is logged in.</p>
                        <br />
                        <h3>Additions in the works:</h3>

                        <p>- Improved profile UI</p>
                        <p>- Dark mode toggle</p>
                        <p>- Other game modes</p>

                    </div>
                </Modal>
            </ul>
        </footer>
    )
};