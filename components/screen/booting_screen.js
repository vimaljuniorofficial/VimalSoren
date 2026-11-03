import React from 'react'

function BootingScreen(props) {

    return (
        <div style={(props.visible || props.isShutDown ? { zIndex: "100" } : { zIndex: "-20" })} className={(props.visible || props.isShutDown ? " visible opacity-100" : " invisible opacity-0 ") + " absolute duration-500 select-none flex flex-col justify-around items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-black"}>
            <img width="400px" height="400px" className="md:w-1/4 w-1/2" src="./themes/Yaru/status/cof_orange_hex.svg" alt="Ubuntu Logo" />
            <div className="w-10 h-10 flex justify-center items-center rounded-full outline-none cursor-pointer" onClick={props.turnOn} >
                {(props.isShutDown
                    ? <div className="bg-white rounded-full flex justify-center items-center w-10 h-10 hover:bg-gray-300"><img width="32px" height="32px" className="w-8" src="./themes/Yaru/status/power-button.svg" alt="Power Button" /></div>
                    : <img width="40px" height="40px" className={" w-10 " + (props.visible ? " animate-spin " : "")} src="./themes/Yaru/status/process-working-symbolic.svg" alt="Ubuntu Process Symbol" />)}
            </div>
            <div className="flex items-start justify-center text-white select-none" style={{ fontFamily: "'Ubuntu', sans-serif" }}>
                <span className="text-4xl md:text-5xl font-normal tracking-wide leading-none">vimal</span>
                <svg viewBox="883.29 311.81 90.65 90.65" className="w-5 h-5 md:w-6 md:h-6 ml-2 inline-block" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="928.615" cy="357.135" r="45.325" fill="#FFF" />
                    <path fill="#000" d="M905.093,357.135c0,3.219-2.609,5.828-5.83,5.828c-3.217,0-5.826-2.609-5.826-5.828c0-3.218,2.609-5.827,5.826-5.827 C902.483,351.308,905.093,353.917,905.093,357.135z M938.247,385.47c1.609,2.786,5.172,3.741,7.959,2.133 c2.787-1.609,3.742-5.173,2.133-7.96s-5.172-3.741-7.959-2.132S936.638,382.684,938.247,385.47z M948.339,334.628 c1.609-2.787,0.656-6.351-2.133-7.958c-2.785-1.609-6.35-0.654-7.959,2.132c-1.609,2.787-0.654,6.351,2.133,7.959 C943.167,338.372,946.731,337.416,948.339,334.628z M928.616,340.517c8.684,0,15.809,6.656,16.553,15.146l8.434-0.132 c-0.4-6.31-3.137-11.983-7.354-16.167c-2.232,0.862-4.822,0.745-7.057-0.546c-2.236-1.291-3.633-3.477-4.002-5.845 c-2.096-0.569-4.301-0.874-6.574-0.874c-3.988,0-7.758,0.933-11.105,2.592l4.104,7.369 C923.741,341.072,926.116,340.517,928.616,340.517z M911.997,357.135c0-5.622,2.793-10.592,7.066-13.599l-4.33-7.237 c-5.016,3.349-8.752,8.459-10.328,14.448c1.865,1.503,3.061,3.805,3.061,6.388c0,2.584-1.195,4.886-3.061,6.389 c1.576,5.99,5.312,11.1,10.328,14.45l4.33-7.238C914.79,367.729,911.997,362.759,911.997,357.135z M928.616,373.756 c-2.5,0-4.875-0.555-7.002-1.545l-4.104,7.369c3.348,1.66,7.117,2.592,11.105,2.592c2.273,0,4.479-0.304,6.574-0.873 c0.369-2.369,1.766-4.555,4.002-5.845c2.234-1.291,4.824-1.408,7.057-0.546c4.217-4.186,6.953-9.859,7.354-16.168l-8.434-0.132 C944.425,367.098,937.3,373.756,928.616,373.756z" />
                </svg>
            </div>
            <div className="text-white mb-4">
                <a className="underline" href="https://linkedin.com/vimaljunior" rel="noreferrer noopener" target="_blank">linkedin</a>
                <span className="font-bold mx-1">|</span>
                <a href="https://github.com/vimaljuniorofficial" rel="noreferrer noopener" target="_blank" className="underline">github</a>
            </div>
        </div>
    )
}

export default BootingScreen
