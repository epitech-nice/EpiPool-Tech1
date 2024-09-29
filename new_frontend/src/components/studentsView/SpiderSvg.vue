<template>
    <dotlottie-player 
        src="https://lottie.host/9d5ec0cf-0124-4c2c-ac56-c946f71eb700/vJUFGTzcBY.json"
        background="transparent" 
        speed="1" 
        style="width: 300px; height: 300px;" 
        loop 
        autoplay>
    </dotlottie-player>
</template>

<script>
export default {
    name: 'LottieAnimation',
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
        script.type = 'module';
        document.body.appendChild(script);
    }
};
</script>