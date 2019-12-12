<template>
<div>

  <el-dialog
    :visible.sync="mdShow"
    class="modal"
    :before-close="closeModal">
    <div class="header">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="massge"></slot>
    </div>
    <div class="footer">
      <slot name="btn"></slot>
    </div>
  </el-dialog>

</div>
</template>

<script>
    export default {
        name: "modal",
        props:["mdShow"],
        data() {
            return {
            }
        },
        methods:{
            closeModal(){
                this.$emit("close");
            }
        }
    }
</script>

<style lang="scss">
  .modal{

    &>div{
      max-width: 400px;

      .el-dialog__body{
        padding: 0 20px 30px;

        div.header{
          p.title{
            text-align: center;
            font-size: 18px;
            margin: 0;
          }
        }

        div.content{
          text-align: center;
          margin: 30px 0;

            img{
              width: 50px;
            }
        }

        div.footer{
          &>div{
            display: flex;
            justify-content: space-between;
            a{
              width: 40%;
              text-align: center;
              padding: 8px 0;
              border-radius:4px;

              &:first-child{
                border:1px solid #F4436C;
                background: #F4436C;
                color: white;
              }

              &:last-child{
                border:1px solid #F4436C;
              }
            }
          }

          button{
            display: block;
            width: 80%;
            margin:  0 auto;
            background: #F4436C;
            color: white;
            border: none;
            padding: 10px 0;
            cursor: pointer;
          }

        }

      }

    }
  }
</style>
