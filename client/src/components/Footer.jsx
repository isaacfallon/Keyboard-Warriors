import { useState } from 'react';
import Modal from './Modal';

export default function Footer() {

    const [open, setOpen] = useState(false);


    return (
        <footer className="text-center font-semibold text-lg mt-auto pb-4 pr-4">
            <ul className="flex justify-end flex-row mt-6">
                <li className="px-4"><a href="https://isaacfallon.com/" target="_blank" rel="noreferrer" className="hover:text-sky-700">Made by Isaac Fallon</a></li>
                <li className="px-4"><a href="https://github.com/isaacfallon/Project-3-Keyboard-Warriors" target="_blank" rel="noreferrer" className="hover:text-sky-700">GitHub</a></li>
                <li className="px-4 hover:text-sky-700 hover:cursor-pointer" onClick={() => setOpen(true)}>v2.1</li>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="mx-auto text-center my-4 w-[600px] p-4">
                        <h3 className="text-3xl font-black mb-2">Version 2.1 Patch Notes (20/09/24):</h3>
                        <div className="text-left">
                            <ul>
                                <li className="list-disc ml-4">Entire visual design revamp with Tailwind CSS (including darkmode and theme switch toggle)</li>
                                <li className="list-disc ml-4">Improved profile page flow to reduce clutter if the user had a large amount of results saved. If the user now has more than 5 results saved, these excess results are saved in an openable menu further down their profile page.</li>
                                <li className="list-disc ml-4">Fixed a bug where the user could continue typing and increase their score after the timer had reached 0.</li>
                                <li className="list-disc ml-4">Fixed a bug where the user could break the game by clicking into the &apos;start game&apos; field once a game was in progress. Now if a user clicks away they will need to restart a game manually. (I am considering forcing a reset if any mouse clicking activity is detected but will need to test this). </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </ul>
        </footer>
    )
}