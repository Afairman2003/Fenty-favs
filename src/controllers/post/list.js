

const listpostings = async(req, res) => {
    const {
     db: { Posts }
    } = req
    // const Posts = req.db.Posts;
    const postings = await Posts.list();

    res.send(postings);
};
module.exports = listpostings;