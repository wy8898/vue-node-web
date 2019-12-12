<template>
  <div>
    <vue-header></vue-header>
    <vue-bread>
      <span slot="bread">订单确认</span>
    </vue-bread>

    <div class="content">

      <el-steps :active="2">
        <el-step title="地址确认"></el-step>
        <el-step title="订单确认"></el-step>
        <el-step title="支付"></el-step>
      </el-steps>

      <div class="orderConfirm">
        <el-table
          :data="cartList"
        >

          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" alt="">
            </template>
          </el-table-column>

          <el-table-column
            prop="productName"
            label="名称">
          </el-table-column>

          <el-table-column
            label="价格">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.productPrice | currency('$')}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="productNum"
            label="数量">
          </el-table-column>

          <el-table-column
            label="总价">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.productPrice *  scope.row.productNum | currency('$') }}</span>
            </template>
          </el-table-column>

        </el-table>

      </div>

      <div class="next flex-wrap flex-center-between">
        <router-link to="/address">上一步</router-link>

        <div>
          <div>
            <p>总价:<span>{{totalPrice | currency('$')}}</span></p>
            <p>配送费:<span>{{shipping | currency('$')}}</span></p>
            <p>优惠券:<span>{{discount | currency('$')}}</span></p>
            <p>税:<span>{{tax | currency('$')}}</span></p>
            <p class="totalPrice">总价:<span>{{orderTotalPrice | currency('$')}}</span></p>
          </div>
          <a href="javascript:;" @click="payMent">下一步</a>
        </div>

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
        name: "OrderConfirm",
        components: {
            VueHeader,
            VueBread,
            VueFooter,
            VueModal
        },
        data() {
            return {
                userInfo: {},
                cartList: [],
                loginShow: false,
                shipping:100,
                discount:200,
                tax:400,
                totalPrice:0,
                orderTotalPrice:0,
            }
        },
        created() {
            if (this.$store.state.userInfo !== "null") {
                this.userInfo = this.$store.state.userInfo;
                this.uaerCartList()
            } else {
                this.loginShow = true
            }
        },
        computed:{

        },
        methods: {
            uaerCartList() {

                this.$get("/cart/list", {
                    userId: this.userInfo.userId
                }).then(res => {
                    if (res.status === 0) {
                        this.cartList = res.result.cartList
                        this.cartList.forEach((item) => {
                            this.totalPrice += parseFloat(item.productPrice) * parseInt(item.productNum)
                        });

                        this.orderTotalPrice = this.totalPrice + this.shipping - this.discount + this.tax
                    } else {
                        this.cartList = [];
                    }
                })

            },
            payMent(){
                var addressId = this.$route.query.addressId;
                this.$post("/order/payment", {
                    userId: this.userInfo.userId,
                    addressId:addressId,
                    orderTotal:this.orderTotalPrice
                }).then(res => {
                    if(res.status === 0){
                        this.$router.push({
                            path:'/orderSuccess?orderId=' + res.result.orderId
                        })
                    }
                })
            },
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

    .orderConfirm{
      margin: 50px 0;
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


<style lang="scss" >
  .orderConfirm {

    .el-table {

      thead tr {
        background-color: #f5f7fa;
      }

      th, td {
        text-align: center;
      }

      img {
        width: auto;
        height: 80px;
      }

    }
  }
</style>
