
const showlikes = async (req, res) => {
    const {
        db: { Likes },
        params: { id },
    } = req;
    const likes = await Likes.show(Number(id));
    res.send(likes);
}
module.exports = showlikes