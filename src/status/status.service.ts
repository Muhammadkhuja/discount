import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Status } from "./models/status.model";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  create(createStatusDto: CreateStatusDto) {
    return this.statusModel.create(createStatusDto);
  }

  findAll(): Promise<Status[]> {
    return this.statusModel.findAll();
  }

  findOne(id: number): Promise<Status | null> {
    return this.statusModel.findByPk(id);
  }

  async update(
    id: number,
    updateStatusDto: UpdateStatusDto
  ): Promise<Status | null> {
    const updatedStatus = await this.statusModel.update(updateStatusDto, {
      where: { id },
      returning: true,
    });
    return updatedStatus[1][0];
  }

  async remove(id: number) {
    const deleted = await this.statusModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "yooooq.";
    }
    return "chichvordiz ";
  }
}
