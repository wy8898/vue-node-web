<template>
  <div>
    <vue-header></vue-header>
    <vue-bread>
      <span slot="bread">我的购物车</span>
    </vue-bread>


    <div class="cart content">
      <el-table
        :data="cartList"
        ref="multipleTable"
        @selection-change="selectChange"
        @select-all="selectChange"
      >

        <el-table-column
          type="selection">
        </el-table-column>

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
          label="数量">
          <template slot-scope="scope">
            <el-input-number size="mini" v-model="scope.row.productNum" :min="1"
                             @change="editCart(scope.row)"></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          label="总价">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.productPrice *  scope.row.productNum | currency('$') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleCartShow=true; productId=scope.row.productId; deletype='2'">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="cartfoot">
        <div class="left" @click="deleCartShow=true; deletype='1'">删除选中</div>
        <div class="right">
          <span>总价:<b>{{totalPrice() | currency('$')}}</b></span>
          <a href="javascript:;" @click="checkOut">结算</a>
        </div>
      </div>

    </div>

    <VueModal :mdShow="loginShow" v-on:close="closeModal">
      <p class="title" slot="title">登录提醒</p>
      <p slot="massge">请先登录</p>
      <button slot="btn" @click="loginShow = false">关闭</button>
    </VueModal>

    <VueModal :mdShow="deleCartShow" v-on:close="closeModal">
      <p class="title" slot="title">删除提醒</p>
      <p slot="massge">确认删除商品吗？</p>

      <div slot="btn">
        <a href="javascript:;" @click="delecart">删除</a>
        <a href="javascript:;" @click="deleCartShow = false">取消</a>
      </div>
    </VueModal>

    <VueModal :mdShow="deleSccshow" v-on:close="closeModal">
      <p class="title" slot="title">成功提醒</p>
      <div slot="massge">
        <img src="https://static.easyicon.net/preview/114/1147445.gif" alt="">
      </div>
      <button slot="btn" @click="deleSccshow = false">关闭</button>
    </VueModal>

    <vue-footer></vue-footer>
  </div>
</template>

<script>
    import VueHeader from '@/components/header'
    import VueBread from '@/components/bread'
    import VueFooter from '@/components/footer'
    import VueModal from '@/components/modal'

    export default {
        name: 'Cart',
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
                deleCartShow: false,
                productId: "",
                deleSccshow: false,
                checkBoxData:[],
                deletype:0
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
        methods: {
            uaerCartList() {
                console.log(this.userInfo)

                this.$get("/cart/list", {
                    userId: this.userInfo.userId
                }).then(res => {
                    if (res.status === 0) {
                        this.cartList = res.result.cartList;
                    } else {
                        this.cartList = [];
                    }
                })

            },
            delecart() {

                if(this.deletype === 1){
                    this.deleCartShow = false;
                    console.log("没有接口")
                }else{
                    this.$post("/cart/delete", {
                        userId: this.userInfo.userId,
                        productId: this.productId
                    }).then(res => {
                        if (res.status === 0) {
                            this.$store.commit("updataCartCount")
                            this.deleCartShow = false;
                            this.deleSccshow = true;
                            this.uaerCartList()
                        }
                    })
                }

            },
            closeModal() {
                this.loginShow = false;
                this.deleCartShow = false;
                this.deleSccshow = false;
            },
            editCart(e) {
                this.$post("/cart/update", {
                    userId: this.userInfo.userId,
                    productId: e.productId,
                    productNum: e.productNum
                }).then(res => {
                    if (res.status === 0) {
                        this.$store.commit("updataCartCount")
                    }
                })
            },
            selectChange(val){
                this.checkBoxData = val;
            },
            totalPrice(){
                var money = 0;
                this.checkBoxData.forEach((item) => {
                    money += parseFloat(item.productPrice) * parseInt(item.productNum)
                })
                return money
            },
            checkOut(){
                if(!this.checkBoxData.length) return false;

                this.$router.push('/address')
            }
        }
    }
</script>

<style lang="scss" >
  .cart {
    margin: 80px 220px;
    min-height: 800px;

    h3 {
      text-align: center;
    }

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

    .cartfoot {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #9b9b9b;
      padding: 50px 0px;

      & > div.left {
        font-size: 14px;
        margin-left: 15px;
        cursor: pointer;

        &:hover {
          color: #F4436C;
        }
      }

      & > div.right {
        span {
          b {
            color: #F4436C;
            margin-left: 10px;
            font-size: 20px;
          }
        }

        a {
          background: #F4436C;
          color: white;
          padding: 10px 50px;
          margin-left: 20px;
        }
      }
    }
  }
</style>
