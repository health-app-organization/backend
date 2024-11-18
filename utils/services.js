const paginate = (page = 1, count = 10) => {
    let pageModel = { offset: (page - 1) * count, limit: Number(count) }

    return pageModel
}

const getFields = (fields) => {
    return fields.split(',')
}

module.exports = { paginate, getFields }