<template>
  <div class="container flex flex-row flex-wrap pl-10 h-full items-center">
    <div class="container w-6/12">
      <h2>Naive Bayes</h2>
      <div>Positive: {{ totalPositiveEmotionCountNaiveBayes }}</div>
      <div>Negative: {{ totalNegativeEmotionCountNaiveBayes }}</div>
      <div>Neutral: {{ totalNeutralEmotionCountNaiveBayes }}</div>
      <div>Total: {{ totalEntries.length }}</div>
      <client-only>
        <div>
          <apexchart type="line" width="400" height="300" :options="apexChartOptionsNaiveBayes" :series="seriesNaiveBayes"></apexchart>
        </div>
      </client-only>
    </div>
    <div class="container w-6/12">
      <h2>roBERTa</h2>
      <div>Positive: {{ totalPositiveEmotionCountBert }}</div>
      <div>Negative: {{ totalNegativeEmotionCountBert }}</div>
      <div>Neutral: {{ totalNeutralEmotionCountBert }}</div>
      <div>Total: {{ totalEntries.length }}</div>
      <client-only>
        <div>
          <apexchart type="line" width="400" height="300" :options="apexChartOptionsBert" :series="seriesBert"></apexchart>
        </div>
      </client-only>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  interface DataAgregacji {
    [data: string]: { positive: number; negative: number; neutral: number; };
  }

  interface DataSerii {
    name: string;
    data: number[];
  }

  const name = ref('');
  const route = useRoute();
  const nameParam = route.params.name;

  if (typeof nameParam === 'string') {
    name.value = nameParam;
  } else if (Array.isArray(nameParam) && nameParam.length > 0) {
    name.value = nameParam[0];
  }

  const statisticsStore = useStatisticsStore();
  await statisticsStore.fetchStatistics(name.value);

  const submissions = ref(computed(() => statisticsStore.getSubmissions));
  const comments = ref(computed(() => statisticsStore.getComments));
  const totalEntries = submissions.value.concat(comments.value);

  const totalPositiveEmotionCountNaiveBayes = ref(computed(() => statisticsStore.getTotalPositiveSentimentCountNaiveBayes));
  const totalNegativeEmotionCountNaiveBayes = ref(computed(() => statisticsStore.getTotalNegativeSentimentCountNaiveBayes));
  const totalNeutralEmotionCountNaiveBayes = ref(computed(() => statisticsStore.getTotalNeutralSentimentCountNaiveBayes));

  const totalPositiveEmotionCountBert = ref(computed(() => statisticsStore.getTotalPositiveSentimentCountBert));
  const totalNegativeEmotionCountBert = ref(computed(() => statisticsStore.getTotalNegativeSentimentCountBert));
  const totalNeutralEmotionCountBert = ref(computed(() => statisticsStore.getTotalNeutralSentimentCountBert));

  const aggregatedEntriesNaiveBayes = totalEntries.reduce<DataAgregacji>((acc, val) => {
    let date = new Date(val.createdAt).toISOString().split('T')[0];

    if (!acc[date]) {
      acc[date] = { positive: 0, negative: 0, neutral: 0 };
    }

    switch (val.naiveBayes) {
      case 'positive':
        acc[date].positive += 1;
        break;
      case 'negative':
        acc[date].negative += 1;
        break;
      case 'neutral':
        acc[date].neutral += 1;
        break;
    }

    return acc;
  }, {});

  const aggregatedEntriesBert = totalEntries.reduce<DataAgregacji>((acc, val) => {
    let date = new Date(val.createdAt).toISOString().split('T')[0];

    if (!acc[date]) {
      acc[date] = { positive: 0, negative: 0, neutral: 0 };
    }

    switch (val.bert) {
      case 'positive':
        acc[date].positive += 1;
        break;
      case 'negative':
        acc[date].negative += 1;
        break;
      case 'neutral':
        acc[date].neutral += 1;
        break;
    }

    return acc;
  }, {});

  const seriesNaiveBayes: Ref<DataSerii[]> = ref([
    { name: 'Pozytywne', data: [] },
    { name: 'Negatywne', data: [] },
    { name: 'Neutralne', data: [] },
  ]);

  const seriesBert: Ref<DataSerii[]> = ref([
    { name: 'Pozytywne', data: [] },
    { name: 'Negatywne', data: [] },
    { name: 'Neutralne', data: [] },
  ]);

  Object.keys(aggregatedEntriesNaiveBayes).forEach(date => {
    seriesNaiveBayes.value[0].data.push(aggregatedEntriesNaiveBayes[date].positive);
    seriesNaiveBayes.value[1].data.push(aggregatedEntriesNaiveBayes[date].negative);
    seriesNaiveBayes.value[2].data.push(aggregatedEntriesNaiveBayes[date].neutral);
  });

  Object.keys(aggregatedEntriesNaiveBayes).forEach(date => {
    seriesBert.value[0].data.push(aggregatedEntriesBert[date].positive);
    seriesBert.value[1].data.push(aggregatedEntriesBert[date].negative);
    seriesBert.value[2].data.push(aggregatedEntriesBert[date].neutral);
  });

  const apexChartOptionsNaiveBayes = ref({
    chart: {
      id: 'Naive Bayes'
    },
    xaxis: {
      categories: Object.keys(aggregatedEntriesNaiveBayes),
    },
  });

  const apexChartOptionsBert = ref({
    chart: {
      id: 'roBERTa'
    },
    xaxis: {
      categories: Object.keys(aggregatedEntriesBert),
    },
  });
</script>