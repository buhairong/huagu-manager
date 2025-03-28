<template>
    <div class="wrap">
        <div class="title">订单历史</div>
        <div class="container">
            <el-timeline>
                <el-timeline-item
                    v-for="(activity, index) in detail"
                    :key="index"
                    :timestamp="activity.time"
                >
                    {{activity.content}}
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            
        }
    },

    mounted() {
        
    },

    methods: {
        
    },
}
</script>

<style lang="less" scoped>
.wrap {
    padding-left: 300px;
    .title {
        margin: 24px 0;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        line-height: 22px;
        color: #1D2129;
    }
    .container {
        padding-left: 50px;
    }
}
</style>