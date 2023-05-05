
const showpostings = async(req, res) => {
    const {
        db: { Posts },
        params:{id}
    } = req;
    const postings = await Posts.show(id);

    res.send(postings);
};
module.exports = showpostings;