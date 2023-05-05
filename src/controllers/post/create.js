
const create = async(req, res, ) => {
    const {
        session,
        db: { Posts },
        body: { url, caption },
    } = req;
    const user_id = session.userId;
    console.log('user_id', user_id, 'url', url, 'caption', caption);
    const postings = await Posts.create(user_id, url, caption);

    res.send(postings);
};
    
module.exports = create;