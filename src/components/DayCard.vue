<template>
    <label class="swap card place-content-stretch">
        <input type="checkbox" class="hidden"/>
        <div class="card-body swap-off">
            <h3 class="text-center font-bold text-3xl backdrop-blur-sm bg-black/30 rounded-full w-16 px-1 py-2">{{ index }}</h3>
        </div>
        <div class="swap-on bg-white text-black py-3 px-4 font-semibold" style="box-shadow: inset 0px 0px 10px 2px rgba(0,0,0,0.75)">
            <p v-for="idea in ideas">
                <i v-if="idea.type === 1" class="ri-fire-fill text-red-500"></i>
                <i v-else-if="idea.type === 2" class="ri-hearts-fill"></i>
                <i v-else class="ri-mickey-line"></i>
                {{ idea.desc }}
            </p>
        </div>
    </label>
</template>

<script>
export default {
    name: "DayCard",
    props: ['ideas', 'index'],
    mounted() {
    }

}
</script>