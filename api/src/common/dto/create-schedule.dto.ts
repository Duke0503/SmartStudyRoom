export class CreateScheduleDto {
  title: string;

  status: string;

  start_time: Date;

  finish_time: Date;

  session_time: number;

  break_time: number;

  sensor_ID: number;

  user_ID: number;
}