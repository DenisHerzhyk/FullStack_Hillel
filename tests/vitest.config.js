import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true, // Дозволяє використовувати глобальні змінні, такі як `test` та `expect`
        environment: 'node', // Середовище для виконання тестів (може бути 'node' або 'jsdom')
        coverage: {
            provider: 'v8', // Використовує V8 для аналізу покриття коду
            reporter: ['text', 'html'] // Формати звіту про покриття
        }
    }
})