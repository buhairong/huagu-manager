const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
  {
    path: "/industry",
    name: "industry",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/merchants/industry.vue"),
  },
  {
    path: "/baseInformation",
    name: "baseInformation",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/merchants/baseInformation.vue"
      ),
  },
  {
    path: "/artificialReview",
    name: "artificialReview",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/merchants/artificialReview.vue"
      ),
  },
  {
    path: "/inSuccessful",
    name: "inSuccessful",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/merchants/inSuccessful.vue"
      ),
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/index.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/user.vue"),
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/role.vue"),
      },
      {
        path: "/cars/leixing",
        name: "leixing",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/cars/leixing.vue"),
      },
      {
        path: "/cars/zhuangshi",
        name: "zhuangshi",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/cars/zhuangshi.vue"),
      },
      {
        path: "/cars/list",
        name: "carList",
        component: () =>
          import(/* webpackChunkName: "carList" */ "../views/cars/list.vue"),
      },
      {
        path: "/cars/addOrUpdateCar",
        name: "addOrUpdateCar",
        component: () =>
          import(
            /* webpackChunkName: "addOrUpdateCar" */ "../views/cars/addOrUpdateCar.vue"
          ),
      },
      {
        path: "/cars/detail",
        name: "carDetail",
        component: () =>
          import(
            /* webpackChunkName: "carDetail" */ "../views/cars/detail.vue"
          ),
      },
      {
        path: "/cars/addOrUpdateMaintenanceRecord",
        name: "addOrUpdateMaintenanceRecord",
        component: () =>
          import(
            /* webpackChunkName: "addOrUpdateMaintenanceRecord" */ "../views/cars/addOrUpdateMaintenanceRecord.vue"
          ),
      },
      {
        path: "/cars/maintenanceRecordDetail",
        name: "maintenanceRecordDetail",
        component: () =>
          import(
            /* webpackChunkName: "maintenanceRecordDetail" */ "../views/cars/maintenanceRecordDetail.vue"
          ),
      },
      {
        path: "/businessManagement/businessManagement",
        name: "businessManagement",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/businessManagement/businessManagement.vue"
          ),
      },
      {
        path: "/businessManagement/businessManagementDetail",
        name: "businessManagementDetail",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/businessManagement/businessManagementDetail.vue"
          ),
      },
      {
        path: "/businessManagement/businessAudit",
        name: "businessAudit",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/businessManagement/businessAudit.vue"
          ),
      },
      {
        path: "/businessManagement/businessAuditDetail",
        name: "businessAuditDetail",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/businessManagement/businessAuditDetail.vue"
          ),
      },
      {
        path: "/product/productTemplate",
        name: "productTemplate",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/product/productTemplate.vue"
          ),
      },
      {
        path: "/product/carTemplate",
        name: "carTemplate",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/product/carTemplate.vue"
          ),
      },
      {
        path: "/product/subscriptionPlan",
        name: "subscriptionPlan",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/product/subscriptionPlan.vue"
          ),
      },
      {
        path: "/drive/testDrive",
        name: "testDrive",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/drive/testDrive.vue"
          ),
      },
      {
        path: "/order/financialOrderManagement",
        name: "financialOrderManagement",
        component: () =>
          import(
            /* webpackChunkName: "financialOrderManagement" */ "../views/order/financialOrderManagement.vue"
          ),
      },
      {
        path: "/order/replenishCarInfo",
        name: "replenishCarInfo",
        component: () =>
          import(
            /* webpackChunkName: "replenishCarInfo" */ "../views/order/replenishCarInfo.vue"
          ),
      },
      {
        path: "/order/orderManagementDetail",
        name: "orderManagementDetail",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/order/orderManagementDetail.vue"
          ),
      },
      {
        path: "/order/detail",
        name: "orderDetail",
        component: () =>
          import(
            /* webpackChunkName: "orderDetail" */ "../views/order/detail.vue"
          ),
      },
      {
        path: "/order/customerOrder",
        name: "customerOrder",
        component: () =>
          import(
            /* webpackChunkName: "customerOrder" */ "../views/order/customerOrder.vue"
          ),
      },
      {
        path: "/order/customerOrderDetail",
        name: "customerOrderDetail",
        component: () =>
          import(
            /* webpackChunkName: "customerOrderDetail" */ "../views/order/customerOrderDetail.vue"
          ),
      },
      {
        path: "/order/setCustomerOrder",
        name: "setCustomerOrder",
        component: () =>
          import(
            /* webpackChunkName: "setCustomerOrder" */ "../views/order/setCustomerOrder.vue"
          ),
      },
      {
        path: "/order/setEntrustOrder",
        name: "setEntrustOrder",
        component: () =>
          import(
            /* webpackChunkName: "setEntrustOrder" */ "../views/order/setEntrustOrder.vue"
          ),
      },
      {
        path: "/goods/carProductTypeManage",
        name: "carProductTypeManage",
        component: () =>
          import(
            /* webpackChunkName: "carProductTypeManage" */ "../views/goods/carProductTypeManage.vue"
          ),
      },
      {
        path: "/goods/setCarDeliveryAddress",
        name: "setCarDeliveryAddress",
        component: () =>
          import(
            /* webpackChunkName: "setCarDeliveryAddress" */ "../views/goods/setCarDeliveryAddress.vue"
          ),
      },
      {
        path: "/goods/saveCarDelivery",
        name: "saveCarDelivery",
        component: () =>
          import(
            /* webpackChunkName: "saveCarDelivery" */ "../views/goods/saveCarDelivery.vue"
          ),
      },
      {
        path: "/goods/editProductTypeParams",
        name: "editProductTypeParams",
        component: () =>
          import(
            /* webpackChunkName: "editProductTypeParams" */ "../views/goods/editProductTypeParams.vue"
          ),
      },
      {
        path: "/risk/UserReview/order",
        name: "order",
        component: () =>
          import(
            /* webpackChunkName: "order" */ "../views/risk/UserReview/order.vue"
          ),
      },
      {
        path: "/risk/UserReview/order/riskOrderDetail",
        name: "riskOrderDetail",
        component: () =>
          import(
            /* webpackChunkName: "riskOrderDetail" */ "../views/risk/UserReview/riskOrderDetail.vue"
          ),
      },
      {
        path: "/risk/UserReview/model",
        name: "model",
        component: () =>
          import(
            /* webpackChunkName: "model" */ "../views/risk/UserReview/model.vue"
          ),
      },
      {
        path: "/risk/UserReview/model/createOrUpdateModel",
        name: "createOrUpdateModel",
        component: () =>
          import(
            /* webpackChunkName: "createOrUpdateModel" */ "../views/risk/UserReview/createOrUpdateModel.vue"
          ),
      },
      {
        path: "/risk/UserReview/conditions",
        name: "conditions",
        component: () =>
          import(
            /* webpackChunkName: "conditions" */ "../views/risk/UserReview/conditions.vue"
          ),
      },
      {
        path: "/risk/UserReview/log",
        name: "log",
        component: () =>
          import(
            /* webpackChunkName: "log" */ "../views/risk/UserReview/log.vue"
          ),
      },
      {
        path: "/risk/whiteList",
        name: "riskWhiteList",
        component: () =>
          import(
            /* webpackChunkName: "riskWhiteList" */ "../views/risk/riskWhiteList.vue"
          ),
      },
      {
        path: "/workorder/customPlan",
        name: "customOrder",
        component: () =>
          import(
            /* webpackChunkName: "customOrder" */ "../views/workOrder/customOrder.vue"
          ),
      },
      {
        path: "/workOrder/customOrderDetail",
        name: "customOrderDetail",
        component: () =>
          import(
            /* webpackChunkName: "customOrder" */ "../views/workOrder/customOrderDetail.vue"
          ),
      },
      {
        path: "/workorder/customRentalOrder",
        name: "customRentalOrder",
        component: () =>
          import(
            /* webpackChunkName: "customRentalOrder" */ "../views/workOrder/customRentalOrder.vue"
          ),
      },
      {
        path: "/workOrder/customOrderRentalDetail",
        name: "customOrderRentalDetail",
        component: () =>
          import(
            /* webpackChunkName: "customOrderRentalDetail" */ "../views/workOrder/customOrderRentalDetail.vue"
          ),
      },
      {
        path: "/finance/deposit",
        name: "depositPay",
        component: () =>
          import(
            /* webpackChunkName: "depositPay" */ "../views/finance/deposit.vue"
          ),
      },
      {
        path: "/finance/subscribe",
        name: "subscribePay",
        component: () =>
          import(
            /* webpackChunkName: "subscribePay" */ "../views/finance/subscribe.vue"
          ),
      },
      {
        path: "/finance/rentalRent",
        name: "rentalRentPay",
        component: () =>
          import(
            /* webpackChunkName: "rentalRentPay" */ "../views/finance/rentalRent.vue"
          ),
      },
      {
        path: "/finance/rentalDeposit",
        name: "rentalDepositPay",
        component: () =>
          import(
            /* webpackChunkName: "rentalDepositPay" */ "../views/finance/rentalDeposit.vue"
          ),
      },
      {
        path: "/finance/auctionDeposit",
        name: "AuctionDeposit",
        component: () =>
          import(
            /* webpackChunkName: "auctionDeposit" */ "../views/finance/auctionDeposit.vue"
          ),
      },
      {
        path: "/finance/detail",
        name: "financeDetail",
        component: () =>
          import(
            /* webpackChunkName: "financeDetail" */ "../views/finance/detail.vue"
          ),
      },
      {
        path: "/finance/brokerage",
        name: "brokerage",
        component: () =>
          import(
            /* webpackChunkName: "brokerage" */ "../views/finance/brokerage.vue"
          ),
      },
      {
        path: "/finance/merchantBrokerage",
        name: "merchantBrokerage",
        component: () =>
          import(
            /* webpackChunkName: "merchantBrokerage" */ "../views/finance/merchantBrokerage.vue"
          ),
      },
      {
        path: "/finance/brokerageDetail",
        name: "brokerageDetail",
        component: () =>
          import(
            /* webpackChunkName: "brokerageDetail" */ "../views/finance/brokerageDetail.vue"
          ),
      },
      {
        path: "/finance/partnerBrokerag",
        name: "partnerBrokerag",
        component: () =>
          import(
            /* webpackChunkName: "partnerBrokerag" */ "../views/finance/partnerBrokerag.vue"
          ),
      },
      {
        path: "/finance/partnerBrokerageDetail",
        name: "partnerBrokerageDetail",
        component: () =>
          import(
            /* webpackChunkName: "partnerBrokerageDetail" */ "../views/finance/partnerBrokerageDetail.vue"
          ),
      },
      {
        path: "/finance/auctionCash",
        name: "AuctionCash",
        component: () =>
          import(
            /* webpackChunkName: "auctionCash" */ "../views/finance/auctionCash.vue"
          ),
      },
      {
        path: "/finance/recharge",
        name: "recharge",
        component: () =>
          import(
            /* webpackChunkName: "recharge" */ "../views/finance/recharge.vue"
          ),
      },
      {
        path: "/businessManagement/addMerchant",
        name: "addMerchant",
        component: () =>
          import(
            /* webpackChunkName: "addMerchant" */ "../views/businessManagement/addMerchant.vue"
          ),
      },
      {
        path: "/businessManagement/detail",
        name: "merchantDetail",
        component: () =>
          import(
            /* webpackChunkName: "merchantDetail" */ "../views/businessManagement/detail.vue"
          ),
      },
      {
        path: "/product/subscribe",
        name: "subscribe",
        component: () =>
          import(
            /* webpackChunkName: "subscribe" */ "../views/subscribe/list.vue"
          ),
      },
      {
        path: "/product/setSubscribe",
        name: "setSubscribe",
        component: () =>
          import(
            /* webpackChunkName: "subscribe" */ "../views/subscribe/set.vue"
          ),
      },
      {
        path: "/product/subscribe/detail",
        name: "subscribeDetail",
        component: () =>
          import(
            /* webpackChunkName: "subscribeDetail" */ "../views/subscribe/detail.vue"
          ),
      },
      {
        path: "/product/calcProductPrice",
        name: "calcProductPrice",
        component: () =>
          import(
            /* webpackChunkName: "calcProductPrice" */ "../views/subscribe/calcProductPrice.vue"
          ),
      },
      {
        path: "/subscribe/sortSubscribeOrder",
        name: "SortSubscribeOrder",
        component: () =>
          import(
            /* webpackChunkName: "sortSubscribeOrder    " */ "../views/subscribe/sortSubscribeOrder.vue"
          ),
      },
      {
        path: "/product/setFinancial",
        name: "setFinancial",
        component: () =>
          import(
            /* webpackChunkName: "subscribe" */ "../views/financial/set.vue"
          ),
      },
      {
        path: "/order/olderCarOrder",
        name: "olderCarOrder",
        component: () =>
          import(
            /* webpackChunkName: "olderCarOrder" */ "../views/order/olderCarOrder.vue"
          ),
      },
      {
        path: "/system/openNewCar",
        name: "openNewCar",
        component: () =>
          import(
            /* webpackChunkName: "openNewCar" */ "../views/system/openNewCar.vue"
          ),
      },
      {
        path: "/system/openOldCar",
        name: "openOldCar",
        component: () =>
          import(
            /* webpackChunkName: "openOldCar" */ "../views/system/openOldCar.vue"
          ),
      },
      {
        path: "/system/account",
        name: "account",
        component: () =>
          import(
            /* webpackChunkName: "account" */ "../views/system/account.vue"
          ),
      },
      {
        path: "/system/GPS",
        name: "GPS",
        component: () =>
          import(/* webpackChunkName: "GPS" */ "../views/system/GPS.vue"),
      },
      {
        path: "/system/IRR",
        name: "IRR",
        component: () =>
          import(/* webpackChunkName: "IRR" */ "../views/system/IRR.vue"),
      },
      {
        path: "/system/IRR/history",
        name: "IRRHistory",
        component: () =>
          import(
            /* webpackChunkName: "IRRHistory" */ "../views/system/IRRHistory.vue"
          ),
      },
      {
        path: "/system/restrictedCity",
        name: "restrictedCity",
        component: () =>
          import(
            /* webpackChunkName: "restrictedCity" */ "../views/system/restrictedCity.vue"
          ),
      },
      {
        path: "/system/limitedMileage",
        name: "limitedMileage",
        component: () =>
          import(
            /* webpackChunkName: "limitedMileage" */ "../views/system/limitedMileage.vue"
          ),
      },
      {
        path: "/user/userList",
        name: "UserList",
        component: () =>
          import(
            /* webpackChunkName: "UserList" */ "../views/user/userList.vue"
          ),
      },
      {
        path: "/partner/partnerList",
        name: "partnerList",
        component: () =>
          import(
            /* webpackChunkName: "partnerList" */ "../views/partner/partnerList.vue"
          ),
      },
      {
        path: "/partner/partnerApply",
        name: "partnerApply",
        component: () =>
          import(
            /* webpackChunkName: "partnerApply" */ "../views/partner/partnerApply.vue"
          ),
      },
      {
        path: "/partner/detail",
        name: "partnerApplyDetail",
        component: () =>
          import(
            /* webpackChunkName: "partnerApplyDetail" */ "../views/partner/detail.vue"
          ),
      },
      {
        path: "/partner/setCompanyPartner",
        name: "setCompanyPartner",
        component: () =>
          import(
            /* webpackChunkName: "setCompanyPartner" */ "../views/partner/setCompanyPartner.vue"
          ),
      },
      {
        path: "/partner/companyPartnerDetail",
        name: "companyPartnerDetail",
        component: () =>
          import(
            /* webpackChunkName: "companyPartnerDetail" */ "../views/partner/companyPartnerDetail.vue"
          ),
      },
      {
        path: "/nodeposit/list",
        name: "nodepositList",
        component: () =>
          import(
            /* webpackChunkName: "nodepositList" */ "../views/nodeposit/nodepositList.vue"
          ),
      },
      {
        path: "/nodeposit/model",
        name: "nodepositModel",
        component: () =>
          import(
            /* webpackChunkName: "nodepositModel" */ "../views/nodeposit/nodepositModel.vue"
          ),
      },
      {
        path: "/product/finance",
        name: "CarRentalList",
        component: () =>
          import(
            /* webpackChunkName: "CarRentalList" */ "../views/carRental/list.vue"
          ),
      },
      {
        path: "/carRental/setCarRental",
        name: "setCarRental",
        component: () =>
          import(
            /* webpackChunkName: "setCarRental" */ "../views/carRental/setCarRental.vue"
          ),
      },
      {
        path: "/carRental/detail",
        name: "CarRentalDetail",
        component: () =>
          import(
            /* webpackChunkName: "CarRentalDetail" */ "../views/carRental/detail.vue"
          ),
      },
      {
        path: "/order/rentalCarOrder",
        name: "RentalCarOrderList",
        component: () =>
          import(
            /* webpackChunkName: "RentalCarOrderList" */ "../views/order/rentalOrderList.vue"
          ),
      },
      {
        path: "/order/rentalDetail",
        name: "RentalDetail",
        component: () =>
          import(
            /* webpackChunkName: "RentalDetail" */ "../views/order/rentalDetail.vue"
          ),
      },
      {
        path: "/order/vehicleDamageReport",
        name: "VehicleDamageReport",
        component: () =>
          import(
            /* webpackChunkName: "VehicleDamageReport" */ "../views/order/vehicleDamageReport.vue"
          ),
      },
      {
        path: "/order/customRentalOrder",
        name: "customRentalOrder1",
        component: () =>
          import(
            /* webpackChunkName: "customRentalOrder1" */ "../views/order/customRentalOrder.vue"
          ),
      },
      {
        path: "/order/setCustomerRentalOrder",
        name: "setCustomerRentalOrder",
        component: () =>
          import(
            /* webpackChunkName: "setCustomerRentalOrder" */ "../views/order/setCustomerRentalOrder.vue"
          ),
      },
      {
        path: "/order/customerRentalOrderDetail",
        name: "customerRentalOrderDetail",
        component: () =>
          import(
            /* webpackChunkName: "customerRentalOrderDetail" */ "../views/order/customerRentalOrderDetail.vue"
          ),
      },
      {
        path: "/auction/auctionCarList",
        name: "AuctionCarList",
        component: () =>
          import(
            /* webpackChunkName: "auctionCarList" */ "../views/auction/auctionCarList.vue"
          ),
      },
      {
        path: "/auction/auctionCarDetail",
        name: "AuctionCarDetail",
        component: () =>
          import(
            /* webpackChunkName: "auctionCarDetail" */ "../views/auction/auctionCarDetail.vue"
          ),
      },
      {
        path: "/auction/auctionDisputeList",
        name: "AuctionDisputeList",
        component: () =>
          import(
            /* webpackChunkName: "AuctionDisputeList" */ "../views/auction/auctionDisputeList.vue"
          ),
      },
      {
        path: "/auction/disputeDetail",
        name: "DisputeDetail",
        component: () =>
          import(
            /* webpackChunkName: "disputeDetail" */ "../views/auction/disputeDetail.vue"
          ),
      },
      {
        path: "/recommend/partnerRecommendList",
        name: "partnerRecommendList",
        component: () =>
          import(
            /* webpackChunkName: "partnerRecommendList" */ "../views/recommend/partnerRecommendList.vue"
          ),
      },
      {
        path: "/activity/partnerActivityList",
        name: "partnerActivity",
        component: () =>
          import(
            /* webpackChunkName: "partnerActivity" */ "../views/activity/partnerActivity.vue"
          ),
      },
      {
        path: "/clue/userclue",
        name: "userclueList",
        component: () =>
          import(
            /* webpackChunkName: "userclueList" */ "../views/clue/userclueList.vue"
          ),
      },
      {
        path: "/clue/userclueDetail",
        name: "userclueDetail",
        component: () =>
          import(
            /* webpackChunkName: "userclueDetail" */ "../views/clue/userclueDetail.vue"
          ),
      },
      {
        path: "/customer/customerList",
        name: "customerList",
        component: () =>
          import(
            /* webpackChunkName: "customerList" */ "../views/customer/customerList.vue"
          ),
      },
      {
        path: "/customer/customerDetail",
        name: "customerDetail",
        component: () =>
          import(
            /* webpackChunkName: "customerDetail" */ "../views/customer/customerDetail.vue"
          ),
      },
      {
        path: "/rental/car",
        name: "rentalCar",
        component: () =>
          import(
            /* webpackChunkName: "rentalCar" */ "../views/rental/car/list.vue"
          ),
      },
      {
        path: "/rental/car/addOrUpdateCar",
        name: "rentalAddOrUpdateCar",
        component: () =>
          import(
            /* webpackChunkName: "rentalAddOrUpdateCar" */ "../views/rental/car/addOrUpdateCar.vue"
          ),
      },
      {
        path: "/rental/car/carDetail",
        name: "rentalCarDetail",
        component: () =>
          import(
            /* webpackChunkName: "rentalcarDetail" */ "../views/rental/car/carDetail.vue"
          ),
      },
      {
        path: "/rental/recharge",
        name: "rentalRecharge",
        component: () =>
          import(
            /* webpackChunkName: "rentalRecharge" */ "../views/rental/recharge/list.vue"
          ),
      },
      {
        path: "/rental/order",
        name: "rentalOrder",
        component: () =>
          import(
            /* webpackChunkName: "rentalOrder" */ "../views/rental/order/list.vue"
          ),
      },
      {
        path: "/rental/enterprise",
        name: "rentalEnterprise",
        component: () =>
          import(
            /* webpackChunkName: "rentalEnterprise" */ "../views/rental/enterprise/list.vue"
          ),
      },
      {
        path: "/rental/enterprise/enterpriseDetail",
        name: "rentalEnterpriseDetail",
        component: () =>
          import(
            /* webpackChunkName: "rentalEnterpriseDetail" */ "../views/rental/enterprise/enterpriseDetail.vue"
          ),
      },
      {
        path: "/rental/butler",
        name: "rentalButler",
        component: () =>
          import(
            /* webpackChunkName: "rentalButler" */ "../views/rental/butler/list.vue"
          ),
      },
      {
        path: "/rental/butler/addOrUpdateButler",
        name: "rentalAddOrUpdateButler",
        component: () =>
          import(
            /* webpackChunkName: "rentalAddOrUpdateCar" */ "../views/rental/butler/addOrUpdateButler.vue"
          ),
      },
      {
        path: "/rental/butler/butlerDetail",
        name: "rentalButlerDetail",
        component: () =>
          import(
            /* webpackChunkName: "rentalButlerDetail" */ "../views/rental/butler/butlerDetail.vue"
          ),
      },
      {
        path: "/rental/business",
        name: "rentalBusiness",
        component: () =>
          import(
            /* webpackChunkName: "rentalBusiness" */ "../views/rental/business/list.vue"
          ),
      },
      {
        path: "/rental/business/addOrUpdateBusiness",
        name: "rentalAddOrUpdateBusiness",
        component: () =>
          import(
            /* webpackChunkName: "rentalAddOrUpdateBusiness" */ "../views/rental/business/addOrUpdateBusiness.vue"
          ),
      },
      {
        path: "/rental/business/businessDetail",
        name: "rentalBusinessDetail",
        component: () =>
          import(
            /* webpackChunkName: "rentalBusinessDetail" */ "../views/rental/business/businessDetail.vue"
          ),
      },
      {
        path: "/rental/business/addOrUpdateBusinessOrder",
        name: "rentalAddOrUpdateBusinessOrder",
        component: () =>
          import(
            /* webpackChunkName: "rentalAddOrUpdateBusinessOrder" */ "../views/rental/business/addOrUpdateBusinessOrder.vue"
          ),
      },
      {
        path: "/rental/business/businessOrderList",
        name: "rentalBusinessOrderList",
        component: () =>
          import(
            /* webpackChunkName: "rentalBusinessOrderList" */ "../views/rental/business/businessOrderList.vue"
          ),
      },
      {
        path: "/rental/business/businessOrderDetail",
        name: "rentalBusinessOrderDetail",
        component: () =>
          import(
            /* webpackChunkName: "rentalBusinessOrderDetail" */ "../views/rental/business/businessOrderDetail.vue"
          ),
      },
      {
        path: "/rental/coupon",
        name: "rentalCoupon",
        component: () =>
          import(
            /* webpackChunkName: "rentalCoupon" */ "../views/rental/coupon/list.vue"
          ),
      },
      {
        path: "/rental/couponDetail",
        name: "rentalCouponDetail",
        component: () =>
          import(
            /* webpackChunkName: "rentalCouponDetail" */ "../views/rental/coupon/couponDetail.vue"
          ),
      },
      {
        path: "/rental/invoice",
        name: "rentalInvoice",
        component: () =>
          import(
            /* webpackChunkName: "rentalInvoice" */ "../views/rental/invoice/list.vue"
          ),
      },
    ],
  },
];

export default routes;
