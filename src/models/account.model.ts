import mongoose, { Schema } from 'mongoose'
import { IAccount } from '~/interfaces/index.interface'

const accountSchema = new Schema<IAccount>({
  name: { type: String, required: [true, 'tên tài khoản?'] },
  password: { type: String, required: [true, 'mật khẩu?'] }
})

export default mongoose.model('Account', accountSchema)
