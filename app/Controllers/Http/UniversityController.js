"use strict";

const UniversityValidator = require("../../../service/UniversityValidator");
const NumberTypeParamValidator = require("../../../service/NumberTypeParamValidator");
const UniversityModel = use("App/Models/University");

class UniversityController {
  async index({ request, response }) {
    let data = await UniversityModel.query()
      .groupBy("full_name")
      .fetch()
      .then((response) => response.toJSON());
    let mapData = data.map(
      (item) =>
        (data = {
          id: item.id,
          university_name: item.full_name,
          created_at: item.created_at,
          updated_at: item.updated_at,
        })
    );
    response.status(200).send(mapData);
  }

  async show({ request, response }) {
    const { id } = request.params;

    const validatedParam = await NumberTypeParamValidator(id);
    if (validatedParam.error) {
      return validatedParam.error;
    }

    let data = await UniversityModel.query()
      .where({ id })
      .with("students")
      .fetch();

    response.status(200).send(data);
  }

  async store({ request, response }) {
    const { body } = request;
    const { full_name, education_degree } = body;

    const validatedData = await UniversityValidator(body);
    if (validatedData.error) {
      return validatedData.error;
    }

    const checkData = await UniversityModel.query()
      .where({ full_name, education_degree })
      .fetch()
      .then((response) => response.toJSON());

    if (!checkData.length) {
      const data = await UniversityModel.create({
        full_name,
        education_degree,
      });
      response.status(200).send(data);
    } else {
      response.status(200).send("Already duplicated");
    }
  }

  async update({ request, response }) {
    Logger.info("request url is %s", request.url());
    const { params, body } = request;
    const { id } = params;
    const { full_name, education_degree } = body;

    const validatedParam = NumberTypeParamValidator(id);
    if (validatedParam.error) {
      Logger.info(validatedParam.error);
      return validatedParam.error;
    }

    const validatedData = UniversityValidator(body);
    if (validatedParam.error) {
      Logger.info(validatedData.error);
      return validatedData.error;
    }

    const checkData = await UniversityModel.query()
      .where(body)
      .fetch()
      .then((response) => response.toJSON());

    let data = await UniversityModel.find(id);
    if (checkData[0] != undefined) {
      return { status: 200, message: "Already duplicated" };
    } else {
      data.merge(body);
      await data.save();
      response.status(200).send(data);
    }
  }

  async destroy({ request, response }) {
    Logger.info("request url is %s", request.url());
    const { params } = request;
    const { id } = params;
    let message = "";
    let status = 0;

    const validatedParam = NumberTypeParamValidator(id);
    if (validatedParam.error) {
      Logger.alert(validatedParam.error);
      return validatedParam.error;
    }

    let data = await UniversityModel.find(id);
    if (data !== null) {
      await data.delete();
      message = `${id} was destroyed`;
      status = 200;
    } else {
      message = "Item was missing or destroyed";
      status = 404;
    }
    response.status(status).send(message);
  }
}

module.exports = UniversityController;
