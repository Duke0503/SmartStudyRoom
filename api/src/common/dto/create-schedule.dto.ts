export class CreateScheduleDto {
  title: string;

  status: string;

  start_time: Date;

  finish_time: Date;

  break_time: number;

  user_ID: number;
}