<template>
  <div class="header">
    <header class="Head flex-wrap">
      <div class="navlogo flex-wrap flex-align-center">
        <router-link to="/">
          <img src="../assets/logo/Populife_Logo_White.svg">
        </router-link>
      </div>

      <ul class="nav flex-wrap flex-1 flex-content-end flex-align-center">
        <li class="nav-item" @click="loginDialogShow=true" v-if="!loginStatus"> 登录 </li>
        <li class="nav-item" @click="logOut" v-else>{{userInfo.userName}} &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;退出登录 </li>
        <li class="nav-item" ><i class="el-icon-shopping-cart-2">{{cartCount > 0 ? '(' + cartCount + ')' : ''}}</i></li>
      </ul>
    </header>

    <el-dialog
      title="登录"
      :visible.sync="loginDialogShow"
      class="login">
      <form @submit.prevent="submit">

        <div>
          <label><span>用户名：</span><input type="name" v-model="userName"></label>
        </div>

        <div>
          <label><span>密码：</span><input type="password" v-model="userPwd"></label>
        </div>

        <p class="error" v-show="LoginError">用户名或密码错误</p>
        <input class="submit" type="submit" value="提交">
      </form>
    </el-dialog>

    <VueModal :loginShow="loginShow" v-on:close="closeModal">
      <p class="title" slot="title">登录成功</p>
      <div class="login" slot="massge">
        <img src="http://pic.616pic.com/ys_img/00/04/02/heYFSMORXg.jpg" alt="">
      </div>
      <button slot="btn" @click="loginShow = false">关闭</button>
    </VueModal>

  </div>
</template>

<script>
    import VueModal from '@/components/modal'
    var that;
    export default {
        components: {
            VueModal
        },
        data() {
            return {
                loginDialogShow:false,
                userName:"",
                userPwd:"",
                LoginError:false,
                loginStatus:false,
                loginShow:false
            }
        },
        computed:{
            userInfo(){
                return  this.$store.state.userInfo
            },
            cartCount(){
                return  this.$store.state.cartCount
            }
        },
        created() {
            that = this;
            if(this.userInfo !== "null" && this.userInfo !== null){
                this.loginStatus = true;
                this.getCartCount();
                // this.getUserInfo()
            }
        },
        methods: {
            submit(){
                if(that.userName === "" && that.userPwd === "") return false;
                this.$post("/user/login", {
                    name:this.userName,
                    password:this.userPwd
                }).then(res => {
                    if (res.status === 0) {
                        this.loginShow = true;
                        this.$store.commit("updataUserInfo",res.result);

                        this.loginDialogShow = false;
                        this.loginStatus = true;
                    }else{
                        this.LoginError = true
                    }
                })
            },
            logOut(){
                this.$confirm('退出登录, 是否继续?', '退出提醒', {
                    confirmButtonText: '退出',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$post("/user/logout").then(res => {
                        if (res.status === 0) {
                            this.$store.commit("updataUserInfo",null);
                            this.$store.commit("updataCartCount",0);
                            this.loginStatus = false;
                        }
                    })
                })
            },
            getUserInfo(){
                this.$post("/user/info", {
                    userId:this.userInfo.userId
                }).then(res => {
                    if (res.status === 0) {
                        this.$store.commit("updataUserInfo",res.result.count);
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: '系统错误，未获取到用户信息'
                        });
                    }
                })
            },
            getCartCount(){

                this.$get("/cart/count", {
                    userId:this.userInfo.userId
                }).then(res => {
                    if (res.status === 0) {
                        this.$store.commit("updataCartCount",res.result.count);
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: '系统错误，未获取到用户订单'
                        });
                    }
                })

            },
            closeModal(){
                this.loginShow = false;
            }
        }
    }
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    background: white;
    background: #1F1D1E;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);

    &.fixed {
      width: 100%;
      position: fixed;
      left: 0px;
      top: 0px;
      z-index: 9999;
    }
  }

  .Head {
    margin: 0 220px;
    height: 50px;

    .navlogo {
      position: relative;

      div {
        position: absolute;
        height: 16px;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all .5s ease;
        display: none;

        @media only screen and (max-width: 1000px) {
          display: block;
        }

        &::after {
          top: 0px;
        }

        &::before {
          bottom: 0px;
        }

        &::after,
        &::before {
          display: block;
          height: 2px;
          width: 24px;
          position: absolute;
          left: 0px;
          content: '';
          transition: all .5s ease;
          background: white;
        }

        &.active {
          top: 35%;

          &::after {
            transform: translate(0, 14px) rotate(45deg);
          }

          &::before {
            transform: translate(0) rotate(-45deg);
          }

          span {
            transform: scale(0);
          }
        }

        span {
          display: block;
          height: 2px;
          width: 24px;
          position: relative;
          top: 50%;
          right: 0px;
          transform: translateY(-50%);
          transition: all .5s ease;
          display: none;
          background: white;

          &.active {
            transform: rotate(-180deg) translateY(50%);
            color: #F4436C;
          }

          @media only screen and (max-width: 1000px) {
            display: block;
          }

        }

      }

      a {
        height: 34px;
        display: inline-block;
        margin-right: 30px;

        img {
          height: 100%;
        }
      }

      @media only screen and (max-width: 1000px) {
        width: 100%;
        p {
          width: 100%;
          text-align: left;
        }
      }

    }

    .nav {

      @media only screen and (max-width: 1000px) {
        display: none;
      }

      li {
        height: 50px;
        line-height: 50px;
        position: relative;
        color: white;
        font-family: Roboto-Regular;
        font-size: 14px;
        letter-spacing: 0;
        text-transform: uppercase;
        cursor: pointer;

        &.active {
          background: #333132;
        }

        &:first-child {
          padding: 0 30px;
        }

        &:hover {
          background: #333132;
        }

        & > a {
          padding: 0 30px;
          display: block;
          height: 50px;
        }

        & > div {
          width: 100%;
          position: fixed;
          left: 0;
          top: 50px;
          background: #333132;
          color: white;
          text-align: left;

          & > div {
            padding: 50px 220px;

            a {
              display: block;
              line-height: 1.9;
              width: 23.2%;
              margin-left: 2%;
              display: inline-block;
              border-bottom: 1px solid #585858;
              text-align: left;
              padding-bottom: 20px;

              &.active {
                border-bottom: 3px solid white;
              }

              &:first-child {
                margin-left: 0px;
              }

              &:last-child {
                margin-left: 0px;
                margin-top: 50px;
              }

            }

          }

        }

        i{
          font-size: 20px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

      }
    }

    @media only screen and (max-width: 1500px) {
      margin: 0 50px;

      .nav li > div > div {
        padding: 50px 50px;
      }

    }

    @media only screen and (max-width: 1000px) {
      margin: 0 20px;
    }

  }

  .mobileNav {
    position: fixed;
    background: #1F1D1E;
    left: 0px;
    z-index: 999;
    width: 100%;
    height: 100%;

    ul {
      margin: 0 20px;
      background: #1F1D1E;
      border: none;

      li {
        border-bottom: 1px solid #585858;
        text-align: left;
        padding: 0px !important;

        &:hover {
          a {
            color: #4a4a4a;
          }
        }

        &:first-child {
          border-top: 1px solid #585858;
        }

        a {
          display: block;
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 0;

          &.router-link-exact-active {
            border-bottom: 2px solid white;
          }
        }
      }
    }

    @media only screen and (max-width: 768px) {
      padding: 20px 0px;
    }

  }

  .login {
    text-align: center;

    form{
      margin: 0 20%;
      &>div {
        text-align: left;
        margin-top: 20px;

        &>label{
          display: flex;
          justify-content: space-between;
          align-items:center;
        }

        input {
          width: 70%;
          border: 1px solid #cccccc;
          padding: 8px;
        }

      }

      .error{
        text-align: right;
        font-size: 12px;
        margin-top: 5px;
        color: #F4436C;
      }

      .submit{
        margin-top: 30px;
        width: 100%;
        border: none;
        background: #F4436C;
        color: white;
        padding: 8px 0;
        cursor: pointer;
      }
    }
  }

</style>

<style lang="scss">
  .NavList {
    width: 100%;
    top: 100px;
    left: 0px;
    padding: 0px !important;

    div {
      width: 110px;
      margin: 0 auto;
      padding: 45px 0;

      p {
        text-align: center;
        font-family: Roboto-Medium;
        font-size: 20px;
        color: #333132;
        letter-spacing: 0;
        margin-bottom: 15px;
        color: #1C1E4D;

        a {
          font-size: 20px;
          font-family: Roboto-Medium;
          color: #333132;
        }
      }

      a {
        text-align: center;
        display: block;
        font-family: Roboto-Light;
        font-size: 14px;
        color: #cccccc;
        letter-spacing: 0;
        line-height: 24px;
        margin-bottom: 15px;
        cursor: pointer;

        &.active {
          color: #000000;
        }
      }
    }
  }

  .el-dialog {
    max-width: 500px;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
