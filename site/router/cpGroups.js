/* eslint-disable */

const group = [
    {
        categoryName: '基础组件',
        components: ['button', 'icon']
    },
    {
        categoryName: '数据输入',
        components: [
            'input',
            'textarea',
            'radio',
            'checkbox',
            'Dropdown',
            'cascader',
            'select',
            'search'
        ]
    },
    {
        categoryName: '数据展示',
        components: ['tag']
    },
    {
        categoryName: '导航组件',
        components: ['menu', 'pager']
    }
];

export function resetGroup(routerData, rootRoute) {
    return group.map(item => {
        let obj = {
            meta: {
                name: item.categoryName
            },
            children: [],
            path: '/components',
            component: rootRoute
        };
        item.components.forEach(com => {
            let element = routerData.find(route => {
                return route.path === com;
            });
            if (element) {
                obj.children.push(element);
            }
        });
        return obj;
    });
}
