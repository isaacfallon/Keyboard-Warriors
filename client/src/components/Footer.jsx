import { useState } from 'react';
import Modal from './Modal';

export default function Footer() {

    const [open, setOpen] = useState(false);


    return (
        <footer className="text-center font-semibold text-lg mt-auto pb-4 pr-4">
            <ul className="flex justify-end flex-row mt-6">
                <li className="px-4"><a href="https://isaacfallon.com/" target="_blank" rel="noreferrer" className="hover:text-sky-700">Made by Isaac Fallon</a></li>
                <li className="px-4"><a href="https://github.com/isaacfallon/Project-3-Keyboard-Warriors" target="_blank" rel="noreferrer" className="hover:text-sky-700">GitHub</a></li>
                <li className="px-4 hover:text-sky-700 hover:cursor-pointer" onClick={() => setOpen(true)}>v2</li>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="mx-auto text-center my-4 w-[600px]">
                        <h3 className="text-3xl font-black mb-2">Version 2 Patch Notes (14/09/24):</h3>
                        <div className="text-left">
                            <ul>
                                <li className="list-disc ml-4">Entire design revamp built with Tailwind CSS</li>
                                <li className="list-disc ml-4">Added darkmode</li>
                                <li className="list-disc ml-4">Improved profile page to reduce clutter if the user had a large amount of results saved</li>
                                <li className="list-disc ml-4">Various fixes to smooth visibility on smaller screens. If the user is detected using a tablet screen or smaller, a message is provided to inform them the application is designed for keyboard usage.</li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </ul>
        </footer>
    )
}