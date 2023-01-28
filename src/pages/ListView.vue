<template>
    <div class="my-4 flex justify-center">
        <h1 class="text-4xl font-bold tracking-widest">Our ToDo List</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-if="ideas">
        <div v-for="category in categories" class="card flex flex-col bg-gray-800 rounded-lg p-4 divide-y divide-gray-200">
            <h2 class="flex gap-4 items-center text-2xl font-semibold pb-2"><i :class="category.icon"></i><span>{{ category.name }}</span></h2>
            <div class="flex flex-col gap-2 p-4">
                <div v-for="idea in oddIdeas.filter(i => i.type === category.id)" class="flex gap-2 items-center">
                    <input @change="save(idea)" v-model="idea.done" id="done" name="done" type="checkbox" :class="idea.done ? 'opacity-30' :''" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <p :class="idea.done ? 'line-through opacity-20' : ''">{{ idea.desc }}</p>
                </div>
            </div>
        </div>
        <div v-for="category in categories" class="card flex flex-col bg-gray-800 rounded-lg p-4 divide-y divide-gray-200">
            <h2 class="flex gap-4 items-center text-2xl font-semibold pb-2"><i :class="category.icon"></i><span>{{ category.name }}</span></h2>
            <div class="flex flex-col gap-2 p-4">
                <div v-for="idea in evenIdeas.filter(i => i.type === category.id)" class="flex gap-2 items-center">
                    <input @change="save(idea)" v-model="idea.done" id="done" name="done" type="checkbox" :class="idea.done ? 'opacity-30' :''" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <p :class="idea.done ? 'line-through opacity-20' : ''">{{ idea.desc }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else> Loading</div>
    <p v-if="success" class="text-lime-500"> Success !</p>
    <p v-if="error" class="text-red-500">An error happened. Please signal and try again</p>
</template>

<script>
import {supabase} from '../supabase';

import DayCard from "../components/DayCard.vue";
import CountDown from "../components/CountDown.vue";

export default {
    name: "ListView",
    computed: {
        oddIdeas() {
            return this.ideas.filter(i => i.day % 2 !== 0);
        },
        evenIdeas() {
            return this.ideas.filter(i => i.day % 2 === 0);
        }
    },
    data() {
        return {
            error: null,
            success: false,
            ideas: null,
            categories: [
                {
                    'id': 1,
                    'icon': 'ri-fire-fill text-red-500',
                    'name': 'Hot'
                },
                {
                    'id': 2,
                    'icon': 'ri-hearts-fill text-fuchsia-500',
                    'name': 'Love'
                },
                {
                    'id': 3,
                    'icon': 'ri-mickey-fill text-lime-500',
                    'name': 'Fun'
                }
            ]
        }
    },
    methods: {
        async fetchIdeas() {
            const {data, error} = await supabase.from('ideas').select();
            if (error) {
                console.log(error)
            } else {
                this.ideas = data;
            }
        },
        async save(idea) {
            const {error} = await supabase
                .from('ideas')
                .update({done: idea.done})
                .eq('id', idea.id)
            if (error) {
                this.error = error;
            } else {
                this.success = true;
                setTimeout(() => this.success = false, 3000)
            }
        }
    },
    mounted() {
        this.fetchIdeas();
    }
}
</script>