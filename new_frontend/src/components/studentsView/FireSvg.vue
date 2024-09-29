<template>
    <dotlottie-player 
        src="https://lottie.host/00580a38-0ddf-4607-8ce9-41731c193bc0/p2tDDuAC1Q.json"
        background="transparent" 
        speed="1" 
        style="width: 200px; height: 200px;" 
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
