import { CustomError } from '../business/error/CustomError'
import { Band } from './../business/entities/Band'
import { BaseDatabase } from './BaseDatabase'

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME = 'LAMA_BANDS'

  public async insertBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME)
    } catch (error) {
      throw new CustomError(500, 'An unexpected error ocurred')
    }
  }

  public async getBandDetails(id: string): Promise<Band> {
    try {
      const result: any = await BaseDatabase.connection
        .select('*')
        .from(BandDatabase.TABLE_NAME)
        .where({ id })

      return result
    } catch (error) {
      throw new CustomError(500, 'An unexpected error ocurred')
    }
  }
}