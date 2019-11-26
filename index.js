const fetch = require('node-fetch');
const url = require('url');
const options = require('yargs').option('url', {
	alias: 'u',
	type: 'string',
	demandOption: 'Please provide a URL to inspect, must include protocol',
	description: 'URL to inspect'
}).option('start', {
	alias: 's',
	type: 'integer',
	default: 0,
	description: 'Starting point of your inspection'
}).option('offset', {
	alias: 'o',
	type: 'integer',
	default: 1024,
	description: 'How much of the buffer do you want to inspect?'
}).option('charset', {
	alias: 'c',
	type: 'string',
	default: 'utf8',
	description: 'What encoding do you want to use?'
}).coerce('url', function (arg) {
	const parseURL = url.parse(arg);
	if (parseURL.protocol === null) throw new Error('Please provide an absolute URL');
	return arg;
}).argv;

(async function() {
	const html = await fetch(options.url).then(resp => resp.text());
	const buffer = Buffer.from(html, options.charset);
	console.log(buffer.toString(options.charset, options.start, options.offset));
})();
