<template>
    <div class="p-4 flex flex-col space-y-2">
        <DescriboCrateBuilder />
    </div>
</template>

<script setup>
import { reactive } from "vue";

const data = reactive({
    loading: false,
    select: {
        crate: undefined,
        profile: undefined,
    },
    selectedCrate: undefined,
    selectedProfile: undefined,
});
</script>
