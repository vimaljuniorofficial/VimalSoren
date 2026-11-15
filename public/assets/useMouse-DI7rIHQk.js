import {
    ab as n
} from "./index-DWN9ksCY.js";
const s = () => {
    const e = n.useRef({
            x: 0,
            y: 0
        }).current,
        t = o => {
            e.x = o.clientX / window.innerWidth * 2 - 1, e.y = o.clientY / window.innerHeight * 2 - 1
        };
    return n.useEffect(() => (window.addEventListener("mousemove", t), () => window.removeEventListener("mousemove", t)), []), e
};
export {
    s as u
};