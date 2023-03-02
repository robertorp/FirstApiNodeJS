let users = require('../mocks/users');

module.exports = {
  listUsers(req, res) {
    const { order } = req.query;
    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    res.send(200, sortedUsers);
  },

  getUserById(req, res) {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      return res.send(404, { error: 'User not found' });
    }

    res.send(200, user);
  },

  createUser(req, res) {
    const { body } = req;
    const { name } = JSON.parse(body);

    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id: lastUserId + 1,
      name,
    };

    users.push(newUser);

    res.send(201, newUser);
  },

  updateUser(req, res) {
    const { id } = req.params;
    const { body } = req;
    const { name } = JSON.parse(body);

    const userIndex = users.findIndex((u) => u.id === Number(id));

    if (userIndex === -1) {
      return res.send(404, { error: 'User not found' });
    }

    const user = {
      id: Number(id),
      name,
    };

    users[userIndex] = user;

    res.send(200, user);
  },

  deleteUser(req, res) {
    const { id } = req.params;

    users = users.filter((u) => u.id !== Number(id));

    res.send(204, null);
  },
};
