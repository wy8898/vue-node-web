<template>
  <div>
    <vue-header></vue-header>
    <vue-bread>
      <span slot="bread">订单确认</span>
    </vue-bread>

    <div class="content">

      <el-steps :active="3">
        <el-step title="地址确认"></el-step>
        <el-step title="订单确认"></el-step>
        <el-step title="支付"></el-step>
      </el-steps>

      <div class="orderSuccess">
        <img src="http://pic.616pic.com/ys_img/00/04/02/heYFSMORXg.jpg" alt="">
        <h3>支付成功</h3>
      </div>

      <div class="next">
          <a href="javascript:;" @click="">下一步</a>
      </div>
    </div>

    <vue-footer></vue-footer>

  </div>
</template>

<script>
    import VueHeader from '@/components/header'
    import VueBread from '@/components/bread'
    import VueFooter from '@/components/footer'
    import VueModal from '@/components/modal'

    export default {
        name: "orderSuccess",
        components: {
            VueHeader,
            VueBread,
            VueFooter,
            VueModal
        },
        data() {
            return {
                userInfo: {},
                loginShow: false,
            }
        },
        created() {
            if (this.$store.state.userInfo !== "null") {
                this.userInfo = this.$store.state.userInfo;
            } else {
                this.loginShow = true
            }
        },
        mounted(){
            var orderId = this.$route.query.orderId;
            if(!orderId) return;

            this.$get("/order/detail", {
                userId: this.userInfo.userId,
                orderId: orderId
            }).then(res => {
                if (res.status === 0) {
                    this.$notify({
                        title: '成功',
                        message: '获取用户订单成功',
                        type: 'success'
                    });
                } else if (res.status === 101) {
                    this.$notify.error({
                        title: '错误',
                        message: '当前用户为创建订单'
                    });
                } else if (res.status === 102) {
                    this.$notify.error({
                        title: '错误',
                        message: '订单号输入错误'
                    });
                }
            })
        },
        methods: {
            closeModal() {
                this.loginShow = false;
            }
        }
    }
</script>

<style  lang="scss">
  .content{
    margin: 80px 220px;
    min-height: 800px;

    .orderSuccess{
      text-align: center;
      margin: 100px 0;
    }

    .next{
      text-align: right;
      margin-top: 100px;
      align-items:flex-end;

      div{
        margin-bottom: 30px;
        p{
          line-height: 1.8;
          &.totalPrice{
            margin-top: 20px;
          }

          span{
            display: inline-block;
            margin-left: 20px;
            font-size: 18px;
            color: #F4436C;
            font-weight: bold;
          }
        }
      }

      a{
        display: inline-block;
        background: #F4436C;
        color: white;
        padding: 10px 20px;
      }

    }
  }
</style>
