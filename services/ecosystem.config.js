module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: "Central",
            exec_interpreter: "~/.nvm/versions/node/v7.10.0/bin/node",
            script: "./central/index.js",
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            },
            instances: 1,
            watch: true,
            args: ["--color"],
            node_args: ["--harmony", "--inspect=10.0.0.4:9229"],
//            exec_interpreter: "babel-node"
        },

        // Second application
        {
            name: "Raneto",
            exec_interpreter: "~/.nvm/versions/node/v7.10.0/bin/node",
            script: "./raneto/gttbooster/index.js",
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            },
            instances: 2,
            exec_mode: "cluster",
            args: ["--color"]
        }
    ]
}
