<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
          <!-- 轮播图 -->
        <home-swiper :banners="banners" @swiperImageLoad= "swiperImageLoad"></home-swiper>

        <!-- 推荐 -->
        <recommend-view :recommends=recommends></recommend-view>

        <!-- 本周推荐 -->
        <feature-view></feature-view>

        <tab-control 
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"
        :class="{fixed: isTabFixed}"
        >
        </tab-control>
        <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from 'common/utils'






export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,  
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY: 0

    };
  },
  created() {
    //1 请求多个数据，
    // 这里一定要加this，代表使用methods中的getHomeMultidata()方法，不加this则代表使用导入进来的getHomeMultidata()函数
    this.getHomeMultidata()  

   
    //2请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    
      

  },
  mounted() {
    //3监听item中图片加载完成
    // this.$bus.$on('itemImageLoad', () => {
    //   console.log('-----------');
    //   this.$refs.scroll.refresh()
    // })

    //图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

    //获取tabControl的tabOffsetTop
    //所有组件都有一个属性  $el: 用于获取组件中的元素

    
    
  },
  methods: {

    // 事件监听相关的方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }

    },

    backClick(){
       this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      //1 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      //2 决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    //监听上拉加载更多事件
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop

    },


    // 网络请求相关的方法
    getHomeMultidata() {
       getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
      
      })
    },
    getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page + 1;

        this.$refs.scroll.finishPullUp()
      })
    }
    
  },
  computed: {
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY
    },
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position:sticky ;
  top: 44px;
  z-index: 9;
}
/* .tab-control {
  position: relative;
  z-index: 9;
} */

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
