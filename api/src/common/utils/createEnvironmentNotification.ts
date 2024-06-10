export const envNotifications = (temp_data: number, light_data: number, sound_data: number): string => {
  let result: string = '';

  if (temp_data < 20 || temp_data > 25) result += `Nhiệt độ ${temp_data}`;
  if (light_data < 500 || light_data > 750) {
    if (result != '') result += `, Ánh sáng ${light_data}`;
    else result += `Ánh sáng ${light_data}`
  }
  if (sound_data > 40) {
    if (result != '') result += `, Độ ồn ${sound_data}`;
    else result += `Ánh sáng ${sound_data}`
  }
  if (result != '') result += ": Điều kiện môi trường không tốt nhất cho việc học tập !!!";
  return result;
}