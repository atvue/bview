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
            'switches',
            'search',
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
    let allComponents = routerData.map( ( { path } ) => path ) ,
        defined = [] ,
        result = group.map(item => {
            let obj = {
                meta: {
                    name: item.categoryName
                } ,
                children: [] ,
                path: '/components' ,
                component: rootRoute
            }
            item.components.forEach( com => {
                let element = routerData.find( route => route.path === com ) ,
                    has = element !== undefined
                if ( has ) {
                    defined.push( com )
                    obj.children.push( element )
                }
            } )
            return obj
        } ) ,
        a = new Set( allComponents ) ,
        b = new Set( defined ) ,
        diffSet = new Set( [ ...a ].filter( x => !b.has( x ) ) ) ,
        diffArr = Array.from( diffSet ) ,
        hasDiff = diffArr.length > 0
    if ( hasDiff ) {
        let obj = {
            meta: {
                name: '未定义'
            } ,
            children: [] ,
            path: '/components' ,
            component: rootRoute
        }
        diffArr.forEach( com => {
            let element = routerData.find( route => route.path === com ) ,
                has = element !== undefined
            if ( has ) {
                obj.children.push( element )
            }
        } )
        result.push( obj )
    }
    return result
}