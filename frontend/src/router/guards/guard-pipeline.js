export const guardPipeline = (router) => {
  router.beforeEach(async (to, from) => {
    // Находим мидлвары в свойстве meta.guards маршрута, на который происходит доступ
    const guards = to.meta.guards
    // Если у маршрута нет мидлваров, переходим на страницу
    if (!guards) {
      return true
    }
    // Делаем перебор мидлваров
    for (const guard of guards) {
      const result = await guard({ to, from })
      // Если мидлвар возвращает объект или строку маршрута, прерываем цепочку и возвращаем результат
      if (
        typeof result === 'object' ||
        typeof result === 'string' ||
        result === false
      ) {
        return result
      }
    }
    return true
  })
}
