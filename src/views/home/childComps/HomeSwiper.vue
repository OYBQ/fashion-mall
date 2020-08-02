<template>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.title" @load="imageLoad">
        <a :href="item.link">
          <img :src="item.image"/>
        </a>
      </swiper-item>
    </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type:Array,
            default() {
                return []
            }
        }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
      // console.log('---------------------');
      // this.$emit('swiperImageLoad')
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
    
  },
}
</script>
<style scope>
    
</style>