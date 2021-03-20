// production = hosted on Heroku using PostgreSQL db
// development = hosted locally using PostgreSQL db

// using my cors-anywhere (DID work)
// https://asktami-cors-anywhere.herokuapp.com/

const prod = {
	DATASOURCE: `postgresql`,
	API_KEY: process.env.REACT_APP_API_KEY,
	AUTH_ENDPOINT: `https://asktami-cors-anywhere.herokuapp.com/https://asktami-flicklog-api.herokuapp.com/api`,
	API_ENDPOINT: `https://asktami-cors-anywhere.herokuapp.com/https://asktami-flicklog-api.herokuapp.com/api`,
	EXTERNAL_ENDPOINT: `https://api.themoviedb.org/3`,
};

const dev = {
	DATASOURCE: `postgresql`,
	API_KEY: process.env.REACT_APP_API_KEY,
	AUTH_ENDPOINT: `http://localhost:8000/api`,
	API_ENDPOINT: `http://localhost:8000/api`,
	EXTERNAL_ENDPOINT: `https://api.themoviedb.org/3`,
};

// Default to dev if not set
export const config = process.env.NODE_ENV === 'production' ? prod : dev;
