<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div>
            <RouterLink class="link" to="/">
                Ka App
            </RouterLink>

            <RouterLink to="/entreprise">
                by Fabvio R. LOPES
            </RouterLink>
        </div>
    </header>
</template>

<style scoped>
    header {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: #161f17;
        color: #F3F3F3;
        height: 70px;
        width: 100%;
        min-width: 320px;
        border-bottom: 1px solid rgb(32, 32, 44);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        margin-bottom: 50px;
    }

    header div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;
        max-width: 1200px;
    }

    header div .link {
        height: 100%;
        width: max-content;
        color: white;
        font-size: 1.5em;
    }

    header div a {
        color: white;
    }
</style>