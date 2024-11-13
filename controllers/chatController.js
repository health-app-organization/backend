const User = require('../models/users/userModel');
const Message = require('../models/shared/messageModel')

exports.authenticate = (id) => {
    let userExists;
    User.findByPk(id, {
        attributes: ['id', 'firstName', 'lastName', 'email']
    })
        .then((user) => {
            if (!user) {
                conso3le.log('User not found');
                userExists = false;
                return
            }

            console.log('User found');
            userExists = true;
        }).catch(err => {
            console.log(err);
        });

    return userExists;
}

exports.addMessage = async (req, res, next) => {

    console.log("request body", req.body);

    // try {
    //     let message = await Message.create(req.body);
    //     res.status(200).json({ "status": "success" });
    // } catch (err) {
    //     console.log(err);
    //     res.status(200).json({ "status": "error" });
    // }

    return res.status(200).json({ msg: req.body.msg });
}

exports.getMessages = async (req, res) => {
    try {
        let messages = await Message.findAll({
            where: {
                conversationId: req.params.conversationId
            },
            order: [
                ['timestamp', 'ASC']
            ]
        });
        return res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        return res.status(200).json({ "status": "error" });
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        let message = await Message.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({ "status": "success" });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ "status": "error" });
    }
}

exports.updateMessage = async (req, res) => {
    try {
        let message = await Message.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({ "status": "success" });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ "status": "error" });
    }
}
