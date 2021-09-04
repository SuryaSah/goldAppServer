const Environments = {
    local_environment : 'local',
    dev_environment : 'dev',
    prod_environment : 'prod',
    qa_environment : 'qa'
}

class Environment {
    // let environment;

    constructor(environment) {
        this.environment = environment;
    }

    getPort() {
        this.environment = process.env.environment;
        if (this.environment === Environments.prod_environment) {
            return 8081;
        } else if (this.environment === Environments.dev_environment) {
            return 8082;
        } else if (this.environment === Environments.qa_environment) {
            return 8083;
        } else {
            return process.env.PORT;
        }
    }

    getDBName() {
        if (this.environment === Environments.prod_environment) {
            return 'db_test_project_prod';
        } else if (this.environment === Environments.dev_environment) {
            return 'db_test_project_dev';
        } else if (this.environment === Environments.qa_environment) {
            return 'db_test_project_qa';
        } else {
            return 'db_test_project_local';
        }
    }
}

module.exports = new Environment(Environments.local_environment);
