import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "./models/review.model";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto);
  }

  findAll(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  findOne(id: number): Promise<Review | null> {
    return this.reviewModel.findByPk(id);
  }

  findByDiscountAndUser(
    discountId: number,
    userId: number
  ): Promise<Review | null> {
    return this.reviewModel.findOne({
      where: {
        discountId,
        userId,
      },
    });
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review | null> {
    const updated = await this.reviewModel.update(updateReviewDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.reviewModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "Review muvaffaqiyatli o'chirildi.";
    }
    return "Reviewni o'chirishda xatolik yuz berdi.";
  }
}
