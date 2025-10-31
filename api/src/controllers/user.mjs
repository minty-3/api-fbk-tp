const User = class User {
  constructor(app, UserModel) {
    this.app = app;
    this.UserModel = UserModel;
  }

  createUser() {
    this.app.post('/users', async (req, res) => {
      try {
        const user = new this.UserModel(req.body);
        await user.save();
        return res.status(201).json(user);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllUsers() {
    this.app.get('/users', async (req, res) => {
      try {
        const users = await this.UserModel.find();
        return res.status(200).json(users);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findUserById() {
    this.app.get('/users/:id', async (req, res) => {
      try {
        const user = await this.UserModel.findById(req.params.id);
        if (!user) {
          return res.status(404).json({
            code: 404,
            message: 'User not found'
          });
        }
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updateUser() {
    this.app.put('/users/:id', async (req, res) => {
      try {
        const user = await this.UserModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!user) {
          return res.status(404).json({
            code: 404,
            message: 'User not found'
          });
        }
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deleteUser() {
    this.app.delete('/users/:id', async (req, res) => {
      try {
        const user = await this.UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).json({
            code: 404,
            message: 'User not found'
          });
        }
        return res.status(200).json({
          message: 'User deleted successfully'
        });
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  run() {
    this.createUser();
    this.findAllUsers();
    this.findUserById();
    this.updateUser();
    this.deleteUser();
  }
};

export default User;
