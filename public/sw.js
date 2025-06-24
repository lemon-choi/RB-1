const CACHE_NAME = 'rainbow-buddy-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/logo.png',
  '/manifest.json'
]

// 설치 이벤트
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('캐시 열기')
        return cache.addAll(urlsToCache)
      })
  )
})

// fetch 이벤트
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에서 응답을 찾으면 반환
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// 활성화 이벤트
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('이전 캐시 삭제:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})