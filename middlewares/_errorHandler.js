const _errorHandler = (func) => {
	const inner = (req, res, next) => {
		try {
			func();
			return next();
		} catch (error) {
			return res.send({
				message: "error occured",
				trace: JSON.stringify(error),
			});
		}
	};
	return inner;
};

module.exports = _errorHandler;
