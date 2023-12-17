import { Router } from 'itty-router';
import { HTMLRoute } from './routes/html';
import { makePost, makeProduct } from './lib/make-product';
import { screenshotPage } from './routes/screenshot';

const router = Router()
	.get('/html', async () => {
		const post = await makeProduct().then(makePost);
		return HTMLRoute(post);
	})
	.get('/', async (_, env) => {
		const page = await screenshotPage(env);
		return page;
	})
	.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
