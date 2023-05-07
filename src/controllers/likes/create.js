
const create = async (req, res) => {
    const {
        db: { Likes },
        params: { id },
    } = req;
    const likes = await Likes.create(id);
    res.send(likes);

}
module .exports = create
    