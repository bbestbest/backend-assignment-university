"use strict";

const UniversityModel = use("App/Models/University");

class UniversityController {
  async index() {
    let data = await UniversityModel.query()
      .groupBy("full_name")
      .fetch()
      .then((response) => response.toJSON());
    console.log(data);
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
    let data = await UniversityModel.query()
      .where({ id })
      .with("students")
      .fetch()
      .then((response) => response.toJSON());

    return { status: 200, error: undefined, data: data };
  }
  async store({ request }) {
    let { full_name, education_degree } = request.body;
    if (education_degree === undefined) {
      education_degree = "bachelor";
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
      return { status: 200, error: undefined, data: data };
    } else {
      return { status: 200, error: undefined, message: "Already duplicate" };
    }
  }
  async update({ request }) {
    const { params, body } = request;
    const { id } = params;
    const { full_name } = body;
    let data = await UniversityModel.find(id);
    data.merge(body);
    await data.save();

    return { status: 200, error: undefined, data: data };
  }
  async destroy({ request }) {
    const { params } = request;
    const { id } = params;
    let message = "";
    let data = await UniversityModel.find(id);
    if (data !== null) {
      await data.delete();
      message = `${id} was destroyed`;
    } else {
      message = "Item was missing or destroyed";
    }
    return { status: 200, error: undefined, message: message };
  }
}

module.exports = UniversityController;
