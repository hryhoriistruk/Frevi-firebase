// services/user/userController.js
router.get('/:id', async (ctx) => {
    const cached = await redis.get(`user:${ctx.params.id}`);
    if (cached) return JSON.parse(cached);

    const user = await User.findById(ctx.params.id);
    await redis.setex(`user:${ctx.params.id}`, 3600, JSON.stringify(user));
    ctx.body = user;
});