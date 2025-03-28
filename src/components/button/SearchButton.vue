<template>
    <div class="btn"
        :style="buttonStyle"
        @click="search"
    >
        <i class="el-icon-search"></i>
        查询
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
        search() {
            this.$emit('search')
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
    background: #3446AA;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    .el-icon-search {
        margin-right: 8px;
    }
}
</style>