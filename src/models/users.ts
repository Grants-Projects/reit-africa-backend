import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  BeforeInsert,
  Index,
  OneToMany,
} from 'typeorm'
import bcrypt from 'bcryptjs'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  BLOCKED = 'BLOCKED',
  REJECTED = 'NOT_VERIFIED',
}

export enum UserType {
  BUSINESS = 'BUSINESS',
  BUYER = 'BUYER'
}

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', name: 'first_name' })
  firstName!: string

  @Column({ type: 'varchar', name: 'last_name' })
  lastName!: string

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string

  @Column({ type: 'enum', enum: UserType, name: 'user_type' })
  userType!: UserType

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.VERIFIED
  })
  status!: UserStatus;

  @Column({type:'varchar', name:'title'})
  title!: string

  @Column({type: 'varchar', name:'image'})
  image!: string

  @Column({type:'boolean', name:'terms_and_conditions'})
  termsAndConditions!: boolean

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(this.password, password)
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at!: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at!: Date
}
