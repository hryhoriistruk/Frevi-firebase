// services/admin/complaintController.js
router.get('/complaints', async (ctx) => {
    const { status, from, to } = ctx.query;
    const query = {};

    if (status) query.status = status;
    if (from && to) query.createdAt = { $gte: new Date(from), $lte: new Date(to) };

    ctx.body = await Complaint.find(query)
        .populate('user')
        .sort({ createdAt: -1 });
});