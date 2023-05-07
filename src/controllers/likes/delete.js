const deleted = async(req, res) => {
  const {
    db: { Likes },
    params: { id },
  } = req;
  const likes = await Likes.delete(Number(id));
  res.send(likes);
}
module.exports = deleted