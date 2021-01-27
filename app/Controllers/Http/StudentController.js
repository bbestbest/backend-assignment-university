"use strict";

const StudentValidator = require("../../../service/StudentValidator");
const NumberTypeParamValidator = require("../../../service/NumberTypeParamValidator");
const StudentModel = use("App/Models/Student");
const BridgeModel = use("App/Models/Bridge");
const UniversityModel = use("App/Models/University");

class StudentController {
  async index({ response }) {
    const data = await StudentModel.query().fetch();

    response.status(200).send(data);
  }

  async show({ request, response }) {
    const { id } = request.params;

    const validatedParam = await NumberTypeParamValidator(id);
    if (validatedParam.error) {
      response.status(422).send(validatedParam.error);
    }

    const data = await StudentModel.query()
      .with("universities")
      .where({ id })
      .fetch();

    response.status(200).send(data);
  }

  async store({ request, response }) {
    const { body } = request;
    const { first_name, last_name, university_name, degree } = body;
    const university_infomation = await UniversityModel.query()
      .where({ full_name: university_name, education_degree: degree })
      .fetch()
      .then((response) => response.toJSON());
    if (student_infomation.length && university_infomation.length) {
      const getStudentId = await StudentModel.query()
        .where({ first_name, last_name })
        .fetch()
        .then((response) => response.toJSON());
      const getUniversityId = await UniversityModel.query()
        .where({ full_name: university_name, education_degree: degree })
        .fetch()
        .then((response) => response.toJSON());
      const checkBridge = await BridgeModel.query()
        .where({
          student_id: getStudentId[0].id,
          university_id: getUniversityId[0].id,
        })
        .fetch()
        .then((response) => response.toJSON());
      if (!checkBridge.length) {
        const bridge = await BridgeModel.create({
          student_id: getStudentId[0].id,
          university_id: getUniversityId[0].id,
        });
      }
      response.status(200).send({
        student: student_infomation,
        universty_name: university_name,
        education_degree: degree,
      });
    } else if (!student_infomation.length && university_infomation.length) {
      const student = await StudentModel.create({ first_name, last_name });
      const getStudentId = await StudentModel.query()
        .max("id as id")
        .then((response) => JSON.parse(JSON.stringify(response)));
      const getUniversityId = await UniversityModel.query()
        .where({ full_name: university_name })
        .fetch()
        .then((response) => JSON.parse(JSON.stringify(response)));
      const checkBridge = await BridgeModel.query()
        .where({
          student_id: getStudentId[0].id,
          university_id: getUniversityId[0].id,
        })
        .fetch()
        .then((response) => response.toJSON());
      if (!checkBridge.length) {
        const bridge = await BridgeModel.create({
          student_id: getStudentId[0].id,
          university_id: getUniversityId[0].id,
        });
      }
      response.status(200).send({
        student: student,
        universty_name: university_name,
        education_degree: degree,
      });
    } else if (!university_infomation.length) {
      const checkUniversity = await UniversityModel.query()
        .where({ full_name: university_name })
        .fetch()
        .then((response) => response.toJSON());
      if (checkUniversity.length) {
        const education = await UniversityModel.create({
          full_name: university_name,
          education_degree: degree,
        });
        response.status(200).send("Create degree for university");
      } else {
        response.status(404).send(`${universty_name} University not found`);
      }
    }
  }

  async update({ request }) {
    const { params, body } = request;
    const { id } = params;
    const { first_name, last_name } = body;

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
      response.status(200).send("Already duplicated");
    } else {
      data.merge(body);
      await data.save();
    }
    response.status(200).send(data);
  }

  async destroy({ request, response }) {
    const { params } = request;
    const { id } = params;
    let message = "";
    let data = await StudentModel.find(id);

    const validatedParam = await NumberTypeParamValidator(id);
    if (validatedParam.error) {
      response.status(422).send(validatedParam.error);
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
