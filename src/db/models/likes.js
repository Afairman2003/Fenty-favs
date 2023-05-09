const knex = require('../knex');

class Likes{

    constructor(id, user_id, post_id){
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
    }

    static async count(id) {
        try {
          const query = 'SELECT COUNT(*) FROM likes WHERE id = ?';
          const { rows } = await knex.raw(query, [id]);
          return rows[0].count;
        } catch (err) {
          console.error(err);
          return null;
        }  
    }

      static async create(user_id, post_id) {
        try {
          const query = `INSERT INTO likes (user_id, post_id)
            VALUES (?, ?) RETURNING *`;
          const { rows: [likes] } = await knex.raw(query, [user_id, post_id]);
          return new Likes(likes.id, likes.user_id, likes.post_id);
        } catch (err) {
          console.error(err);
          return null;
        }
     
    }


      static async delete(id) {
        try {
          const query = 'DELETE FROM likes WHERE id = ? RETURNING *';
          const { rows: [likes] } = await knex.raw(query, [id]);
          return likes ? new Likes(likes.id, likes.user_id, likes.post_id) : null;
        } catch (err) {
          console.error(err);
          return null;
        }
      
      }
}

module.exports = Likes;