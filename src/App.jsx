import { Edit, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
    const noteColors = [
        "bg-yellow-50 border-yellow-200",
        "bg-yellow-100 border-yellow-300",
        "bg-yellow-200 border-yellow-400",

        "bg-amber-50 border-amber-200",
        "bg-amber-100 border-amber-300",
        "bg-amber-200 border-amber-400",

        "bg-orange-50 border-orange-200",
        "bg-orange-100 border-orange-300",
        "bg-orange-200 border-orange-400",

        "bg-red-50 border-red-200",
        "bg-red-100 border-red-300",

        "bg-rose-50 border-rose-200",
        "bg-rose-100 border-rose-300",

        "bg-pink-50 border-pink-200",
        "bg-pink-100 border-pink-300",
        "bg-pink-200 border-pink-400",

        "bg-fuchsia-50 border-fuchsia-200",
        "bg-fuchsia-100 border-fuchsia-300",

        "bg-purple-50 border-purple-200",
        "bg-purple-100 border-purple-300",
        "bg-purple-200 border-purple-400",

        "bg-violet-50 border-violet-200",
        "bg-violet-100 border-violet-300",

        "bg-indigo-50 border-indigo-200",
        "bg-indigo-100 border-indigo-300",

        "bg-blue-50 border-blue-200",
        "bg-blue-100 border-blue-300",
        "bg-blue-200 border-blue-400",

        "bg-sky-50 border-sky-200",
        "bg-sky-100 border-sky-300",

        "bg-cyan-50 border-cyan-200",
        "bg-cyan-100 border-cyan-300",

        "bg-teal-50 border-teal-200",
        "bg-teal-100 border-teal-300",

        "bg-emerald-50 border-emerald-200",
        "bg-emerald-100 border-emerald-300",
        "bg-emerald-200 border-emerald-400",

        "bg-green-50 border-green-200",
        "bg-green-100 border-green-300",
        "bg-green-200 border-green-400",

        "bg-lime-50 border-lime-200",
        "bg-lime-100 border-lime-300",

        "bg-gray-50 border-gray-200",
        "bg-slate-50 border-slate-200",
        "bg-zinc-50 border-zinc-200",
        "bg-neutral-50 border-neutral-200",
        "bg-stone-50 border-stone-200",
    ];
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [search, setSearch] = useState("");
    const [note, setNote] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("notes"));
        return saved ? saved : [];
    });
    const limit = 1000;
    const [hError, setHError] = useState("");
    const [cError, setCError] = useState("");
    const [editNoteId, setEditNoteId] = useState(null);
    const headingRef = useRef(null);

    useEffect(() => {
        headingRef.current.focus();
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(note));
    }, [note]);

    const resetForm = () => {
        setHeading("");
        setContent("");
    };

    const addNote = (e) => {
        e.preventDefault();
        if (!heading) setHError(`Please enter title`);
        if (!content) setCError(`Please enter note`);
        if (!heading || !content) return;
        if (editNoteId) {
            setNote((prevNotes) =>
                prevNotes.map((n) =>
                    n._id === editNoteId ? { ...n, heading, content } : n,
                ),
            );
            resetForm();
            setEditNoteId(null);
        } else {
            const randomColor =
                noteColors[Math.floor(Math.random() * noteColors.length)];
            setNote((prevNotes) => [
                ...prevNotes,
                {
                    _id: Date.now(),
                    heading,
                    content,
                    color: randomColor,
                },
            ]);
            resetForm();
        }
    };

    const editNote = (note) => {
        setHeading(note.heading);
        setContent(note.content);
        setEditNoteId(note._id);
        headingRef.current.focus();
    };

    const deleteNote = (id) => {
        if (confirm("Do you wanna delete this note?")) {
            setNote((prevNotes) => prevNotes.filter((note) => note._id !== id));
        }
    };

    const filteredNotes = note.filter(
        (n) =>
            n.heading.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase()),
    );

    console.log(filteredNotes);

    return (
        <div className="min-h-screen md:flex bg-linear-to-br from-slate-100 to-slate-200">
            {/* ------------------------ Form Code ------------------------ */}
            <div className="md:w-[60%] lg:w-1/2 sm:px-8 sm:py-5 px-6 py-4 md:border-r-2 border-gray-300">
                <h1 className="lg:text-3xl text-2xl font-bold mb-5 text-gray-800">
                    Add Notes📝
                </h1>
                <form
                    onSubmit={addNote}
                    className="flex flex-col gap-5 w-full sm:p-6 p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
                    <div>
                        <input
                            type="text"
                            ref={headingRef}
                            placeholder="Title"
                            className={`bg-white border ${hError ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-3 text-base outline-none mb-0.5 w-full focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                            value={heading}
                            onChange={(e) => {
                                setHeading(e.target.value);
                                setHError("");
                            }}
                        />
                        {hError !== "" && (
                            <p className="text-xs text-red-500 font-semibold">
                                {hError}
                            </p>
                        )}
                    </div>
                    <div>
                        <textarea
                            placeholder="Type your note here..."
                            rows={5}
                            maxLength={limit}
                            className={`bg-white border ${cError ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-3 text-base outline-none resize-none scroll-hide w-full focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setCError("");
                            }}></textarea>
                        <div className="flex justify-between">
                            <p className="text-xs text-red-500 font-semibold">
                                {cError}
                            </p>
                            <div className="text-xs text-gray-400">
                                {content.length}/1000
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full xl:w-1/2 py-3 text-sm text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg cursor-pointer  transition-all duration-200 shadow-md">
                        {editNoteId ? "Update Note" : "Add Note"}
                    </button>
                </form>
            </div>

            <div className="border-b-2 border-gray-300 md:hidden block sm:my-7.5 my-5"></div>

            {/* ------------------------ Note Code ------------------------ */}
            <div className="md:w-[40%] lg:w-1/2 sm:px-8 sm:py-5 px-6 py-4 md:h-full md:overflow-y-scroll scroll-hide">
                <div className="flex justify-between items-baseline">
                    <h1 className="lg:text-3xl text-2xl font-bold text-gray-800">
                        Recent Notes🗒️
                    </h1>
                    {note.length > 0 && (
                        <span
                            className="text-red-600 underline lg:text-sm text-xs font-semibold cursor-pointer"
                            onClick={() => {
                                if (confirm("Do you want to delete all notes?")) {
                                    setNote([]);
                                }
                            }}>
                            Clear all
                        </span>
                    )}
                </div>
                {note.length > 0 && (
                    <div className="flex lg:flex-row flex-col justify-between lg:items-center my-5">
                        <p className="text-gray-500 text-sm lg:mb-0 mb-2">
                            Here, we have {note.length} note
                            {note.length > 1 ? "s" : ""} in the list.
                        </p>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`lg:w-[40%] w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none mb-0.5 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 w-full">
                    <AnimatePresence>
                        {note.length > 0 ? (
                            filteredNotes.map((n) => {
                                return (
                                    <motion.div
                                        key={n._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.25 }}
                                        className={`min-h-64 px-5 py-4 rounded-2xl shadow-md border ${n.color} hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between gap-5`}>
                                        <div>
                                            <h3 className="text-lg font-semibold wrap-break-word mb-2 leading-tight">
                                                {n.heading}
                                            </h3>
                                            <p className="text-xs text-justify wrap-break-word leading-tight">
                                                {n.content}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <button
                                                className="p-1 bg-white border border-blue-200 rounded-full hover:bg-blue-200 transition cursor-pointer"
                                                onClick={() => editNote(n)}>
                                                <Edit className="h-3 w-3 text-blue-700" />
                                            </button>

                                            <button
                                                className="p-1 bg-white border border-red-200 rounded-full hover:bg-red-200 transition cursor-pointer"
                                                onClick={() =>
                                                    deleteNote(n._id)
                                                }>
                                                <Trash2 className="h-3 w-3 text-red-600" />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="text-gray-400 mt-5">
                                <p className="text-lg">📭 No Notes Yet</p>
                                <p className="text-sm">
                                    Start by creating your first note.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default App;
