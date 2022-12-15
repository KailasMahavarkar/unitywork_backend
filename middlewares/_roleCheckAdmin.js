const _roleCheckAdmin = (req, res, next) => {
    const tokenData = res.locals.tokenData
    const role = tokenData.role

    if (role !== "admin") {
        return res.status(403).json({
            message: "You are not authorized to perform this action",
            status: "failed"
        })
    }

    return next()
}

module.exports = _roleCheckAdmin