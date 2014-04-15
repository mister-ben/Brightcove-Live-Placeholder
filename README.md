Brightcove Live Placeholder
===========================

Javascript plugin for a Brightcove Video Cloud HTML5 player to show an image over an HLS live video until playback is possible.

When a video is loaded that is live and HLS, an image is placed over the player. The URL for the HLS master playlist is repeatedly fetched until it succeeds, at which point the image is removed.

*Usage:* Add plugin to player in player settings, or as a module in the player template.

*Pre-requisiutes:*

* The server hosting the master playlist has CORS enabled. Brightcove's Akamai CDN should have this.
* The Brightcove video has a length of -1. This is used to determine if it's a live video. The Brightcove Live module creates videos with length set to -1.
* * The master playlist is unique and has never existed before - Akamai do not delete the master playlists,  so if the same stream name is re-used, the master playlist is available before streaming starts. The Brightcove Live module does create unique URLs.
