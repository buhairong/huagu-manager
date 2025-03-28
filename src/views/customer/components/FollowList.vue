<template>
    <div class="wrap">
        <div class="history-wrap">
            <div class="history-card" v-for="(item, index) in historyList" :key="item.id">
              <div class="card-header">第{{historyList.length-index}}次沟通：{{ item.createdTime }}</div>
              <div class="card-container">
                <div class="card-container-title">
                  <span v-if="item.establishingCommunications || item.establishingCommunications == 0">{{ PARTNER_ESTABLISHINGCOMMUNICATIONS_STATUS[item.establishingCommunications] }}</span> 
                  <span v-if="item.customerIntention"> > {{ PARTNER_CUSTOMERINTENTION_STATUS[item.customerIntention] }}</span> 
                  <span v-if="item.customerDemand"> > {{ PARTNER_CUSTOMERDEMAND_STATUS[item.customerDemand] }}</span>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">所在城市：</div>
                    {{ item.city || '-' }}
                  </div>
                  <div class="item">
                    <div class="label">能源类型：</div>
                    {{ item.energyType ? PARTNER_ENERGYTYPE_STATUS[item.energyType] : '-' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">用车场景：</div>
                    {{ item.vehicleScenario ? PARTNER_VEHICLESCENARIO_STATUS[item.vehicleScenario] : '-' }}
                  </div>
                  <div class="item">
                    <div class="label">用车时间：</div>
                    {{ item.vehicleUsageTime ? PARTNER_PRICERANGE_STATUS[item.vehicleUsageTime] : '-' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">期望车系：</div>
                    {{ item.carType || '-' }}
                  </div>
                  <div class="item">
                    {{ item.subscriptionModel ? '接受订阅模式' : '' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    {{ item.financeLease ? '接受融资租赁' : '' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">备注：</div>
                    {{ item.contactLaterRemark || '-' }}
                  </div>
                </div>

              </div>
            </div>
          </div>
    </div>
</template>

<script>
import { getCommunicationRecordList } from '@/api/clue/clue'
import {
  PARTNER_CUSTOMERDEMAND_LIST,
  PARTNER_CUSTOMERDEMAND_STATUS,
  PARTNER_VEHICLESCENARIO_LIST,
  PARTNER_VEHICLESCENARIO_STATUS,
  PARTNER_COMMUNICATERESULT_LIST,
  PARTNER_COMMUNICATERESULT_STATUS,
  PARTNER_ENERGYTYPE_LIST,
  PARTNER_ENERGYTYPE_STATUS,
  PARTNER_STATUS_LIST,
  PARTNER_STATUS_STATUS,
  PARTNER_PRICERANGE_LIST,
  PARTNER_PRICERANGE_STATUS,
  PARTNER_VEHICLEUSAGETIME_LIST,
  PARTNER_VEHICLEUSAGETIME_STATUS,
  PARTNER_VALID_LIST,
  PARTNER_VALID_STATUS,
  PARTNER_SOURCE_LIST,
  PARTNER_SOURCE_STATUS,
  PARTNER_ESTABLISHINGCOMMUNICATIONS_LIST,
  PARTNER_ESTABLISHINGCOMMUNICATIONS_STATUS,
  PARTNER_CUSTOMERINTENTION_LIST,
  PARTNER_CUSTOMERINTENTION_STATUS,
} from '@/utils/constant'

export default {
    props: {
        userId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            PARTNER_CUSTOMERDEMAND_LIST,
            PARTNER_CUSTOMERDEMAND_STATUS,
            PARTNER_VEHICLESCENARIO_LIST,
            PARTNER_VEHICLESCENARIO_STATUS,
            PARTNER_COMMUNICATERESULT_LIST,
            PARTNER_COMMUNICATERESULT_STATUS,
            PARTNER_ENERGYTYPE_LIST,
            PARTNER_ENERGYTYPE_STATUS,
            PARTNER_STATUS_LIST,
            PARTNER_STATUS_STATUS,
            PARTNER_PRICERANGE_LIST,
            PARTNER_PRICERANGE_STATUS,
            PARTNER_VEHICLEUSAGETIME_LIST,
            PARTNER_VEHICLEUSAGETIME_STATUS,
            PARTNER_VALID_LIST,
            PARTNER_VALID_STATUS,
            PARTNER_SOURCE_LIST,
            PARTNER_SOURCE_STATUS,
            PARTNER_ESTABLISHINGCOMMUNICATIONS_LIST,
            PARTNER_ESTABLISHINGCOMMUNICATIONS_STATUS,
            PARTNER_CUSTOMERINTENTION_LIST,
            PARTNER_CUSTOMERINTENTION_STATUS,
            historyList: [],
        }
    },

    mounted() {
        this.getCommunicationRecordList()
    },

    methods: {
        getCommunicationRecordList() {
            const data = {
                userId: this.userId
            }

            getCommunicationRecordList(data).then(res => {
                if (res.code === 0) {
                    this.historyList = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.history-wrap {
    max-height: 800px;
    overflow: auto;
}
.history-card {
    margin-bottom: 12px;
}
.card-header {
    height: 42px;
    line-height: 42px;
    background: #F2F3F5;
    padding: 0 20px;
    color: #1D2129;
    font-size: 14px;
}
.card-container {
    padding: 16px;
}
.item {
    width: 33%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .label {
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #4E5969;
        margin-right: 8px;
        text-align: right;
    }
    .link-text {
        font-size: 14px;
    }
}
.block {
    margin-bottom: 20px;
}
.card-line {
    display: flex;
    width: 300px;
    .item {
        flex: 1;
    }
}
.detail-info-wrap {
    display: flex;
    .card-line {
        width: unset;
        .item {
            width: 220px;
            .label {
                width: 60px;
            }
        }
    }
}
.card-container-title {
    margin-bottom: 20px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 500;
    color: #3D3D3D;
}
</style>
