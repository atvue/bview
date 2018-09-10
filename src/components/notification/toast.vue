// 全局通知提示组件
// 消息队列 最多同时显示3条
// use时将挂载唯一实例到Vue.prototype下
// 使用(组件内)：
// this.$toast.info(<提示标题|必填>,<提示描述|默认''>,<时间|默认3s>)
// 支持其他：
// this.$toast.success(...)
// this.$toast.fail(...)
// this.$toast.exception(...)
// 尽量不要直接使用 this.$toast.show(...)
<template>
  <transition :name="`${prefixCls}-moveup`">
    <div :class="`${prefixCls}`" v-if="list.length>0">
      <div :class="`${prefixCls}-wrap`">
        <div v-for="toast in list" :class="[`${prefixCls}-item`,`${prefixCls}-item-${toast.type}`]" :key="toast.id">
          <i :class="[`${prefixCls}-icon nopIcon`,`${prefixCls}-icon-${toast.type}`]"></i>
          <span :class="`${prefixCls}-tlt`">
            {{toast.title}}
          </span>
          <p :class="`${prefixCls}-des`" v-if="toast.detail!==''">{{toast.detail}}</p>
          <!-- 关闭按钮 -->
          <i :class="`${prefixCls}-icon nopIcon close`" @click="hide(toast.id)"></i>
          <!-- END 关闭按钮 -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const DefaultTime = 3000, // 默认显示时间
    DefaultType = 'info', // 默认消息类型
    DefaultMax = 3, // 可同时显示消息数最大值
    prefix = 'nop';

import Vue from 'vue';

var config = {
    name: 'nop-toast',
    props: {
        prefixCls: {
            type: String,
            default: `${prefix}-toast`
        },
        max: {
            type: Number,
            default: DefaultMax
        }
    },
    data() {
        return {
            list: [],
            counter: 0
        };
    },
    beforeDestroy() {
        // @NOTE 实例销毁前清除定时器
        this.clearAll();
    },
    created: function() {
        document.body.appendChild(this.$mount().$el);
    },
    // 对外API
    // 建议用直接封装好的info success fail等
    methods: {
        // 增加一条消息
        show(options, time) {
            // 是否达到最大可显示数量
            if (this.list.length >= this.max) {
                // 推出队列中第一条
                let e = this.list.shift();
                window.clearTimeout(e.closeTimer);
            }
            let _options = options || {};
            let _item = {
                type: _options.type || DefaultType,
                title: _options.title,
                detail: _options.detail
            };
            _item.id = this.counter++;
            _item.closeTimer = window.setTimeout(
                function() {
                    this.hide(_item.id);
                }.bind(this),
                time || DefaultTime
            );
            this.list.push(_item);
        },
        // 隐藏指定消息，倒计时结束或主动点击关闭
        hide(_id) {
            this.list.forEach((ele, index) => {
                if (ele.id == _id) {
                    window.clearTimeout(ele.closeTimer);
                    this.list.splice(index, 1);
                }
            });
        },
        // 清空消息队列
        clearAll() {
            if (this.list.length === 0) {
                return;
            }
            // 清空所有计时器
            this.list.forEach(ele => {
                window.clearTimeout(ele.closeTimer);
            });
            this.list = [];
            this.counter = 0;
        }
    }
};

const typeList = ['success', 'fail', 'exception', 'info'];

// 补充不同类型的通知API
typeList.forEach(ele => {
    config.methods[ele] = function(tlt, detail = '', time = DefaultTime) {
        this.show({ type: ele, title: tlt, detail: detail }, time);
    };
});

export default Vue.extend(config);
</script>