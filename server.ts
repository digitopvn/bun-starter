import { resolve } from 'path';
import { STATIC_PATH } from './src/config';

const server = Bun.serve({
	port: process.env.PORT || 3001,
	fetch(req) {
		const url = new URL(req.url);

		if (url.pathname === '/') {
			return new Response('Hello World!');
		} else if (url.pathname === '/json') {
			return new Response(JSON.stringify({ hello: 'world' }), {
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
