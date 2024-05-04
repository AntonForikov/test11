import {UserFields, UserMethods, UserModel} from '../types';
import {Schema, model, HydratedDocument} from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (this: HydratedDocument<UserFields>, username: string): Promise<boolean> {
          if (!this.isModified('username')) return true;

          const user: HydratedDocument<UserFields> | null = await User.findOne({username});
          return !Boolean(user);
        },
        message: 'This user already exist'
      }
    },
    password: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }, {versionKey: false}
);

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return this.token = crypto.randomUUID();
};
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  }
})

const User = model<UserFields, UserModel>('user', UserSchema);

export default User;