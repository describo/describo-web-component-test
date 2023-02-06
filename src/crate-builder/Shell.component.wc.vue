<template>
    <div class="flex flex-col">
        <DescriboCrateBuilder />
        <div class="flex flex-col bg-yellow-200 p-10 mt-10">
            Function and object values passed from react:
            <ul class="list-disc">
                <!-- Cannot use globalThis here ... -->
                <li>props.someglobalobject: <b>{{props.someglobalobject}}</b></li>
                <li>props.someglobalobject value: <b>{{someglobalobjectValue}}</b></li>
                <li>props.someglobalobject.nameAndAge(): <b>{{ nameAndAge }}</b></li>
                <li>props.someglobalfunction: <b>{{props.someglobalfunction}}</b></li>
                <li>props.someglobalfunction value: <b>{{someglobalfunctionValue}}</b></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import DescriboCrateBuilder from "./Shell.component.vue";

const props = defineProps({
    crate: {
        type: [String, undefined],
    },
    profile: {
        type: [String, undefined],
    },

    someglobalfunction: {
        type: [String, undefined],
    },
    someglobalobject: {
        type: [String, undefined],
    },
})

console.log("Shell.component.wc.vue -- props", props)

// Callback functions and non-record objects with methods can passed via globalThis
const someglobalobjectValue = globalThis[props.someglobalobject]
const someglobalfunctionValue = globalThis[props.someglobalfunction]("called from web component")
const nameAndAge = globalThis[props.someglobalobject].nameAndAge()

</script>
