import { BandDatabase } from './../data/BandDatabase'
import { BandInputDTO } from './entities/Band'
import { IdGenerator } from './services/IdGenerator'
import { CustomError } from '../business/error/CustomError'
import { UserInputDTO } from './entities/User'
import { UserDatabase } from '../data/UserDatabase'

export class BandBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private bandDatabase: BandDatabase,
    private userDatabase: UserDatabase
  ) {}

  async insertBand(band: BandInputDTO, user: UserInputDTO): Promise<void> {
    try {
      const userFromDB = await this.userDatabase.getUserByEmail(user.email)
      const userRole = userFromDB.role

      if (userRole === 'NORMAL') {
        throw new CustomError(401, 'Invalid credentials!')
      }

      const id = this.idGenerator.generate()

      await this.bandDatabase.insertBand(
        id,
        band.name,
        band.music_genre,
        band.responsible
      )
    } catch (error) {
      throw new CustomError(
        500,
        'Somente administradores podem registrar bandas.'
      )
    }
  }
}