const models = {
    adminsModel: require('./admins'),
    tenantsModel: require('./tenants'),
    paymentsModel: require('./payments'),
    subscriptionsModel: require('./subscriptions'),
    cancelationsModel: require('./cancelations'),
    templatesModel: require('./templates'),
    usersModel: require('./users'),
    prospectsModel: require('./prospects'),
    reviewsModel: require('./reviews'),
    storageModel: require('./storage')
}

module.exports = models