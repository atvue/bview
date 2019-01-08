

export default {
    watch: {
        activeIndex( val , oldVal ) {
            let changed = val !== oldVal
            if ( changed ) {
                this.scrollOptions( val ) ;
            }
        }
    } ,
    methods: {
        scrollOptions( index ){
            let { visibleOptions , __options , $refs } = this ,
                noCalc = visibleOptions === false
            if ( noCalc ) {
                return
            }
            let activeVm = __options[ index ] ,
                { selectDropdown: elSelectDropdown } = $refs ,
                { $el: elActiveOption } = activeVm ,
                rectDropdown = elSelectDropdown.getBoundingClientRect() ,
                rectActiveOption = elActiveOption.getBoundingClientRect() ,
                { top: dropdownTp , bottom: dropdownBt } = rectDropdown ,
                { top: activeOptionTp , bottom: activeOptionBt } = rectActiveOption ,
                visible = activeOptionTp >= dropdownTp && activeOptionBt <= dropdownBt ,
                inVisible = !visible
            if ( inVisible ) {
                let diff = activeOptionBt - dropdownBt
                elSelectDropdown.scrollTop = elSelectDropdown.scrollTop + diff
            }
        }
    }
}