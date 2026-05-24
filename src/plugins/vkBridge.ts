import bridge from '@vkontakte/vk-bridge'

// Инициализация VK Bridge
bridge
  .send('VKWebAppInit', {})
  .then(() => {
    console.log('VK Mini App initialized successfully')
  })
  .catch((error: unknown) => {
    console.error('VK initialization failed:', error)
  })

// Подписка на события темы сразу после инициализации
bridge.subscribe((event) => {
  try {
    if (event?.detail?.type === 'VKWebAppUpdateConfig') {
      const { data } = event.detail
      const scheme = data?.scheme || 'client_light'

      document.body.setAttribute('scheme', scheme)

      document.body.classList.remove('dark-theme')
      document.body.classList.add('light-theme')
    }
  } catch (error) {
    console.error('Error handling VK theme event:', error)
  }
})

export default bridge
