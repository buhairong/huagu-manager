<template>
  <div>
    <el-container class="el-container-wrap">
      <el-header>
        <div class="header">
          <div class="logo-img">
            <el-image
              class="logo"
              :src="require('@/assets/logo_txt.png')"
              fit="cover"
            ></el-image>
          </div>
          <el-tabs
            class="top-menu"
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="(item, index) in topMenuList"
              :key="index"
              :label="item.name"
              :name="item.id + ''"
            ></el-tab-pane>
          </el-tabs>
          <div
            class="avatar-wrap"
            @mouseenter="openUserCenter"
            @mouseleave="closeUserCenter"
          >
            <div class="avtor-name">{{ userInfo.name }}</div>
            <el-image
              class="avtor-img"
              src="https://image.51cheyaoshi.com/xcx/app/static/carlife/worker_icon.png"
              fit="cover"
            ></el-image>
            <div
              class="user-center"
              @mouseenter="openUserCenter"
              @mouseleave="closeUserCenter"
              v-show="showUserCenter"
            >
              <div class="userinfo">
                <div class="username">{{ userInfo.name }}</div>
                <div>{{ userInfo.account }}</div>
              </div>
              <div class="role-list">
                {{
                  userInfo.userRoleList.map((item) => item.roleName).join(" | ")
                }}
              </div>
              <div class="line"></div>
              <div class="link-btn" @click="openChangePsdDialog">修改密码</div>
              <div class="link-btn" @click="quitloging()">退出登录</div>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="el-container-inner">
        <el-aside :width="menuWidth">
          <!-- <div @click="handleFolding()">折叠</div> -->
          <el-menu
            router
            unique-opened
            :collapse="isCollapse"
            :default-active="defaultMenu"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <div v-for="(item, i) in asideMenuList" :key="i">
              <el-submenu
                v-if="item.thirdMenus && item.thirdMenus.length"
                :index="item.name"
              >
                <template slot="title">{{ item.name }}</template>
                <el-menu-item
                  v-for="(thirdMenu, index) in item.thirdMenus"
                  :key="index"
                  :index="thirdMenu.url"
                  :class="{
                    'active-second-menu': defaultMenu === thirdMenu.url,
                  }"
                >
                  {{ thirdMenu.name }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="item.url"
                :class="{ 'active-second-menu': defaultMenu === item.url }"
              >
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </div>

            <!-- <el-submenu
              v-for="(item, index) in menuList2"
              :key="'parent' + index"
              :index="item.path"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="(value, index2) in item.list"
                :key="index2"
                :index="value.path"
              >
                <i class="el-icon-menu"></i>
                <span slot="title">{{ value.name }}</span>
              </el-menu-item>
            </el-submenu> -->
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive :include="include">
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      title="修改密码"
      :visible.sync="showChangePsdDialog"
      width="480px"
    >
      <div class="item">
        <c-input
          :inputValue.sync="changePsdForm.oldPassWord"
          placeholder="请输入原密码"
          show-password
          style="width: 100%"
        />
      </div>

      <div class="item">
        <c-input
          :inputValue.sync="changePsdForm.newPassWord"
          placeholder="请输入新密码"
          show-password
          style="width: 100%"
        />
      </div>

      <span slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <div class="btn" @click="closeChangePsdDialog">取消</div>
          <div class="btn save-btn" @click="changePsd">确认修改</div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findFirstMenus, findSecondMenus } from "@/api/home";
import { updatePassword } from "@/api/user/user";
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 顶部导航菜单默认展示页面
      activeName: "",
      // 顶部导航菜单
      topMenuList: [],
      // 左侧二级导航菜单默认宽度
      menuWidth: "200px",
      // 左侧二级导航菜单是否折叠
      isCollapse: false,
      // 左侧二级导航菜单默认展示页面
      defaultMenu: "",
      // 左侧二级导航菜单
      asideMenuList: [],
      // 左侧三级导航菜单
      // menuList2: [
      //   {
      //     path: "/cars",
      //     name: "汽车模块",
      //     list: [
      //       {
      //         path: "/cars/leixing",
      //         name: "汽车类型",
      //       },
      //       {
      //         path: "/cars/zhuangshi",
      //         name: "汽车装饰",
      //       },
      //     ],
      //   },
      // ],
      include: [
        "openNewCar",
        "CarProductTypeManage",
        "setCarDeliveryAddress",
        "carDetail",
        "orderDetail",
        "partnerList",
        "subscribe",
      ],
      showUserCenter: false,
      timer: null,
      showChangePsdDialog: false,
      changePsdForm: {
        oldPassWord: "",
        newPassWord: "",
      },
    };
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  methods: {
    // 左侧二级导航菜单是否折叠
    handleFolding() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.menuWidth = "64px";
      } else {
        this.menuWidth = "200px";
      }
    },
    // 获取顶部导航菜单
    async getFindFirstMenus() {
      let data = {
        // 系统编号（1 商户后台，2 核心后台）
        systemId: 2,
      };
      await findFirstMenus(data).then((res) => {
        if (res.code == 0) {
          this.topMenuList = res.data;

          if (!localStorage.getItem("activeName")) {
            this.activeName = res.data[0].id + "";
            localStorage.setItem("activeName", this.activeName);
            this.defaultMenu = "";
          }
        }
      });
    },
    // 获取左侧二级导航菜单
    async getFindSecondMenus() {
      let data = {
        // 系统编号（1 商户后台，2 核心后台）
        systemId: 2,
        id: this.activeName,
      };
      await findSecondMenus(data).then((res) => {
        if (res.code == 0) {
          this.asideMenuList = res.data;
          if (!localStorage.getItem("defaultMenu")) {
            if (res.data[0].thirdMenus && res.data[0].thirdMenus.length) {
              this.defaultMenu = this.defaultMenu
                ? this.defaultMenu
                : res.data[0].thirdMenus[0].url;
              this.$router.push({
                path: this.defaultMenu,
              });
            } else {
              this.defaultMenu = this.defaultMenu
                ? this.defaultMenu
                : res.data[0].url;
              this.$router.push({
                path: this.defaultMenu,
              });
            }
            localStorage.setItem("defaultMenu", this.defaultMenu);
          }
        }
      });
    },
    // 切换tab页签获取对应的左侧二级导航菜单
    handleClick() {
      localStorage.setItem("activeName", this.activeName);
      localStorage.removeItem("defaultMenu");
      this.defaultMenu = "";
      this.getFindSecondMenus();
    },
    // 将左侧二级导航菜单存储到本地，这样刷新之后就还是当前页面
    handleSelect(key, keyPath) {
      this.defaultMenu = key;
      localStorage.setItem("defaultMenu", key);
    },
    quitloging() {
      this.$store.commit("romoveUserInfo");
      this.$router.push({
        path: "/login",
      });
    },

    openUserCenter() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.showUserCenter = true;
    },

    closeUserCenter() {
      this.timer = setTimeout(() => {
        this.showUserCenter = false;
      }, 200);
    },

    openChangePsdDialog() {
      this.showChangePsdDialog = true;
    },

    closeChangePsdDialog() {
      this.changePsdForm.oldPassWord = "";
      this.changePsdForm.newPassWord = "";
      this.showChangePsdDialog = false;
    },

    changePsd() {
      if (!this.changePsdForm.oldPassWord.trim()) {
        this.$message.error("请输入原密码");
        return;
      }

      if (!this.changePsdForm.newPassWord.trim()) {
        this.$message.error("请输入新密码");
        return;
      }

      updatePassword(this.changePsdForm)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.closeChangePsdDialog();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
    },
  },

  async created() {
    await this.getFindFirstMenus();
    if (localStorage.getItem("activeName")) {
      this.activeName = localStorage.getItem("activeName");
    }

    await this.getFindSecondMenus();
    if (localStorage.getItem("defaultMenu")) {
      this.defaultMenu = localStorage.getItem("defaultMenu");
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  height: 58px !important;
  padding: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  // width: 24rem;
  height: 58px;
}

.el-aside {
  min-height: calc(100vh - 58px);
  background: #fff;
  .active-second-menu {
    color: #3446aa;
    font-weight: 500;
    .el-icon-menu {
      color: #3446aa;
    }
  }
}

.logo {
  width: 2.3333rem;
}
.logo-img {
  width: 3.5rem;
  height: 1.0833rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-menu {
  width: 17.5rem;
}

.el-tabs /deep/ .el-tabs__header {
  margin: 0;
}

.el-tabs /deep/ .el-tabs__nav-wrap::after {
  background-color: transparent;
}

.avatar-wrap {
  display: flex;
  align-items: center;
  position: relative;
  .user-center {
    padding: 20px;
    position: absolute;
    bottom: -200px;
    right: 30px;
    z-index: 100;
    width: 300px;
    height: 190px;
    border-radius: 4px;
    background: #ffffff;
    border: 1px solid #e5e6eb;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
    .userinfo {
      display: flex;
      align-items: center;
      height: 24px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #86909c;
      .username {
        font-size: 16px;
        font-family: PingFangSC-Medium;
        color: #1d2129;
        padding-right: 8px;
      }
    }
    .role-list {
      margin-top: 6px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      line-height: 18px;
      color: #86909c;
    }
    .line {
      margin: 16px 0;
      width: 100%;
      height: 1px;
      background: #f2f3f5;
    }
    .link-btn {
      margin-bottom: 16px;
      height: 20px;
      line-height: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #1d2129;
      cursor: pointer;
    }
  }
}

.avtor-name {
  font-family: Roboto-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.85);
}

.avtor-img {
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 0.1667rem;
  margin-right: 0.7333rem;
  border-radius: 50%;
}

.el-container-wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-container-inner {
  height: 0;
  flex: 1;
}

.el-main {
  padding: 16px;
  padding-top: 0;
  background-color: #e9eef3;
}
.quit {
  padding: 0.2167rem 0.2833rem 0.3833rem 0.2833rem;
  box-sizing: border-box;
  text-align: center;
  width: 3rem;
  height: 4.6667rem;
  border-radius: 0.05rem;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0px 3px 14px 2px rgba(0, 0, 0, 0.05),
    0px 8px 10px 1px rgba(0, 0, 0, 0.06), 0px 5px 5px -3px rgba(0, 0, 0, 0.1);
  h2 {
    // width: 1.1667rem;
    width: 100%;
    text-align: center;
    height: 0.3667rem;
    font-family: PingFangSC-Medium;
    font-size: 0.2333rem;
    font-weight: 500;
    line-height: 0.3667rem;
    letter-spacing: 0px;
    color: #ffffff;
  }
  h3 {
    // width: 70px;
    width: 100%;
    text-align: center;
    height: 0.3667rem;
    font-family: PingFangSC-Regular;
    font-size: 0.2333rem;
    font-weight: normal;
    line-height: 0.3667rem;
    letter-spacing: 0px;
    color: #c1c1c1;
  }
  div {
    border-bottom: 1px solid #d8d8d8;
    p {
      width: 100%;
      height: 0.3667rem;
      font-family: PingFangSC-Regular;
      font-size: 0.1333rem;
      font-weight: normal;
      line-height: 0.3667rem;
      letter-spacing: 0px;
      color: #ffffff;
      font-size: 10px;
      transform: scale(0.83333);
      transform-origin: 0 0;
      white-space: nowrap;
    }
  }
  .quit-text {
    width: 100%;
    text-align: left;
    padding-left: 0.1667rem;
    box-sizing: border-box;
  }
  button {
    margin-top: 0.3167rem;
    width: 1.65rem;
    border-radius: 0.5rem;
    background: #999999;
  }
}

.item {
  margin-bottom: 16px;
}
</style>
