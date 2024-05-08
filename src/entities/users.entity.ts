import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  BeforeInsert, 
  BeforeUpdate,
  CreateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity('Users') 

export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  roles: string

  @Column({ nullable: true })
  supervisor: string;

  @Column({ default: false, nullable: true })
  isVerified: boolean;

  @Column({ nullable: true })
  emailToken: string;

  @Column()
  @CreateDateColumn()
  timestamp: Date;
  
  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT_ROUND));
  }

  @BeforeUpdate()
  async hashUpdatedPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT_ROUND));
    }
  }
  

  
}