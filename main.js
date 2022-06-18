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

	const seconds = (frames / fps).toFixed(3);

	/* Show the time and mod message in the DOM. */
	const s_frame = ~~(s_time * fps);
	const e_frame = ~~(e_time * fps);
	const time = time_format(seconds);

	document.getElementById("time").value = time;
	document.getElementById("mod_message").disabled = false;
	document.getElementById("mod_message").innerText = generate_mod_message(
		fps, s_time, e_time, time, s_frame, e_frame, frames, seconds);
	document.getElementById("mod_message_button").disabled = false;
}

/* Helper function for custom mod messages */
function interpolate(template, variables)
{
	return template.replace(/\${[^{]+}/g, (match) => {
		const path = match.slice(2, -1).trim();
		return variables[path];
	});
}

/* Support custom mod messages. Find a better way to do this, it is very cringe! */
function generate_mod_message(
	fps, start_time, end_time, total_time, start_frame, end_frame, total_frames, total_seconds)
{
	let mod_message = localStorage.getItem("custom_mod_message");

	/* TODO: Make this lazy instead of strict? */
	const hours = ~~(total_seconds / 3600)
	const minutes = ~~((total_seconds % 3600) / 60);
	const seconds = ~~(total_seconds % 60);
	const milliseconds = total_seconds % 60 % 1;
	const padded_minutes = (minutes < 10) ? "0" + minutes : minutes;
	const padded_seconds = (seconds < 10) ? "0" + seconds : seconds;
	const one_prec_millis = milliseconds.toFixed(1).replace("0.", "");
	const two_prec_millis = milliseconds.toFixed(2).replace("0.", "");
	const three_prec_millis = milliseconds.toFixed(3).replace("0.", "");

	const params = {
		H: hours,
		M: minutes,
		S: seconds,
		MS: milliseconds,
		PM: padded_minutes,
		PS: padded_seconds,
		"1MS": one_prec_millis,
		"2MS": two_prec_millis,
		"3MS": three_prec_millis,
		ST: start_time,
		ET: end_time,
		TT: total_time,
		SF: start_frame,
		EF: end_frame,
		TF: total_frames,
		FPS: fps
	};
	mod_message = interpolate(mod_message, params);
	return mod_message;
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
	const s_time = document.getElementById("startobj");
	const e_time = document.getElementById("endobj"); 

	fps = event.target.value;
	if (fps > 0 && fps % 1 == 0) {
		s_time.disabled = false;
		e_time.disabled = false;
	}
	else {
		document.getElementById("framerate")
			.setCustomValidity("Please enter a valid framerate.");
		document.getElementById("framerate").reportValidity();
		s_time.disabled = true;
		e_time.disabled = true;
	}
	
	calculate_frames(s_time, s_time.getAttribute("originalvalue"))
	calculate_frames(e_time, e_time.getAttribute("originalvalue"))
}

/* Get current frame from input field (either start time or end time). */
function parse_time(event)
{
	const element = event.target;

	/* Return early if invalid JSON is passed (numbers are valid) */
	let input, dinfo;
	try {
		dinfo = JSON.parse(element.value);
	} catch {
		element.value = "";
		return;
	}

	/* If cmt isn't available fallback to lct, also allow raw numbers */
	if (!(input = dinfo.cmt) && !(input = dinfo.lct) && typeof ((input = dinfo)) !== "number") {
		element.value = "";
		return;
	}
	
	element.setAttribute("originalvalue", input)

	calculate_frames(element, input);
}

function calculate_frames(element, value) {
	if(!element.value) return;

	/* Calculate the exact timestamp */
	const fps = parseInt(document.getElementById("framerate").value);
	const frame = ~~(value * fps) / fps;
	element.value = `${frame}`;

	/* If all fields are filled then compute */
	if (document.getElementById("startobj").value && document.getElementById("endobj").value)
		compute();
}
