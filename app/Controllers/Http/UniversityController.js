"use strict";

const UniversityValidator = require("../../../service/UniversityValidator");
const NumberTypeParamValidator = require("../../../service/NumberTypeParamValidator");
const UniversityModel = use("App/Models/University");

class UniversityController {
  async index() {
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
    return { status: 200, error: undefined, data: data };
  }

  async show({ request }) {
    const { id } = request.params;

    const validatedParam = await NumberTypeParamValidator(id);
    if (validatedParam.error) {
      return { status: 422, error: validatedParam.error };
    }

    let data = await UniversityModel.query()
      .where({ id })
      .with("students")
      .fetch()
      .then((response) => response.toJSON());

    return { status: 200, data: data };
  }

  async store({ request }) {
    const { body } = request;
    const { full_name, education_degree } = body;

    const validatedData = await UniversityValidator(body);
    if (validatedData.error) {
      return { status: 422, error: validatedData.error };
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
      return { status: 200, data: data };
    } else {
      return { status: 200, message: "Already duplicate" };
    }
  }

  async update({ request }) {
    const { params, body } = request;
    const { id } = params;
    const { full_name, education_degree } = body;

    const validatedParam = NumberTypeParamValidator(id);
    if (validatedParam.error) {
      return { status: 422, error: validatedParam.error };
    }

    const validatedData = UniversityValidator(body);
    if (validatedParam.error) {
      return { status: 422, error: validatedData.error };
    }

    const checkData = await UniversityModel.query()
      .where(body)
      .fetch()
      .then((response) => response.toJSON());

    let data = await UniversityModel.find(id);
    if (checkData[0] != undefined) {
      return { status: 200, message: "Already duplicate" };
    } else {
      data.merge(body);
      await data.save();
      return { status: 200, data: data };
    }
  }

  async destroy({ request }) {
    const { params } = request;
    const { id } = params;
    let message = "";

    const validatedParam = NumberTypeParamValidator(id);
    if (validatedParam.error) {
      return { status: 422, error: validatedParam.error };
    }

    let data = await UniversityModel.find(id);
    if (data !== null) {
      await data.delete();
      message = `${id} was destroyed`;
    } else {
      message = "Item was missing or destroyed";
    }
    return { status: 200, message: message };
  }
}

module.exports = UniversityController;
