const PaginationConfig = require('../config/PaginationConfig');

const paginationHelper = (paginationData) => {
	paginationData.page = parseInt(paginationData.page);
	paginationData.limit = parseInt(paginationData.limit);

	const page = paginationData.page || PaginationConfig.defaultPage;
	const limit = paginationData.limit || PaginationConfig.defaultLimit;

	return {
		offset: (page - 1) * limit,
		limit,
	};
};

module.exports = paginationHelper;
