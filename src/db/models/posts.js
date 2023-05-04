const knex = require('../knex');

class Posts{

    constructor(id, user_id, url, caption, date){
        this.id = id;
        this.user_id = user_id;
        this.url = url;
        this.caption = caption;
        this.date = date;
    }

    static async list() {
        try {
          const query = 'SELECT * FROM posts';
          const { rows } = await knex.raw(query);
          return rows.map((posts) => new Posts(posts));
        } catch (err) {
          console.error(err);
          return null;
        }
      }

      static async find(id) {
        try {
          const query = 'SELECT * FROM posts WHERE id = ?';
          const { rows: [posts] } = await knex.raw(query, [id]);
          return posts ? new Posts(posts) : null;
        } catch (err) {
          console.error(err);
          return null;
        }
      }

      static async create( user_id, url, caption, date=null) {
      try {
        const query = `INSERT INTO posts (user_id, url, caption, date)
          VALUES (?,?,?,?) RETURNING *`;
        const { rows: [posts] } = await knex.raw(query, [user_id, url, caption, date]);
        return new Posts(posts);
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    static async deleteAll() {
        try {
          return knex.raw('TRUNCATE posts');
        } catch (err) {
          console.error(err);
          return null;
        }
      }

    static async update (url,id) { 
        try {
          const [updatedPosts] = await knex('posts')
            .where({ id: id })
            .update({ url })
            .returning('*');
          return updatedPosts ? new Posts(updatedPosts) : null;
        } catch (err) {
          console.error(err);
          return null;
        }
      };

      static async delete(id) {
        try {
          const [deletedPosts] = await knex('posts')
            .where({ id: id })
            .del()
            .returning('*');
          return deletedPosts ? new Posts(deletedPosts) : null;
        } catch (err) {
          console.error(err);
          return null;
        }
      }
}

module.exports = Posts;