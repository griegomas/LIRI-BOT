
![Alt Text](https://github.com/griegomas/LIRI-BOT/blob/master/DemoGif.gif)


Liri Bot is a command line app built with Node.js that accepts various inputs, calling out to several different APIs to retrieve data which it returns to the end user.

To use, make sure you npm install the required packages (see the top of liri.js for details).

------------------------------------------

Available commands:

node liri.js

Node liri.js concert-this [band name here]

node liri.js spotify-this-song [song name here]

node liri.js movie-this [movie name here]

node liri.js [do-what-it-says]

----------------------------------------------------

Command usages:

node liri.js - this will display available commands

Node liri.js concert-this [band name here] - this will display concert info on the selected band.

node liri.js spotify-this-song [song name here] - this will display song information on the selected song.

node liri.js movie-this [movie name here] - this will display movie information on the selected movie.

node liri.js [do-what-it-says] - this reads from random.txt, executing commands found there.

Notes: Defaults have been set for the first three commands where no song/band/movie is selected - try it out!
