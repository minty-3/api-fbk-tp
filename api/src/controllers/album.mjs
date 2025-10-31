const Album = class Album {
  constructor(app, AlbumModel) {
    this.app = app;
    this.AlbumModel = AlbumModel;
  }

  createAlbum() {
    this.app.post('/albums', async (req, res) => {
      try {
        const album = new this.AlbumModel(req.body);
        await album.save();
        res.status(201).json(album);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllAlbums() {
    this.app.get('/albums', async (req, res) => {
      try {
        const albums = await this.AlbumModel.find();
        res.status(200).json(albums);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAlbumById() {
    this.app.get('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.id);
        if (!album) {
          return res.status(404).json({
            code: 404,
            message: 'Album not found'
          });
        }
        return res.status(200).json(album);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updateAlbum() {
    this.app.put('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!album) {
          return res.status(404).json({
            code: 404,
            message: 'Album not found'
          });
        }
        return res.status(200).json(album);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deleteAlbum() {
    this.app.delete('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findByIdAndDelete(req.params.id);
        if (!album) {
          return res.status(404).json({
            code: 404,
            message: 'Album not found'
          });
        }
        return res.status(200).json({
          message: 'Album deleted successfully'
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
    this.createAlbum();
    this.findAllAlbums();
    this.findAlbumById();
    this.updateAlbum();
    this.deleteAlbum();
  }
};

export default Album;
