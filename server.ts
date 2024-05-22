import { env } from 'bun';
import { STATIC_PATH } from './src/config';
import esj from 'ejs';

import pkg from './package.json';

const server = Bun.serve({
	port: process.env.PORT || 3001,
	async fetch(req) {
		const url = new URL(req.url);

		if (url.pathname === '/') {
			const html = await esj.renderFile('./src/views/home.ejs', {
				meta_title: 'Bun Starter | Home',
				meta_description: 'This is the home page',
				base_url: env.BASE_URL || 'http://localhost:3001',
				version: pkg.version || 'N/A',
			});
			return new Response(html, { headers: { 'content-type': 'text/html' } });
			// return new Response('Hello World!');
		} else if (url.pathname === '/json') {
			return new Response(JSON.stringify({ status: 1, hello: 'world', messages: [] }), {
				headers: { 'content-type': 'application/json' },
			});
		} else {
			// try to fetch static files
			try {
				const filePath = STATIC_PATH + url.pathname;
				const file = Bun.file(filePath);
				return new Response(file, {
					headers: {
						'content-type': file.type,
						'cache-control': 'public, max-age=31536000',
					},
				});
			} catch (e) {
				return new Response('Not Found', { status: 404 });
			}
		}
	},
});

console.log(`Listening on http://localhost:${server.port}`);
