// services/admin/adminController.js
exports.getReports = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const reports = await Report.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'name email');

    res.json(reports);
};

exports.resolveReport = async (req, res) => {
    const report = await Report.findByIdAndUpdate(
        req.params.id,
        { status: 'resolved', resolvedBy: req.user.id },
        { new: true }
    );

    res.json(report);
};