export default function Modal({ open, onClose, children }) {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>

            <div
                onClick={e => e.stopPropagation()}
                className={`bg-gray-200 dark:bg-zinc-800 text-zinc-600 dark:text-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 px-12 py-1 bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded">Close</button>
                {children}
            </div>
        </div>
    )
}