<template>
  <div>
    <vue-header></vue-header>
    <vue-bread>
      <span slot="bread">12</span>
    </vue-bread>

    <div class="content">
      <div class="flex-wrap flex-center-between">
        <div class="cur">
          <ul class="filter flex-wrap flex-center-between">
            <li @click="filterprice(null,null)">all</li>
            <li @click="filterprice(0,200)">0.00 — 200.00</li>
            <li @click="filterprice(200,700)">200.00 — 700.00</li>
            <li @click="filterprice(700,1000)">700.00 — 1000.00</li>
          </ul>
        </div>

        <div class="cur" @click="productSort">金额&nbsp; {{sort ? '↑' : '↓'}}</div>
      </div>

      <div class="productList">
        <div class="item" v-for="item in productList">
          <div class="img">
            <img :src="item.productImg" :alt="item.productName">
          </div>
          <p>{{item.name}}</p>
          <div class="flex-wrap flex-center-between">
            <h3>￥{{item.productPrice}}</h3>
            <button class="addCart" @click="addCart(item.productId)">加入购物车</button>
          </div>
        </div>
      </div>
    </div>

    <div class="loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <img class="loadingimg" v-if="!busy" src="http://static.xuanbiaoqing.com/image/create/loading/default.gif" alt="">
    </div>

    <VueModal :mdShow="mdShow">
        <p slot="title">
          登录提醒
        </p>

        <p slot="massge">
          加入购物车请先登录
        </p>

      <button slot="btn">关闭</button>
    </VueModal>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
    import VueHeader from '@/components/header'
    import VueBread from '@/components/bread'
    import VueFooter from '@/components/footer'
    import infiniteScroll from 'vue-infinite-scroll'
    import VueModal from '@/components/modal'

    export default {
        name: 'ProductList',
        directives: {infiniteScroll},
        components: {
            VueHeader,
            VueBread,
            VueFooter,
            VueModal
        },
        data() {
            return {
                productList: [],
                page: 0,
                pageSize: 6,
                sort: null,
                busy: false,
                priceMin:null,
                priceMax:null,
                mdShow:false,
                userInfo:{}
            }
        },
        created() {
            if(this.$cookies.get("userId")){
                this.userInfo = this.$cookies.get("userId")
            }
        },
        methods: {
            getproductList(flag) {
                let params = {
                    page: this.page,
                    pageSize: this.pageSize
                };

                if(this.sort != null){
                    params.sort = this.sort ? 1 : -1
                }

                if(this.priceMin != null && this.priceMax != null){
                    params.priceMin = this.priceMin;
                    params.priceMax = this.priceMax;
                }

                this.$get("/product/list", params).then(res => {
                    if (res.status === 0) {
                        if (flag) {
                            this.productList = this.productList.concat(res.result.list);
                            if (res.result.count === this.pageSize) {
                                this.busy = false;
                            } else {
                                this.busy = true;
                            }
                        } else {
                            this.productList = res.result.list
                        }

                    } else {
                        this.productList = [];
                    }
                })
            },
            productSort() {
                this.busy=false;
                this.sort = !this.sort;
                this.page = 1;
                this.productList = [];
                this.getproductList();
            },
            loadMore() {
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getproductList(true);
                }, 500);
            },
            filterprice(min,max){
                this.busy=false;
                this.priceMin = min;
                this.priceMax = max;
                this.page = 1;
                this.productList = [];
                this.getproductList();
            },
            addCart(productId){
                if(this.$cookies.get("userId")){
                    this.$post("/product/addCart", {
                        userId:this.userInfo.userId,
                        productId:productId
                    }).then(res => {
                        if (res.status === 0) {
                            this.$message({
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('错了哦，添加失败');
                        }
                    })
                }else{
                    this.mdShow = true;
                }

            }
        }
    }
</script>

<style scoped lang="scss">
  .content {
    margin: 80px 220px;
  }

  .cur {
    cursor: pointer;
  }

  .filter{
    li{
      margin-right: 50px;
      &:hover{
        color: #F4436C;
      }
    }
  }
  .productList {

    &::after{
      clear: both;
      content: "";
      height: 0;
      display: block;
    }

    & > div {
      float: left;
      width: 22%;
      margin: 5%;

      .img {
        height: 260px;
        text-align: center;

        img {
          width: auto;
          height: 100%;
        }
      }

      p {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        margin: 40px 0 20px;
      }

      .addCart {
        float: right;
        background: white;
        border: 1px solid #2c3e50;
        padding: 5px 8px;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }

  .loadingimg {
    display: block;
    width: 40px;
    margin: 0 auto;
  }
</style>
