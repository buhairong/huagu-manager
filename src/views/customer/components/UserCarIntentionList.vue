<template>
    <div class="wrap">
        <el-table 
          :data="userCarIntentionList"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
          max-height="350"
        >
          <el-table-column
            label="意向车系"
            prop="carType"
            align="center"
          >
          </el-table-column>

          <el-table-column
            label="查看次数"
            prop="count"
            align="center"
          >
          </el-table-column>

          <el-table-column
            label="最近查看时间"
            prop="updatedTime"
            align="center"
          >
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getUserCarIntentionList } from '@/api/clue/clue'

export default {
    props: {
        userId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            userCarIntentionList: [],
        }
    },

    mounted() {
        this.getUserCarIntentionList()
    },

    methods: {
        getUserCarIntentionList() {
            const data = {
                userId: this.userId
            }

            getUserCarIntentionList(data).then(res => {
                if (res.code === 0) {
                    this.userCarIntentionList = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>

</style>