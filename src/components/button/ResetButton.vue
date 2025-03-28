<template>
    <div class="btn"
        :style="buttonStyle"
        @click="handlerClick"
    >
        <i class="el-icon-refresh-right"></i>
        重置
    </div>
</template>

<script>
export default {
    props: {
        buttonStyle: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        handlerClick() {
            this.$emit('reset')
        }
    },
}
</script>

<style lang="less" scoped>
.btn {
    width: 84px;
    height: 32px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    background: #F2F3F5;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #1D2129;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    .el-icon-refresh-right {
        margin-right: 8px;
    }
}
</style>