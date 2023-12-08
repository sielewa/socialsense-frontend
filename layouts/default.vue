<template>
  <div class="container mx-auto flex flex-row max-w-screen-2xl h-screen">
    <div class="container w-3/4">
      <NuxtPage />
    </div>
    <div class="fixed container mt-24 flex flex-col w-1/4 bg-white justify-start right-0">
      <div class="container px-10">
        <div class="text-center text-4xl">
          SocialSense
        </div>
        <div class="pt-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </div>
      </div>
      <div class="container mt-8 flex flex-col px-10">
        <div>
          <input 
            class="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            v-model="filter"
          >
        </div>
        <div class="container mt-4">
          <ul class="flex flex-col items-center">
            <li 
              class="text-xl my-2"
              v-for="subject in filteredSubjects"
              :key="subject"
            >
              <NuxtLink :to="`/subject/${subject}`">
                {{ subject }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const filter = ref('');
  const subjectsStore = useSubjectStore();
  await subjectsStore.fetchSubjects();
  const subjects = computed(() => subjectsStore.getSubjects);

  const filteredSubjects = computed(() => {
    return subjects.value.filter(subject => subject.toLowerCase().includes(filter.value.toLowerCase()));
  })
</script>