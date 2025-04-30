<template>
  <v-row>
    <v-col
      v-for="(task, index) in tasks"
      :key="index"
      cols="3"
    >
      <Task :task="task" />
    </v-col>
  </v-row>
</template>

<script setup>
  import Task from '@/components/Task.vue'

  const tasks = [
    {
      titolo: 'Comprare il latte',
      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
      priorita: 5,
      data: '2025-04-30',
    },
    {
      titolo: 'Allenamento palestra',
      descrizione: 'Sessione di cardio e pesi.',
      priorita: 8,
      data: '2025-05-01',
    },
    {
      titolo: 'Progetto scuola',
      descrizione: 'Finire la presentazione di storia.',
      priorita: 9,
      data: '2025-05-02',
    },
    {
      titolo: 'Pulire la casa',
      descrizione: 'Passare l\'aspirapolvere e lavare i pavimenti.',
      priorita: 6,
      data: '2025-05-03',
    },
    {
      titolo: 'Chiamare il dottore',
      descrizione: 'Prenotare una visita di controllo.',
      priorita: 7,
      data: '2025-05-04',
    },
    {
      titolo: 'Preparare la valigia',
      descrizione: 'Prepararsi per il viaggio di lavoro.',
      priorita: 5,
      data: '2025-05-05',
    },
    {
      titolo: 'Comprare regali',
      descrizione: 'Acquistare regali per il compleanno di Marco.',
      priorita: 8,
      data: '2025-05-06',
    },
    {
      titolo: 'Controllare auto',
      descrizione: 'Portare l\'auto dal meccanico.',
      priorita: 6,
      data: '2025-05-07',
    },
    {
      titolo: 'Studiare per esame',
      descrizione: 'Ripassare i capitoli 1-5 di matematica.',
      priorita: 9,
      data: '2025-05-08',
    },
    {
      titolo: 'Organizzare riunione',
      descrizione: 'Pianificare agenda e partecipanti.',
      priorita: 7,
      data: '2025-05-09',
    },
    {
      titolo: 'Andare dal barbiere',
      descrizione: 'Taglio di capelli prima del matrimonio.',
      priorita: 5,
      data: '2025-05-10',
    },
    {
      titolo: 'Scrivere articolo',
      descrizione: 'Scrivere un articolo per il blog aziendale.',
      priorita: 8,
      data: '2025-05-11',
    },
    {
      titolo: 'Fare la spesa',
      descrizione: 'Comprare frutta, verdura e pane.',
      priorita: 6,
      data: '2025-05-12',
    },
  ]
</script>
