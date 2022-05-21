const fs = require("fs");
const SambaClient = require('samba-client');
const moment = require('moment')

const config = require("../config")

function allowedResources(type, itoken) {
  const backupResources = config.tokens.find(item => item.iToken === itoken).resources.filter(item => {return item.type === type})
  const list = new Array()
  backupResources.forEach(item => {
    list.push(item.name)
  });
  return list
}


module.exports.list = (req, res) => {
    res.json({
      message: "Available resources for backup",
      list: allowedResources('backup', req.headers.itoken).map(item => `/backup/${item}`),
    })
}

module.exports.listTarget = async (req, res) => {
    // Значение результата, по умолчанию
    const result = {
      status: false
    }

    // Проверка разрешений на использование ресурса
    if(!allowedResources('backup', req.headers.itoken).includes(req.params.target)) {
      result.message = 'Resource not allowed'
      res.status(500).json(result)
    }

    // Инициализация SMB клиента
    const client = new SambaClient(config.share)
    try {
      const listFolder = await client.list(`backups/${req.params.target}/`)
      const listFiles = listFolder.filter(item => {return item.type === 'A'})
      result.status = true
      result.list = listFiles
    } catch (err) {
      console.log(err)
    }


    res.status(result.status == true ? 201 : 500).json(result)
}

module.exports.upload = async (req, res) => {
    // Значение результата, по умолчанию
    const result = {
      status: false
    }

    // Проверка разрешений на использование ресурса
    if(!allowedResources('backup',req.headers.itoken).includes(req.params.target)) {
      result.message = 'Resource not allowed'
      res.status(500).json(result)
    }

    // Проверка файла
    const { file } = req
    if(file === undefined) {
      result.message = 'Problem with your file'
      res.status(500).json(result)
    }

    // Инициализация SMB клиента
    let client = new SambaClient(config.share)

    // Проверка существоваия Source
    const backupFolder = await client.list(`/`)
    const isBackupsExist = backupFolder.find(item => item.name === 'backups' )
    if(!isBackupsExist){
      await client.mkdir('backups')
    }
    const isTargetExist = backupFolder.find(item => item.name === req.params.target )

    // Если не существует то создать папку Target
    if(!isTargetExist){
      await client.mkdir(`backups/${req.params.target}`)
    }
    // Загрузка файла
    try {
      await client.sendFile(file.path, `backups/${req.params.target}/${moment().format('YMMDD-HHmmss')}_${file.originalname}`);
      // удалить после копирования
      await fs.promises.unlink(file.path)
      result.filename = file.originalname
      result.status = true
    } catch (err) {
      result.message = "More details about error on server console"
      console.log(err)
    }
    res.status(result.status == true ? 201 : 500).json(result)
}