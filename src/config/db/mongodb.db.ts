import mongoose from 'mongoose'

export const connectDB = (): void => {
  mongoose
    .connect('mongodb://root:29102002@localhost:27017', { dbName: 'Land' })
    .then((): void => {
      console.log('connect success!')
    })
    .catch((): void => {
      console.log('connect failed!')
    })
}
