export default function About() {
    return (
        <div className="flex flex-col mx-auto p-8">
            <h2 className="text-3xl">About</h2>
            <p>Keyboard Warriors is a responsive typing game which analyses a user&apos;s typing proficiency and reaction speed.</p>
            <br />
            <h2 className="text-3xl">Game Specifics</h2>
            <p>The random words are supplied by the following <a href="https://www.npmjs.com/package/an-array-of-english-words" target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-500">npm package</a> which is derived from the <a href="https://github.com/lorenbrichter/Words" target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-500">Letterpress word list.</a></p>
            <br />
            <p>Words per minute is calculated by using the standardised five keystrokes per word divided by time in minutes.</p>
            <br />
            <h2 className="text-3xl">Feedback</h2>
            <p>If you&apos;d like to provide feedback, feel free to reach out <a href="https://isaacfallon.com/Contact" target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-500">here</a>.</p>
            <br />
            <p>I hope you enjoy!</p>
        </div>
    )
}