function compute() {
    /* Initiate basic time variables */
    let h = 0;
    let m = 0;
    let s = 0;
    let ms = 0;

    /*
     * Get framerate, start frame, and end frame from corresponding elements
     * Double check they all have a value
     */
    let fps = parseInt(document.getElementById("framerate").value);
    let sframe = document.getElementById("startobj").value;
    let eframe = document.getElementById("endobj").value;

    if (typeof (sframe) === "undefined" || typeof (eframe) === "undefined"
        || typeof (fps) === "undefined")
        return;

    /* Calculate framerate */
    let frames = (eframe - sframe) * fps;
    s = Math.floor(frames / fps);
    frames = frames % fps;
    ms = Math.round(frames / fps * 1000);
    if (ms < 10)
        ms = "00" + ms;
    else if (ms < 100)
        ms = "0" + ms;

    if (s >= 60) {
        m = Math.floor(s / 60);
        s = s % 60;
        s = s < 10 ? "0" + s : s;
    }
    if (m >= 60) {
        h = Math.floor(m / 60);
        m = m % 60;
        m = m < 10 ? "0" + m : m;
    }

    /* Show the time and mod message in the DOM */
    let ftime =
        h.toString() + "h " + m.toString() + "m " + s.toString() + "s " + ms.toString() + "ms";
    let mod_message = `Mod Note: Retimed (Start: Frame ${sframe * fps}, End: ${
        eframe * fps}, FPS: ${fps}, Total Time: ${ftime})`;

    document.getElementById("time").value = ftime;
    document.getElementById("mod_message").disabled = false;
    document.getElementById("mod_message").innerText = mod_message;
    document.getElementById("mod_message_button").disabled = false;
}

/* Allow user to copy mod message to clipboard */
function copyModMessage() {
    const text_area = document.getElementById("mod_message");
    text_area.focus();
    text_area.select();
    document.execCommand("copy");
    alert(
        `The mod message has been copied to clipboard! Please paste it into the comment of the run you are verifying.`);
}

/* If framerate is invalid, show an error message and disable start and end frame fields */
const check_fps =
    (event) => {
        if (event.target.value === "" || parseInt(event.target.value) <= 0
            || isNaN(parseInt(event.target.value))) {
            document.getElementById("framerate")
                .setCustomValidity("Please enter a valid framerate.");
            document.getElementById("framerate").reportValidity();
            document.getElementById("startobj").disabled = true;
            document.getElementById("endobj").disabled = true;
            document.getElementById("computeButton").disabled = true;
        } else {
            document.getElementById("startobj").disabled = false;
            document.getElementById("endobj").disabled = false;
            document.getElementById("computeButton").disabled = false;
        }
    }

/* Get current frame from input field (either start time or end time) */
const parse_time = (event) => {
    let inptext_frame = (JSON.parse(event.target.value)).lct;
    if (typeof inptext_frame !== "undefined") {
        let fps = parseInt(document.getElementById("framerate").value);
        let frameFromObj = (time, fps) => Math.floor(time * fps) / fps;
        let fframe = frameFromObj(inptext_frame, fps);
        document.getElementById(event.target.id).value = `${fframe}`;
    }
}
