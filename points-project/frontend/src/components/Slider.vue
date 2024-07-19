<template>
    <div class="slide-holder" ref="slider">
        <div v-for="team in teams" :key="team.id" class="slide" @click="selectTeam(team)" :style="{ backgroundImage: `url(/assets/${team.filename})` }">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { nextTick } from 'vue';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';
import 'slick-carousel';

export default {
    name: 'SliderList',
    data() {
        return {
            teams: []
        };
    },
    async mounted() {
        await this.fetchTeams();
        await nextTick();
        this.initializeSlider();
    },
    methods: {
        async fetchTeams() {
            try {
            const response = await axios.get('http://localhost:3000/api/starter_teams');
            this.teams = response.data;
            } catch (error) {
            console.error('There was an error fetching the teams!', error);
            }
        },
        initializeSlider() {
            $(this.$refs.slider).slick({
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                // autoplay: true,
                // autoplaySpeed: 4000
            }).on('afterChange', (event, slick, currentSlide) => {
                this.selectTeam(this.teams[currentSlide]);
            });
        },
        selectTeam(team) {
            this.$emit('teamSelected', team);
        }
    }
};
</script>

<style>
.slide-holder {
    border-radius: 10px;
    height: fit-content;
    background-color: #3a3b4b;
    width: min(30%, 385px);
}
.slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: white;
    border-radius: 10px;
    height: 593px;
    width: 100%;
    background-size: 100% 100%;
    background-position: center;
}
.slick-dots li button:before {
    color: white;
}
.slick-dots li.slick-active button:before {
    color: white;
}
</style>

