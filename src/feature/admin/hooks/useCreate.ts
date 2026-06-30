import { useMutation } from "@tanstack/react-query"
import { adminApi } from "../service"
import { CreateEmployee, Employee } from "../type"


export const useCreateMutation = () => {

  return useMutation<void, Error, CreateEmployee>({

    mutationFn: (data) => adminApi.create(data),

    onSuccess: (response) => {
      console.log("create thành công");
      window.location.replace("/admin");
    },

    onError: (error) => {
      console.log("create thất bại");
    }

  })

}