<template>
    <div class="slide-holder" ref="slider">
        <div v-for="team in teams" :key="team.id" class="slide" :style="{ backgroundColor: team.color }">
            {{ team.name }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';
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
    created() {
        this.fetchTeams();
    },
    updated() {
        this.$nextTick(() => {
            this.initSlider();
        });
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
        initSlider() {
            if (this.teams.length) {
            $(this.$refs.slider).not('.slick-initialized').slick({
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 3000
            });
            }
        }
    }
};
</script>

<style>
.slide-holder {
    border: 1px solid #304963;
    border-radius: 10px;
    height: 360px;
    background-color: #304963;
    width: min(30%, 385px);
}
.slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: white;
    border-radius: 10px;
    height: 360px;
}
</style>
