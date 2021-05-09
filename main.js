/* Compute the total duration of the run. */
function compute()
{
	const fps = parseInt(document.getElementById("framerate").value);
	const s_time = document.getElementById("startobj").value;
	const e_time = document.getElementById("endobj").value;

	/* Return early if not all fields are filled */
	if (s_time === undefined || e_time === undefined || fps === undefined)
		return;

	/* Return early on a negative time */
	const frames = (e_time - s_time) * fps;
	if (frames < 0) {
		document.getElementById("time").value = "Error: Negative time";
		return;
	}

	const seconds = Math.round(frames / fps * 1000) / 1000;

	/* Show the time and mod message in the DOM. */
	const s_frame = Math.trunc(s_time * fps);
	const e_frame = Math.trunc(e_time * fps);
	const time = time_format(seconds);
	const mod_message = `Mod Note: Retimed (Start Frame: ${s_frame}, End Frame: ${
		e_frame}, FPS: ${fps}, Total Time: ${time})`;

	document.getElementById("time").value = time;
	document.getElementById("mod_message").disabled = false;
	document.getElementById("mod_message").innerText = mod_message;
	document.getElementById("mod_message_button").disabled = false;
}

/* Convert seconds to human readable time. */
function time_format(t)
{
	const h = ~~(t / 3600);
	const m = ~~((t % 3600) / 60);
	const s = t % 60;
	let ret = "";

	if (h > 0)
		ret += h + ":" + (m < 10 ? "0" : "");

	ret += m + ":" + (s < 10 ? "0" : "") + s.toFixed(3);

	return ret;
}

/* Allow user to copy mod message to clipboard. */
function copy_mod_message()
{
	const mod_message = document.getElementById("mod_message");
	mod_message.focus();
	mod_message.select();
	document.execCommand("copy");
}

/* If framerate is invalid, show an error message and disable start and end frame fields. */
function check_fps(event)
{
	fps = event.target.value;
	if (fps > 0 && fps % 1 == 0) {
		document.getElementById("startobj").disabled = false;
		document.getElementById("endobj").disabled = false;
	}
	else {
		document.getElementById("framerate")
			.setCustomValidity("Please enter a valid framerate.");
		document.getElementById("framerate").reportValidity();
		document.getElementById("startobj").disabled = true;
		document.getElementById("endobj").disabled = true;
	}
}

/* Get current frame from input field (either start time or end time). */
function parse_time(event)
{
	/* Return early if invalid JSON is passed (numbers are valid) */
	let input, dinfo;
	try {
		dinfo = JSON.parse(event.target.value);
	} catch {
		document.getElementById(event.target.id).value = "";
		return;
	}

	/* If cmt isn't available fallback to lct, also allow raw numbers */
	if (!(input = dinfo.cmt) && !(input = dinfo.lct) && typeof ((input = dinfo)) !== "number") {
		document.getElementById(event.target.id).value = "";
		return;
	}

	/* Calculate the exact timestamp */
	const fps = parseInt(document.getElementById("framerate").value);
	const frame = Math.floor(input * fps) / fps;
	document.getElementById(event.target.id).value = `${frame}`;

	/* If all fields are filled the compute */
	if (document.getElementById("startobj").value && document.getElementById("endobj").value)
		compute();
}

/* Change the users preferred theme. */
function change_theme()
{
	const theme_switch = document.getElementById("page_theme");
	const want = theme_switch.checked ? "dark" : "light";

	document.documentElement.setAttribute("theme", want);
	localStorage.setItem("theme", want);
}

/* Automatically select the users preferred theme */
const theme = localStorage.getItem("theme");
if (theme) {
	document.documentElement.setAttribute("theme", theme);
	document.getElementById("page_theme").checked = (theme == "dark");
}
