const express = require('express');
const router = express.Router();
const passport = require('passport');
const Member = require('models/Member');
const jwt = require('jsonwebtoken');
const config = require('config/index');

router.post('/join',async ( req, res) => {
    const user = req.body;
    try {
        const member = await Member.create(user);
        if(member) res.json({status:200, msg:'성공'})
        else res.json({status:500, msg:'회원가입에 실패하였습니다'})
    } catch (error) {
        console.error(error)
        throw new Error("회원가입 오류발생")
    }
})

router.get('/checkuser/:username', async (req,res) => {
    const { username } = req.params;

    try {
        const member = await Member.findOne({username});
        if(member) res.json(true);
        else res.json(false)
    } catch (error) {
        console.error(error);
        throw new Error("아이디 중복체크 검사 오류발생")
    }
})

router.post('/login', async (req,res) => {
    const { username, password } = req.body;
    try {
        const member = await Member.findOne({username:username})  
        if( member) {
            member.comparePassword(password, (err, result) => {
                if(result) {
                    const token = jwt.sign({data:member.username, exp:Math.floor(Date.now()/1000) + (60 * 60 * 2)}, config.secretKey)
                    res.json({status:200,username, token:'JWT '+ token });
                } else {
                    res.json({status:500,errorMsg:'아이디 또는 비밀번호를 다시 확인하세요. 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.'}) 
                }
            })
        }
        else {
            res.json({status:500,errorMsg:'아이디 또는 비밀번호를 다시 확인하세요. 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.'}) 
        }  
    } catch (error) {
        console.error(error);
        throw new Error("로그인 오류발생")
    }
})

module.exports = router;


