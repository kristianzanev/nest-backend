import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CorePostService<T> {
  constructor(public model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<T> {
    return await this.model.findOne({ _id: id });
  }

  async findBy(params: object): Promise<T> {
    return await this.model.findOne(params);
  }

  async create(modelData: object): Promise<T | any> {
    try {
        console.warn({modelData})
      const newModel = new this.model(modelData);
      return await newModel.save();
    } catch (error) {
      //will throw an error if the schema doesn't match with the required parrams
      throw new BadRequestException({
        statusCode: 400,
        message: error,
        error: 'Bad Request',
      });
    }
  }

  async delete(creatorId: string, id: string): Promise<T> {
    let data
    try {
       data = await this.model.findOneAndDelete({creatorId, _id: id});
    } catch (error) {
      //will throw an error if the schema doesn't match with the required parrams
      throw new BadRequestException({
        statusCode: 400,
        message: error,
        error: 'Bad Request',
      });
    }

    if(!data) { // if the creatorId is not found, it'll not throw an error and return null data for some reason
      throw new BadRequestException({
        statusCode: 400,
        message: data,
        error: 'Bad Request',
      });
    }

    return data;
  }

  async update(creatorId: string, id: string, modelData: T): Promise<T> {
    let data
    try {
      data = await this.model.findOneAndUpdate({creatorId, _id: id}, modelData, { new: true });
    } catch (error) {
      //will throw an error if the schema doesn't match with the required parrams
      throw new BadRequestException({
        statusCode: 400,
        message: error,
        error: 'Bad Request',
      });
    }

    if(!data) { // if the creatorId is not found, it'll not throw an error and return null data for some reason
      throw new BadRequestException({
        statusCode: 400,
        message: data,
        error: 'Bad Request',
      });
    }
    return data
  }
}
