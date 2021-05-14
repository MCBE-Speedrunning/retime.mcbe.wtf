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
	const s_frame = ~~(s_time * fps);
	const e_frame = ~~(e_time * fps);
	const time = time_format(seconds);

	document.getElementById("time").value = time;
	document.getElementById("mod_message").disabled = false;
	document.getElementById("mod_message").innerText = generate_mod_message(
		fps, s_time, e_time, time, s_frame, e_frame, frames, seconds);
	document.getElementById("mod_message_button").disabled = false;
}

/* Support custom mod messages. Find a better way to do this, it is very cringe! */
function generate_mod_message(
	fps, start_time, end_time, total_time, start_frame, end_frame, total_frames, total_seconds)
{
	let mod_message = localStorage.getItem("custom_mod_message");

	const hours = ~~(total_seconds / 3600)
	const minutes = ~~((total_seconds % 3600) / 60);
	const seconds = ~~(total_seconds % 60);
	const milliseconds = total_seconds % 60 % 1;

	const padded_minutes = (minutes < 10) ? "0" + minutes : minutes;
	const padded_seconds = (seconds < 10) ? "0" + seconds : seconds;

	/*
	 * TODO: THIS IS REALLY STUPID CODE!!
	 * In a language as bloated as JS surely there is a better way??
	 */
	const one_prec_millis = milliseconds.toFixed(1).replace("0.", "");
	const two_prec_millis = milliseconds.toFixed(2).replace("0.", "");
	const three_prec_millis = milliseconds.toFixed(3).replace("0.", "");

	mod_message = mod_message.replaceAll("${FPS}", fps)
			      .replaceAll("${H}", hours)
			      .replaceAll("${M}", minutes)
			      .replaceAll("${S}", seconds)
			      .replaceAll("${MS}", milliseconds)

			      .replaceAll("${PM}", padded_minutes)
			      .replaceAll("${PS}", padded_seconds)

			      .replaceAll("${1MS}", one_prec_millis)
			      .replaceAll("${2MS}", two_prec_millis)
			      .replaceAll("${3MS}", three_prec_millis)

			      .replaceAll("${TS}", total_seconds)

			      .replaceAll("${ST}", start_time)
			      .replaceAll("${ET}", end_time)
			      .replaceAll("${TT}", total_time)

			      .replaceAll("${SF}", start_frame)
			      .replaceAll("${EF}", end_frame)
			      .replaceAll("${TF}", total_frames)

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
	const frame = ~~(input * fps) / fps;
	document.getElementById(event.target.id).value = `${frame}`;

	/* If all fields are filled the compute */
	if (document.getElementById("startobj").value && document.getElementById("endobj").value)
		compute();
}
