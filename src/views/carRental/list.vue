<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">会员租车</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div>
          <div class="title">筛选</div>

          <div class="search-wrap">
              <div class="search-line">
                <div class="search-item">
                  <div class="label">支持车型</div>
                  <c-input 
                    :inputValue.sync="search.carInfo"
                    placeholder="请输入支持车型"
                  />
                </div>

                <div class="search-item">
                  <div class="label">租赁周期</div>
                  <c-select
                    :selectValue.sync="search.period"
                    :options="CAR_RENTAL_PERIOD_LIST"
                    placeholder="请选择状态"
                  />
                </div>

                <div class="search-item">
                  <div class="label">适用城市</div>
                  <c-select
                    :selectValue.sync="search.cityId"
                    placeholder="选择适用城市"
                    labelKey="cityName"
                    valueKey="cityId"
                    :options="cityList"
                  />
                </div>

                <search-button class="search-btn" @search="searchList"/>

                <reset-button class="search-btn reset-btn" @reset="reset"/>
              </div>
          </div>
        </div>

        <div class="create-btn-wrap">
          <div class="tabs">
            <div 
              v-for="tab in CAR_RENTAL_BUSINESS_TYPE_LIST"
              :key="tab.value"
              class="tab"
              :class="{'active-tab': search.businessType == tab.value}"
              @click="changeTab(tab.value)"
            >
              {{ tab.label }}
            </div>
          </div>

          <create-button 
            text="创建方案"
            @create="set(1)"
          />
        </div>

        <el-table 
          :data="list"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <el-table-column
            label="产品排序"
            width="110"
            align="center"
          >
            <template>
              <div>
                <el-image 
                  style="width: 24px"
                  :src="require('@/assets/carRental/order.png')" 
                >
                </el-image>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="支持车型"
          >
            <template slot-scope="scope">
              <div>
                <div>{{scope.row.carTypeYearProductEntity.carBrand}}·{{scope.row.carTypeYearProductEntity.carType}}</div>
                <div>{{scope.row.carTypeYearProductEntity.carTypeYear}}</div>
                <div>{{scope.row.carTypeYearProductEntity.carTypeYearProduct}}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="适用城市"
          >
            <template slot-scope="scope">
              <div>
                <div v-for="city in scope.row.citySubscribeReq" :key="city.cityId">
                  {{ city.cityName || '全部' }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="车辆租金"
          >
            <template slot-scope="scope">
              <div>
                <div v-for="(item, index) in scope.row.citySubscribeReq[0].typeReqVos" :key="index">
                  <span v-if="search.businessType === 1">{{item.period}}天: </span> 
                  {{formatThousandNumber(item.money)}}元/{{search.businessType === 1 ? '月' : '天'}}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="车辆押金"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="scope.row.citySubscribeReq[0].type === 1 && search.businessType === 1">
                  <div v-for="(item, index) in scope.row.citySubscribeReq[0].typeReqVos" :key="index">
                    ¥ {{formatThousandNumber(item.money*scope.row.citySubscribeReq[0].month)}}
                  </div>
                </div>
                <div v-else>
                  ¥ {{formatThousandNumber(scope.row.citySubscribeReq[0].deposit)}}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="逾期违约金"
          >
            <template slot-scope="scope">
              <div>
                ¥ {{formatThousandNumber(scope.row.citySubscribeReq[0].contractDamages)}}/天
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="方案创建时间"
            prop="createdTime"
          >
          </el-table-column>
         
          <el-table-column
              label="操作"
              width="110"
              align="center"
          >
            <template slot-scope="scope">
              <div class="table-btn" @click="goDetail(scope.row.id)">查看详情</div>
              <div class="table-btn" @click="set(2, scope.row)">修改方案</div>
              <div class="table-btn" @click="del(scope.row.id)">删除方案</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import { getCityList } from '@/api/risk/userReview'
import { selectCarRentalList, deleteCarRental, sortCarRental } from '@/api/carRental/carRental'
import Sortable from 'sortablejs'
import { CAR_RENTAL_PERIOD_LIST, CAR_RENTAL_PERIOD_STATUS, CAR_RENTAL_BUSINESS_TYPE_LIST, CAR_RENTAL_BUSINESS_TYPE_STATUS } from '@/utils/constant'
import { formatThousandNumber } from "@/utils/util"

export default {
  name: 'CarRentalList',

  components: {
    
  },

  data() {
    return {
      CAR_RENTAL_PERIOD_LIST,
      CAR_RENTAL_PERIOD_STATUS,
      CAR_RENTAL_BUSINESS_TYPE_LIST,
      CAR_RENTAL_BUSINESS_TYPE_STATUS,
      search: {
        businessType: 2, // 1.折扣长租 2.随用随还
        carInfo: '',  // 车型
        period: '',  // 租赁周期
        cityId: '',  // 城市Id
        page: 1,
        limit: 1000,
      },
      cityList: [],
      list: [],
      total: 0,
    }
  },

  mounted() {
    this.selectCarRentalList()
    this.getCityList()
    //this.preventDefault()
  },

  methods: {
    changeTab(tab) {
      this.search.businessType = tab
      this.searchList()
    },

    preventDefault() {
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
    },

    getCityList() {
      getCityList().then(res => {
        if (res.code === 0) {
          this.cityList = res.data
        }
      })
    },

    searchList() {
      this.search.page = 1
      this.selectCarRentalList()
    },

    selectCarRentalList() {
      selectCarRentalList(this.search).then(res => {
        if (res.code === 0) {
          this.list = res.data
          this.$nextTick(() => {
            this.rowDrop()
          })
        }
      })
    },

    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody, {
        onEnd: ({ newIndex, oldIndex }) => {
          if (newIndex === oldIndex) {
            return
          }
          this.list.splice(
            newIndex,
            0,
            this.list.splice(oldIndex, 1)[0]
          )
          const newArray = this.list.slice(0)
          this.list = []
          this.$nextTick(() => {
            const data = []
            this.list = newArray
            newArray.forEach((item, index) => {
              data.push({
                id: item.id,
                sort: index,
              })
            })
            this.sortCarRental(data)
          })
        }
      })
    },

    sortCarRental(data) {
      sortCarRental(data).then(res => {
        if (res.code === 0) {
          this.selectCarRentalList()
        } else {
          this.$message.error('排序失败')
        }
      }).catch(err => {
        this.$message.error('排序失败')
      })
    },

    reset() {
      this.search.carInfo = ''
      this.search.period = ''
      this.search.cityId = ''
      this.search.page = 1
      this.searchList()
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.searchList()
    },

    // 1.添加 2.修改
    set(type, row = {}) {
      this.$router.push({
        path: '/carRental/setCarRental',
        query: {
          type,
          businessType: this.search.businessType,
          carRentalId: row.id,
        },
      })
    },

    goDetail(carRentalId) {
      this.$router.push({
        path: '/carRental/detail',
        query: {
          carRentalId,
        },
      })
    },

    del(id) {
      this.$confirm(`确定要删除这个方案吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          const data = {
            id,
          }

          deleteCarRental(data).then(res => {
            if (res.code === 0) {
              this.$message.success('删除成功')
              this.selectCarRentalList()
            } else {
              this.$message.error('删除失败')
            }
          }).catch(err => {
            this.$message.error('删除失败')
          })
      })
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1D2129;
  margin-bottom: 23px;
}

.search-wrap {
  margin-bottom: 20px;
}

.search-line {
  display: flex;
  align-items: center;
  .search-item {
    display: flex;
    align-items: center;
    margin-right: 24px;
    .label {
      height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 22px;
      color: #4E5969;
      margin-right: 16px;
      text-align: right;
    }
  }
}
.reset-btn {
  margin-left: 20px;
}

.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>