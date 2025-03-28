<template>
  <div>
    <div class="title">合同信息</div>

    <div class="item">
      <div class="item-title">合同编号:</div>
      <div class="item-content">{{ detail.contractLabelNum }}</div>
    </div>

    <div class="item">
      <div class="item-title">资方:</div>
      <div class="item-content">{{ detail.capital }}</div>
    </div>

    <div class="item">
      <div class="item-title">合同附件:</div>
      <div class="item-content">
        <div class="files">
            <el-image
                style="width:16px;height:16px"
                :src="require('@/assets/order/pdf-icon.png')"
            ></el-image>
            <div class="file-count">{{detail.contractList.length}}张</div>
            <div 
                class="review-btn"
                @click="onPreview"
            >
                查看
            </div>
            <el-image
                class="hideImgDiv"
                ref="preview"
                :src="detail.contractList[0]"
                :preview-src-list="detail.contractList"
            >
            </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerOrderContractInfo',

  components: {
    
  },

  props: {
    detail: {
      type: Object,
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
    onPreview() {
      this.$nextTick(() => {
          this.$refs.preview.clickHandler()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  margin: 24px 0;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #1d2129;
}

.item {
  margin-bottom: 16px;
  display: flex;
  .item-title {
    margin-right: 8px;
    height: 21px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 21px;
    color: #86909c;
    width: 130px;
    text-align: right;
  }
  .item-content {
    display: flex;
    flex-wrap: wrap;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 21px;
    color: #1d2129;
    .files {
      display: flex;
      justify-content: center;
      align-items: center;
      .file-count {
        padding-left: 8px;
        padding-right: 16px;
      }
      .review-btn {
        color: #3446AA;
        cursor: pointer;
      }
      .hideImgDiv {
        /deep/ .el-image__inner {
            display: none;
        }
      }
    }
  }
}
</style>