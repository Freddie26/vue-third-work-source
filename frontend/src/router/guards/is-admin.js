import { useAuthStore } from '@/store'

export const isAdmin = () => {
  const authStore = useAuthStore()
  if (!authStore.user?.isAdmin) {
    return { path: '/' };
  }
  return true;
}
