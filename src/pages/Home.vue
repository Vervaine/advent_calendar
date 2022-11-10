<template>
    <div class="flex justify-between items-center">
        <div class="flex flex-col gap-2">
            <h1 class="text-6xl font-bold tracking-widest">Advent Calendar</h1>
            <p class="tracking-wider text-gray-300 text-xl">Currently under development :)</p>
        </div>
        <div class="flex gap-6 items-center">
            <CountDown></CountDown>
            <h3 class="text-2xl font-bold tracking-widest">before Christmas</h3>
        </div>
    </div>
    <div class="grid grid-cols-10 grid-rows-6 gap-4 h-screen" v-if="ideas">
        <DayCard :index="1" class="col-span-1 row-span-1 bg-red-500" :ideas="getFilteredIdeas(1)" style="background-image: url('/src/assets/topography.svg');"/>
        <DayCard :index="2" class="col-span-2 row-span-2 bg-gray-800" :ideas="getFilteredIdeas(2)" style="background-image: url('/src/assets/jigsaw.svg');"/>
        <DayCard :index="3" number="3" class="col-span-1 row-span-2 bg-sky-200" :ideas="getFilteredIdeas(3)"  style="background-image: url('/src/assets/line-in-motion.svg');"/>
        <DayCard :index="4" class="col-span-1 row-span-1 bg-gray-500" :ideas="getFilteredIdeas(4)" style="background-image: url('/src/assets/bubbles.svg');"/>
        <DayCard :index="5" class="col-span-2 row-span-2 bg-black bg-no-repeat bg-[right_1rem_center]" :ideas="getFilteredIdeas(5)" style="background-image: url('/src/assets/christmas-cookie.svg'); background-size: 170px"/>
        <DayCard :index="6" class="col-span-2 row-span-1 bg-amber-100" :ideas="getFilteredIdeas(6)"  style="background-image: url('/src/assets/curtain.svg');"/>
        <DayCard :index="7" class="col-span-1 row-span-4 bg-red-500" :ideas="getFilteredIdeas(7)" style="background-image: url('/src/assets/charlie-brown.svg');"/>
        <DayCard :index="8" class="col-span-1 row-span-2 bg-gray-500 bg-no-repeat bg-[left_2rem_bottom_2rem]" :ideas="getFilteredIdeas(8)" style="background-image: url('/src/assets/gift.svg'); background-size: 80px"/>
        <DayCard :index="9" class="col-span-1 row-span-4 bg-amber-100 bg-no-repeat bg-bottom" :ideas="getFilteredIdeas(9)" style="background-image: url('/src/assets/christmas-tree.svg'); background-size: 260px"/>
        <DayCard :index="10" class="col-span-1 row-span-2 bg-gray-800" :ideas="getFilteredIdeas(10)" style="background-image: url('/src/assets/topography.svg');"/>
        <DayCard :index="11" class="col-span-1 row-span-1 bg-gray-500" :ideas="getFilteredIdeas(11)" style="background-image: url('/src/assets/diagonal-stripes.svg');"/>
        <DayCard :index="12" class="col-span-1 row-span-2 bg-black" :ideas="getFilteredIdeas(12)"  style="background-image: url('/src/assets/polka-dots.svg');"/>
        <DayCard :index="13" class="col-span-2 row-span-1 bg-zinc-800" :ideas="getFilteredIdeas(13)" style="background-image: url('/src/assets/jupiter.svg');"/>
        <DayCard :index="14" class="col-span-1 row-span-1 bg-zinc-800" :ideas="getFilteredIdeas(14)" style="background-image: url('/src/assets/diagonal-stripes.svg');"/>
        <DayCard :index="15" :ideas="getFilteredIdeas(15)" class="col-span-1 row-span-2 bg-gray-100 bg-no-repeat bg-[center_bottom_1rem]" style="background-image: url('/src/assets/snowflake.svg'); background-size: 120px"/>
        <DayCard :index="16" class="col-span-1 row-span-2 bg-zinc-800 bg-no-repeat bg-[right_1rem_bottom_2rem]" :ideas="getFilteredIdeas(16)" style="background-image: url('/src/assets/mazel-tov.svg'); background-size: 90px"/>
        <DayCard :index="17" class="col-span-1 row-span-1 bg-sky-200" :ideas="getFilteredIdeas(17)" style="background-image: url('/src/assets/moroccan.svg');"/>
        <DayCard :index="18" class="col-span-2 row-span-2 bg-red-500" :ideas="getFilteredIdeas(18)" style="background-image: url('/src/assets/diagonal-lines.svg');"/>
        <DayCard :index="19" class="col-span-1 row-span-2 bg-gray-800" :ideas="getFilteredIdeas(19)" style="background-image: url('/src/assets/temple.svg');"/>
        <DayCard :index="20" class="col-span-1 row-span-1 bg-black" :ideas="getFilteredIdeas(20)" style="background-image: url('/src/assets/overlapping-diamonds.svg');"/>
        <DayCard :index="25" class="col-span-2 row-span-2 bg-zinc-800" :ideas="getFilteredIdeas(25)" style="background-image: url('/src/assets/autumn.svg');"/>
        <DayCard :index="22" class="col-span-2 row-span-2 bg-gray-500 " :ideas="getFilteredIdeas(22)" style="background-image: url('/src/assets/morphing-diamonds.svg');"/>
        <DayCard :index="24" class="col-span-2 row-span-2 bg-gray-800 bg-no-repeat bg-[right_2rem_bottom_2rem]" :ideas="getFilteredIdeas(24)"  style="background-image: url('/src/assets/polar-bear.svg'); background-size: 150px"/>
        <DayCard :index="21" class="col-span-1 row-span-1 bg-amber-100" :ideas="getFilteredIdeas(21)" style="background-image: url('/src/assets/bubbles.svg');"/>
        <DayCard :index="23" class="col-span-3 row-span-1 bg-sky-200" :ideas="getFilteredIdeas(23)" style="background-image: url('/src/assets/bank-note.svg');"/>
    </div>
    <div v-else> Loading</div>

</template>

<script>
import {supabase} from '../supabase';

import DayCard from "../components/DayCard.vue";
import CountDown from "../components/CountDown.vue";

export default {
    name: "Home",
    components: {
        CountDown,
        DayCard,
    },
    data() {
        return {
            session: null,
            ideas: null,
        }
    },
    methods: {
        getFilteredIdeas(day) {
            return this.ideas.filter(idea => idea.day === day);
        },
        async fetchIdeas() {
            const {data, error} = await supabase
                .from('ideas')
                .select();
            if (error) {
                console.log(error)
            } else {
                this.ideas = data;
            }
        }
    },
    mounted() {
        this.fetchIdeas();
    }
}
</script>