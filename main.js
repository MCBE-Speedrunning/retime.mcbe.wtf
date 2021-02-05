/* Compute the total duration of the run */
function compute()
{
	const fps = parseInt(document.getElementById("framerate").value);
	const st = document.getElementById("startobj").value;
	const et = document.getElementById("endobj").value;

	if (st === undefined || et === undefined || fps === undefined)
		return;

	const frames = (et - st) * fps;
	const s = Math.round(frames / fps * 1000) / 1000;

	/* Show the time and mod message in the DOM */
	const sf = st * fps;
	const ef = et * fps;
	const t = time_format(s);
	const mod_message = `Mod Note: Retimed (Start Frame: ${
		sf}, End Frame: ${ef}, FPS: ${fps}, Total Time: ${t})`;

	document.getElementById("time").value = t;
	document.getElementById("mod_message").disabled = false;
	document.getElementById("mod_message").innerText = mod_message;
	document.getElementById("mod_message_button").disabled = false;
}

/* Convert seconds to human readable time */
function time_format(t)
{
	const h = ~~(t / 3600);
	const m = ~~((t % 3600) / 60);
	const s = ~~t % 60;
	let ret = "";

	if (h > 0)
		ret += h + ":" + (m < 10 ? "0" : "");

	ret += m + ":" + (s < 10 ? "0" : "");
	ret += s;

	/* Milliseconds */
	if (t % 1 == 0)
		ret += "." + t.toFixed(3).split(".")[1];
	else
		ret += ".000"

		return ret;
}

/* Allow user to copy mod message to clipboard */
function copy_mod_message()
{
	const text_area = document.getElementById("mod_message");
	text_area.focus();
	text_area.select();
	document.execCommand("copy");
}

/* If framerate is invalid, show an error message and disable start and end
 * frame fields */
function check_fps(event)
{
	if (event.target.value === "" || parseInt(event.target.value) <= 0
		|| isNaN(parseInt(event.target.value))) {
		document.getElementById("framerate")
			.setCustomValidity("Please enter a valid framerate.");
		document.getElementById("framerate").reportValidity();
		document.getElementById("startobj").disabled = true;
		document.getElementById("endobj").disabled = true;
		document.getElementById("compute_button").disabled = true;
	} else {
		document.getElementById("startobj").disabled = false;
		document.getElementById("endobj").disabled = false;
		document.getElementById("compute_button").disabled = false;
	}
}

/* Get current frame from input field (either start time or end time) */
function parse_time(event)
{
	let inptext_frame = (JSON.parse(event.target.value)).lct;
	if (inptext_frame !== undefined) {
		const fps = parseInt(
			document.getElementById("framerate").value);
		const frame_from_obj = (t, fps) => Math.floor(t * fps) / fps;
		const fframe = frame_from_obj(inptext_frame, fps);
		document.getElementById(event.target.id).value = `${fframe}`;
	}
}
