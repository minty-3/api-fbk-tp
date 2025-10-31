const Group = class Group {
  constructor(app, GroupModel) {
    this.app = app;
    this.GroupModel = GroupModel;
  }

  createGroup() {
    this.app.post('/groups', async (req, res) => {
      try {
        const group = new this.GroupModel(req.body);
        await group.save();
        res.status(201).json(group);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllGroups() {
    this.app.get('/groups', async (req, res) => {
      try {
        const groups = await this.GroupModel.find();
        return res.status(200).json(groups);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findGroupById() {
    this.app.get('/groups/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findById(req.params.id);
        if (!group) {
          return res.status(404).json({
            code: 404,
            message: 'Group not found'
          });
        }
        return res.status(200).json(group);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updateGroup() {
    this.app.put('/groups/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!group) {
          return res.status(404).json({
            code: 404,
            message: 'Group not found'
          });
        }
        return res.status(200).json(group);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deleteGroup() {
    this.app.delete('/groups/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findByIdAndDelete(req.params.id);
        if (!group) {
          return res.status(404).json({
            code: 404,
            message: 'Group not found'
          });
        }
        return res.status(200).json({
          message: 'Group deleted successfully'
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
    this.createGroup();
    this.findAllGroups();
    this.findGroupById();
    this.updateGroup();
    this.deleteGroup();
  }
};

export default Group;
