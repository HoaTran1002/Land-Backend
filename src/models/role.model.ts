import mongoose, { Schema } from 'mongoose'
import { IRole } from '~/interfaces/index.interface'

const roleSchema = new Schema<IRole>({
  name: { type: String, required: [true, 'tên quyền?'] }
})
export default mongoose.model('Role', roleSchema)
