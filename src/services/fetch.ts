import axios, { AxiosRequestConfig } from 'axios'

export type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type FetchParams = {
  method?: MethodTypes
  path: string
  params?: object
  headers?: object
  data?: any
} & AxiosRequestConfig

const fetch = <T>({
  method = 'GET',
  path,
  params,
  headers,
  responseType,
  data,
  withCredentials,
}: FetchParams) => {
  return new Promise<T>(async (resolve, reject) => {
    const url = path
    try {
      axios
        .request<T>({
          headers,
          url,
          method,
          params,
          responseType,
          data,
          withCredentials,
        })
        .then(async (response) => {
          //@ts-ignore
          if (response.data?.success === false) {
            reject({ response })
          }
          resolve(response.data)
        })
        .catch((error: any) => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}

export default fetch
