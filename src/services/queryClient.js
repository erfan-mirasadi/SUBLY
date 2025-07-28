
import { QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: (error) => {
        toast.error('Query Failed', {
          description: error?.message || 'Error while fetching data!',
        })
      },
    },
    mutations: {
      onError: (error) => {
        toast.error('Action Failed', {
          description: error?.message || 'Something went wrong!',
        })
      },
      onSuccess: (data) => {
        toast.success('Success', {
          description:
            data?.message || 'Your action has been completed successfully!',
        })
      },
    },
  },
})
