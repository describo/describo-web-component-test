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
                <li>{{ crate }}</li>
                <li>{{ profile }}</li>
                <li>{{ lookup }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {computed, reactive, watch} from "vue";
import DescriboCrateBuilder from "./Shell.component.vue";


// get the configuration from globalThis and set it inside this component
// const $this = globalThis.DescriboCrateBuilderConfiguration;
//
// @marcolarosa: I suggest passing the name of the config via a prop. This way we could theoretically have multiple components on
//  screen with different configs, and it is the responsibility of the caller to avoid name clashes.
//
//  Another issue: I don't know if $this is reactive here or not. The React test app now updates the contents of
//  globalThis[props.config] when the "Change crate" button is clicked, but the vue side doesn't change.
//
const props = defineProps({
    config: String
});

const $this = globalThis[props.config];
let crate = computed(() => $this.crate);
let profile = computed(() => $this.profile);
let lookup = computed(() => $this.lookup);
let enableContextEditor = computed(() => $this?.config?.enableContextEditor ?? true);
let enableCratePreview = computed(() => $this?.config?.enableCratePreview ?? true);
let enableBrowseEntities = computed(() => $this?.config?.enableBrowseEntities ?? true);
let enableTemplateSave = computed(() => $this?.config?.enableTemplateSave ?? false);
let readonly = computed(() => $this?.config?.readonly ?? false);
</script>
