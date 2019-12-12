<template>
<div>
  <vue-header></vue-header>
  <vue-bread>
    <span slot="bread">我的地址</span>
  </vue-bread>

  <div class="content">

    <el-steps :active="0">
      <el-step title="地址确认"></el-step>
      <el-step title="订单确认"></el-step>
      <el-step title="支付"></el-step>
    </el-steps>


    <div class="address">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="item in addressListFilter"  >
          <el-card shadow="hover" :class="cheackAddressId === item.addressId ? 'active' : null">

            <div class="addressCard" @click="cheackAddressId = item.addressId">
              <div>
                <p class="name">{{item.userName}}</p>
                <p class="location">{{item.streetName}}</p>
              </div>

              <div class="flex-wrap flex-center-between">
                <div>
                  <p class="tel">{{item.tel}}</p>
                  <span class="default" v-if="item.isDefault">默认地址</span>
                  <span class="default" v-else @click="setDefault(item)">设置默认地址</span>
                </div>
                <img class="dele" @click="deleAddressShow = true;addressId = item.addressId" src="https://i.52112.com/icon/jpg/256/20190514/39600/1888990.jpg" alt="">
              </div>
            </div>

          </el-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <el-card shadow="hover">
            <div class="addressCard add">
              <img src="https://i.52112.com/icon/jpg/256/20190722/49372/2263324.jpg" alt="">
              <p>添加地址</p>
            </div>
          </el-card>
        </el-col>

      </el-row>

      <div class="showALL" v-if="limit < addressList.length" @click="limit === 3 ?  limit = addressList.length : limit = 3">{{limit === 3 ? "显示全部" : "收起"}} <i :class="limit === 3 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></div>
    </div>

    <div class="next">
      <router-link v-if="cheackAddressId" :to="{path: '/orderConfirm', query: { addressId: cheackAddressId }}">下一步</router-link>
      <a v-else href="Javascript:;" class="disabled">下一步</a>
    </div>

  </div>

  <VueModal :mdShow="loginShow" v-on:close="closeModal">
    <p class="title" slot="title">登录提醒</p>
    <p slot="massge">请先登录</p>
    <button slot="btn" @click="loginShow = false">关闭</button>
  </VueModal>

  <VueModal :mdShow="deleAddressShow" v-on:close="closeModal">
    <p class="title" slot="title">删除提醒</p>
    <p slot="massge">确认删除地址吗？</p>

    <div slot="btn">
      <a href="javascript:;" @click="deleAddress">删除</a>
      <a href="javascript:;" @click="deleAddressShow = false">取消</a>
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
        name: "Address",
        components: {
            VueHeader,
            VueBread,
            VueFooter,
            VueModal
        },
        data() {
            return {
                loginShow:false,
                deleAddressShow:false,
                deleSccshow:false,
                addressList:[],
                addressId:"",
                limit:3,
                cheackAddressId:null,
            }
        },
        created() {
            if (this.$store.state.userInfo !== "null") {
                this.userInfo = this.$store.state.userInfo;
                this.uaerAddressList()
            } else {
                this.loginShow = true
            }
        },
        computed:{
            addressListFilter(){
                return this.addressList.slice(0,this.limit);
            }
        },
        methods: {
            uaerAddressList() {

                this.$get("/address/list", {
                    userId: this.userInfo.userId
                }).then(res => {
                    if (res.status === 0) {
                        this.addressList = res.result.addressList
                        res.result.addressList.forEach((val) => {
                            if(val.isDefault){
                                this.cheackAddressId = val.addressId
                            }
                        })
                    } else {
                        this.addressList = [];
                    }
                })
            },
            setDefault(item){
                this.$post("/address/setdefault", {
                    userId: this.userInfo.userId,
                    addressId: item.addressId
                }).then(res => {
                    this.uaerAddressList()
                })
            },
            deleAddress(item){
                this.$post("/address/delete", {
                    userId: this.userInfo.userId,
                    addressId: this.addressId
                }).then(res => {
                    if (res.status === 0) {
                        this.deleAddressShow = false;
                        this.deleSccshow = true;
                        this.uaerAddressList()
                    }
                })
            },
            closeModal() {
                this.loginShow = false;
                this.deleAddressShow = false;
                this.deleSccshow = false;
            }
        }
    }
</script>

<style scoped  lang="scss">
.content{
  margin: 80px 220px;
  min-height: 800px;

  .address{
    margin-top: 50px;

    .el-col{
      margin-bottom: 30px;
      cursor: pointer;

      .el-card.active{
        border: 1px solid #F4436C;
      }

      .addressCard{
        min-height: 120px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }

      .name{
        font-size: 20px;
        margin-bottom: 5px;
      }

      .location{
        font-size: 14px;
      }

      .tel{
      }

      .default{
        color: #F4436C;
        font-size: 14px;
      }

      .dele{
        width: 25px;
      }

      .add{
        display: block;
        text-align: center;
        img{
          width: 60px;
          margin: 20px auto 10px;
        }
      }
    }

    .showALL{
      text-align: center;
      margin-top: 30px;
      cursor: pointer;
    }

  }

  .next{
    text-align: right;
    margin-top: 100px;
    a{
      background: #F4436C;
      color: white;
      padding: 10px 20px;
    }
  }
}
</style>
