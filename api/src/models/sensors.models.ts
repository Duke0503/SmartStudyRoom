import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SensorDocument = HydratedDocument<Sensors>;

@Schema()
export class Sensors {
  @Prop()
  id_sensor: string;

  @Prop()
  sound_data: number;

  @Prop()
  temp_data: number;

  @Prop()
  light_data: number;

  @Prop()
  camera_data: string;

  @Prop({ default: Date.now })
  time: Date;
}

export const SensorSchema = SchemaFactory.createForClass(Sensors);
