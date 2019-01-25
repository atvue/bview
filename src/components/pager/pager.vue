// 分页器组件
<template>
    <ul :class="wrapperClass">
        <!-- 简洁版 -->
        <template v-if="simple">
            <li
                :class="prevClass"
                @click="$_prev"
            >
                <a>
                    <Icon :svg="left" />
                </a>
            </li>
            <li :class="`${prefixCls}-item simple`">
                <input
                    type="text"
                    :class="`${prefixCls}-input`"
                    autocomplete="off"
                    spellcheck="false"
                    :value="currentPage"
                    @keyup.enter="$_onInputChange"
                    @blur="$_onInputChange"
                >
            </li>
            <li :class="`${prefixCls}-item simple`">
                /
            </li>
            <li :class="`${prefixCls}-item simple`">
                {{ allPages }}
            </li>
            <li
                :class="nextClass"
                @click="$_next"
            >
                <a>
                    <Icon :svg="right" />
                </a>
            </li>
        </template>
        <!-- END 简洁版 -->
        <!-- 常规 -->
        <template v-else>
            <!-- 概览 总页数、条数 -->
            <span
                v-if="showTotal"
                :class="`${prefixCls}-detail`"
            >
                共{{ allPages }}页，{{ total }}条数据
            </span>
            <!--END 概览 总页数、条数 -->
            <!-- 上一页 -->
            <li
                :class="prevClass"
                @click="$_prev"
            >
                <a>
                    <Icon :svg="left" />
                </a>
            </li>
            <!--END 上一页 -->
            <!-- 第一页 -->
            <li
                :title="1"
                :class="firstPageClass"
                @click="$_changePage(1)"
            >
                <a>1</a>
            </li>
            <!--END 第一页 -->
            <!-- 快速前进五页 -->
            <li
                v-if="currentPage - limitPage > 1"
                :class="`${prefixCls}-item ${prefixCls}-fastprev`"
                @click="$_fastPrev"
            >
                <a>
                    <Icon :svg="more" />
                </a>
            </li>
            <!--END 快速前进五页 -->
            <!-- 当前页 前limitPage页 -->
            <template v-for="n in limitPage">
                <li
                    v-if="currentPage - (limitPage - (n - 1)) > 1"
                    :key="currentPage - (limitPage - (n - 1))"
                    :title="currentPage - (limitPage - (n - 1))"
                    :class="`${prefixCls}-item ${prefixCls}-num`"
                    @click="$_changePage(currentPage - (limitPage - (n - 1)))"
                >
                    <a>{{ currentPage - (limitPage - (n - 1)) }}</a>
                </li>
            </template>
            <!-- 当前页 前limitPage页 -->
            <!-- 当前页 -->
            <li
                v-if="currentPage != 1 && currentPage != allPages"
                :title="currentPage"
                :class="
                    `${prefixCls}-item ${prefixCls}-num ${prefixCls}-item-active`
                "
            >
                <a>{{ currentPage }}</a>
            </li>
            <!--END 当前页 -->
            <!-- 当前页 后limitPage页 -->
            <template v-for="n in limitPage">
                <li
                    v-if="currentPage + n < allPages"
                    :key="currentPage + n"
                    :title="currentPage + n"
                    :class="`${prefixCls}-item ${prefixCls}-num`"
                    @click="$_changePage(currentPage + n)"
                >
                    <a>{{ currentPage + n }}</a>
                </li>
            </template>
            <!-- END 当前页 后limitPage页 -->
            <!-- 快速向后五页 -->
            <li
                v-if="currentPage + limitPage + 1 < allPages"
                :class="`${prefixCls}-item ${prefixCls}-fastnext`"
                @click="$_fastNext"
            >
                <a>
                    <Icon :svg="more" />
                </a>
            </li>
            <!--END 快速向后五页 -->
            <!-- 最后一页 -->
            <li
                v-if="allPages > 1"
                :title="allPages"
                :class="lastPageClass"
                @click="$_changePage(allPages)"
            >
                <a>{{ allPages }}</a>
            </li>
            <!--END 最后一页 -->
            <!-- 下一页 -->
            <li
                :class="nextClass"
                @click="$_next"
            >
                <a>
                    <Icon :svg="right" />
                </a>
            </li>
            <!--END 下一页 -->
            <!-- 切换pageSize-->
            <Select
                v-if="showSizer"
                v-model="currentPageSize"
                :class="`${prefixCls}-select`"
                @input="$_onSize"
            >
                <Option
                    v-for="size in pageSizeOpts"
                    :key="size"
                    :value="size"
                >
                    {{ size }}条/页
                </Option>
            </Select>
            <!--END 切换pageSize-->
            <!-- 电梯-->
            <span
                v-if="showElevator"
                :class="`${prefixCls}-elevator`"
            >
                跳转至
                <input
                    type="text"
                    :class="`${prefixCls}-input`"
                    autocomplete="off"
                    spellcheck="false"
                    @keyup.enter="$_onInputChange"
                    @blur="$_onInputChange"
                >页
            </span>
            <!--END 电梯-->
        </template>
        <!-- END 常规 -->
    </ul>
</template>

<script>
import { bviewPrefix as b } from '../../utils/macro';

import Icon from '../icon';
import more from '../../icons/more';
import left from '../../icons/left_arrow';
import right from '../../icons/right_arrow';

import Select from '../select';
const { Option } = Select;

export default {
    name: `Pager` ,
    components: {
        Icon ,
        Select ,
        Option
    } ,
    props: {
        // @doc 页码，支持使用.sync修饰符
        current: {
            type: Number ,
            default: 1
        } ,
        // @doc 总页数
        total: {
            type: Number ,
            default: 0
        } ,
        // @doc 分页大小
        pageSize: {
            type: Number ,
            default: 15
        } ,
        // @doc 可配置分页切换下拉选框
        pageSizeOpts: {
            type: Array ,
            default() {
                return [ 15 , 30 , 50 , 100 ];
            }
        } ,
        // @doc 是否显示总数文案
        showTotal: {
            type: Boolean ,
            default: true
        } ,
        // @doc 是否显示快捷跳转
        showElevator: {
            type: Boolean ,
            default: true
        } ,
        // @doc 是否显示分页切换
        showSizer: {
            type: Boolean ,
            default: true
        } ,
        // @doc 配置当前页前后展示的快捷页码数量
        limitPage: {
            type: Number ,
            default: 4
        } ,
        // @doc 简洁模式，配置为true，showTotal、showElevator、showSizer将失效
        simple: {
            type: Boolean ,
            default: false
        }
    } ,
    data() {
        return {
            currentPage: this.current ,
            currentPageSize: this.pageSize ,
            prefixCls: `${b}-pager` ,
            more ,
            left ,
            right
        };
    } ,
    computed: {
        // 样式相关
        wrapperClass() {
            let { simple , prefixCls } = this;
            return [
                prefixCls ,
                {
                    [ `simple` ]: simple
                }
            ];
        } ,
        // 最左侧上一页按钮
        prevClass() {
            let { simple , currentPage , prefixCls } = this;
            return [
                `${prefixCls}-item` ,
                `${prefixCls}-pre` ,
                {
                    [ `${prefixCls}-item-disabled` ]: currentPage === 1 ,
                    [ `simple` ]: simple
                }
            ];
        } ,
        // 最右侧下一页按钮
        nextClass() {
            let { allPages , simple , currentPage , prefixCls } = this;
            return [
                `${prefixCls}-item` ,
                `${prefixCls}-next` ,
                {
                    [ `${prefixCls}-item-disabled` ]: currentPage === allPages ,
                    [ `simple` ]: simple
                }
            ];
        } ,
        // 首页
        firstPageClass() {
            let { prefixCls } = this;
            return [
                `${prefixCls}-item` ,
                `${prefixCls}-first` ,
                `${prefixCls}-num` ,
                {
                    [ `${prefixCls}-item-active` ]: this.currentPage === 1
                }
            ];
        } ,
        // 末页
        lastPageClass() {
            let { prefixCls } = this;
            return [
                `${prefixCls}-item` ,
                `${prefixCls}-last` ,
                `${prefixCls}-num` ,
                {
                    [ `${prefixCls}-item-active` ]:
                        this.currentPage === this.allPages
                }
            ];
        } ,
        // END样式相关
        // 总页数
        allPages() {
            const allPage = Math.ceil( this.total / this.currentPageSize );
            return allPage === 0 ? 1 : allPage;
        }
    } ,
    watch: {
        total( val ) {
            let maxPage = Math.ceil( val / this.currentPageSize );
            if ( maxPage < this.currentPage && maxPage > 0 ) {
                this.currentPage = maxPage;
            }
        } ,
        current( val ) {
            // @NOTE 超过最大页数 则忽略设置
            if ( val <= this.allPages ) {
                this.currentPage = val;
            }
        } ,
        pageSize( val ) {
            this.currentPageSize = val;
        }
    } ,
    methods: {
        $_changePage( page ) {
            if ( this.currentPage != page ) {
                this.currentPage = page;
                // @NOTE 父组件使用.sync 修饰符 可同步子组件prop状态 显式
                // -@doc 父组件使用.sync 修饰符 可同步pager组件current
                this.$emit( `update:current` , page );
                // @doc 页码变化，当切换pageSize触发页码回归1时不会触发
                this.$emit( `page-change` , page );
            }
        } ,
        $_prev() {
            const current = this.currentPage;
            if ( current <= 1 ) {
                return false;
            }
            this.$_changePage( current - 1 );
        } ,
        $_next() {
            const current = this.currentPage;
            if ( current >= this.allPages ) {
                return false;
            }
            this.$_changePage( current + 1 );
        } ,
        $_fastPrev() {
            const page = this.currentPage - 5;
            if ( page > 0 ) {
                this.$_changePage( page );
            } else {
                this.$_changePage( 1 , `size` );
            }
        } ,
        $_fastNext() {
            const page = this.currentPage + 5;
            if ( page > this.allPages ) {
                this.$_changePage( this.allPages );
            } else {
                this.$_changePage( page );
            }
        } ,
        $_onSize( pageSize ) {
            this.currentPageSize = pageSize;
            // @doc 分页大小变化
            this.$emit( `page-size-change` , pageSize );

            this.currentPage = 1;
            // -@doc 父组件使用.sync 修饰符 可同步pager组件current
            this.$emit( `update:current` , 1 );
        } ,
        $_onInputChange( event ) {
            let val = event.target.value.trim();
            let page = 0;

            if ( /^[1-9][0-9]*$/.test( val + `` ) ) {
                val = Number( val );
                if ( val != this.currentPage ) {
                    const allPages = this.allPages;

                    if ( val > allPages ) {
                        page = allPages;
                    } else {
                        page = val;
                    }
                }
            } else {
                page = 1;
            }

            if ( page ) {
                this.$_changePage( page );
                event.target.value = page;
            }
        }
    }
};
</script>
