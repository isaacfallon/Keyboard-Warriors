import { useState } from 'react';
import Modal from 'react-modal';

export default function VersionModal() {
    Modal.setAppElement('#root');
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button onClick={() => setShowModal(true)}> Open Modal</button>
            <Modal isOpen={showModal}>
                <button onClick={() => setShowModal(false)}> Close Modal</button>
            </Modal>

        </div>
    )
}