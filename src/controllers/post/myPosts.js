const myPosts = async(req, res) => {
    const {
        session,
        db: { Posts },
       
    } = req;
    const id = session.userId;
    console.log('id', id);
    const postings = await Posts.myPosts(id);

    res.send(postings);
};
module.exports = myPosts;
