"use strict";

const { test } = use("Test/Suite")("Validator Test");

const StudentValidator = require("../../service/StudentValidator");
const UniversityValidator = require("../../service/UniversityValidator");

test("should return error with incorrect data that required from student validator", async ({
  assert,
}) => {
  const data = {
    first_name: "test01",
    last_name: true,
  };
  const student = await StudentValidator(data);
  assert.isOk(student.error, "student error");
});

test("should return error with incorrect data that required from university validator", async ({
  assert,
}) => {
  const data = {
    full_name: false,
    education_degree: 11,
  };
  const university = await UniversityValidator(data);
  assert.isOk(university.error, "university error");
});

test("should ok when return undefined with correct data that required from student validator", async ({
  assert,
}) => {
  const data = {
    first_name: "test02",
    last_name: "test02",
  };
  const student = await StudentValidator(data);
  assert.isOk(student.error === null, "student error");
});

test("should ok when return undefined with correct data that required from university validator", async ({
  assert,
}) => {
  const data = {
    full_name: "CMU",
    education_degree: "bachelor",
  };
  const university = await UniversityValidator(data);
  assert.isOk(university.error === null, "university error");
});
