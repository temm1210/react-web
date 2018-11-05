const express = require('express');
const router = express.Router();
// const fs = require('fs');
const multer = require('multer');
// const upload = multer({dest:"../upload/"});
const passport = require('passport');
const Question = require('models/Question');

require('../passport/passportJwt')(passport);

router.get('/', async (req, res) => {

    try {
        const questionList = await Question.find().sort({writeDate:-1, _id:-1});
        setTimeout(() => {
            res.json(questionList);
        }, 500)
    } catch (error) {
        res.json("question List get Error");
        throw new Error("Question List가져오기 에러");
    }
})

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const question = await Question.findById(id);
        console.log('question:',question)
    
        if(question) res.json(question)
        else res.json("해당하는 값이 없습니다")
    } catch (error) {
        console.error(error);
        throw new Error("Question값을 가져오는데 실패하였습니다")
    }
})

router.post('/', async (req, res) => {
    const question = req.body;
    
    try {
        const latestQuestion = await Question.findOne().sort({_id:-1})

        console.log('latestQuestion:',latestQuestion)
        
        //가장 최근에 저장했던 데이터 1개를가져온다음 _id에 +1해서 저장
        question._id = latestQuestion ? latestQuestion._id +1 : 1;
        console.log('question:',question)
        const newGuestion = await Question.create(question);

        console.log('newGuestion:',newGuestion)
        if(question) res.json(newGuestion)
        else res.json({errorMsg:"등록에 실패하였습니다"})
       
    } catch (error) {
        console.error(error);
        throw new Error("글 등록 실패")
    }
    // setTimeout(() => {
    //     res.json(newData);
    // }, 500)
})




module.exports = router;