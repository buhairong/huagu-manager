<template>
  <div>
    <el-breadcrumb class="navigation" separator="/">
      <el-breadcrumb-item>订单</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        ><a href="#/order/orderManagement">订单管理</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="订单信息" name="0">
          <div class="order-no">订单编号：{{orderNum}}</div>
          <div class="order-banner">
            <div class="title">订阅方案详情</div>
            <div class="banner-box">
              <el-row>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="方案名称:">
                      <div>{{orderInfo.productSchemeName}}</div>
                    </el-form-item>
                    <el-form-item label="选择订阅周期:">
                      <div>{{ orderInfo.monthTotal }}期</div>
                    </el-form-item>
                    <el-form-item label="金融方:">
                      <div>{{orderInfo.financialCompanyName}}</div>
                    </el-form-item>
                    <el-form-item label="保证金:">
                      <div>{{orderInfo.deposit}}元</div>
                    </el-form-item>
                    <el-form-item label="订阅费用:">
                      <div>{{orderInfo.monthPayment}}元/月</div>
                    </el-form-item>
                    <el-form-item label="用户限定里程:">
                      <div>{{orderInfo.limitMileage}}公里</div>
                    </el-form-item>
                    <el-form-item label="用户超出里程:">
                      <div>{{orderInfo.overMileageFee}}元/公里</div>
                    </el-form-item>
                    <el-form-item label="保障服务:">
                      <span>{{orderInfo.safeguardServices[0]==0?'24小时救援':'送车上门'}}</span>&nbsp;
                      <span>{{orderInfo.safeguardServices[1]==1&&'送车上门'}}</span>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="120px">
                    <el-form-item label="订单状态:">
                      <div v-if="orderInfo.status == '0'">待支付订金</div>
                      <div v-if="orderInfo.status == '1'">待签约</div>
                      <div v-if="orderInfo.status == '2'">待支付押金</div>
                      <div v-if="orderInfo.status == '3'">采购中</div>
                      <div v-if="orderInfo.status == '4'">待支付合约</div>
                      <div v-if="orderInfo.status == '5'">待交车</div>
                      <div v-if="orderInfo.status == '6'">用车中</div>
                      <div v-if="orderInfo.status == '7'">合约结束</div>
                    </el-form-item>
                    <el-form-item label="期末选择:">
                      <div>{{ orderInfo.canBuyouts == "1" ? "可买断" : "不可买断" }}</div>
                    </el-form-item>
                    <el-form-item label="尾款金额:">
                      <div>{{orderInfo.buyoutsFee}}元</div>
                    </el-form-item>
                    <el-form-item label="提车方式:">
                      <div>{{orderInfo.deliveryWay == "1" ? "到店提车" : "送车上门" }}</div>
                    </el-form-item>
                    <el-form-item label="提车门店:">
                      <div>{{orderInfo.deliveryShop}}</div>
                    </el-form-item>
                    <el-form-item label="提车日期:">
                      <div>{{carInfoDto.pickUpCarDate}}</div>
                    </el-form-item>
                    <el-form-item label="订阅开始时间:">
                      <div>{{orderInfo.startDate}}</div>
                    </el-form-item>
                    <el-form-item label="订阅结束时间:">
                      <div>{{orderInfo.endDate}}</div>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
            <div class="title">订单历史</div>
            <div class="banner-box">
              <div class="order-history">
                <div class="order-history-box">
                  <div :class="orderLog.payReserveFeeTime!=null?'circle last-circle':'circle'"></div>
                  <div class="discription">支付订金</div>
                  <div class="order-time">{{orderLog.payReserveFeeTime}}</div>
                </div>
                <div class="order-history-box">
                  <div :class="orderLog.contractAwardTime!=null? 'circle last-circle':'circle'"></div>
                  <div class="discription">合同签约</div>
                  <div class="order-time">{{orderLog.contractAwardTime}}</div>
                </div>
                <div class="order-history-box">
                  <div :class="orderLog.payDepositTime!=null? 'circle last-circle':'circle'"></div>
                  <div class="discription">支付保证金</div>
                  <div class="order-time">{{orderLog.payDepositTime}}</div>
                </div>
                <div class="order-history-box">
                  <div :class="orderLog.carToShopTime!=null? 'circle last-circle':'circle'"></div>
                  <div class="discription">车辆到店</div>
                  <div class="order-time">{{orderLog.carToShopTime}}</div>
                </div>
                <div class="order-history-box">
                  <div class="circle last-circle"></div>
                  <div class="discription">订阅中</div>
                  <div class="order-time">{{orderLog.payReserveFeeTime}}</div>
                </div>
              </div>
            </div>
            <el-button class="back-btn" type="primary" @click="goBack()"
              >返回</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆信息" name="1">
          <div class="order-no">订单编号：{{orderNum}}</div>
          <div class="center">
            <div class="title">车辆信息</div>
            <div class="content-box">
              <el-row class="car-infomation">
                <el-col :span="6">
                  <el-image
                    class="car-img"
                    :src="carTypeDto.imageUrl"
                    fit="cover"
                  ></el-image>
                </el-col>
                <el-col :span="12">
                  <div class="car-info">
                    {{carTypeDto.carBrand}}·
                    {{carTypeDto.carType}}
                    {{carTypeDto.carTypeYear}}
                    {{carTypeDto.carTypeYearProduct}}
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form label-width="100px">
                    <el-form-item label="车辆牌照:">
                      <div>{{carInfoDto.carPlateNum}}</div>
                    </el-form-item>
                    <el-form-item label="车况信息:">
                      <div>{{carInfoDto.newOrOld}}</div>
                    </el-form-item>
                    <el-form-item label="实表里程数:">
                      <div>{{carInfoDto.mileage}}公里</div>
                    </el-form-item>
                    <el-form-item label="车辆生产日期:">
                      <div>{{carInfoDto.productDate}}</div>
                    </el-form-item>
                    <el-form-item label="车架号:">
                      <div>{{carInfoDto.carVin}}</div>
                    </el-form-item>
                    <el-form-item label="发动机号:">
                      <div>{{carInfoDto.carEngineNum}}</div>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="11">
                  <el-form label-width="120px">
                    <el-form-item label="车漆颜色:">
                      <div>{{carInfoDto.carColor}}</div>
                    </el-form-item>
                    <el-form-item label="内饰颜色:">
                      <div>{{carInfoDto.trimColor}}</div>
                    </el-form-item>
                    <el-form-item label="用户可选增配项:">
                      <div v-for="(v,i) in carInfoDto.otherConfigList" :key="i">
                        {{v.details[0].detailName}} +￥{{v.details[0].money}}</div>
                      <!-- <div>矩阵式灯光 +￥10,000</div>
                      <div>矩阵式灯光 +￥10,000</div> -->
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
            <div class="title">车辆照片</div>
            <div   class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>行驶证照片</div>
                <el-image
                  class="plan-img"
                  :src="carInfoDto.travelLicenseUrl"
                  fit="cover"
                ></el-image>
              </div>
            </div>
            <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>提车照片</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][9]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
            <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>车辆正前</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][1]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
            <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>左前45度</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][0]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
             <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>右前45度</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][2]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
             <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>车辆正侧</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][3]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
             <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>左后45度</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][6]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
             <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>车辆正后</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][5]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
             <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>右后45度</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][6]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
             <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>车辆内饰</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][7]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
             <div class="content-box plan-detail">
              <div class="plan-box">
                <!-- {{carInfoDto.checkCarPicsMap[0].carPicsType}} -->
                <div>其他细节</div>
                <el-image v-for="(v,i) in carInfoDto[checkCarPicsMap]&&carInfoDto[checkCarPicsMap][8]" :key="i"
                  class="plan-img"
                  :src="v.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>

            <div class="title">车辆保险</div>
             <div class="content-box plan-detail">
              <div v-for="(v,i) in carInfoDto.insuranceList " :key="i" class="plan-box">
                <div>{{v.insuranceType==1?'商业险保单':'交强险保单'}}</div>
                <el-image v-for="(value,index) in v.insurancePicsList" :key="index"
                  class="plan-img insurance"
                  :src="value.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
            <el-button class="back-btn" type="primary" @click="goBack()"
              >返回</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="客户信息" name="2">
          <div class="order-no">订单编号：{{orderNum}}</div>
          <div class="customer-banner">
            <el-form label-width="120px">
              <el-form-item label="客户信息:">
                <div>{{userInfo.name}}</div>
              </el-form-item>
              <el-form-item label="客户联系方式:">
                <div>{{userInfo.mobile}}</div>
              </el-form-item>
              <el-form-item label="客户身份证证件:">
                <div>{{userInfo.mobile}}-</div>
                <el-image
                  class="plan-img"
                  :src="userInfo.idcardBackUrl"
                  fit="cover"
                ></el-image>
                <el-image
                  class="plan-img"
                  :src="userInfo.idcardUrl"
                  fit="cover"
                ></el-image>
              </el-form-item>
              <el-form-item label="初审日期:">
                <div>{{userInfo.riskAuditFirstTime}}</div>
              </el-form-item>
              <el-form-item label="复审日期:">
                <div>{{userInfo.riskAuditCompleteTime}}</div>
              </el-form-item>
              <el-form-item label="复审增加条件:">
                <div>增加保证金 10,000元</div>
              </el-form-item>
            </el-form>
            <el-button class="back-btn" type="primary" @click="goBack()"
              >返回</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { listByPage } from "@/api/order/orderManagementDetail";

export default {
  data() {
    return {
      // 默认激活订单信息页签
      activeName: "0",
      detailed:{}, //
      carInfoDto:{},//车辆信息
      orderInfo:{},//订单信息
      orderLog:{},//订单历史
      userInfo:{},//客户信息
      orderNum:"",//订单编号
      carTypeDto:{},//车辆信息
    };
  },
  methods: {
    // 切换tab页签
    handleClick() {},
    // 返回
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
  this.carTypeDto=JSON.parse(sessionStorage.getItem("carTypeDto"))
    console.log(this.$route.query.id,348);
    let data={
      id:this.$route.query.id,
      newType:this.$route.query.newType,
    }
    listByPage(data).then((res)=>{
      console.log(res);
      if (res.code==0) {
        this.carInfoDto=res.data.carInfoDto
        this.orderInfo=res.data.orderInfo
        this.orderLog=res.data.orderLog
        this.userInfo=res.data.userInfo
        this.orderNum=res.data.orderNum

        let map= new Map(Object.entries(res.data.carInfoDto.checkCarPicsMap)); ;
        console.log(map,297 )
        console.log([...map.keys()],300 )
        // console.log(res.data.carInfoDto.checkCarPicsMap(0),367);

        // const map = new Map(Object.entries(res.data.carInfoDto.checkCarPicsMap));
        // this.carInfoDto.checkCarPicsMap=map
        // console.log(this.carInfoDto);


      }
    })
  },
};
</script>

<style lang="less" scoped>
.navigation {
  margin: 0.2833rem 0;
}

.navigation /deep/ .el-breadcrumb__inner {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #4e5969;
}

.subscription-plan /deep/ .el-breadcrumb__inner {
  font-family: PingFangSC-Medium;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #1d2129;
}

.content {
  padding: 0.3333rem;
  background: #ffffff;
  border-radius: 0.1rem 0.1rem 0 0;
  position: relative;
  padding-bottom: 1.2667rem;
}

.order-no {
  display: flex;
  justify-content: flex-end;
}

.order-banner {
  width: 16.6667rem;
  margin: 0 auto;
}

.banner-box {
  margin-left: 2.5rem;
}

.order-history {
  display: flex;
  width: 16.6667rem;
}

.order-history-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.8333rem;
  margin: 0 0.25rem;
}

.circle {
  width: 0.15rem;
  height: 0.15rem;
  border-radius: 50%;
  background: rgba(10, 15, 45, 0.3);
}

.last-circle {
  background: #3446aa;
}

.discription {
  margin-top: 0.3333rem;
}


.center {
  width: 13.3333rem;
  margin: 0 auto;
}

.title {
  font-family: PingFangSC-Medium;
  font-size: 0.2667rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  font-family: PingFangSC-Medium;
  font-size: .2667rem;
  font-weight: 500;
  line-height: .6rem;
  letter-spacing: 0px;
}

.content-box {
  margin-top: .2167rem;
}

.car-infomation {
  display: flex;
  justify-content: center;
  align-items: center;
}

.car-img {
  width: 2.2333rem;
  height: 1.6667rem;
}

.car-info {
  font-family: PingFangSC-Medium;
  font-size: 0.2667rem;
  font-weight: 500;
  color: #1d2129;
}

.car-price {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #86909c;
}

.plan-detail {
  display: flex;
  flex-wrap: wrap;
  width: 9.5833rem;
}

.plan-box {
  height: 1.1167rem;
  display: flex;
  // flex-direction: column;
  align-items: center;
  // margin: 0.1333rem 0;
  div{
    margin-left: .25rem;
    margin-right: .2833rem;
    font-family: PingFangSC-Regular;
    font-size: .2rem;
    font-weight: normal;
    line-height: .4rem;
    letter-spacing: 0px;
    color: #696969;
  }
}

.plan-img {
  width: 1.65rem;
  height: 1.2333rem;
  margin: 0 0.1333rem;
}

.insurance {
  width: 1.6667rem;
  height: 2.2rem;
}

.back-btn {
  display: block;
  margin: 0 auto;
  margin-top: 2.15rem;
  background: #3446aa;
  border: #3446aa;
}

.customer-banner {
  width: 6.1667rem;
  margin: 0 auto;
}
</style>