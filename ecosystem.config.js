module.exports = {
    apps: [
        {
            port: '3000',
            instances: 'max',
            name: 'Taskmaster',
            exec_mode: 'cluster',
            script: './.output/server/index.mjs'
        }
    ]
}