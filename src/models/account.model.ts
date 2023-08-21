import mongoose, { Schema } from 'mongoose'
import { IAccount } from '~/interfaces/index.interface'

const accountSchema = new Schema<IAccount>({
  name: { type: String, required: [true, 'tên tài khoản?'] },
  password: { type: String, required: [true, 'mật khẩu?'] },
  role: { type: String, enum: ['user', 'admin', 'super_admin'], default: 'user' },
  email: { type: String, unique: true }
})

export default mongoose.model('Account', accountSchema)
