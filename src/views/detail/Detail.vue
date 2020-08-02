<template>
<div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
        <detail-Swiper :topImages=topImages></detail-Swiper>
        <detail-base-info :goods = 'goods'></detail-base-info>
        <detail-shop-info :shop='shop'></detail-shop-info>
        <detail-goods-info :detail-info = 'detailInfo'></detail-goods-info>
        <detail-param-info :param-info = 'paramInfo'></detail-param-info>
        <detail-comment-info :comment-info = 'commentInfo'></detail-comment-info>
        <goods-list :goods= 'recommends' ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart = 'addCart' @buyNow = 'buyNow'></detail-bottom-bar>
    

</div>
    
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
 import GoodsList from 'components/content/goods/GoodsList'

import { getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
export default {
    name: "Detail",
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: []
            
        }
    },
    created() {
        //拿到当前路由页面地址栏中的图片id
        this.iid = this.$route.params.iid

        //根据iid请求详情页数据
        getDetail(this.iid).then(res => {
            //1 获取顶部轮播图的数据
            // console.log(res);
            const data = res.result
            this.topImages = data.itemInfo.topImages

            //2 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 创建店铺信息
            this.shop = new Shop(data.shopInfo)
             // 获取商品详情信息
            this.detailInfo = data.detailInfo
            // 获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            // 获取评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
            // 请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            });
        })

    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar
    },
    methods: {
        // 判断图片加载完成，刷新可滚动区域
        imgLoad() {
            this.$refs.scroll.refresh()
        },
         // 加入购物车
        addCart() {
        // 获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            // 放入到购物车中
            if(product.iid){
            this.$store.dispatch('addCart',product).then(res => {
              this.$toast.show(res, 1500)
            })}else {
              this.$toast.show('添加失败请刷新重试', 1500)
            }
      },
      buyNow() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 放入到购物车中
        if(product.iid){
        this.$store.dispatch('buyNow',product).then(res => {
          this.$toast.show(res, 1500)
          this.$router.push('/cart')
        })}else {
          this.$toast.show('添加失败请刷新重试', 1500)
        }
      }
    }

}
</script>
<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
 }

.content {
    height: calc(100% - 100px);
    overflow: hidden;
    position: absolute;
    top:44px;

}

</style>