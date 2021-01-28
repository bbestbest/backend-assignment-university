"use strict";

const Logger = use("Logger");

const StudentValidator = require("../../../service/StudentValidator");
const NumberTypeParamValidator = require("../../../service/NumberTypeParamValidator");

const StudentModel = use("App/Models/Student");
const BridgeModel = use("App/Models/Bridge");
const UniversityModel = use("App/Models/University");

const CheckStudentAndUniversity = require("../../../util/CheckStudentAndUniversity");

class StudentController {
  async index({ request, response }) {
    Logger.info("request url is %s", request.url());
    const data = await StudentModel.query().fetch();

    response.status(200).send(data, Logger);
  }

  async show({ request, response }) {
    Logger.info("request url is %s", request.url());
    const { id } = request.params;

    const validatedParam = await NumberTypeParamValidator(id);
    if (validatedParam.error) {
      Logger.alert(validatedParam.error);
      return validatedParam.error;
    }

    const data = await StudentModel.query()
      .with("universities")
      .where({ id })
      .fetch();

    response.status(200).send(data);
  }

  async store({ request, response }) {
    Logger.info("request url is %s", request.url());
    const { body } = request;
    const { first_name, last_name, university_name, degree } = body;

    const validatedData = await StudentValidator(body);
    if (validatedData.error) {
      Logger.alert(validatedData.error);
      validatedData.error;
    }

    const university = await UniversityModel.query()
      .where({ full_name: university_name, education_degree: degree })
      .fetch()
      .then((response) => response.toJSON());
    const student = await StudentModel.query()
      .where({ first_name: first_name, last_name: last_name })
      .fetch()
      .then((response) => response.toJSON());

    const checkCase = [university.length > 0, student.length > 0];

    if (checkCase[0] == true && checkCase[1] == true) {
      console.log("Case : 1");
      return await CheckStudentAndUniversity(
        response,
        body,
        {
          UniversityModel,
          StudentModel,
          BridgeModel,
        },
        1
      );
    } else if (checkCase[0] == true && checkCase[1] == false) {
      return await CheckStudentAndUniversity(
        response,
        body,
        {
          UniversityModel,
          StudentModel,
          BridgeModel,
        },
        2
      );
    } else if (checkCase[0] == false) {
      return response
        .status(404)
        .send(
          `${university_name} university or university degree is not found`
        );
    }
  }

  async update({ request }) {
    Logger.info("request url is %s", request.url());
    const { params, body } = request;
    const { id } = params;
    const { first_name, last_name } = body;

    const validatedParam = NumberTypeParamValidator(id);
    if (validatedParam.error) {
      Logger.alert(validatedParam.error);
      return validatedParam.error;
    }

    const validatedData = UniversityValidator(body);
    if (validatedData.error) {
      Logger.alert(validatedData.error);
      return validatedData.error;
    }

    const checkData = await UniversityModel.query()
      .where(body)
      .fetch()
      .then((response) => response.toJSON());

    let data = await UniversityModel.find(id);
    if (checkData[0] != undefined) {
      response.status(200).send("Already duplicated");
    } else {
      data.merge(body);
      await data.save();
    }
    response.status(200).send(data);
  }

  async destroy({ request, response }) {
    Logger.info("request url is %s", request.url());
    const { params } = request;
    const { id } = params;
    let message = "";
    let data = await StudentModel.find(id);

    const validatedParam = await NumberTypeParamValidator(id);
    if (validatedParam.error) {
      Logger.alert(validatedParam.error);
      return validatedParam.error;
    }

    if (data !== null) {
      await data.delete();
      message = `Item ${id} is destroying`;
    } else {
      message = "Item was missing or destroyed";
    }
    response.status(200).send(message);
  }
}

module.exports = StudentController;
