const models: any = {
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

export default models;