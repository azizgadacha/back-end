
const activeSession =require( '../../model/activeSession');

exports.logout=(req, res) => {
    const { token } = req.body;

    activeSession.findOneAndDelete({ token })
        .then(() => res.json({ success: true }))
        .catch(() => {
            res.json({ success: false, msg: 'Token revoked' });
        });
}