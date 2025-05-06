<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >设置交车点</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content" v-loading="syncLoading" element-loading-text="保存中">
      <div class="top">
        <div class="title">设置交车点</div>
        <div class="wrap">
          <div class="city-list">
            <div v-for="item in list" :key="item.cityId" class="city-wrap">
              <div
                class="city"
                :class="{ 'active-city': activeCityId === item.cityId }"
                @click="changeCity(item.cityId, item.cityName)"
              >
                {{ item.cityName }}( {{ item.deliveryAddressCourt }} )
              </div>
            </div>
          </div>
          <div class="address-list">
            <div class="add-btn-wrap">
              <div class="add-btn" @click="goSaveCarDeliveryPage('add')">
                添加交车点
              </div>
            </div>
            <div style="height: calc(100% - 50px)" ref="tableWrap">
              <el-table
                :data="currentCityAddressList"
                style="width: 100%"
                max-height="calc(100% - 100px)"
              >
                <el-table-column type="index" label="编号" width="120">
                </el-table-column>
                <el-table-column prop="deliveryName" label="交车点名称">
                </el-table-column>
                <el-table-column prop="deliveryAddress" label="交车点地址">
                </el-table-column>
                <el-table-column label="交车点图片" width="120">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px"
                      :src="scope.row.deliveryPictureUrl"
                      :preview-src-list="[scope.row.deliveryPictureUrl]"
                    ></el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="交车点状态" width="120">
                  <template slot-scope="scope">
                    <div>{{ scope.row.status === 1 ? "启用" : "停用" }}</div>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <div
                      class="table-btn"
                      @click="goSaveCarDeliveryPage('edit', scope.row)"
                    >
                      编辑
                    </div>
                    <div class="table-btn" @click="changeStatus(scope.row)">
                      {{ scope.row.status === 1 ? "停用" : "启用" }}
                    </div>
                    <div class="table-btn" @click="delAddress(scope.row)">
                      删除
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-wrap">
        <div class="btn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  selectCarDeliveryAddressDetail,
  insertOrUpdateCarDeliveryAddressDetail,
  deleteCarDeliveryAddressDetail,
} from "@/api/goods/goods";

export default {
  name: "setCarDeliveryAddress",

  data() {
    return {
      brandId: null,
      list: [],
      activeCityId: null,
      activeCityName: "",
      currentCityAddressList: [],
      syncLoading: false,
      tableHeight: 0,
    };
  },

  mounted() {
    this.brandId = this.$route.query.brandId;
    this.selectCarDeliveryAddressDetail();
    setTimeout(() => {
      this.tableHeight = this.$refs.tableWrap.offsetHeight;
    }, 500);
  },

  activated() {
    this.brandId = this.$route.query.brandId;
    this.selectCarDeliveryAddressDetail();
    setTimeout(() => {
      this.tableHeight = this.$refs.tableWrap.offsetHeight;
    }, 500);
  },

  methods: {
    selectCarDeliveryAddressDetail() {
      let data = {
        brandId: this.brandId,
      };

      selectCarDeliveryAddressDetail(data).then((res) => {
        if (res.code == 0) {
          this.list = res.data;
          if (this.activeCityId) {
            this.changeCity(this.activeCityId, this.activeCityName);
          } else {
            this.activeCityId = this.list[0].cityId;
            this.activeCityName = this.list[0].cityName;
            this.currentCityAddressList = this.list[0].deliveryAddressList;
            console.log(
              "selectCarDeliveryAddressDetail",
              this.currentCityAddressList
            );
          }
        }
      });
    },

    changeCity(cityId, cityName) {
      this.activeCityId = cityId;
      this.activeCityName = cityName;
      const changeCity = this.list.find((item) => item.cityId == cityId);
      this.currentCityAddressList = changeCity.deliveryAddressList;
      console.log("changeCity", this.currentCityAddressList);
    },

    changeStatus(item) {
      const data = {
        id: item.id,
        openStatus: (item.status = item.status == 1 ? 0 : 1),
      };

      this.syncLoading = true;

      deleteCarDeliveryAddressDetail(data)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.selectCarDeliveryAddressDetail();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        })
        .finally(() => {
          this.syncLoading = false;
        });
    },

    delAddress(item) {
      this.$confirm("确定要删除这个交车点吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id: item.id,
          deleteStatus: 0,
        };

        this.syncLoading = true;

        deleteCarDeliveryAddressDetail(data)
          .then((res) => {
            if (res.code == 0) {
              this.$message.success("删除成功");
              this.selectCarDeliveryAddressDetail();
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((err) => {
            this.$message.error("删除失败");
          })
          .finally(() => {
            this.syncLoading = false;
          });
      });
    },

    save() {
      let data = {
        brandId: this.brandId,
        data: this.list,
      };

      this.syncLoading = true;

      insertOrUpdateCarDeliveryAddressDetail(data)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.selectCarDeliveryAddressDetail();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        })
        .finally(() => {
          this.syncLoading = false;
        });
    },

    back() {
      this.$router.back();
    },

    goSaveCarDeliveryPage(type, item = {}) {
      let addressId = "";

      if (item.id) {
        addressId = item.id;
      }

      this.$router.push({
        path: "/goods/saveCarDelivery",
        query: {
          type,
          brandId: this.brandId,
          activeCityId: this.activeCityId,
          addressId,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top {
  height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  height: 36px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 36px;
  color: rgba(0, 0, 0, 0.9);
}
.wrap {
  height: 0;
  flex: 1;
  display: flex;
  .city-list {
    padding: 40px 0;
    width: 280px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    .city-wrap {
      margin-bottom: 20px;
    }
    .city {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: 0 16px;
      background: #ffffff;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #4e5969;
      z-index: 0;
      cursor: default;
    }
    .active-city {
      background: #f2f3f8;
      color: #3446aa;
    }
  }
  .address-list {
    flex: 1;
    padding-right: 40px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .address-info {
      margin-top: 60px;
      width: auto;
      .address-title {
        height: 22px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        line-height: 22px;
        color: #1d2129;
        padding-left: 170px;
      }
      .address-item {
        margin-top: 16px;
        display: flex;
        .address-item-label {
          width: 70px;
          margin-right: 30px;
          height: 32px;
          line-height: 32px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #1d2129;
          text-align: right;
        }
      }
    }
  }
}
.btn-wrap {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  .btn {
    width: 110px;
    height: 40px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f3f5;
    font-family: PingFangSC-Regular;
    font-size: 17px;
    color: #1d2129;
    z-index: 0;
    cursor: default;
  }
}

.add-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  .add-btn {
    width: 102px;
    height: 32px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0592e;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
