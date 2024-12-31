const User = require('../models/users/userModel');
const Message = require('../models/shared/messageModel')
const Conversation = require('../models/shared/conversationModel')
const Provider = require('../models/providers/providerModel');

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

exports.getAllConversations = async ({ id, role }) => {
    let condition = role === 'user' ? { userId: id } : { providerId: id }
    try {
        let conversations = await Conversation.findAll({
            where: condition,
            attributes: ['id', 'userId', 'providerId']
        })

    } catch (err) {
        console.log(err);
        return { error: 'Internal server error' };
    }
}

const getConversation = async ({ userId, providerId }) => {
    let conversation = await Conversation.findOne({
        where: {
            userId,
            providerId
        }
    })

    return conversation;
}

exports.createConversation = async ({ userId, providerId }) => {
    let conversation = await Conversation.create({
        userId: userId,
        providerId: providerId
    })

    return conversation;
}



const addMessage = async (msgObj) => {

    let msg = await Message.create(msgObj,
        { fields: ['from', 'message', 'conversationId', 'timestamp'] }
    );

    return msg;
}

exports.getMessages = async (conversationId) => {
    try {
        let messages = await Message.findAll({
            where: {
                conversationId: conversationId
            },
            order: [
                ['timestamp', 'ASC',]
            ]
        });
        return messages;
    } catch (err) {
        console.log(err);
        //return res.status(200).json({ "status": "error" });
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


exports.backupMsg = async (data) => {
    let pair = {
        userId: data.role == 'user' ? data.from : data.to,
        providerId: data.role == 'user' ? data.to : data.from
    }

    let conversation = activeConversations.find(c => c.userId == pair.userId && c.providerId == pair.providerId);

    if (!conversation) {
        let existingConversation = await getConversation(pair);
        let conversationId = existingConversation ? existingConversation.id : null;

        if (!conversationId) {
            let newConversation = await this.createConversation(pair);
            conversationId = newConversation.id;
        }

        conversation = {
            userId: pair.userId,
            providerId: pair.providerId,
            conversationId: conversationId
        }

        activeConversations.push(conversation);
    }

    let msg = {
        from: data.role,
        message: data.message,
        conversationId: conversation.conversationId,
        timestamp: data.timestamp
    }

    let res = await addMessage(msg);

    return res ? 'Message added' : 'Message not added'
}

exports.loadMsg = async ({ userId, providerId }) => {
    try {
        const conversation = await getConversation({ userId, providerId })
        if (!conversation) return;
        const messages = await this.getMessages(conversation.id);
        return { messages, room: `${conversation.userId}${conversation.providerId}-chat_${conversation.id}` };
    } catch (error) {
        console.log({ error: error.message })
        return;
    }
}

exports.updateOnlineStatus = async ({ id, role, online }) => {
    try {
        await (role === 'user' ? User : Provider).update({ online }, { where: { id } });

        return 'Online Status updated'
    } catch (error) {
        console.log({ error: error.message })
        return 'Error updating online status';
    }
}

exports.getChatHistory = async ({ id, role }) => {
    try {
        const chats = await Conversation.findAll({
            attributes: ['id', 'createdAt', 'userId', 'providerId'],
            where: {
                [role === 'user' ? 'userId' : 'providerId']: id,
            },
            include: [
                {
                    model: (role === 'user' ? Provider : User),
                    as: (role === 'user' ? 'provider' : 'user'),
                    attributes: ['id', 'firstName', 'lastName', 'email', 'online'],
                }]
        });

        return chats
        //return conversations.map(conversation => `${conversation.userId}${conversation.providerId}-chat_${conversation.id}`)
    } catch (error) {
        console.log({ error: error.message })
        return;
    }
}

