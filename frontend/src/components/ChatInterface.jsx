import { useRef } from "react";
import { useSpeech } from "../hooks/useSpeech";

const comedianTexts = {
    DaveChapelle: {
        title: "Dave Chappelle's Laugh Lounge!",
        prompt: "Need a laugh? Give me a topic! Just a heads up, my humor can be brutally honest or deliciously dark!"
    },
    Kharlamov: {
        title: "Комедийный клуб Гарика Харламова!",
        prompt: "Готовы смеяться до слез? Назовите тему! Мой юмор бывает резким, неожиданным и всегда смешным!"
    },
    Saburov: {
        title: "Добро пожаловать на шоу Нурлана Сабурова",
        prompt: "Задай тему! Только предупреждаю, мой юмор может быть острым, саркастичным и полным культурных тонкостей!"
    }
};

export const ChatInterface = ({ hidden, selectedComedian, ...props }) => {
    const input = useRef();
    const { tts, loading, message, startRecording, stopRecording, recording } = useSpeech();

    const sendMessage = () => {
        const text = input.current.value;
        if (!loading && !message) {
            tts(text);
            input.current.value = "";
        }
    };

    if (hidden) {
        return null;
    }

    const comedianText = comedianTexts[selectedComedian] || comedianTexts.DaveChapelle;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-between p-4 pointer-events-none">
            <div className="self-end flex flex-col items-end backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg mb-auto mr-4 w-1/3">
                <h1 className="font-black text-xl text-gray-700">{comedianText.title}</h1>
                <p className="text-gray-700">
                    {loading ? "Loading..." : comedianText.prompt}
                </p>
            </div>
            <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
                <button
                    onClick={recording ? stopRecording : startRecording}
                    className={`bg-gray-500 hover:bg-gray-600 text-white p-4 px-4 font-semibold uppercase rounded-md ${recording ? "bg-red-500 hover:bg-red-600" : ""
                        } ${loading || message ? "cursor-not-allowed opacity-30" : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                        />
                    </svg>
                </button>

                <input
                    className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
                    placeholder="Type a message..."
                    ref={input}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                />
                <button
                    disabled={loading || message}
                    onClick={sendMessage}
                    className={`bg-gray-500 hover:bg-gray-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${loading || message ? "cursor-not-allowed opacity-30" : ""
                        }`}
                >
                    Send
                </button>
            </div>
        </div>
    );
};