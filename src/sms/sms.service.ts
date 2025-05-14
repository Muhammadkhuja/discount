import { Injectable } from "@nestjs/common";
import FormData = require("form-data");
import axios from 'axios'

@Injectable()
export class SmsService {
  async sendSMS(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", "Bu Eskiz dan test");
    data.append("from", "4546");
    console.log(process.env.SMS_SERVICE_URL);
    console.log(process.env.SMS_TOKEN);

    const config = {
      method: "post",
      maxBoxLenght: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      return { status: 500 };
    }
  }

//   async refreshToken() {}
//   async getToken() {}
}
