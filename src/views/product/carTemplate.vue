<template>
  <div>
    <el-breadcrumb class="navigation" separator="/">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        ><a href="#/product/productTemplate">产品模板</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{
        $route.query.type == "0" ? "创建模板" : "修改模板"
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form
        class="car-ruleForm"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
      >
        <el-form-item label="模板名称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入模板名称"></el-input>
        </el-form-item>

        <el-form-item label="选择车型：" prop="newType">
          <el-checkbox-group v-model="ruleForm.newType">
            <el-checkbox v-for="item in CAR_NEW_STATUS" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="计算规则：" prop="calculatorRule">
          <c-select
            :selectValue.sync="ruleForm.calculatorRule"
            :options="CALCULATOR_RULE_LIST"
            :showAllValue="false"
            placeholder="请选择计算规则"
          />
        </el-form-item>
        
        <el-form-item label="首付比例：" prop="firstPeriodRate">
          <c-input-number 
            :inputValue.sync="ruleForm.firstPeriodRate"
            placeholder="请输入首付比例"
            :precision="2"
          >
          </c-input-number>%
        </el-form-item>

        <el-form-item label="IRR：" prop="periodRate">
          <c-input-number 
            :inputValue.sync="ruleForm.periodRate"
            placeholder="请输入IRR"
            :precision="2"
          >
          </c-input-number>%
        </el-form-item>
        
        <el-form-item label="模板说明：" prop="remark">
          <c-text-area 
            :inputValue.sync="ruleForm.remark"
            placeholder="请输入模板说明"
          />
        </el-form-item>
      </el-form>

      <div class="footer-btn">
        <el-button type="info" @click="goBack()">返回</el-button>
        <el-button
          v-if="$route.query.type == '0'"
          type="primary"
          @click="save()"
          >保存模板</el-button
        >
        <el-button
          v-if="$route.query.type == '1'"
          type="primary"
          @click="modify()"
          >修改模板</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  carSubscribeTemplateAdd,
  carSubscribeTemplateUpdate,
  selectFinancialSchemeByType,
} from "@/api/product/carTemplate"
import { applyServiceList, CAR_NEW_STATUS, CALCULATOR_RULE_LIST } from '@/utils/constant'

export default {
  data() {
    return {
      CAR_NEW_STATUS,
      CALCULATOR_RULE_LIST,
      ruleForm: {
        templateId: null,
        applyService: '3',
        pay: [1],
        name: "",  // 模板名称
        newType: [], // 选择车型 1.新车 2.二手车
        calculatorRule: '', // 计算规则 1.自动摊销计算 2.手动设置租金 
        firstPeriodRate: undefined, // 首付比例
        periodRate: undefined, // IRR
        remark: '', // 模板说明
      },
      rules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        newType: [
          { required: true, message: "请选择车型", trigger: "change" },
        ],
        calculatorRule: [
          { required: true, message: "请选择计算规则", trigger: "change" },
        ],
        firstPeriodRate: [
          { required: true, message: "请输入首付比例", trigger: "blur" },
        ],
        periodRate: [
          { required: true, message: "请输入IRR", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入模板说明", trigger: "blur" }],
      },
      // 产品模板回显信息
      infoMation: {},
      applyServiceList,
      financialSchemeList: [],
    };
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 保存模板
    save() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return
        } else {
          carSubscribeTemplateAdd(this.ruleForm).then((res) => {
            if (res.code == 0) {
              this.$router.push({
                path: "/product/productTemplate",
              })
              this.$message({
                type: "success",
                message: res.msg,
                duration: 2000,
              })
            } else {
              this.$message({
                type: "error",
                message: res.msg,
                duration: 2000,
              })
            }
          })
        }
      })
    },
    // 修改模板
    modify() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return
        } else {
          this.$confirm("是否修改模板？", "提示", {
            confirmButtonText: "修改",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              carSubscribeTemplateUpdate(this.ruleForm).then((res) => {
                if (res.code == 0) {
                  this.$router.push({
                    path: "/product/productTemplate",
                  })
                  this.$message({
                    type: "success",
                    message: res.msg,
                    duration: 2000,
                  })
                } else {
                  this.$message({
                    type: "error",
                    message: res.msg,
                    duration: 2000,
                  })
                }
              })
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消修改",
                duration: 2000,
              });
            });
        }
      });
    },

    selectFinancialSchemeByType() {
      const data = {
        applyService: this.ruleForm.applyService,
      }

      selectFinancialSchemeByType(data).then((res) => {
        if (res.code == 0) {
          this.financialSchemeList = res.data
        }
      })
    },
  },
  created() {
    if (this.$route.query.type == "1") {
      this.infoMation = JSON.parse(this.$route.query.infoMation)
      this.ruleForm = {
        ...this.ruleForm,
        ...this.infoMation,
        newType: this.infoMation.newTypes,
        templateId: this.infoMation.id,
      }
    }
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
  // height: 12.6rem;
  padding: 0.3333rem;
  background: #ffffff;
  border-radius: 0.1rem 0.1rem 0 0;
}

.car-ruleForm {
  margin: 0 auto;
  width: 450px;
}

.footer-btn {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.input-wrap {
  position: relative;
  .el-input {
    /deep/ .el-input__inner {
      padding-right: 25px;
    }
  }
  span {
    position: absolute;
    right: 10px;
    top: 0;
  }
}
</style>