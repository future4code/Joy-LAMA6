import { CustomError } from '../business/error/CustomError';
import { Show } from './../business/entities/Show';
import { BaseDatabase } from './BaseDatabase';


export class ShowDatabase extends BaseDatabase {

 private static TABLE_NAME = "LAMA_SHOWS";

 private static toUserModel(show: any): Show {
  return new Show(
   show.id,
   show.week_day,
   show.start_time,
   show.end_time,
   show.band_id
  );
 }

 public async createShow(
  id: string,
  week_day: string,
  start_time: number,
  end_time: number,
  band_id: string
 ): Promise<void> {
  try {
   await BaseDatabase.connection
    .insert({
     id,
     week_day,
     start_time,
     end_time,
     band_id
    })
    .into(ShowDatabase.TABLE_NAME);
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred");
  }
 }

 public async getShowsByDate(date: string): Promise<Show[]> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(ShowDatabase.TABLE_NAME)
    .where({ date });

   const shows: Show[] = result.map((show) => {
    return ShowDatabase.toUserModel(show)
   })
   return shows
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred");
  }
 }
} 