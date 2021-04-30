# Speedrun Retimer without Ads

As of writing this, the majority of speedrun moderators retime using speedrun retime tools such as
[yt-frame-retimer](https://github.com/slashinfty/yt-frame-timer). While these tools are good at the
job, they come with the disadvantage of advertising themselves in the provided mod messages that
get pasted all over speedrun.com. While these ads are understandable as they help use of the tool to
increase, as a moderator who always has 200-300 runs pending, removing the ads for every single run
can be a pain. This fork of Matt Braddocks' popular
[yt-frame-retimer](https://github.com/slashinfty/yt-frame-timer) aims to solve that problem by
simply removing the ad.

This fork also has a few other tweaks:

* Dark theme!

* The "about" section has been removed, as it only took up space.

* The default FPS has been changed from 60 to 30, which is a more popular FPS for runs.

* The mod message has been changed to include the exact frame instead of timestamps.

* The time format has been changed from `Xh Xm Xs Xms` to `XX:XX:XX.XXX`.

* Removed the alert that appears when copying the mod message.

* Better Google Drive support.
