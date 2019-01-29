// 给组件库文档md解析的html标签增加统一clas标记，避免污染组件库样式
module.exports = function( md ) {
    md.renderer.rules.table_open = function() {
        return `<table class="bview-doc">`
    }
    // 无序列表 ul
    md.renderer.rules.bullet_list_open = function() {
        return `<ul class="bview-doc">`
    }
    // 有序列表 ol
    md.renderer.rules.ordered_list_open = function() {
        return `<ol class="bview-doc">`
    }

    return md
}
