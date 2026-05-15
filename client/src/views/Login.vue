<template>
  <div>
    <h1>helloWorld</h1>
    <h1>{{ name }}</h1>
    <v-btn color="success" @click="show = !show">switch</v-btn>
    <div v-if="show">
        <CardImg />
    </div>
    <!-- <h1 v-for="(item, index) in item" :key="index">
            {{ item }}
    </h1> -->
    <v-row>
        <v-col cols="3" v-for="(item, index) in item" :key="index">
            <div>
                <v-card width="350">
                <v-img :src="item.imgLink"></v-img>
                <v-card-title primary-title>
                    {{ item.message }}
                </v-card-title>  
                </v-card>
            </div>
        </v-col>
    </v-row>
  </div>
</template>

<script>
import CardImg from '../components/CardImg.vue'
export default {
    components:{
        CardImg
    },
    data(){
        return {
            name: "Santipab",
            show: false,
            item: [
                { message: 'foo', imgLink: 'https://thnic.or.th/wp-content/uploads/2019/12/1_Uuo3NVsm1IjgpcBKG52jxw.png' }, 
                { message: 'bar', imgLink: 'https://thnic.or.th/wp-content/uploads/2019/12/1_Uuo3NVsm1IjgpcBKG52jxw.png' },
                { message: 'bar', imgLink: 'https://thnic.or.th/wp-content/uploads/2019/12/1_Uuo3NVsm1IjgpcBKG52jxw.png' },
                { message: 'bar', imgLink: 'https://thnic.or.th/wp-content/uploads/2019/12/1_Uuo3NVsm1IjgpcBKG52jxw.png' },
                { message: 'bar', imgLink: 'https://thnic.or.th/wp-content/uploads/2019/12/1_Uuo3NVsm1IjgpcBKG52jxw.png' }
            ]
        }
    }
}
</script>

<style>

</style>