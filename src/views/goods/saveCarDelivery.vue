<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >编辑交车点</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content" v-loading="syncLoading" element-loading-text="保存中">
      <div class="top">
        <div class="title">编辑交车点</div>
        <div class="wrap">
          <div class="section">
            <div class="sub-title">交车点信息</div>
            <div style="padding-left: 30px">
              <div class="address-item">
                <div class="address-item-label">交车点名称</div>
                <div class="address-item-content">
                  <el-input
                    class="wecars-input"
                    v-model="deliveryInfo.deliveryName"
                    :maxlength="50"
                    placeholder="请输入交车点名称"
                  ></el-input>
                </div>
              </div>

              <div class="address-item">
                <div class="address-item-label">交车点地址</div>
                <div class="address-item-content">
                  <el-input
                    class="wecars-input"
                    v-model="deliveryInfo.deliveryAddress"
                    :maxlength="100"
                    placeholder="请输入交车点详细地址"
                  ></el-input>
                </div>
              </div>

              <div class="address-item">
                <div class="address-item-label">交车点图片</div>
                <div class="address-item-content">
                  <el-upload
                    :action="UPLOAD_URL"
                    :show-file-list="false"
                    :accept="IMG_ACCEPT"
                    :before-upload="beforeImgUpload"
                    :on-success="handleSuccess"
                  >
                    <img
                      v-if="deliveryInfo.deliveryPictureUrl"
                      :src="deliveryInfo.deliveryPictureUrl"
                    />
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>

          <div class="section" v-if="type === 'edit'">
            <div class="sub-title">交车人员信息</div>
            <div class="add-btn-wrap">
              <div class="add-btn" @click="openPersonDialog('add')">
                添加交车人员
              </div>
            </div>

            <el-table :data="deliveryInfo.personList">
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column label="角色" width="120">
                <template slot-scope="scope">
                  <div>交车人员</div>
                </template>
              </el-table-column>
              <el-table-column prop="mobile" label="手机号码" width="100">
              </el-table-column>
              <el-table-column prop="status" label="状态" width="80">
                <template slot-scope="scope">
                  <div>{{ scope.row.status === 1 ? "在职" : "离职" }}</div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <div
                    class="table-btn"
                    @click="openPersonDialog('edit', scope.row)"
                  >
                    编辑
                  </div>
                  <div class="table-btn" @click="delPerson(scope.row)">
                    删除
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="btn-wrap">
        <div class="btn" @click="back">返回</div>
        <div class="btn save-btn" @click="save">保存</div>
      </div>
    </div>

    <el-dialog
      :title="dialogType === 'add' ? '添加人员' : '编辑人员'"
      :visible.sync="showDialog"
      width="480px"
    >
      <div class="address-item">
        <div class="address-item-label">姓名：</div>
        <div class="address-item-content">
          <el-input
            class="wecars-input"
            v-model="curPerson.name"
            :maxlength="10"
            placeholder="请输入姓名"
          ></el-input>
        </div>
      </div>

      <div class="address-item">
        <div class="address-item-label">电话：</div>
        <div class="address-item-content">
          <el-input
            class="wecars-input"
            v-model="curPerson.mobile"
            :maxlength="11"
            placeholder="请输入电话"
            :disabled="dialogType === 'edit'"
          ></el-input>
        </div>
      </div>

      <div class="address-item">
        <div class="address-item-label">状态：</div>
        <div class="address-item-content">
          <c-select
            :selectValue.sync="curPerson.status"
            :options="[
              { label: '在职', value: 1 },
              { label: '离职', value: 0 },
            ]"
            :showAllValue="false"
          />
        </div>
      </div>

      <div class="address-item">
        <div class="address-item-label">角色：</div>
        <div class="address-item-content" style="line-height: 32px">
          交车人员
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <div class="btn" @click="handleCloseDialog">取消</div>
          <div class="btn save-btn" @click="savePerson">保存</div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectSingleCarDeliveryAddressDetail,
  insertOrUpdateCarDeliveryAddressDetail,
  deleteCarDeliveryUserInfo,
  addCarDeliveryUserInfo,
  updateCarDeliveryUserInfo,
} from "@/api/goods/goods";
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from "@/utils/constant";
import { validPhoneNum } from "@/utils/util";
import axios from "axios";

const initPerson = {
  name: "",
  mobile: "",
  status: 1,
};

export default {
  name: "saveCarDelivery",

  data() {
    return {
      syncLoading: false,
      brandId: null,
      type: "",
      activeCityId: "",
      addressId: null,
      deliveryInfo: {
        id: null,
        deliveryName: "",
        deliveryAddress: "",
        deliveryPictureUrl: "",
        lat: "",
        longitude: "",
        personList: [],
      },
      UPLOAD_URL,
      IMG_ACCEPT,
      geocoder: null,
      dialogType: "",
      showDialog: false,
      curPerson: { ...initPerson },
    };
  },

  mounted() {
    //this.geocoder = new qq.maps.Geocoder()

    this.brandId = this.$route.query.brandId;
    this.type = this.$route.query.type;
    this.activeCityId = this.$route.query.activeCityId;
    this.addressId = this.$route.query.addressId;

    if (this.type === "edit") {
      this.selectSingleCarDeliveryAddressDetail();
    }
  },

  methods: {
    selectSingleCarDeliveryAddressDetail() {
      const data = {
        carDeliveryAddressId: this.addressId,
      };

      selectSingleCarDeliveryAddressDetail(data).then((res) => {
        if (res.code == 0) {
          this.deliveryInfo = res.data;
        }
      });
    },

    beforeImgUpload(file) {
      const size = file.size / 1024 / 1024;

      if (size > IMG_LIMIT_SIZE) {
        this.$message.error(`上传图片大小不能超过${IMG_LIMIT_SIZE}MB!`);
        return false;
      }

      return true;
    },

    handleSuccess(res, file) {
      if (res.code == 0) {
        this.deliveryInfo.deliveryPictureUrl = res.data.src;
      }
    },

    back() {
      this.$router.back();
    },

    openPersonDialog(type, item = {}) {
      if (type === "edit") {
        this.curPerson = item;
      }

      this.dialogType = type;
      this.showDialog = true;
    },

    handleCloseDialog() {
      this.showDialog = false;
    },

    savePerson() {
      if (!this.curPerson.name.trim()) {
        this.$message.error("请输入姓名");
        return;
      }

      if (!this.curPerson.mobile.trim()) {
        this.$message.error("请输入电话");
        return;
      }

      if (!validPhoneNum(this.curPerson.mobile.trim())) {
        this.$message.error("请输入正确的电话号码");
        return;
      }

      if (!this.curPerson.status && this.curPerson.status != 0) {
        this.$message.error("请选择状态");
        return;
      }

      if (this.dialogType === "add") {
        this.addCarDeliveryUserInfo();
      } else {
        this.updateCarDeliveryUserInfo();
      }
    },

    addCarDeliveryUserInfo() {
      const data = {
        addressId: this.addressId,
        ...this.curPerson,
      };

      this.syncLoading = true;

      addCarDeliveryUserInfo(data)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.handleCloseDialog();
            this.curPerson = { ...initPerson };
            this.selectSingleCarDeliveryAddressDetail();
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

    updateCarDeliveryUserInfo() {
      const data = {
        addressId: this.addressId,
        ...this.curPerson,
      };

      this.syncLoading = true;

      updateCarDeliveryUserInfo(data)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.handleCloseDialog();
            this.curPerson = { ...initPerson };
            this.selectSingleCarDeliveryAddressDetail();
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

    delPerson(item) {
      this.$confirm("确定要删除这个交车人员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          deliveryUserId: item.id,
        };

        this.syncLoading = true;

        deleteCarDeliveryUserInfo(data)
          .then((res) => {
            if (res.code == 0) {
              this.$message.success("删除成功");
              this.selectSingleCarDeliveryAddressDetail();
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

    async save() {
      if (!this.deliveryInfo.deliveryName.trim()) {
        this.$message.error("请输入交车点名称");
        return;
      }

      if (!this.deliveryInfo.deliveryAddress.trim()) {
        this.$message.error("请输入交车点详细地址");
        return;
      }

      if (!this.deliveryInfo.deliveryPictureUrl) {
        this.$message.error("请上传交车点图片");
        return;
      }

      this.syncLoading = true;

      // const res = await this.getLocation(this.deliveryInfo.deliveryAddress.trim())
      // const location = res.detail.location
      // const lat = location.lat
      // this.deliveryInfo.lat = location.lat
      // this.deliveryInfo.longitude = location.lng

      let data = {
        brandId: this.brandId,
        cityId: this.activeCityId,
        ...this.deliveryInfo,
      };

      insertOrUpdateCarDeliveryAddressDetail(data)
        .then((res) => {
          if (res.code == 0) {
            this.addressId = res.data;
            this.type = "edit";
            this.$message.success("保存成功");
            this.selectSingleCarDeliveryAddressDetail();
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

    getLocation(address) {
      return new Promise((resovle, reject) => {
        //对指定地址进行解析
        this.geocoder.getLocation(address);

        //设置服务请求成功的回调函数
        this.geocoder.setComplete((res) => {
          console.log(address + "成功回调数据", res);
          resovle(res);
        });

        //若服务请求失败，则运行以下函数
        this.geocoder.setError((err) => {
          console.log(address + "地址输入错误", err);
          reject("地址输入错误");
        });
      });
    },

    searchAddressList(keyword = "上海徐汇区绿地") {
      this.activeCityName = "上海";
      const params = {
        key: "4ZOBZ-FFK3V-HUJPK-UXDPA-FR7JS-YVFJG",
        keyword: keyword,
        region: this.activeCityName,
      };

      axios({
        method: "GET",
        url: "https://apis.map.qq.com/ws/place/v1/suggestion",
        dataType: "json",
        params,
      }).then((res) => {});
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

.title {
  height: 36px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 36px;
  color: rgba(0, 0, 0, 0.9);
}
.wrap {
  .section {
    margin-top: 60px;
    padding: 0 200px;
    .sub-title {
      margin-bottom: 20px;
      height: 22px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      line-height: 22px;
      color: #1d2129;
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
  }
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
  .save-btn {
    margin-left: 30px;
    background: #3446aa;
    color: #ffffff;
  }
}

.dialog-btn-wrap {
  display: flex;
  justify-content: flex-end;
  .btn {
    width: 91px;
    height: 32px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f3f5;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #1d2129;
    z-index: 0;
    cursor: default;
  }
  .save-btn {
    margin-left: 8px;
    background: #3446aa;
    color: #ffffff;
  }
}
</style>
