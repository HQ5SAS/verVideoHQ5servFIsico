var express = require('express');
var router = express.Router();
const fs = require('fs');
module.exports = router;

//-else------------------
router.get('/', function (req, res, next) {
  res.send("sevidor en linea")
})

router.get('/videoServer', function (req, res, next) {
  const ID_user = req.query.id;
  // const range = req.headers.range;
  // if(!range){
  //   res.status(400).send("err requiere range header")
  // }
  const videoPath='/transfdhq5/'+ID_user;
  const videoSize= fs.statSync(videoPath).size;

  const CHUNNK_SIZE= 60 ** 6;//6M 
  const start= Number(range.replace(/\D/g, ""));
  const end = Math.min(start+CHUNNK_SIZE, videoSize -1);

  const contentLength = end - start +1;
  const headers={
    "Content-Range":`bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges":"bytes",
    "Content-Length": contentLength,
    "Content-Type":"video/mp4"
  };
  res.writeHead(206, headers);
  const videoStream= fs.createReadStream(videoPath,{start, end});
  videoStream.pipe(res)

})
//-else------------------
router.get('/*', function (req, res, next) {
  res.render('404err', { title: 'error 404' })
})