const Poll = class Poll {
  constructor(app, PollModel) {
    this.app = app;
    this.PollModel = PollModel;
  }

  createPoll() {
    this.app.post('/polls', async (req, res) => {
      try {
        const poll = new this.PollModel(req.body);
        await poll.save();
        res.status(201).json(poll);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllPolls() {
    this.app.get('/polls', async (req, res) => {
      try {
        const polls = await this.PollModel.find();
        return res.status(200).json(polls);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findPollById() {
    this.app.get('/polls/:id', async (req, res) => {
      try {
        const poll = await this.PollModel.findById(req.params.id);
        if (!poll) {
          return res.status(404).json({
            code: 404,
            message: 'Poll not found'
          });
        }
        return res.status(200).json(poll);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updatePoll() {
    this.app.put('/polls/:id', async (req, res) => {
      try {
        const poll = await this.PollModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!poll) {
          return res.status(404).json({
            code: 404,
            message: 'Poll not found'
          });
        }
        return res.status(200).json(poll);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deletePoll() {
    this.app.delete('/polls/:id', async (req, res) => {
      try {
        const poll = await this.PollModel.findByIdAndDelete(req.params.id);
        if (!poll) {
          return res.status(404).json({
            code: 404,
            message: 'Poll not found'
          });
        }
        return res.status(200).json({
          message: 'Poll deleted successfully'
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
    this.createPoll();
    this.findAllPolls();
    this.findPollById();
    this.updatePoll();
    this.deletePoll();
  }
};

export default Poll;
