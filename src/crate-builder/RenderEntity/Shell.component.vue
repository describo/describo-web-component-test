<template>
    <div class="bg-red-200 p-5">
        <div>inside RenderEntity/Shell.component.vue</div>
        <div>{{ data }}</div>
    </div>
</template>

<script setup>
import { ref } from "vue";

let data = ref("this is some reactive data to test that vue is alive");
</script>
