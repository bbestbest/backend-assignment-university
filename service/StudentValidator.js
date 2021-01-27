const Validator = use("Validator");

module.exports = async function StudentValidator(data) {
  if (typeof data !== "object") throw new Error();

  const { full_name, education_degree } = data;

  const rules = {
    first_name: "required",
    last_name: "required",
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
