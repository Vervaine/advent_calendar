<template>
    <form class="flex flex-col gap-6 items-center">
        <div class="form-control w-full max-w-lg">
            <label class="label">
                <span class="label-text text-white text-lg">Pick a category</span>
            </label>
            <div class="flex gap-2">
                <RadioGroup v-model="selectedCategory">
                    <div class="grid grid-cols-3 gap-4">
                        <RadioGroupOption as="template" v-for="category in categories" :key="category.id"
                                          :value="category" v-slot="{ active, checked }">
                            <div :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-gray-700 border-gray-900 hover:bg-gray-600', 'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                <RadioGroupLabel as="p" class="flex gap-2 items-center"><i
                                    :class="category.icon"></i><span>{{ category.name }}</span></RadioGroupLabel>
                            </div>
                        </RadioGroupOption>
                    </div>
                </RadioGroup>
            </div>
        </div>

        <div class="form-control w-full max-w-lg">
            <label class="label">
                <span class="label-text text-white text-lg">Describe your suggestion</span>
            </label>
            <textarea v-model="idea.desc"
                      class="textarea textarea-bordered h-32 placeholder-gray-200 bg-gray-700 text-white text-md"
                      placeholder="Your amazing idea"></textarea>
        </div>

        <div class="flex justify-end items-center gap-4 w-full max-w-lg">
            <p v-if="success" class="text-lime-500"> Success !</p>
            <p v-if="error" class="text-red-500">An error happened. Please signal and try again</p>
            <button type="submit" @click.prevent="saveIdea"
                    class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Save
            </button>
        </div>
    </form>
</template>

<script>
import {supabase} from '../supabase';
import {RadioGroup, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'

export default {
    name: "EditDayForm",
    props: ['day'],
    components: {
        RadioGroup, RadioGroupLabel, RadioGroupOption
    },
    data() {
        return {
            error: null,
            success: false,
            idea: {
                id: null,
                desc: '',
            },
            selectedCategory: 1,
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
    watch: {
        async day(value) {
            if (value) {
                await this.getIdea();
            } else {
                this.idea = {
                    id: null,
                    desc: '',
                }
            }
        },
        async selectedCategory(value) {
            if (value) {
                await this.getIdea();
            } else {
                this.idea = {
                    id: null,
                    desc: '',
                }
            }
        }
    },
    methods: {
        async getIdea() {
            const {data, error} = await supabase
                .from('ideas')
                .select()
                .eq('day', this.day.nb)
                .eq('type', this.selectedCategory.id)
            if (data.length > 0) {
                this.idea = data[0];
            } else {
                this.idea = {
                    id: null,
                    desc: '',
                }
            }
        },
        async saveIdea() {
            if (this.idea.id) {
                const {error} = await supabase
                    .from('ideas')
                    .update({type: this.selectedCategory.id, day: this.day.nb, desc: this.idea.desc})
                    .eq('id', this.idea.id)
                if (error) {
                    this.error = error;
                } else {
                    this.success = true;
                    setTimeout(() => this.success = false, 3000)
                }
            } else {
                const {error} = await supabase
                    .from('ideas')
                    .insert({type: this.selectedCategory.id, day: this.day.nb, desc: this.idea.desc})
                if (error) {
                    this.error = error;
                } else {
                    this.success = true;
                    setTimeout(() => this.success = false, 3000)
                }
            }
        }
    },
    mounted() {
        this.selectedCategory = this.categories[0];
    }


}
</script>