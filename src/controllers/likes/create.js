
const create = async (req, res) => {
    const {
        session,
        db: { Likes },
        params: { id },
    } = req;
    console.log(Likes)
    const user_id = session.userId
    const likes = await Likes.create(user_id, id);
    res.send(likes);

}
module.exports = create
    