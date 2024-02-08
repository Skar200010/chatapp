const { getUserService } = require("../services/auth/user/getUser");
const {updateUserService} = require("../services/auth/user/updateUser")
const {deleteUserService} = require("../services/auth/user/deleteUser")
exports.getUsers = async (req, res, next) => {
    try {
        const data = await getUserService(req, res);
        return res.json(data);
    } catch (error) {
        console.error(error);
        if (error.status && error.error) {
            res.status(error.status).send(error.error);
            return next(error);
        }
        if (error.status) {
            res.sendStatus(error.status);
            return next(error);
        }
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return next(error);
    }
};

exports.updateUserById = async (req, res, next) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const updatedUser = await updateUserService(id, { username, email });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        if (error.status && error.error) {
            res.status(error.status).send(error.error);
            return next(error);
        }
        if (error.status) {
            res.sendStatus(error.status);
            return next(error);
        }
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return next(error);
    }
};

exports.deleteUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleteUser = await deleteUserService(id);
        res.json(deleteUser);
    } catch (error) {
        console.error(error);
        if (error.status && error.error) {
            res.status(error.status).send(error.error);
            return next(error);
        }
        if (error.status) {
            res.sendStatus(error.status);
            return next(error);
        }
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return next(error);
    }
};

