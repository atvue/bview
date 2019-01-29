export default {
    watch: {
        activeIndex( val , oldVal ) {
            let changed = val !== oldVal
            if ( changed ) {
                this._scrollOptions( val )
            }
        }
    } ,
    methods: {
        async _scrollOptions( index ) {
            await this.$nextTick()
            let { visibleOptions , __options , $refs } = this ,
                noCalc =
                    visibleOptions === false ||
                    __options.length === 0 ||
                    index === undefined
            if ( noCalc ) {
                return
            }
            let activeVm = __options[ index ]
            if ( activeVm === undefined ) {
                // nextTick之后，等待__options更新，理论上不会报错了
                if ( activeVm === undefined ) {
                    let txt = __options.map( ( { value } ) => value ).join( `,` )
                    // eslint-disable-next-line
                    console.warn(
                        `隐患: 当前__options项和activeIndex不匹配，__options顺序=${txt}，activeIndex=${index}`
                    )
                }
                return
            }
            let { selectDropdown: elSelectDropdown } = $refs ,
                { $el: elActiveOption } = activeVm ,
                rectDropdown = elSelectDropdown.getBoundingClientRect() ,
                rectActiveOption = elActiveOption.getBoundingClientRect() ,
                { top: dropdownTp , bottom: dropdownBt } = rectDropdown ,
                {
                    top: activeOptionTp ,
                    bottom: activeOptionBt
                } = rectActiveOption ,
                visible =
                    activeOptionTp >= dropdownTp &&
                    activeOptionBt <= dropdownBt ,
                inVisible = !visible
            if ( inVisible ) {
                let diff = activeOptionBt - dropdownBt
                elSelectDropdown.scrollTop = elSelectDropdown.scrollTop + diff
            }
        }
    }
}
