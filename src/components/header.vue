<template>
  <div class="header">
    <header class="Head flex-wrap">
      <div class="navlogo flex-wrap flex-align-center">
        <router-link to="/">
          <img src="../assets/logo/Populife_Logo_White.svg">
        </router-link>
      </div>

      <ul class="nav flex-wrap flex-1 flex-content-end flex-align-center">
        <li class="nav-item">
          登录
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created () {
    },
    mounted () {
    },
    methods: {
      NavListTaggle () {
        this.ABOUTNavList = !this.ABOUTNavList
      }
    },
    destroyed () {
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

        &.active{
          background: #333132;
        }

        &:first-child{
          padding: 0 30px;
        }

        &:hover {
          background: #333132;
        }

        &>a{
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

              &.active{
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

      }
    }

    @media only screen and (max-width: 1500px) {
      margin: 0 50px;

      .nav li>div>div{
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

    ul{
      margin: 0 20px;
      background: #1F1D1E;
      border: none;

      li{
        border-bottom: 1px solid  #585858;
        text-align: left;
        padding: 0px !important;

        &:hover{
          a{
            color: #4a4a4a;
          }
        }

        &:first-child{
          border-top: 1px solid #585858;
        }

        a{
          display: block;
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 0;

          &.router-link-exact-active{
            border-bottom: 2px solid  white;
          }
        }
      }
    }

    @media only screen and (max-width: 768px) {
      padding: 20px 0px;
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
</style>
