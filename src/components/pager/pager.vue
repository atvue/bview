// 分页器组件 基本交互结构、页码展示参考i-view
// 
<template>
    <ul class="nop-pager" :style="styles">
        <!-- 概览 总页数、条数 -->
        <span v-if="showTotal" class="nop-pager-detail">
            共{{ allPages }}页，{{ total }}条数据
        </span>
        <!--END 概览 总页数、条数 -->
        <!-- 页码 -->
        <!-- 上一页 -->
        <li @click="prev" :class="prevClass">
            <a>
                <Icon type="xiangzuo1" size="12"></Icon>
            </a>
        </li>
        <!--END 上一页 -->
        <!-- 第一页 -->
        <li :title="1" @click="changePage(1)" :class="firstPageClass">
            <a>1</a>
        </li>
        <!--END 第一页 -->
        <!-- 快速前进五页 -->
        <li v-if="currentPage - 3 > 1" @click="fastPrev" class="nop-pager-item nop-pager-fastprev">
            <a>
                <Icon type="more" size="12"></Icon>
            </a>
        </li>
        <!--END 快速前进五页 -->
        <!-- 当前页-2 -->
        <li :title="currentPage - 2" v-if="currentPage - 2 > 1" @click="changePage(currentPage - 2)" class="nop-pager-item">
            <a>{{ currentPage - 2 }}</a>
        </li>
        <!--END 当前页-2 -->
        <!-- 当前页-1 -->
        <li :title="currentPage - 1" v-if="currentPage - 1 > 1" @click="changePage(currentPage - 1)" class="nop-pager-item">
            <a>{{ currentPage - 1 }}</a>
        </li>
        <!--END 当前页-1 -->
        <!-- 当前页 -->
        <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages" class="nop-pager-item nop-pager-item-active">
            <a>{{ currentPage }}</a>
        </li>
        <!--END 当前页 -->
        <!-- 当前页+1 -->
        <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" @click="changePage(currentPage + 1)" class="nop-pager-item">
            <a>{{ currentPage + 1 }}</a>
        </li>
        <!--END 当前页+1 -->
        <!-- 当前页+2 -->
        <li :title="currentPage + 2" v-if="currentPage + 2 < allPages" @click="changePage(currentPage + 2)" class="nop-pager-item">
            <a>{{ currentPage + 2 }}</a>
        </li>
        <!--END 当前页+2 -->
        <!-- 快速向后五页 -->
        <li v-if="currentPage + 3 < allPages" @click="fastNext" class="nop-pager-item nop-pager-fastnext">
            <a>
                <Icon type="more" size="12"></Icon>
            </a>
        </li>
        <!--END 快速向后五页 -->
        <!-- 最后一页 -->
        <li :title="allPages" v-if="allPages > 1" :class="lastPageClass" @click="changePage(allPages)">
            <a>{{ allPages }}</a>
        </li>
        <!--END 最后一页 -->
        <!-- 下一页 -->
        <li :class="nextClass" @click="next">
            <a>
                <Icon type="xiangyou1" size="12"></Icon>
            </a>
        </li>
        <!--END 下一页 -->
        <!--END 页码 -->
        <!-- 切换pageSize-->
        <Select class="nop-pager-select" v-model="currentPageSize" @input="onSize">
            <Option v-for="size in pageSizeOpts" :key="size" :value="size">{{size}}条/页</Option>
        </Select>
        <!--END 切换pageSize-->
        <!-- 电梯-->
        <span class="nop-pager-elevator">
            跳转至
            <input type="text" class="nop-pager-input" autocomplete="off" spellcheck="false" @keyup.enter="onInputChange"> 页
        </span>
        <!--END 电梯-->
    </ul>
</template>

<script>
import Icon from '@/components/icon';
import Select, { Option } from '@/components/select';

const prefix = 'nop';

export default {
    name: 'nop-page',
    components: {
        Icon,
        Select,
        Option
    },
    props: {
        prefixCls: {
            type: String,
            default: prefix
        },
        current: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizeOpts: {
            type: Array,
            default() {
                return [15, 30, 50, 100];
            }
        },
        showTotal: {
            type: Boolean,
            default: true
        },
        showElevator: {
            type: Boolean,
            default: true
        },
        showSizer: {
            type: Boolean,
            default: true
        },
        styles: {
            type: Object
        }
    },
    data() {
        return {
            currentPage: this.current,
            currentPageSize: this.pageSize
        };
    },
    watch: {
        total(val) {
            let maxPage = Math.ceil(val / this.currentPageSize);
            if (maxPage < this.currentPage && maxPage > 0) {
                this.currentPage = maxPage;
            }
        },
        current(val) {
            // @NOTE 超过最大页数 则忽略设置
            if (val <= this.allPages) {
                this.currentPage = val;
            }
        },
        pageSize(val) {
            this.currentPageSize = val;
        }
    },
    computed: {
        // 样式相关
        // 最左侧上一页按钮
        prevClass() {
            return [
                'nop-pager-item',
                'nop-pager-pre',
                {
                    ['nop-pager-item-disabled']: this.currentPage === 1
                }
            ];
        },
        // 最右侧下一页按钮
        nextClass() {
            return [
                'nop-pager-item',
                'nop-pager-next',
                {
                    ['nop-pager-item-disabled']:
                        this.currentPage === this.allPages
                }
            ];
        },
        // 首页
        firstPageClass() {
            return [
                'nop-pager-item',
                'nop-pager-first',
                {
                    ['nop-pager-item-active']: this.currentPage === 1
                }
            ];
        },
        // 末页
        lastPageClass() {
            return [
                'nop-pager-item',
                'nop-pager-last',
                {
                    ['nop-pager-item-active']:
                        this.currentPage === this.allPages
                }
            ];
        },
        // END样式相关
        allPages() {
            const allPage = Math.ceil(this.total / this.currentPageSize);
            return allPage === 0 ? 1 : allPage;
        }
    },
    methods: {
        // 外部设置页码 用于重置
        // @NOTE 这个方法不会通知外层 页码变更
        setPage(page) {
            this.currentPage = page;
        },
        changePage(page, from = '') {
            if (this.currentPage != page) {
                this.currentPage = page;
                // @NOTE 父组件使用.sync 修饰符 可同步子组件prop状态 显式
                this.$emit('update:current', page);
                this.$emit('on-change', page);
            }
        },
        prev() {
            const current = this.currentPage;
            if (current <= 1) {
                return false;
            }
            this.changePage(current - 1);
        },
        next() {
            const current = this.currentPage;
            if (current >= this.allPages) {
                return false;
            }
            this.changePage(current + 1);
        },
        fastPrev() {
            const page = this.currentPage - 5;
            if (page > 0) {
                this.changePage(page);
            } else {
                this.changePage(1, 'size');
            }
        },
        fastNext() {
            const page = this.currentPage + 5;
            if (page > this.allPages) {
                this.changePage(this.allPages);
            } else {
                this.changePage(page);
            }
        },
        onSize(pageSize) {
            this.currentPageSize = pageSize;
            this.$emit('on-page-size-change', pageSize);
            // this.$nextTick(() => {
            this.changePage(1);
            // });
        },
        onPage(page) {
            this.changePage(page);
        },
        onInputChange(event) {
            let val = event.target.value.trim();
            let page = 0;

            if (/^[1-9][0-9]*$/.test(val + '')) {
                val = Number(val);
                if (val != this.currentPage) {
                    const allPages = this.allPages;

                    if (val > allPages) {
                        page = allPages;
                    } else {
                        page = val;
                    }
                }
            } else {
                page = 1;
            }

            if (page) {
                this.onPage(page);
                event.target.value = page;
            }
        },
        keyDown(e) {
            const key = e.keyCode;
            const condition =
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105) ||
                key === 8 ||
                key === 37 ||
                key === 39;

            if (!condition) {
                e.preventDefault();
            }
        },
        keyUp(e) {
            const key = e.keyCode;
            const val = parseInt(e.target.value);

            if (key === 38) {
                this.prev();
            } else if (key === 40) {
                this.next();
            } else if (key === 13) {
                let page = 1;

                if (val > this.allPages) {
                    page = this.allPages;
                } else if (val <= 0 || !val) {
                    page = 1;
                } else {
                    page = val;
                }

                e.target.value = page;
                this.changePage(page);
            }
        }
    }
};
</script>
