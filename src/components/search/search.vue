<template>
    <div :class="`${b}-search`">
        <transition name="toggle">
            <div 
                v-show="showSearch"
                :class="`search-input-wrapper`"
            >   
                <Select 
                    v-if="hasSearchOptions"
                    ref="Select"
                    :options="searchOptionsTemp"
                    :placeholder="placeholder"
                    clearable
                    has-search-options
                    label-in-value
                    show-search
                    @input="_onSelectInput"
                    @searchWordChange="_onSearchWordChange"
                    @focusSearchInput="_onFocusSearchInput"
                    @clearOptions="_onClearOptions"
                />
                <Input 
                    v-else
                    placeholder
                    clearable
                    @input="_onInput" 
                />
            </div>
        </transition>
        <Button 
            :class="`${b}-search-button`" 
            @click="_doSearch"
        >
            {{ buttonTxt }}
        </Button>
    </div>
</template>
<script>
import { debounce } from '../../utils/throttleDebounce';
import { bviewPrefix as b } from "../../utils/macro";
import Input from '../input';
import Select from './helper/searchSelect';
import Button from '../button';

export default {
    name: 'Search',
    components:{Input,Select,Button},
    props: {
        //@doc搜索框的placeholder
        placeholder: {
            type: String,
            default: "搜索"
        },
        //@doc搜索按钮文案
        buttonTxt: {
            type: String,
            default: "搜索"
        },
        //@doc搜索框宽度
        width:{
            type: String,
            default: "200px"
        },
        //@doc搜索框是否有清空按钮
        clearable:{
            type: Boolean,
            default: true
        },
        //@doc是否可以展开收缩搜索框
        toggleAble:{
            type: Boolean,
            default: true
        },
        //@doc是否支持搜索框下拉提示，可选normal,select
        type:{
            type:String,
            default:'normal'
        },
        //@doc搜索框下拉提示列表
        searchOptions:{
            type:Array,
            default () {
                return [];
            }
        },
        //@doc输入框输入事件500ms合并做一次通知，不能小于500ms
        time:{
            type:Number,
            default:2000
        }
    },
    data() {
        return {
            showSearch:false,
            needSearch:true,
            searchValue:'',
            b:b,
            searchOptionsTemp:[]
        };
    },
    watch:{
        searchValue(newValue){
            if (!newValue){
                this.searchOptionsTemp = [].concat();
            }
        },
        searchOptions(){
            this.searchOptionsTemp = this.searchOptions.concat();
        }
    },
    computed:{
        hasSearchOptions(){
            return this.type === 'normal' ? false : true;
        }
    },
    mounted(){
        this.showSearch = !this.toggleAble;
        this._initDebounce();
    },
    methods:{
        _onClearOptions(){
            this.searchOptionsTemp = [].concat();
        },
        _onSelectInput(event){
            let {label} = event;
            if (this.searchValue!=label){
                this.searchValue = label;
            }
        },
        _onInput(value){
            if (this.searchValue!=value){
                this.searchValue = value;
            }
        },
        _initDebounce(){
            let { time } = this;
            if (time){
                this.debounceValueChange = debounce(time,(value)=>{
                    this._emitValueChange(value);
                })
            }else{
                this.debounceValueChange = this._emitValueChange;
            }
        },
        _emitValueChange(value){
            // @doc 用户主动改变搜索框值，触发change事件
            this.$emit('change',value);
        },
        _onSearchWordChange(value){
            if (this.searchValue!=value){
                this.searchValue = value;
                this.debounceValueChange(value);
            }
        },
        _onFocusSearchInput(){
            if (this.searchValue){
                this.debounceValueChange(this.searchValue);
            }
        },
        _doToggle(){
            this.showSearch = !this.showSearch;
        },
        _doSearch(){
            if (this.showSearch && this.searchValue){
                // @doc 搜索框有值的情况搜索按钮被点击，触发do-search事件
                this.$emit('search',this.searchValue);
            }else if (this.toggleAble){
                this._doToggle();
            }
        },
        //@doc展开搜索框
        fold(){
            this.showSearch = true;
        },
        //@doc收起搜索框
        unfold(){
            this.showSearch = false;
        }
    }
}

</script>