<template>
  <div>

    <vue-header></vue-header>
    <vue-bread>
      <span slot="bread">12</span>
    </vue-bread>

    <div class="content">
      <div class="flex-wrap flex-center-between">
        <div class="cur"></div>
        <div class="cur" @click="productSort">{{sort ? '升序' : '降序'}}</div>
      </div>

      <div class="productList">
        <div v-for="item in productList.list">
          <div class="img">
            <img :src="item.img" :alt="item.name">
          </div>
          <p>{{item.name}}</p>
          <div class="flex-wrap flex-center-between">
            <h3>￥{{item.price}}</h3>
            <button class="addCart">加入购物车</button>
          </div>
        </div>
      </div>

      <el-pagination
        :page-size="9"
        layout="prev, pager, next"
        :total="10">
      </el-pagination>

    </div>


    <vue-footer></vue-footer>

  </div>
</template>
<script>
    import VueHeader from '@/components/header'
    import VueBread from '@/components/bread'
    import VueFooter from '@/components/footer'

    export default {
        name: 'ProductList',
        components: {
            VueHeader,
            VueBread,
            VueFooter
        },
        data() {
            return {
                productList: [],
                page:1,
                pageSize:9,
                sort:false
            }
        },
        mounted(){
            this.getproductList()
        },
        methods: {
            getproductList() {
                let params = {
                    page:this.page,
                    pageSize:this.pageSize,
                    sort:this.sort ? 1 : -1
                };

                this.$get("/product",params).then(data => {
                    if (data.status === 0) {
                        this.productList = data.result;
                        console.log(this.productList)
                    } else {
                        this.productList = [];
                    }
                })
            },
            productSort(){
                this.sort = !this.sort;
                this.productList=[];
                this.getproductList()
            }
        }
    }
</script>

<style scoped lang="scss">

  .content{
    margin: 80px 220px;
  }

  .cur{
    cursor: pointer;
  }
.productList{
  display: flex;
  flex-wrap: wrap;

  &>div{
    width: 22%;
    margin:5%;


    .img{
      height: 260px;
      text-align: center;
      img{
        width: auto;
        height: 100%;
      }
    }
    p{
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      margin: 40px 0 20px;
    }

    .addCart{
      float: right;
      background: white;
      border: 1px solid #2c3e50;
      padding: 5px 8px;
      border-radius: 8px;
    }
  }
}
</style>
