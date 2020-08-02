<template>
<div>
    <nav-bar>
        <div slot="left" class="back" @click="detailBackClick">
            <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="title">
            <div v-for="(item, index) in title" 
            :key="item" 
            class="title-item"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)"
            >{{item}}</div>
        </div>
    </nav-bar>

</div>
    
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    data() {
        return {
            title:['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    components: {
        NavBar

    },
    methods: {
        //获取当前点击导航栏的索引值
        titleClick(index) {
            this.currentIndex = index

        },
        detailBackClick() {
            this.$router.back()
        }

    }
    
}
</script>
<style scoped>
.title {
    display: flex;
    font-size: 13px;
}
.title-item {
    flex: 1;
}
.active {
    color: var(--color-high-text);

}
.back img{
    margin-top: 11PX;
}

</style>