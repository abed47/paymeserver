exports.successResponse = (res, code, message, data = null) => {
    res.status(code).json({
        status: true,
        type: 'success',
        data,
        message
    })
};
exports.errorResponse = (res, code, message) => {
    res.status(code).json({
        status: false,
        type: 'error',
        data: null,
        message
    })
}