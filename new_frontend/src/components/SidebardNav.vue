<template>
    <div class="leftFullContainer">
        <div class="TeamBubble">
            <TeamBubble />
        </div>
    </div>
</template>

<script>
import TeamBubble from './TeamBubble.vue'

export default {
    name: 'SidebarNav',
    components: {
        TeamBubble
    }
}

</script>

<style>

.leftFullContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: fit-content;
    height: 100%;
    background-color: var(--secondaryBg);
    overflow: scroll;
    color: white;   
}

.TeamBubble {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding-top: 10px;
}

</style>
