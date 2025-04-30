import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
  }

  findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }
  async findAdminByEmail(email: string) {
        const admin = await this.adminModel.findOne({ where: { email } });
        return admin;
  }

  async findAdminByRefresh(refresh_token: string) {
    const admins = await this.adminModel.findAll()

    for (const admin of admins) {
      const match = await bcrypt.compare(
        refresh_token,
        admin.dataValues.hashed_refresh_token
      )
      if(match) return admin
    }

    return null
  }

  findOne(id: number): Promise<Admin | null> {
    return this.adminModel.findByPk(id);
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto
  ): Promise<Admin | null> {
    const updateAdmin = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    return updateAdmin[1][0];
  }

  async remove(id: number) {
    const removeadmin = await this.adminModel.destroy({ where: { id } });
    if (removeadmin > 0) {
      return `Yo bob kedi krch`;
    }
    return "aqlin yetmasa nega o'chirasan a";
  }
}