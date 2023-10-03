export function manipulationEventListener(nameBtn, operation = "", eventName, event) {
    if (operation === "add") {
        nameBtn.forEach((ev, i) => { ev.addEventListener(eventName, event[i]) })
    } else nameBtn.forEach((ev, i) => { ev.removeEventListener(eventName, event[i])})
}