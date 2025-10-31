const Discussion = class Discussion {
  constructor(app, DiscussionModel) {
    this.app = app;
    this.DiscussionModel = DiscussionModel;
  }

  createDiscussion() {
    this.app.post('/discussions', async (req, res) => {
      try {
        const discussion = new this.DiscussionModel(req.body);
        await discussion.save();
        res.status(201).json(discussion);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllDiscussions() {
    this.app.get('/discussions', async (req, res) => {
      try {
        const discussions = await this.DiscussionModel.find();
        return res.status(200).json(discussions);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findDiscussionById() {
    this.app.get('/discussions/:id', async (req, res) => {
      try {
        const discussion = await this.DiscussionModel.findById(req.params.id);
        if (!discussion) {
          return res.status(404).json({
            code: 404,
            message: 'Discussion not found'
          });
        }
        return res.status(200).json(discussion);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updateDiscussion() {
    this.app.put('/discussions/:id', async (req, res) => {
      try {
        const discussion = await this.DiscussionModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!discussion) {
          return res.status(404).json({
            code: 404,
            message: 'Discussion not found'
          });
        }
        return res.status(200).json(discussion);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deleteDiscussion() {
    this.app.delete('/discussions/:id', async (req, res) => {
      try {
        const discussion = await this.DiscussionModel.findByIdAndDelete(req.params.id);
        if (!discussion) {
          return res.status(404).json({
            code: 404,
            message: 'Discussion not found'
          });
        }
        return res.status(200).json({
          message: 'Discussion deleted successfully'
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
    this.createDiscussion();
    this.findAllDiscussions();
    this.findDiscussionById();
    this.updateDiscussion();
    this.deleteDiscussion();
  }
};

export default Discussion;
