<template>
    <div class="flex flex-col">
        <describo-crate-builder
            :crate="crate"
            :profile="profile"
            :lookup="lookup"
            :readonly="readonly"
            :enable-context-editor="enableContextEditor"
            :enable-crate-preview="enableCratePreview"
            :enable-browse-entities="enableBrowseEntities"
            :enable-template-save="enableTemplateSave"
        />
        <!-- @beepsoft

            What happens when the crate / profile or any oof these properties change in the
            react layer? I expect that the component above will update to reflect those changes
            as the properties are computed (vue is watching them) but we should check.

        -->

        <div class="flex flex-col bg-yellow-200 p-10 mt-10">
            Function and object values passed from react:
            <ul class="list-disc">
                <!-- Cannot use globalThis here ... -->
                <!-- <li>
                    props.someglobalobject: <b>{{ props.someglobalobject }}</b>
                </li>
                <li>
                    props.someglobalobject value: <b>{{ someglobalobjectValue }}</b>
                </li>
                <li>
                    props.someglobalobject.nameAndAge(): <b>{{ nameAndAge }}</b>
                </li>
                <li>
                    props.someglobalfunction: <b>{{ props.someglobalfunction }}</b>
                </li>
                <li>
                    props.someglobalfunction value: <b>{{ someglobalfunctionValue }}</b>
                </li> -->
                <li>{{ crate }}</li>
                <li>{{ profile }}</li>
                <li>{{ lookup }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import DescriboCrateBuilder from "./Shell.component.vue";

// get the configuration from globalThis and set it inside this component
const $this = globalThis.DescriboCrateBuilderConfiguration;
let crate = computed(() => $this.crate);
let profile = computed(() => $this.profile);
let lookup = computed(() => $this.lookup);
let enableContextEditor = computed(() => $this?.config?.enableContextEditor ?? true);
let enableCratePreview = computed(() => $this?.config?.enableCratePreview ?? true);
let enableBrowseEntities = computed(() => $this?.config?.enableBrowseEntities ?? true);
let enableTemplateSave = computed(() => $this?.config?.enableTemplateSave ?? false);
let readonly = computed(() => $this?.config?.readonly ?? false);

// const props = defineProps({
//     crate: {
//         type: [String, undefined],
//     },
//     profile: {
//         type: [String, undefined],
//     },

//     someglobalfunction: {
//         type: [String, undefined],
//     },
//     someglobalobject: {
//         type: [String, undefined],
//     },
// })

// console.log("Shell.component.wc.vue -- props", props)

// // Callback functions and non-record objects with methods can passed via globalThis
// const someglobalobjectValue = globalThis[props.someglobalobject]
// const someglobalfunctionValue = globalThis[props.someglobalfunction]("called from web component")
// const nameAndAge = globalThis[props.someglobalobject].nameAndAge()
</script>
