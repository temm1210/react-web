const router = require('express').Router();
const Question = require('models/Question');

router.post('/:id', async (req, res) => {
    
    const {content, username } = req.body;
    const {id} = req.params;

    try {
        const question = await Question.findById({_id:id});
        question.comments.push({username:username, text:content})
        const newQuestion = await Question.create(question);

        console.log('newQuestion:',newQuestion)
        res.json({status:200, questionData:newQuestion, msg:"댓글이 작성되었습니다."})
        
    } catch (error) {
        res.json({status:500, msg:"작성에 실패하였습니다. 다시 작성해주세요."})
        throw new Error('댓글 작성 실패')
    }
})

router.get('/:id', async (req,res) => {

})

module.exports = router;