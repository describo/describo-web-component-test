<template>
    <div class="flex flex-col">
        <describo-crate-builder
            :crate="data.crate"
            :profile="data.profile"
            :lookup="data.lookup"
            :readonly="data.readonly"
            :enable-context-editor="data.enableContextEditor"
            :enable-crate-preview="data.enableCratePreview"
            :enable-browse-entities="data.enableBrowseEntities"
            :enable-template-save="data.enableTemplateSave"
        />
        <!-- @beepsoft

            What happens when the crate / profile or any oof these properties change in the
            react layer? I expect that the component above will update to reflect those changes
            as the properties are computed (vue is watching them) but we should check.

        -->

        <div class="flex flex-col bg-yellow-200 p-10 mt-10">
            Function and object values passed from react:
            <ul class="list-disc">
                <li>{{ data.crate }}</li>
                <li>{{ data.profile }}</li>
                <li>{{ data.lookup }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, reactive } from "vue";
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
    config: {
        type: String,
        required: true,
    },
    // WC props are all lowercase
    configversion: {
        type: String,
        required: true,
    },
});

let data = reactive(init());

watch(
    () => props.configversion,
    () => (data = { ...init() })
);

function init() {
    let $this = globalThis[props.config];

    return {
        crate: $this.crate,
        profile: $this.profile,
        lookup: $this.lookup,
        enableContextEditor: $this?.config?.enableContextEditor ?? true,
        enableCratePreview: $this?.config?.enableCratePreview ?? true,
        enableBrowseEntities: $this?.config?.enableBrowseEntities ?? true,
        enableTemplateSave: $this?.config?.enableTemplateSave ?? false,
        readonly: $this?.config?.readonly ?? false,
    };
}
</script>
