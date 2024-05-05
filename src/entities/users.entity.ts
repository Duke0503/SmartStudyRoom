import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  BeforeInsert, 
  BeforeUpdate
} from "typeorm";
import * as bcrypt from 'bcrypt'
@Entity('Users') 

export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;
  
  @Column()
  phone_number: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  roles: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  supervisor: string;

  @Column()
  @UpdateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashUpdatedPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  
  async validationPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  
}