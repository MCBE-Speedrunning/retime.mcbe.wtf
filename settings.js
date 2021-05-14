const mod_message_default =
	"Mod Note: Retimed (Start Frame: ${SF}, End Frame: ${EF}, FPS: ${FPS}, Total Time: ${TT})";

/* Set all the settings any time someone loads a page */
function set_settings()
{
	change_theme();
	remove_titles();
	remove_text();
	set_mod_message();
}

/* Initialize the settings page by flipping the switches and such */
function settings_init()
{
	document.getElementById("page_theme").checked = (localStorage.getItem("theme") === "dark");
	document.getElementById("page_titles").checked = (localStorage.getItem("remove_titles")
							  === "true");
	document.getElementById("page_text").checked = (localStorage.getItem("remove_text")
							=== "true");
	const mod_message = localStorage.getItem("custom_mod_message");
	document.getElementById("custom_mod_message").value = mod_message ? mod_message
									  : mod_message_default;
}

/* Change the users preferred theme. */
function change_theme()
{
	let theme;
	try {
		/* Settings page */
		theme = (document.getElementById("page_theme").checked) ? "dark" : "light";
	} catch {
		/* Index page */
		theme = (localStorage.getItem("theme") === "dark") ? "dark" : "light";
	}

	document.documentElement.setAttribute("theme", theme);
	localStorage.setItem("theme", theme);
}

/* Remove unnecessary titles */
function remove_titles()
{
	let checked;
	try {
		/* Settings page */
		checked = document.getElementById("page_titles").checked;
	} catch {
		/* Index page */
		if (localStorage.getItem("remove_titles") === "true")
			checked = true;
		else
			checked = false;
	}

	if (checked && !window.location.href.endsWith("settings.html"))
		for (let element of document.getElementsByTagName("h3"))
			element.classList.add("hidden");
	localStorage.setItem("remove_titles", checked.toString());
}

/* Remove unnecessary text */
function remove_text()
{
	let checked;
	try {
		/* Settings page */
		checked = document.getElementById("page_text").checked;
	} catch {
		/* Index page */
		if (localStorage.getItem("remove_text") === "true")
			checked = true;
		else
			checked = false;
	}

	if (checked)
		for (let element of document.getElementsByClassName("toggleable"))
			element.classList.add("hidden");
	localStorage.setItem("remove_text", checked.toString());
}

/* Set a custom mod message */
function set_mod_message(event)
{
	if (event.target.value.replace(/\s/g, ""))
		localStorage.setItem("custom_mod_message", event.target.value);
	else {
		event.target.value = mod_message_default;
		localStorage.setItem("custom_mod_message", mod_message_default);
	}
}

/* Conform to the users preferences */
if (window.location.href.endsWith("settings.html"))
	settings_init();
set_settings();
