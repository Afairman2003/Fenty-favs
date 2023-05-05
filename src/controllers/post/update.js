const updatepostings = async(req, res) => {
    const {db: {Posts}, body:{id,url}} = req.body;
    const postings = await Posts.update(id,url);

    res.send(postings);
};
module.exports = updatepostings;