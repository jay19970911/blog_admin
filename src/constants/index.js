export const env = process.env.NODE_ENV

export const isDev = env === 'development'

export const apiMaps = {
  development: 'http://localhost:3010',
  production: ''
}


// export const baseURL = 'http://localhost:3010'
export const baseURL = apiMaps[process.env.NODE_ENV]