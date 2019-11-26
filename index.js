const fetch = require('node-fetch');
const url = require('url');
const args = {};

process.argv.slice(2).forEach(item => {
	const arg = item.split('=');
	args[arg[0]] = arg[1];
});

(async function() {
	if (args.url) {
		const parseURL = url.parse(args.url);
		if (parseURL.href) {
			const html = await fetch(parseURL.href).then(resp => resp.text());
			const buffer = Buffer.from(html, 'utf8');
			console.log(buffer.toString('utf8', 0, 1024));
		}
	}
})();
