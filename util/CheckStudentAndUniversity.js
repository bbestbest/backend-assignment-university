module.exports = async function CheckStudentIsInUniversity(
  response,
  data,
  model,
  checkCase
) {
  switch (checkCase) {
    case 1: {
      let getStudentId = await model.StudentModel.query()
        .where({ first_name: data.first_name, last_name: data.last_name })
        .fetch()
        .then((response) => response.toJSON());
      const getUniversityId = await model.UniversityModel.query()
        .where({
          full_name: data.university_name,
          education_degree: data.degree,
        })
        .fetch()
        .then((response) => response.toJSON());
      const checkBridge = await model.BridgeModel.query()
        .where({
          student_id: getStudentId[0].id,
          university_id: getUniversityId[0].id,
        })
        .fetch()
        .then((response) => response.toJSON());
      if (!checkBridge.length) {
        const bridge = await model.BridgeModel.create({
          student_id: getStudentId[0].id,
          university_id: getUniversityId[0].id,
        });
      }
      response.status(200).send({
        student: (getStudentId = {
          id: getStudentId[0].id,
          first_name: getStudentId[0].first_name,
          last_name: getStudentId[0].last_name,
          full_name: data.university_name,
          education_degree: data.degree,
        }),
      });
    }
    case 2: {
      module.exports = async function CheckStudentIsNotInUniversity(
        response,
        data,
        model
      ) {
        await model.StudentModel.create({
          first_name: data.first_name,
          last_name: data.last_name,
        });
        let getStudentId = await model.StudentModel.query()
          .max("id as id")
          .then((response) => JSON.parse(JSON.stringify(response)));
        const getUniversityId = await model.UniversityModel.query()
          .where({ full_name: data.university_name })
          .fetch()
          .then((response) => response.toJSON());
        const checkBridge = await model.BridgeModel.query()
          .where({
            student_id: getStudentId[0].id,
            university_id: getUniversityId[0].id,
          })
          .fetch()
          .then((response) => response.toJSON());
        if (!checkBridge.length) {
          const bridge = await model.BridgeModel.create({
            student_id: getStudentId[0].id,
            university_id: getUniversityId[0].id,
          });
        }
        response.status(200).send({
          student: (getStudentId = {
            id: getStudentId[0].id,
            first_name: data.first_name,
            last_name: data.last_name,
            full_name: data.university_name,
            education_degree: data.degree,
          }),
        });
      };
    }
  }
};
