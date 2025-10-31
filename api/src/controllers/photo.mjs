const Photo = class Photo {
  constructor(app, PhotoModel) {
    this.app = app;
    this.PhotoModel = PhotoModel;
  }

  createPhoto() {
    this.app.post('/photos', async (req, res) => {
      try {
        const photo = new this.PhotoModel(req.body);
        await photo.save();
        res.status(201).json(photo);
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findAllPhotos() {
    this.app.get('/photos', async (req, res) => {
      try {
        const photos = await this.PhotoModel.find();
        return res.status(200).json(photos);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  findPhotoById() {
    this.app.get('/photos/:id', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findById(req.params.id);
        if (!photo) {
          return res.status(404).json({
            code: 404,
            message: 'Photo not found'
          });
        }
        return res.status(200).json(photo);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  updatePhoto() {
    this.app.put('/photos/:id', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        if (!photo) {
          return res.status(404).json({
            code: 404,
            message: 'Photo not found'
          });
        }
        return res.status(200).json(photo);
      } catch (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }

  deletePhoto() {
    this.app.delete('/photos/:id', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findByIdAndDelete(req.params.id);
        if (!photo) {
          return res.status(404).json({
            code: 404,
            message: 'Photo not found'
          });
        }
        return res.status(200).json({
          message: 'Photo deleted successfully'
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
    this.createPhoto();
    this.findAllPhotos();
    this.findPhotoById();
    this.updatePhoto();
    this.deletePhoto();
  }
};

export default Photo;
