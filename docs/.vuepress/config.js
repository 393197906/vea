module.exports = {
    title: 'vea',
    description: '前端项目所有生命周期',
    themeConfig: {
        displayAllHeaders: true, // 默认值：false
        sidebar: {
            "/guide/":[
                {
                    title:"指南",
                    children:[
                        "",
                        "config",
                        "set-config"
                    ]
                }
            ],
            "/core-lib/":[
                "",
                "vue"
            ]
        },
        nav: [
            { text: '介绍', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: '核心库', link: '/core-lib/' },
        ]
    }
};
