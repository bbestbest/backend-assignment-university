const Validator = use("Validator");

module.exports = async function UniversityValidator(data) {
  if (typeof data !== "object") throw new Error();

  const { full_name, education_degree } = data;

  const rules = {
    full_name: "required",
    education_degree: "required",
  };

  const validation = await Validator.validateAll(
    {
      full_name,
      education_degree,
    },
    rules
  );

  return {
    error: validation.messages(),
  };
};
