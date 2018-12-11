const express = require('express');
const router = express.Router();
// const fs = require('fs');
const multer = require('multer');
// const upload = multer({dest:"../upload/"});
const passport = require('passport');
const Question = require('models/Question');

require('../passport/passportJwt')(passport);

async function getTotalCount() {
    try {
        return await Question.count({})
    } catch (error) {
        throw new Error("Question List Totla Count 에러");
    }
}

router.get('/', async (req, res) => {

    const page  = parseInt(req.query.page || 1, 10);
    const limit = parseInt(req.query.limit || 10, 10);

    try {
        const questionList = await Question.find()
            .sort({writeDate:-1, _id:-1})
            .limit(limit)
            .skip( (page -1) * 10)
            .lean()

        const totalCount = await getTotalCount();
        
        res.json({questionList, totalCount});

    } catch (error) {
        res.json("question List get Error");
        throw new Error("Question List가져오기 에러");
    }
})

router.post('/', async (req, res) => {
    const question = req.body;
    
    try {
        const latestQuestion = await Question.findOne().sort({_id:-1})

        //가장 최근에 저장했던 데이터 1개를가져온다음 _id에 +1해서 저장
        question._id = latestQuestion ? latestQuestion._id +1 : 1;
        question.boardField = "Q&A";
        const newGuestion = await Question.create(question);

        if(question) res.json(newGuestion)
        else res.json({errorMsg:"등록에 실패하였습니다"})
       
    } catch (error) {
        console.error(error);
        throw new Error("글 등록 실패")
    }
})

router.get('/totalCount', async (req,res) => {
    try {
        const totalCount = await Question.count({})
        res.json(totalCount)
    } catch (error) {
        
    }
})

router.get('/:id', async (req,res) => {
    const { id } = req.params;

    try {
        const question = await Question.findOneAndUpdate(
            {_id:id},
            {$inc:{views:1}}
        )

        console.log('question:',question)
        if(question) res.json(question)
        else res.json("해당하는 값이 없습니다")
    } catch (error) {
        console.error(error);
        throw new Error("Question값을 가져오는데 실패하였습니다")
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedData = await Question.findOneAndDelete({_id:id});
        deletedData ? 
            res.json({status:200, deletedData:deletedData, msg:"삭제에 성공하였습니다."}) :
            res.json({status:500, msg:"삭제에 실패하였습니다. 다시 시도해주세요"})
    } catch (error) {
        console.error(error);
        throw new Error('글 삭제 실패')
    }
})

router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const question = req.body;
    console.log('question:',question)

    try {
        const modifyData = await Question.findOneAndUpdate({_id:id},question);
        modifyData ?
            res.json({status:200, modifyData:modifyData, msg:"수정에 성공하였습니다."}) :
            res.json({status:500, msg:"수정에 실패하였습니다. 다시 시도해주세요"})
    } catch (error) {
        console.error(error);
        throw new Error('글 수정 실패')
    }
})

module.exports = router;