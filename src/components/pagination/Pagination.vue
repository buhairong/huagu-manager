<template>
    <div class="pagination-wrap" v-if="total">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            required: true,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
    },

    data() {
        return {
            currentPage: 1,
        }
    },

    methods: {
        handleCurrentChange(e) {
            this.$emit('handleCurrentChange', e)
        },
    },
}
</script>

<style lang="less" scoped>
.pagination-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>