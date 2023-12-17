import router from './router';

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname.startsWith('/')) {
			console.log(ctx);
			return router.handle(request, env, ctx);
		}
	},
};
