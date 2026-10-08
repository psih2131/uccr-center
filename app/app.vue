<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <AppTelegramNotice />
    </ClientOnly>
  </div>
</template>
