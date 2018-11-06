const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
// const upload = multer({dest:"../upload/"});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('test1')
        cb(null, "images/")
    },
    filename: function (req, file, cb) {
        console.log('file:',file)
        cb(null, Date.now() + file.originalname )
    }
})
const upload = multer({ storage: storage })



router.post('/',upload.single('upload'), (req, res) => {
    console.log('업로드 체크');
    console.log('파일이름:',req.file)

    // setTimeout(() => {
    //     console.log('start');
    //     fs.unlink(`../images/${req.file.filename}`,(err) => {
    //         if(err) console.log(err)
    //         console.log('success');
    //     })
    // },1000)

    res.json({
        "uploaded": true,
        "url": `http://localhost:5000/images/${req.file.filename}`
    })
})


module.exports = router;