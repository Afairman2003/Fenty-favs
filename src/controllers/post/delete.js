const deleted = async(req, res, ) => {
    const {
        db: { Posts },
        params: { id },
    } = req;
    // const user_id = session.userId;
  const user = await Posts.delete(Number(id));
  res.send(user)
};
    
module.exports = deleted;