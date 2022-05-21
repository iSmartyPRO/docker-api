const express = require("express")
const os = require("os")
const multer = require("multer")
const router = express.Router()
const controllerIndex = require("../controllers/index")
const controllerBackup = require("../controllers/backup")
const iToken = require("../helpers/iToken")
//const upload = multer({dest: os.tmpdir() });
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir())
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
 }
);

// корневой маршрут
router.get('/', controllerIndex.index)

// маршрут резервного копирования
router.get('/backup/', iToken.checkAuth, controllerBackup.list)
router.get('/backup/:target', iToken.checkAuth, controllerBackup.listTarget)
router.post('/backup/:target', iToken.checkAuth, multer({storage:storageConfig}).single('file'), controllerBackup.upload)

module.exports = router